"use client"

import * as React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
    Clock,
    Youtube,
    Instagram,
    Mail,
    Info,
    CalendarDays,
    Timer,
    Check
} from "lucide-react"
import { FormFooter } from "./FormFooter"

interface SeriesDetailsProps {
    formData: any
    onContinue: (data: any) => void
    onBack: () => void
}

export function SeriesDetails({ formData, onContinue, onBack }: SeriesDetailsProps) {
    const [details, setDetails] = React.useState({
        seriesName: formData.seriesName || "",
        duration: formData.duration || "30-50",
        platform: formData.platform || "Tiktok",
        scheduleTime: formData.scheduleTime || "12:00",
    })

    const platforms = [
        { id: "Tiktok", name: "TikTok", icon: <div className="h-5 w-5 bg-zinc-900 rounded-full flex items-center justify-center text-white text-[10px] font-bold">♪</div> },
        { id: "Youtube", name: "YouTube", icon: <Youtube className="h-5 w-5 text-red-600" /> },
        { id: "Instagram", name: "Instagram", icon: <Instagram className="h-5 w-5 text-pink-600" /> },
        { id: "Email", name: "Email", icon: <Mail className="h-5 w-5 text-indigo-600" /> },
    ]

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Series Details</h2>
                <p className="text-zinc-500 dark:text-zinc-400">Finalize your series name and scheduling preferences.</p>
            </div>

            <div className="grid gap-8">
                {/* Series Name */}
                <div className="space-y-3">
                    <Label htmlFor="seriesName" className="text-lg font-semibold flex items-center gap-2">
                        <CalendarDays className="h-5 w-5 text-indigo-600" />
                        Series Name
                    </Label>
                    <Input
                        id="seriesName"
                        placeholder="e.g. Daily Motivation, Scary Stories..."
                        className="h-12 text-lg px-4 border-2 focus-visible:ring-indigo-600/20"
                        value={details.seriesName}
                        onChange={(e) => setDetails({ ...details, seriesName: e.target.value })}
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Duration Selection */}
                    <div className="space-y-3">
                        <Label className="text-lg font-semibold flex items-center gap-2">
                            <Timer className="h-5 w-5 text-amber-500" />
                            Video Duration
                        </Label>
                        <Select
                            value={details.duration}
                            onValueChange={(val) => setDetails({ ...details, duration: val })}
                        >
                            <SelectTrigger className="h-12 w-full border-2 text-md">
                                <SelectValue placeholder="Select Duration" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="30-50">30-50 sec video</SelectItem>
                                <SelectItem value="60-70">60-70 sec video</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Publish Time */}
                    <div className="space-y-3">
                        <Label className="text-lg font-semibold flex items-center gap-2">
                            <Clock className="h-5 w-5 text-teal-500" />
                            Publish Time
                        </Label>
                        <div className="relative">
                            <Input
                                type="time"
                                className="h-12 border-2 text-lg focus-visible:ring-indigo-600/20"
                                value={details.scheduleTime}
                                onChange={(e) => setDetails({ ...details, scheduleTime: e.target.value })}
                            />
                        </div>
                    </div>
                </div>

                {/* Platform Selection */}
                <div className="space-y-3">
                    <Label className="text-lg font-semibold">Select Platform</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {platforms.map((p) => (
                            <Card
                                key={p.id}
                                className={cn(
                                    "cursor-pointer transition-all border-2 flex flex-col items-center p-4 gap-3",
                                    details.platform === p.id
                                        ? "border-indigo-600 bg-indigo-50/30 dark:border-indigo-500 dark:bg-indigo-900/10 shadow-sm"
                                        : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
                                )}
                                onClick={() => setDetails({ ...details, platform: p.id })}
                            >
                                <div className={cn(
                                    "h-10 w-10 rounded-full flex items-center justify-center transition-colors shadow-sm",
                                    details.platform === p.id ? "bg-indigo-100 dark:bg-indigo-900/40" : "bg-zinc-100 dark:bg-zinc-800"
                                )}>
                                    {p.icon}
                                </div>
                                <span className="font-bold text-sm tracking-tight">{p.name}</span>
                                {details.platform === p.id && (
                                    <div className="absolute top-2 right-2 h-5 w-5 rounded-full bg-indigo-600 flex items-center justify-center">
                                        <Check className="h-3 w-3 text-white" />
                                    </div>
                                )}
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Scheduling Note */}
                <div className="bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-indigo-600 p-4 flex items-start gap-3 rounded-r-lg">
                    <Info className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mt-0.5" />
                    <p className="text-sm text-indigo-700 dark:text-indigo-300 font-medium">
                        <span className="font-bold">Note:</span> Video will generate 3-6 hours before video publish to ensure high quality rendering and scheduling.
                    </p>
                </div>
            </div>

            <div className="pt-6">
                <FormFooter
                    onNext={() => onContinue(details)}
                    onBack={onBack}
                    canContinue={!!details.seriesName}
                    showBack={true}
                    nextLabel="Schedule Series"
                />
            </div>
        </div>
    )
}
