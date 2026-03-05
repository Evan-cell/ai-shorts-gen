import { inngest } from "./client";
import { supabaseAdmin } from "@/lib/supabase";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { HfInference } from "@huggingface/inference";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const hf = new HfInference(process.env.HF_TOKEN);

export const helloWorld = inngest.createFunction(
    { id: "hello-world" },
    { event: "test/hello.world" },
    async ({ event, step }) => {
        await step.sleep("wait-a-moment", "1s");
        return { message: `Hello ${event.data.name || "World"}!` };
    }
);

export const generateVideoSeries = inngest.createFunction(
    { id: "generate-video-series" },
    { event: "series/generate" },
    async ({ event, step }) => {
        const { seriesId } = event.data;

        if (!seriesId || seriesId === "undefined") {
            throw new Error(`Invalid seriesId provided: ${seriesId}`);
        }

        // Step 1: Fetch series data from the supabase
        const seriesData = await step.run("fetch-series-data", async () => {
            const { data, error } = await supabaseAdmin
                .from("series")
                .select("*")
                .eq("id", seriesId)
                .single();

            if (error) {
                throw new Error(`Error fetching series: ${error.message}`);
            }

            if (!data) {
                throw new Error(`Series not found for ID: ${seriesId}`);
            }

            return data;
        });

        // Initial Step to show "Generating" status on the Videos page
        const initialVideoRecord = await step.run("create-pending-video", async () => {
            const { data, error } = await supabaseAdmin
                .from("generated_videos")
                .insert([
                    {
                        series_id: seriesId,
                        user_id: seriesData.user_id,
                        status: "generating"
                    }
                ])
                .select()
                .single();

            if (error) {
                throw new Error(`Error creating initial video record: ${error.message}`);
            }

            return data;
        });

        // Step 2: Generate video script using AI
        const scriptData = await step.run("generate-video-script", async () => {
            const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

            const durationStr = seriesData.duration || "30-40";
            const isLongVideo = durationStr.includes("60") || durationStr.includes("70");
            const numPrompts = isLongVideo ? "5 to 6" : "4 to 5";

            const prompt = `
                Generate a viral video script and image prompts for an AI short video based on the following details:
                - Title: ${seriesData.name}
                - Niche: ${seriesData.niche}
                - Duration Goal: ${seriesData.duration} seconds
                - Video Style: ${seriesData.video_style}

                Requirements:
                1. The script should be natural, engaging, and suitable for a professional voiceover.
                2. Provide exactly ${numPrompts} detailed image prompts for the scenes.
                3. Each image prompt should be descriptive and align strictly with the video style: ${seriesData.video_style}.
                4. The script should be broken down into scenes corresponding to the image prompts.
                5. RETURN THE RESULT IN JSON FORMAT ONLY. NO RAW TEXT BEFORE OR AFTER THE JSON.

                JSON Structure:
                {
                  "script": "The full continuous voiceover script text",
                  "scenes": [
                    {
                      "image_prompt": "Descriptive image prompt for this scene",
                      "content": "Specific sentence(s) from the script for this scene"
                    }
                  ]
                }
            `;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            // Extract JSON from the response (sometimes Gemini wraps JSON in code blocks)
            const jsonMatch = text.match(/\{[\s\S]*\}/);
            if (!jsonMatch) {
                throw new Error("Failed to generate valid JSON script data");
            }

            return JSON.parse(jsonMatch[0]);
        });

        // Step 3: Generate video using TTS model
        const ttsData = await step.run("generate-video-tts", async () => {
            const deepgramApiKey = process.env.DEEPGRAM_API_KEY;
            if (!deepgramApiKey) {
                throw new Error("DEEPGRAM_API_KEY is missing from environment variables");
            }

            // Get voice name from series data or default to aura-asteria-en
            const voiceName = seriesData.voice || "aura-asteria-en";

            const response = await fetch(`https://api.deepgram.com/v1/speak?model=${voiceName}`, {
                method: "POST",
                headers: {
                    "Authorization": `Token ${deepgramApiKey}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ text: scriptData.script }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Deepgram TTS Error: ${response.statusText} - ${errorText}`);
            }

            const audioBuffer = await response.arrayBuffer();
            const fileName = `tts-${seriesId}-${Date.now()}.mp3`;

            const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
                .from("voiceovers")
                .upload(fileName, audioBuffer, {
                    contentType: "audio/mpeg",
                });

            if (uploadError) {
                throw new Error(`Error uploading TTS audio to Supabase: ${uploadError.message}`);
            }

            const { data: { publicUrl } } = supabaseAdmin.storage
                .from("voiceovers")
                .getPublicUrl(fileName);

            return { audioUrl: publicUrl, script: scriptData.script };
        });

        // Step 4: Generate caption using model
        const captionsData = await step.run("generate-captions", async () => {
            const deepgramApiKey = process.env.DEEPGRAM_API_KEY;
            if (!deepgramApiKey) {
                throw new Error("DEEPGRAM_API_KEY is missing from environment variables");
            }

            const response = await fetch("https://api.deepgram.com/v1/listen?smart_format=true&punctuate=true", {
                method: "POST",
                headers: {
                    "Authorization": `Token ${deepgramApiKey}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ url: ttsData.audioUrl }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Deepgram Transcription Error: ${response.statusText} - ${errorText}`);
            }

            const result = await response.json();

            // Extracting the words with timing information
            const words = result.results?.channels[0]?.alternatives[0]?.words;

            if (!words) {
                throw new Error("Failed to extract words from Deepgram transcription result");
            }

            return { captions: words, fullResult: result };
        });

        // Step 5: Generate images from image prompt generated data from step2
        const imagesData = await step.run("generate-images", async () => {
            const imageUrls: string[] = [];

            for (const [index, scene] of scriptData.scenes.entries()) {
                const prompt = `${scene.image_prompt}. Video style: ${seriesData.video_style}`;

                try {
                    const response = await hf.textToImage({
                        model: "black-forest-labs/FLUX.1-schnell",
                        inputs: prompt,
                        parameters: {
                            guidance_scale: 7.5,
                        },
                    });

                    const arrayBuffer = await (response as any).arrayBuffer();
                    const imageBuffer = Buffer.from(arrayBuffer);

                    const fileName = `image-${seriesId}-${index}-${Date.now()}.png`;
                    const { data: uploadData, error: uploadError } = await supabaseAdmin.storage
                        .from("voiceovers")
                        .upload(fileName, imageBuffer, {
                            contentType: "image/png",
                            upsert: true
                        });

                    if (uploadError) {
                        throw new Error(`Error uploading image ${index} to Supabase: ${uploadError.message}`);
                    }

                    const { data: { publicUrl } } = supabaseAdmin.storage
                        .from("voiceovers")
                        .getPublicUrl(fileName);

                    imageUrls.push(publicUrl);
                } catch (err: any) {
                    console.error(`Error in Hugging Face image generation for scene ${index}:`, err);
                    throw new Error(`Failed to generate/upload image for scene ${index}: ${err.message}`);
                }
            }

            return { images: imageUrls };
        });

        // Step 6: Save everything to the database
        const result = await step.run("save-to-database", async () => {
            const { data, error } = await supabaseAdmin
                .from("generated_videos")
                .update({
                    video_script: scriptData.script,
                    audio_url: ttsData.audioUrl,
                    captions: captionsData.captions,
                    images: imagesData.images,
                    status: "completed"
                })
                .eq("id", initialVideoRecord.id)
                .select();

            if (error) {
                throw new Error(`Error saving to database: ${error.message}`);
            }

            return { success: true, data };
        });

        return {
            message: "Video generation workflow completed",
            seriesId,
            scriptData,
            result
        };
    }
);
