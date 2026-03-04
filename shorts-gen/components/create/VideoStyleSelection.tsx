"use client"

import * as React from "react"
import Image from "next/image"
import { VideoStyles } from "@/constants/create"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"
import { FormFooter } from "./FormFooter"

interface VideoStyleSelectionProps {
    value?: string
    onContinue: (style: string) => void
    onBack: () => void
}

export function VideoStyleSelection({ value, onContinue, onBack }: VideoStyleSelectionProps) {
    const [selectedStyle, setSelectedStyle] = React.useState<string | null>(value || null)

    return (
        <div className="space-y-8">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Video Style</h2>
                <p className="text-zinc-500 dark:text-zinc-400">Select the visual aesthetic for your AI-generated shorts.</p>
            </div>

            <div className="relative">
                <div className="flex gap-4 overflow-x-auto pb-6 pt-2 px-2 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800 snap-x">
                    {VideoStyles.map((style) => (
                        <div
                            key={style.name}
                            className={cn(
                                "relative flex-shrink-0 w-48 aspect-[9/16] rounded-2xl overflow-hidden cursor-pointer transition-all border-4 snap-center group",
                                selectedStyle === style.name
                                    ? "border-indigo-600 ring-4 ring-indigo-600/20"
                                    : "border-transparent hover:border-zinc-200 dark:hover:border-zinc-800"
                            )}
                            onClick={() => setSelectedStyle(style.name)}
                        >
                            <Image
                                src={style.image}
                                alt={style.name}
                                fill
                                className={cn(
                                    "object-cover transition-transform duration-500 group-hover:scale-110",
                                    selectedStyle === style.name ? "scale-105" : ""
                                )}
                            />

                            {/* Overlay */}
                            <div className={cn(
                                "absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4 transition-opacity",
                                selectedStyle === style.name ? "opacity-100" : "opacity-60 group-hover:opacity-100"
                            )}>
                                <h3 className="text-white font-bold text-lg">{style.name}</h3>
                                <p className="text-white/70 text-xs">9:16 Aspect Ratio</p>
                            </div>

                            {/* Selection Checkmark */}
                            {selectedStyle === style.name && (
                                <div className="absolute top-3 right-3 h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white shadow-lg animate-in zoom-in duration-300">
                                    <Check className="h-5 w-5" />
                                </div>
                            )}

                            {/* Hover Effect Ring */}
                            <div className="absolute inset-0 ring-inset ring-1 ring-white/20 pointer-events-none" />
                        </div>
                    ))}
                </div>

                {/* Subtle scroll indicator/fade */}
                <div className="absolute right-0 top-0 bottom-6 w-12 bg-gradient-to-l from-white dark:from-zinc-950 to-transparent pointer-events-none" />
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
