"use client"

import * as React from "react"
import { useParams } from "next/navigation"
import { SeriesForm } from "@/components/create/SeriesForm"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"

export default function EditSeriesPage() {
    const params = useParams()
    const id = params.id as string
    const [series, setSeries] = React.useState<any>(null)
    const [loading, setLoading] = React.useState(true)

    React.useEffect(() => {
        const fetchSeries = async () => {
            try {
                const response = await fetch(`/api/series/${id}`)
                const data = await response.json()
                if (response.ok) {
                    setSeries(data.series)
                } else {
                    toast.error(data.error || "Failed to fetch series details")
                }
            } catch (error) {
                console.error("Fetch Error:", error)
                toast.error("An error occurred while fetching series details")
            } finally {
                setLoading(false)
            }
        }

        if (id) {
            fetchSeries()
        }
    }, [id])

    if (loading) {
        return (
            <div className="max-w-4xl mx-auto p-8 space-y-8">
                <div className="flex items-center gap-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2">
                        <Skeleton className="h-8 w-48" />
                        <Skeleton className="h-4 w-32" />
                    </div>
                </div>
                <Skeleton className="h-12 w-full rounded-xl" />
                <div className="grid grid-cols-2 gap-4">
                    <Skeleton className="h-[200px] rounded-xl" />
                    <Skeleton className="h-[200px] rounded-xl" />
                    <Skeleton className="h-[200px] rounded-xl" />
                    <Skeleton className="h-[200px] rounded-xl" />
                </div>
            </div>
        )
    }

    if (!series) {
        return (
            <div className="p-8 text-center text-zinc-500">
                Series not found or you don't have permission to edit it.
            </div>
        )
    }

    return <SeriesForm initialData={series} mode="edit" />
}
