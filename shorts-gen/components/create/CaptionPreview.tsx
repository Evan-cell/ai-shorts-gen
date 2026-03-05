"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface CaptionPreviewProps {
    styleId: string
    text?: string
    className?: string
}

export function CaptionPreview({ styleId, text = "AI SHORTS", className }: CaptionPreviewProps) {
    return (
        <div className={cn("flex items-center justify-center h-full w-full bg-zinc-950/40 rounded-lg overflow-hidden", className)}>
            <div className="relative">
                {styleId === "classic-pop" && (
                    <span className="text-white font-black text-3xl tracking-tighter uppercase italic animate-bounce drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] [text-shadow:2px_2px_0_#000,-2px_-2px_0_#000,2px_-2px_0_#000,-2px_2px_0_#000]">
                        {text}
                    </span>
                )}

                {styleId === "yellow-highlight" && (
                    <span className="text-yellow-400 font-extrabold text-3xl uppercase animate-pulse drop-shadow-xl [text-shadow:3px_3px_0_#000]">
                        {text}
                    </span>
                )}

                {styleId === "neon-glow" && (
                    <span className="text-cyan-400 font-bold text-3xl tracking-widest uppercase drop-shadow-[0_0_10px_rgba(34,211,238,0.8)] animate-pulse">
                        {text}
                    </span>
                )}

                {styleId === "retro-type" && (
                    <span className="text-emerald-500 font-mono text-2xl uppercase border-r-4 border-emerald-500 pr-1 animate-pulse">
                        {text}
                    </span>
                )}

                {styleId === "netflix-red" && (
                    <div className="flex flex-col items-center">
                        <span className="text-red-600 font-black text-4xl leading-none tracking-tighter uppercase -mb-1 motion-safe:animate-bounce">
                            {text}
                        </span>
                        <div className="h-1 w-full bg-red-600 rounded-full" />
                    </div>
                )}

                {styleId === "gradient-flow" && (
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 font-black text-3xl uppercase animate-pulse">
                        {text}
                    </span>
                )}
            </div>
        </div>
    )
}
