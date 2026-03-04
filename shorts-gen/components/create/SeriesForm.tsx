"use client"

import * as React from "react"
import { Stepper } from "@/components/create/Stepper"
import { NicheSelection } from "@/components/create/NicheSelection"
import { LanguageVoiceSelection } from "@/components/create/LanguageVoiceSelection"
import { MusicSelection } from "@/components/create/MusicSelection"
import { VideoStyleSelection } from "@/components/create/VideoStyleSelection"
import { CaptionStyleSelection } from "@/components/create/CaptionStyleSelection"
import { SeriesDetails } from "@/components/create/SeriesDetails"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface SeriesFormProps {
    initialData?: {
        id?: string
        niche: string
        language: string
        voice: string
        background_music?: string
        video_style: string
        caption_style: string
        name: string
        duration: string
        platform: string
        schedule_time: string
    }
    mode?: "create" | "edit"
}

export function SeriesForm({ initialData, mode = "create" }: SeriesFormProps) {
    const router = useRouter()
    const [currentStep, setCurrentStep] = React.useState(1)
    const totalSteps = 6

    // Form state
    const [formData, setFormData] = React.useState({
        niche: initialData?.niche || "",
        language: initialData?.language || "",
        voice: initialData?.voice || "",
        backgroundMusic: initialData?.background_music || "",
        videoStyle: initialData?.video_style || "",
        captionStyle: initialData?.caption_style || "",
        seriesName: initialData?.name || "",
        duration: initialData?.duration || "30-50",
        platform: initialData?.platform || "Tiktok",
        scheduleTime: initialData?.schedule_time || "12:00",
    })

    const handleNext = (stepData: Partial<typeof formData>) => {
        setFormData((prev) => ({ ...prev, ...stepData }))
        if (currentStep < totalSteps) {
            setCurrentStep((prev) => prev + 1)
        }
    }

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep((prev) => prev - 1)
        } else {
            router.back()
        }
    }

    const handleFinalSchedule = async (finalData: Partial<typeof formData>) => {
        const submissionData = { ...formData, ...finalData }

        const loadingMessage = mode === "create" ? "Scheduling your series..." : "Updating your series..."
        const successMessage = mode === "create" ? "Series scheduled successfully!" : "Series updated successfully!"
        const toastId = toast.loading(loadingMessage)

        try {
            const url = mode === "create" ? "/api/create-series" : `/api/series/${initialData?.id}/update`
            const method = mode === "create" ? "POST" : "PUT"

            const response = await fetch(url, {
                method: method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(submissionData),
            })

            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.error || `Failed to ${mode} series`)
            }

            toast.success(successMessage, { id: toastId })
            router.push("/dashboard")
        } catch (error: any) {
            console.error(`${mode === "create" ? "Scheduling" : "Update"} Error:`, error)
            toast.error(error.message || "Something went wrong", { id: toastId })
        }
    }

    return (
        <div className="max-w-4xl mx-auto p-8 pb-32">
            <header className="flex items-center gap-4 mb-10">
                <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    onClick={handleBack}
                >
                    <ChevronLeft className="h-6 w-6" />
                </Button>
                <div>
                    <h1 className="text-2xl font-bold">
                        {mode === "create" ? "Create New Series" : `Edit: ${initialData?.name}`}
                    </h1>
                    <p className="text-zinc-500 dark:text-zinc-400 text-sm">Step {currentStep} of {totalSteps}</p>
                </div>
            </header>

            <Stepper currentStep={currentStep} totalSteps={totalSteps} />

            <div className="mt-8 transition-all duration-500">
                {currentStep === 1 && (
                    <NicheSelection
                        value={formData.niche}
                        onContinue={(niche) => handleNext({ niche })}
                    />
                )}

                {currentStep === 2 && (
                    <LanguageVoiceSelection
                        formData={formData}
                        onContinue={(data) => handleNext(data)}
                        onBack={handleBack}
                    />
                )}

                {currentStep === 3 && (
                    <MusicSelection
                        value={formData.backgroundMusic}
                        onContinue={(backgroundMusic) => handleNext({ backgroundMusic })}
                        onBack={handleBack}
                    />
                )}

                {currentStep === 4 && (
                    <VideoStyleSelection
                        value={formData.videoStyle}
                        onContinue={(videoStyle) => handleNext({ videoStyle })}
                        onBack={handleBack}
                    />
                )}

                {currentStep === 5 && (
                    <CaptionStyleSelection
                        value={formData.captionStyle}
                        onContinue={(captionStyle) => handleNext({ captionStyle })}
                        onBack={handleBack}
                    />
                )}

                {currentStep === 6 && (
                    <SeriesDetails
                        formData={formData}
                        onBack={handleBack}
                        onContinue={handleFinalSchedule}
                    />
                )}
            </div>
        </div>
    )
}
