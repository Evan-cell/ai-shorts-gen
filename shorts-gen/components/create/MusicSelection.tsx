"use client"

import * as React from "react"
import { BackgroundMusic } from "@/constants/create"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Music, Play, Pause, Check } from "lucide-react"
import { FormFooter } from "./FormFooter"

interface MusicSelectionProps {
    value?: string
    onContinue: (music: string) => void
    onBack: () => void
}

export function MusicSelection({ value, onContinue, onBack }: MusicSelectionProps) {
    const [selectedMusic, setSelectedMusic] = React.useState<string | null>(value || null)

    // Audio state
    const [playingMusic, setPlayingMusic] = React.useState<string | null>(null)
    const audioRef = React.useRef<HTMLAudioElement | null>(null)

    const togglePreview = (url: string, name: string) => {
        if (playingMusic === name) {
            audioRef.current?.pause()
            setPlayingMusic(null)
        } else {
            if (audioRef.current) {
                audioRef.current.src = url
                audioRef.current.play()
                setPlayingMusic(name)
            }
        }
    }

    React.useEffect(() => {
        const audio = new Audio()
        audio.onended = () => setPlayingMusic(null)
        audioRef.current = audio
        return () => {
            audio.pause()
            audio.src = ""
        }
    }, [])

    return (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Background Music</h2>
                <p className="text-zinc-500 dark:text-zinc-400">Choose a soundtrack that complements your series' vibe.</p>
            </div>

            <div className="h-[450px] overflow-y-auto pr-2 space-y-3 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800">
                <Card
                    className={cn(
                        "cursor-pointer transition-all border-2",
                        selectedMusic === "none"
                            ? "border-indigo-600 bg-indigo-50/30 dark:border-indigo-500 dark:bg-indigo-900/10"
                            : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
                    )}
                    onClick={() => setSelectedMusic("none")}
                >
                    <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500">
                                <Music className="h-5 w-5 opacity-50" />
                            </div>
                            <div>
                                <h3 className="font-bold text-zinc-900 dark:text-zinc-100">No Background Music</h3>
                                <p className="text-xs text-zinc-500">Pure voice narration only</p>
                            </div>
                        </div>
                        {selectedMusic === "none" && (
                            <div className="h-6 w-6 rounded-full bg-indigo-600 flex items-center justify-center">
                                <Check className="h-4 w-4 text-white" />
                            </div>
                        )}
                    </CardContent>
                </Card>

                {BackgroundMusic.map((music) => (
                    <Card
                        key={music.name}
                        className={cn(
                            "cursor-pointer transition-all border-2",
                            selectedMusic === music.url
                                ? "border-indigo-600 bg-indigo-50/30 dark:border-indigo-500 dark:bg-indigo-900/10"
                                : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
                        )}
                        onClick={() => setSelectedMusic(music.url)}
                    >
                        <CardContent className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className={cn(
                                    "h-10 w-10 rounded-full flex items-center justify-center transition-colors",
                                    selectedMusic === music.url ? "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500"
                                )}>
                                    <Music className="h-5 w-5" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-zinc-900 dark:text-zinc-100">{music.name}</h3>
                                    <p className="text-xs text-zinc-500">High Resolution Audio</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <Button
                                    size="icon"
                                    variant="outline"
                                    className="h-9 w-9 rounded-full border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        togglePreview(music.url, music.name)
                                    }}
                                >
                                    {playingMusic === music.name ? (
                                        <Pause className="h-4 w-4 fill-current" />
                                    ) : (
                                        <Play className="h-4 w-4 fill-current ml-0.5" />
                                    )}
                                </Button>

                                {selectedMusic === music.url && (
                                    <div className="h-6 w-6 rounded-full bg-indigo-600 flex items-center justify-center animate-in zoom-in duration-300">
                                        <Check className="h-4 w-4 text-white" />
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <FormFooter
                onNext={() => selectedMusic && onContinue(selectedMusic)}
                onBack={onBack}
                canContinue={!!selectedMusic}
                showBack={true}
            />
        </div>
    )
}
