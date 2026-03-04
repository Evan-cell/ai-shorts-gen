"use client"

import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Check, Ghost, Zap, Cpu, History, HeartPulse, Sparkles, PlusCircle } from "lucide-react"
import { FormFooter } from "./FormFooter"

const AVAILABLE_NICHES = [
    {
        id: "scary-stories",
        title: "Scary Stories",
        description: "Bone-chilling tales and legends.",
        icon: <Ghost className="h-5 w-5" />,
        color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
    },
    {
        id: "motivational",
        title: "Motivational",
        description: "Inspiration to fuel ambition.",
        icon: <Zap className="h-5 w-5" />,
        color: "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
    },
    {
        id: "tech-facts",
        title: "Tech Facts",
        description: "Mind-blowing tech discoveries.",
        icon: <Cpu className="h-5 w-5" />,
        color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
    },
    {
        id: "history-uncovered",
        title: "History Uncovered",
        description: "Hidden secrets from our past.",
        icon: <History className="h-5 w-5" />,
        color: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400"
    },
    {
        id: "health-wellness",
        title: "Health & Wellness",
        description: "Tips for a healthier mind.",
        icon: <HeartPulse className="h-5 w-5" />,
        color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400"
    },
    {
        id: "ai-trends",
        title: "AI Trends",
        description: "Latest in AI and automation.",
        icon: <Sparkles className="h-5 w-5" />,
        color: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
    },
]

interface NicheSelectionProps {
    value?: string
    onContinue: (niche: string) => void
}

export function NicheSelection({ value, onContinue }: NicheSelectionProps) {
    const isAvailableNiche = AVAILABLE_NICHES.some((n) => n.id === value)
    const [selectedNiche, setSelectedNiche] = React.useState<string | null>(value || null)
    const [customNiche, setCustomNiche] = React.useState<string>(isAvailableNiche ? "" : value || "")
    const initialTab = (value && !isAvailableNiche) ? "custom" : "available"

    return (
        <div className="space-y-6">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">Select Your Niche</h2>
                <p className="text-zinc-500 dark:text-zinc-400">Choose a niche that resonates with your audience or create your own.</p>
            </div>

            <Tabs defaultValue={initialTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                    <TabsTrigger value="available">Available Niche</TabsTrigger>
                    <TabsTrigger value="custom">Custom Niche</TabsTrigger>
                </TabsList>

                <TabsContent value="available" className="mt-0 outline-none">
                    <div className="h-[450px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {AVAILABLE_NICHES.map((niche) => (
                                <Card
                                    key={niche.id}
                                    className={cn(
                                        "cursor-pointer transition-all border-2 group",
                                        selectedNiche === niche.id
                                            ? "border-indigo-600 bg-indigo-50/30 dark:border-indigo-500 dark:bg-indigo-900/10 shadow-sm"
                                            : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
                                    )}
                                    onClick={() => setSelectedNiche(niche.id)}
                                >
                                    <CardHeader className="p-4 space-y-3">
                                        <div className="flex items-center justify-between">
                                            <div className={cn(
                                                "h-10 w-10 rounded-xl flex items-center justify-center transition-all duration-300 shadow-sm group-hover:scale-110",
                                                niche.color
                                            )}>
                                                {niche.icon}
                                            </div>
                                            {selectedNiche === niche.id && (
                                                <div className="h-6 w-6 rounded-full bg-indigo-600 flex items-center justify-center text-white animate-in zoom-in duration-300">
                                                    <Check className="h-4 w-4" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="space-y-1">
                                            <CardTitle className="text-lg leading-tight">{niche.title}</CardTitle>
                                            <CardDescription className="text-xs line-clamp-2">{niche.description}</CardDescription>
                                        </div>
                                    </CardHeader>
                                </Card>
                            ))}
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="custom" className="outline-none">
                    <div className="h-[450px] flex flex-col items-center justify-center p-8 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50/50 dark:bg-zinc-900/50">
                        <div className="h-16 w-16 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 mb-6">
                            <PlusCircle className="h-8 w-8" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">Custom Niche</h3>
                        <p className="text-zinc-500 dark:text-zinc-400 mb-6 text-center max-w-xs">Have a unique idea? Define your own niche here and our AI will adapt to it.</p>
                        <input
                            type="text"
                            placeholder="e.g. Space Exploration, Cooking Hacks..."
                            value={customNiche}
                            className="w-full max-w-sm bg-white dark:bg-zinc-950 border-2 border-zinc-200 dark:border-zinc-800 rounded-xl px-4 py-3 outline-none focus:border-indigo-500 transition-all font-medium text-center shadow-sm"
                            onChange={(e) => {
                                setCustomNiche(e.target.value)
                                setSelectedNiche(e.target.value)
                            }}
                        />
                    </div>
                </TabsContent>
            </Tabs>

            <FormFooter
                onNext={() => selectedNiche && onContinue(selectedNiche)}
                canContinue={!!selectedNiche}
                showBack={false}
            />
        </div>
    )
}
