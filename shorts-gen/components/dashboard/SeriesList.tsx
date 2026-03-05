"use client"

import * as React from "react"
import { SeriesCard } from "./SeriesCard"
import { Skeleton } from "@/components/ui/skeleton"
import { Video, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export function SeriesList() {
    const router = useRouter()
    const [series, setSeries] = React.useState<any[]>([])
    const [loading, setLoading] = React.useState(true)

    const fetchSeries = async () => {
        try {
            const response = await fetch("/api/get-series")
            const data = await response.json()
            if (response.ok) {
                setSeries(data.series || [])
            } else {
                toast.error(data.error || "Failed to fetch series")
            }
        } catch (error) {
            console.error("Fetch Error:", error)
            toast.error("An error occurred while fetching series")
        } finally {
            setLoading(false)
        }
    }

    React.useEffect(() => {
        fetchSeries()
    }, [])

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this series?")) return

        try {
            // Optimistic update
            const originalSeries = [...series]
            setSeries(series.filter(s => s.id !== id))

            // For now, let's just log it. In a real app, you'd call a delete API.
            console.log("Deleting series:", id)
            toast.success("Series deleted (Simulation)")

            // If API call fails:
            // setSeries(originalSeries)
        } catch (error) {
            toast.error("Failed to delete series")
        }
    }

    const handleStatusChange = (id: string, status: string) => {
        setSeries(series.map(s => s.id === id ? { ...s, status } : s))
        toast.success(`Series ${status === 'active' ? 'resumed' : 'paused'}`)
    }

    const handleEdit = (id: string) => {
        router.push(`/dashboard/edit/${id}`)
    }

    if (loading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="space-y-4">
                        <Skeleton className="aspect-square w-full rounded-xl" />
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-[250px]" />
                            <Skeleton className="h-4 w-[200px]" />
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    if (series.length === 0) {
        return (
            <div className="mt-10 rounded-xl border border-zinc-200 bg-white p-12 text-center dark:border-zinc-800 dark:bg-zinc-900">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 dark:bg-indigo-900/30 mb-4">
                    <Video className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Generate your first AI Short</h2>
                <p className="text-zinc-500 dark:text-zinc-400 mb-8 max-w-sm mx-auto">Turn your ideas or long-form videos into viral content in just a few clicks.</p>
                <Link href="/dashboard/create">
                    <Button size="lg" className="bg-indigo-600 text-white hover:bg-indigo-700 gap-2">
                        <Plus className="h-4 w-4" />
                        Get Started
                    </Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 animate-in fade-in duration-500">
            {series.map((item) => (
                <SeriesCard
                    key={item.id}
                    series={item}
                    onDelete={handleDelete}
                    onStatusChange={handleStatusChange}
                    onEdit={handleEdit}
                />
            ))}
        </div>
    )
}
