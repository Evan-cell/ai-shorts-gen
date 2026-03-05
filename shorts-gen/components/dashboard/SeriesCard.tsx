"use client"

import * as React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { formatDistanceToNow } from "date-fns"
import {
    MoreVertical,
    Edit,
    Pause,
    Play,
    Trash2,
    Video,
    Zap,
    ExternalLink
} from "lucide-react"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { VideoStyles } from "@/constants/create"

import { toast } from "sonner"

interface SeriesCardProps {
    series: {
        id: string
        name: string
        video_style: string
        status: "active" | "paused" | "completed"
        created_at: string
    }
    onDelete: (id: string) => void
    onStatusChange: (id: string, status: string) => void
    onEdit: (id: string) => void
}

export function SeriesCard({ series, onDelete, onStatusChange, onEdit }: SeriesCardProps) {
    const [isGenerating, setIsGenerating] = React.useState(false)
    const router = useRouter()

    // Find the corresponding thumbnail image from VideoStyles constant
    const styleInfo = VideoStyles.find(s => s.name === series.video_style)
    const thumbnail = styleInfo?.image || "/placeholder-video.png"

    const handleGenerate = async () => {
        console.log("DEBUG: SeriesCard.handleGenerate called for series:", JSON.stringify(series));
        if (!series.id) {
            console.error("DEBUG: Series ID is missing in SeriesCard!");
            toast.error("Error: Series ID is missing");
            return;
        }
        setIsGenerating(true)
        const toastId = toast.loading("Starting video generation...")

        try {
            console.log("DEBUG: Fetching /api/series/generate with id:", series.id);
            const response = await fetch("/api/series/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ seriesId: series.id }),
            })

            const result = await response.json()

            if (!response.ok) {
                throw new Error(result.error || "Failed to start generation")
            }

            toast.success("Generation started successfully!", { id: toastId })
            router.push("/dashboard/videos")
        } catch (error: any) {
            console.error("Generation Error:", error)
            toast.error(error.message || "Something went wrong", { id: toastId })
        } finally {
            setIsGenerating(false)
        }
    }

    return (
        <Card className="group overflow-hidden border-2 transition-all hover:border-indigo-500/50 hover:shadow-md dark:bg-zinc-900/50">
            {/* Thumbnail Header - Changed to square for half height */}
            <div className="relative aspect-square w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                <Image
                    src={thumbnail}
                    alt={series.name}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />

                {/* Overlay with Edit Icon */}
                <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />

                <Button
                    size="icon"
                    variant="secondary"
                    className="absolute top-2 right-2 h-7 w-7 rounded-full opacity-0 shadow-lg transition-opacity group-hover:opacity-100"
                    onClick={() => onEdit(series.id)}
                >
                    <Edit className="h-3.5 w-3.5" />
                </Button>

                {/* Status Badge */}
                <div className="absolute top-2 left-2">
                    <Badge className={cn(
                        "font-bold uppercase text-[9px] px-1.5 py-0 tracking-wider h-5",
                        series.status === "active" ? "bg-emerald-500 hover:bg-emerald-600" :
                            series.status === "paused" ? "bg-amber-500 hover:bg-amber-600" :
                                "bg-zinc-500 hover:bg-zinc-600"
                    )}>
                        {series.status}
                    </Badge>
                </div>
            </div>

            <CardContent className="p-3 space-y-3">
                <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                        <CardTitle className="text-base font-bold truncate">
                            {series.name}
                        </CardTitle>
                        <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                            {formatDistanceToNow(new Date(series.created_at))} ago
                        </p>
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full shrink-0">
                                <MoreVertical className="h-3.5 w-3.5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuItem onClick={() => onEdit(series.id)}>
                                <Edit className="mr-2 h-4 w-4" /> Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onStatusChange(series.id, series.status === "active" ? "paused" : "active")}>
                                {series.status === "active" ? (
                                    <><Pause className="mr-2 h-4 w-4" /> Pause</>
                                ) : (
                                    <><Play className="mr-2 h-4 w-4" /> Resume</>
                                )}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                className="text-rose-600 focus:text-rose-600"
                                onClick={() => onDelete(series.id)}
                            >
                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm" className="w-full gap-1.5 h-8 text-[11px] px-2">
                        <Video className="h-3 w-3 text-indigo-600" />
                        View
                        <ExternalLink className="h-2.5 w-2.5 opacity-50" />
                    </Button>
                    <Button
                        size="sm"
                        className="w-full gap-1.5 h-8 text-[11px] px-2 bg-zinc-900 dark:bg-zinc-100 dark:text-zinc-900"
                        onClick={handleGenerate}
                        disabled={isGenerating}
                    >
                        <Zap className={cn("h-3 w-3 text-amber-500 fill-amber-500", isGenerating && "animate-pulse")} />
                        {isGenerating ? "Generating..." : "Generate"}
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
