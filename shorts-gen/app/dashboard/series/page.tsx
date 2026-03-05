import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SeriesList } from "@/components/dashboard/SeriesList";
import { Plus } from "lucide-react";

export default function SeriesPage() {
    return (
        <div className="p-8 pb-20">
            <header className="flex items-center justify-between mb-10">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Your Series</h1>
                    <p className="text-zinc-500 dark:text-zinc-400">Manage all your currently running and past series.</p>
                </div>
                <Link href="/dashboard/create">
                    <Button className="bg-indigo-600 text-white hover:bg-indigo-700 shadow-md transition-all hover:scale-105 gap-2">
                        <Plus className="h-4 w-4" />
                        New Series
                    </Button>
                </Link>
            </header>

            <SeriesList />
        </div>
    );
}
