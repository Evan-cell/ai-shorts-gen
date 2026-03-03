"use client"

import * as React from "react"
import { Stepper } from "@/components/create/Stepper"
import { NicheSelection } from "@/components/create/NicheSelection"
import { FormFooter } from "@/components/create/FormFooter"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"
import Link from "next/link"

export default function CreateSeriesPage() {
    const [currentStep, setCurrentStep] = React.useState(1)
    const totalSteps = 6

    // Form state
    const [formData, setFormData] = React.useState({
        niche: "",
        language: "",
        voice: "",
        // Future steps will add more fields here
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

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col">
            {/* Header */}
            <header className="h-16 border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 px-8 flex items-center justify-between sticky top-0 z-10">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard">
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <ChevronLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <h1 className="text-xl font-bold">Create New Series</h1>
                </div>
                <div className="text-sm font-medium text-zinc-500">
                    Step {currentStep} of {totalSteps}
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex flex-col items-center py-12 px-6">
                <div className="w-full max-w-2xl">
                    <Stepper currentStep={currentStep} totalSteps={totalSteps} />

                    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm p-8 transition-all duration-500">
                        {currentStep === 1 && (
                            <NicheSelection
                                value={formData.niche}
                                onContinue={(niche) => handleNext({ niche })}
                            />
                        )}

                        {currentStep > 1 && (
                            <div className="text-center py-20 flex flex-col items-center">
                                <h2 className="text-2xl font-bold mb-4">Step {currentStep}</h2>
                                <p className="text-zinc-500 dark:text-zinc-400 mb-8 max-w-xs">This step is coming soon!</p>
                                <div className="w-full max-w-md mt-10">
                                    <FormFooter
                                        onNext={() => handleNext({})}
                                        onBack={handleBack}
                                        canContinue={true}
                                        showBack={true}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    )
}
