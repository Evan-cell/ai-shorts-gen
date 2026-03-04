"use client"

import * as React from "react"
import { Languages, DeepgramVoices, FonadalabVoices } from "@/constants/create"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Play, Pause, Check, Mic2, Info } from "lucide-react"
import { FormFooter } from "./FormFooter"

interface LanguageVoiceSelectionProps {
    formData: {
        language?: string
        voice?: string
    }
    onContinue: (data: { language: string, voice: string }) => void
    onBack: () => void
}

export function LanguageVoiceSelection({ formData, onContinue, onBack }: LanguageVoiceSelectionProps) {
    const [selectedLanguageCode, setSelectedLanguageCode] = React.useState<string>(
        formData.language || Languages[0].modelLangCode
    )
    const [selectedVoice, setSelectedVoice] = React.useState<string | null>(formData.voice || null)

    // Audio state
    const [playingVoice, setPlayingVoice] = React.useState<string | null>(null)
    const audioRef = React.useRef<HTMLAudioElement | null>(null)

    const selectedLanguage = Languages.find(l => l.modelLangCode === selectedLanguageCode) || Languages[0]

    const voices = React.useMemo(() => {
        return selectedLanguage.modelName === "deepgram" ? DeepgramVoices : FonadalabVoices
    }, [selectedLanguage])

    const handleLanguageChange = (code: string) => {
        setSelectedLanguageCode(code)
        setSelectedVoice(null) // Reset voice when language/model changes
    }

    const togglePreview = (voiceUrl: string, voiceName: string) => {
        if (playingVoice === voiceName) {
            audioRef.current?.pause()
            setPlayingVoice(null)
        } else {
            if (audioRef.current) {
                audioRef.current.src = `/voice/${voiceUrl}` // Previews are in public/voice
                audioRef.current.play()
                setPlayingVoice(voiceName)
            }
        }
    }

    React.useEffect(() => {
        const audio = new Audio()
        audio.onended = () => setPlayingVoice(null)
        audioRef.current = audio
        return () => {
            audio.pause()
            audio.src = ""
        }
    }, [])

    return (
        <div className="space-y-8">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Language & Voice</h2>
                <p className="text-zinc-500 dark:text-zinc-400">Choose the language and the voice personality for your series.</p>
            </div>

            <div className="space-y-4">
                <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 ml-1">
                    Select Language
                </label>
                <Select value={selectedLanguageCode} onValueChange={handleLanguageChange}>
                    <SelectTrigger className="w-full h-12 bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-lg">
                        <SelectValue placeholder="Select a language" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800">
                        {Languages.map((lang) => (
                            <SelectItem
                                key={lang.modelLangCode}
                                value={lang.modelLangCode}
                                className="cursor-pointer py-3"
                            >
                                <span className="mr-2">{lang.countryFlag}</span>
                                {lang.language} ({lang.modelLangCode})
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between ml-1">
                    <label className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                        Available Voices
                    </label>
                    <div className="flex items-center gap-1 text-xs text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-1 rounded-full">
                        <Mic2 className="h-3 w-3" />
                        {voices.length} {selectedLanguage.modelName === "deepgram" ? "Aura" : "Fonada"} Voices
                    </div>
                </div>

                <div className="h-[380px] overflow-y-auto pr-2 space-y-3 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800">
                    {voices.map((voice) => (
                        <Card
                            key={voice.modelName}
                            className={cn(
                                "cursor-pointer transition-all border-2 relative overflow-hidden",
                                selectedVoice === voice.modelName
                                    ? "border-indigo-600 bg-indigo-50/30 dark:border-indigo-500 dark:bg-indigo-900/10"
                                    : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
                            )}
                            onClick={() => setSelectedVoice(voice.modelName)}
                        >
                            <CardContent className="p-4 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <div className={cn(
                                        "h-10 w-10 rounded-full flex items-center justify-center",
                                        selectedVoice === voice.modelName ? "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600" : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500"
                                    )}>
                                        <Mic2 className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-zinc-900 dark:text-zinc-100 capitalize">
                                            {voice.modelName.replace(/-/g, ' ')}
                                        </h3>
                                        <div className="flex items-center gap-3 mt-0.5">
                                            <span className="text-xs font-medium text-zinc-500 uppercase tracking-wider bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">
                                                {voice.gender}
                                            </span>
                                            <span className="text-xs text-zinc-400 flex items-center gap-1">
                                                <Info className="h-3 w-3" />
                                                {voice.model}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Button
                                        size="icon"
                                        variant="outline"
                                        className="h-9 w-9 rounded-full border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            togglePreview(voice.preview, voice.modelName)
                                        }}
                                    >
                                        {playingVoice === voice.modelName ? (
                                            <Pause className="h-4 w-4 fill-current" />
                                        ) : (
                                            <Play className="h-4 w-4 fill-current ml-0.5" />
                                        )}
                                    </Button>

                                    {selectedVoice === voice.modelName && (
                                        <div className="h-6 w-6 rounded-full bg-indigo-600 flex items-center justify-center animate-in zoom-in duration-300">
                                            <Check className="h-4 w-4 text-white" />
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                            {selectedVoice === voice.modelName && (
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-600" />
                            )}
                        </Card>
                    ))}
                </div>
            </div>

            <FormFooter
                onNext={() => selectedVoice && onContinue({ language: selectedLanguageCode, voice: selectedVoice })}
                onBack={onBack}
                canContinue={!!selectedVoice}
                showBack={true}
            />
        </div>
    )
}
