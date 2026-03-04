"use client"

import { cn } from "@/lib/utils"

interface StepperProps {
    currentStep: number
    totalSteps: number
}

export function Stepper({ currentStep, totalSteps }: StepperProps) {
    return (
        <div className="w-full flex gap-2 mb-10">
            {Array.from({ length: totalSteps }).map((_, i) => {
                const stepNumber = i + 1
                const isActive = stepNumber <= currentStep

                return (
                    <div
                        key={i}
                        className={cn(
                            "h-1.5 flex-1 rounded-full transition-all duration-300",
                            isActive
                                ? "bg-indigo-600 dark:bg-indigo-500"
                                : "bg-zinc-200 dark:bg-zinc-800"
                        )}
                        title={`Step ${stepNumber}`}
                    />
                )
            })}
        </div>
    )
}
