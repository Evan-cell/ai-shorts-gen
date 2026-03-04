"use client"

import * as React from "react"
import { Stepper } from "@/components/create/Stepper"
import { NicheSelection } from "@/components/create/NicheSelection"
import { LanguageVoiceSelection } from "@/components/create/LanguageVoiceSelection"
import { MusicSelection } from "@/components/create/MusicSelection"
import { VideoStyleSelection } from "@/components/create/VideoStyleSelection"
import { CaptionStyleSelection } from "@/components/create/CaptionStyleSelection"
import { SeriesDetails } from "@/components/create/SeriesDetails"
import { FormFooter } from "@/components/create/FormFooter"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

export default function CreateSeriesPage() {
    const [currentStep, setCurrentStep] = React.useState(1)
    const totalSteps = 6

    // Form state
    const [formData, setFormData] = React.useState({
        niche: "",
        language: "",
        voice: "",
        backgroundMusic: "",
        videoStyle: "",
        captionStyle: "",
        seriesName: "",
        duration: "30-50",
        platform: "Tiktok",
        scheduleTime: "12:00",
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
        }
    }

    const handleFinalSchedule = (finalData: Partial<typeof formData>) => {
        const submissionData = { ...formData, ...finalData }
        console.log("Scheduling Series with data:", submissionData)
        // This will be connected to the backend/supabase later
        alert("Series Scheduled Successfully! Check console for data.")
    }

    return (
        <div className="max-w-4xl mx-auto p-8 pb-32">
            <header className="flex items-center gap-4 mb-10">
                <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                    onClick={handleBack}
                    disabled={currentStep === 1}
                >
                    <ChevronLeft className="h-6 w-6" />
                </Button>
                <div>
                    <h1 className="text-2xl font-bold">Create New Series</h1>
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
