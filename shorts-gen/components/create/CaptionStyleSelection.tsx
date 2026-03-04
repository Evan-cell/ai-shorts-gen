"use client"

import * as React from "react"
import { CaptionStyles } from "@/constants/create"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"
import { CaptionPreview } from "./CaptionPreview"
import { FormFooter } from "./FormFooter"

interface CaptionStyleSelectionProps {
    value?: string
    onContinue: (styleId: string) => void
    onBack: () => void
}

export function CaptionStyleSelection({ value, onContinue, onBack }: CaptionStyleSelectionProps) {
    const [selectedStyle, setSelectedStyle] = React.useState<string | null>(value || null)

    return (
        <div className="space-y-8">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Caption Style</h2>
                <p className="text-zinc-500 dark:text-zinc-400">Choose how your subtitles will look and animate.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {CaptionStyles.map((style) => (
                    <Card
                        key={style.id}
                        className={cn(
                            "cursor-pointer transition-all border-2 overflow-hidden group",
                            selectedStyle === style.id
                                ? "border-indigo-600 shadow-lg ring-1 ring-indigo-600/20"
                                : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
                        )}
                        onClick={() => setSelectedStyle(style.id)}
                    >
                        <div className="h-32 bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
                            <CaptionPreview styleId={style.id} className="rounded-none h-full" />
                        </div>
                        <CardContent className="p-4 flex items-center justify-between">
                            <div>
                                <h3 className="font-bold text-zinc-900 dark:text-zinc-100">{style.name}</h3>
                                <p className="text-xs text-zinc-500">{style.description}</p>
                            </div>
                            {selectedStyle === style.id && (
                                <div className="h-6 w-6 rounded-full bg-indigo-600 flex items-center justify-center text-white animate-in zoom-in duration-300">
                                    <Check className="h-4 w-4" />
                                </div>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="max-w-md mx-auto pt-4">
                <FormFooter
                    onNext={() => selectedStyle && onContinue(selectedStyle)}
                    onBack={onBack}
                    canContinue={!!selectedStyle}
                    showBack={true}
                />
            </div>
        </div>
    )
}
