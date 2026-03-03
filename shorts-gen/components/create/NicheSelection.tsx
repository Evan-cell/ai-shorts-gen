"use client"

import * as React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"
import { FormFooter } from "./FormFooter"

const AVAILABLE_NICHES = [
    {
        id: "scary-stories",
        title: "Scary Stories",
        description: "Bone-chilling tales and urban legends that keep viewers on the edge.",
    },
    {
        id: "motivational",
        title: "Motivational",
        description: "Daily doses of inspiration to fuel ambition and positive thinking.",
    },
    {
        id: "tech-facts",
        title: "Tech Facts",
        description: "Mind-blowing discoveries and futuristic tech trends explained simply.",
    },
    {
        id: "history-uncovered",
        title: "History Uncovered",
        description: "Hidden secrets and fascinating events from our past.",
    },
    {
        id: "health-wellness",
        title: "Health & Wellness",
        description: "Practical tips for a healthier mind and body.",
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

                <TabsContent value="available" className="mt-0">
                    <div className="h-[400px] overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-zinc-200 dark:scrollbar-thumb-zinc-800">
                        {AVAILABLE_NICHES.map((niche) => (
                            <Card
                                key={niche.id}
                                className={cn(
                                    "cursor-pointer transition-all border-2",
                                    selectedNiche === niche.id
                                        ? "border-indigo-600 bg-indigo-50/30 dark:border-indigo-500 dark:bg-indigo-900/10"
                                        : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
                                )}
                                onClick={() => setSelectedNiche(niche.id)}
                            >
                                <CardHeader className="p-5 flex flex-row items-center justify-between space-y-0">
                                    <div className="space-y-1">
                                        <CardTitle className="text-lg">{niche.title}</CardTitle>
                                        <CardDescription>{niche.description}</CardDescription>
                                    </div>
                                    {selectedNiche === niche.id && (
                                        <div className="h-6 w-6 rounded-full bg-indigo-600 flex items-center justify-center">
                                            <Check className="h-4 w-4 text-white" />
                                        </div>
                                    )}
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="custom">
                    <div className="h-[400px] flex flex-col items-center justify-center p-8 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-50/50 dark:bg-zinc-900/50">
                        <p className="text-zinc-500 dark:text-zinc-400 mb-4">Have a unique idea? Define your own niche here.</p>
                        <input
                            type="text"
                            placeholder="Enter your custom niche..."
                            value={customNiche}
                            className="w-full max-w-md bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
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
