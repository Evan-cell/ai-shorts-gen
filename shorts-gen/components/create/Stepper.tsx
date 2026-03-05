"use client"

import { cn } from "@/lib/utils"
import {
    Shapes,
    Languages,
    Music2,
    PlaySquare,
    Type,
    Settings2
} from "lucide-react"

interface StepperProps {
    currentStep: number
    totalSteps: number
}

export function Stepper({ currentStep, totalSteps }: StepperProps) {
    const steps = [
        { id: 1, icon: <Shapes />, color: "bg-pink-500", label: "Niche" },
        { id: 2, icon: <Languages />, color: "bg-indigo-600", label: "Voice" },
        { id: 3, icon: <Music2 />, color: "bg-amber-500", label: "Music" },
        { id: 4, icon: <PlaySquare />, color: "bg-emerald-500", label: "Style" },
        { id: 5, icon: <Type />, color: "bg-cyan-500", label: "Caption" },
        { id: 6, icon: <Settings2 />, color: "bg-rose-500", label: "Finalize" },
    ]

    return (
        <div className="w-full space-y-4 mb-10">
            <div className="flex justify-between px-2 overflow-x-auto pb-2 scrollbar-none">
                {steps.map((step) => {
                    const isActive = step.id === currentStep
                    const isCompleted = step.id < currentStep

                    return (
                        <div key={step.id} className="flex flex-col items-center gap-2 min-w-[60px]">
                            <div className={cn(
                                "h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm",
                                isActive ? `${step.color} text-white scale-110 shadow-md` :
                                    isCompleted ? `${step.color} text-white opacity-80` :
                                        "bg-zinc-100 dark:bg-zinc-800 text-zinc-400"
                            )}>
                                {React.cloneElement(step.icon as React.ReactElement, { className: "h-5 w-5" })}
                            </div>
                            <span className={cn(
                                "text-[10px] font-bold uppercase tracking-wider transition-colors",
                                isActive ? "text-zinc-900 dark:text-zinc-50" : "text-zinc-400"
                            )}>
                                {step.label}
                            </span>
                        </div>
                    )
                })}
            </div>

            <div className="w-full flex gap-1 px-1">
                {steps.map((step) => {
                    const isActive = step.id <= currentStep
                    return (
                        <div
                            key={step.id}
                            className={cn(
                                "h-1.5 flex-1 rounded-full transition-all duration-500 ease-out",
                                isActive ? step.color : "bg-zinc-200 dark:bg-zinc-800"
                            )}
                        />
                    )
                })}
            </div>
        </div>
    )
}

import * as React from "react"
