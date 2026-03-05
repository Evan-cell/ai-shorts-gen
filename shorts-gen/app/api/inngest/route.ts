import { serve } from "inngest/next";
import { inngest } from "@/inngest/client";
import { helloWorld, generateVideoSeries } from "@/inngest/functions";

// Create an API route that exposes Inngest functions
export const { GET, POST, PUT } = serve({
    client: inngest,
    functions: [
        helloWorld,
        generateVideoSeries,
    ],
});
