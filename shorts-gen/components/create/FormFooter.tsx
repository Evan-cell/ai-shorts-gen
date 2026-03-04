"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface FormFooterProps {
    onNext: () => void
    onBack?: () => void
    canContinue: boolean
    showBack?: boolean
    nextLabel?: string
}

export function FormFooter({
    onNext,
    onBack,
    canContinue,
    showBack = false,
    nextLabel = "Continue"
}: FormFooterProps) {
    return (
        <div className="flex items-center justify-between pt-8 mt-8 border-t border-zinc-100 dark:border-zinc-800">
            <div>
                {showBack && onBack && (
                    <Button
                        variant="ghost"
                        onClick={onBack}
                        className="cursor-pointer font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
                    >
                        <ChevronLeft className="mr-2 h-4 w-4" />
                        Back
                    </Button>
                )}
            </div>

            <Button
                onClick={onNext}
                disabled={!canContinue}
                className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white min-w-[140px] font-semibold shadow-md"
            >
                {nextLabel}
                <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
        </div>
    )
}
