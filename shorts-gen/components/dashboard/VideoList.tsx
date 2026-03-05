"use client"

import * as React from "react"
import { formatDistanceToNow } from "date-fns"
import { Loader2, Video, Play, Calendar, ExternalLink } from "lucide-react"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import Image from "next/image"

export function VideoList() {
    const [videos, setVideos] = React.useState<any[]>([])
    const [loading, setLoading] = React.useState(true)

    const fetchVideos = async () => {
        try {
            const response = await fetch("/api/get-videos")
            const data = await response.json()
            if (response.ok) {
                setVideos(data.videos || [])
            } else {
                toast.error(data.error || "Failed to fetch videos")
            }
        } catch (error) {
            console.error("Fetch Error:", error)
            toast.error("An error occurred while fetching videos")
        } finally {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        fetchVideos()

        // If there are generating videos, poll for updates
        const interval = setInterval(() => {
            const hasGenerating = videos.some(v => v.status === "generating")
            if (hasGenerating) {
                fetchVideos()
            }
        }, 5000)

        return () => clearInterval(interval)
    }, [videos.length === 0 || videos.some(v => v.status === "generating")])

    if (loading) {
        return (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 animate-in fade-in duration-500">
                {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="aspect-square w-full rounded-xl" />
                ))}
            </div>
        )
    }

    if (videos.length === 0) {
        return (
            <div className="mt-10 rounded-xl border border-zinc-200 bg-white p-12 text-center dark:border-zinc-800 dark:bg-zinc-900">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 dark:bg-indigo-900/30 mb-4">
                    <Video className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h2 className="text-2xl font-bold mb-2">No videos yet</h2>
                <p className="text-zinc-500 dark:text-zinc-400 mb-8 max-w-sm mx-auto">Click "Generate" on any of your series to start creating viral shorts.</p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 animate-in fade-in duration-500">
            {videos.map((video) => (
                <VideoCard key={video.id} video={video} />
            ))}
        </div>
    )
}

function VideoCard({ video }: { video: any }) {
    const isGenerating = video.status === "generating"
    const thumbnail = video.images?.[0] || "/placeholder-video.png"
    const seriesName = video.series?.name || "Untitled Series"

    return (
        <Card className="group overflow-hidden border-2 transition-all hover:border-indigo-500/50 hover:shadow-md dark:bg-zinc-900/50">
            <div className="relative aspect-square w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                {isGenerating ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900/40 backdrop-blur-sm z-10 text-white p-6 text-center">
                        <Loader2 className="h-10 w-10 animate-spin text-indigo-400 mb-4" />
                        <h4 className="font-bold text-lg mb-1">Generating Video...</h4>
                        <p className="text-sm text-zinc-300">This usually takes 1-2 minutes. Stay tuned!</p>
                    </div>
                ) : (
                    <Image
                        src={thumbnail}
                        alt={seriesName}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                )}

                {!isGenerating && (
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button className="rounded-full h-12 w-12 bg-white text-indigo-600 hover:bg-white hover:scale-110 transition-transform shadow-xl">
                            <Play className="h-6 w-6 ml-1 fill-indigo-600" />
                        </Button>
                    </div>
                )}

                <div className="absolute top-2 left-2">
                    <Badge className={isGenerating ? "bg-amber-500/90 text-white" : "bg-emerald-500/90 text-white"}>
                        {isGenerating ? "Generating" : "Completed"}
                    </Badge>
                </div>
            </div>

            <CardContent className="p-4 space-y-3">
                <div className="min-w-0">
                    <CardTitle className="text-lg font-bold truncate">
                        {seriesName}
                    </CardTitle>
                    <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                        <Calendar className="h-3 w-3" />
                        {formatDistanceToNow(new Date(video.created_at))} ago
                    </div>
                </div>

                {!isGenerating && (
                    <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex gap-2">
                        <Button variant="outline" size="sm" className="w-full gap-2 text-xs">
                            <ExternalLink className="h-3.5 w-3.5" />
                            Open Player
                        </Button>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
