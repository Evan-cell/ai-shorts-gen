import { Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { syncUser } from "@/lib/user-sync";
import { SeriesList } from "@/components/dashboard/SeriesList";
import { currentUser } from "@clerk/nextjs/server";
import { supabaseAdmin } from "@/lib/supabase";

export default async function Dashboard() {
    await syncUser();
    const user = await currentUser();

    // Fetch quick stats server-side
    let stats = { total: 0, scheduled: 0, views: "0" };

    if (user) {
        const { count: totalCount } = await supabaseAdmin
            .from('series')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', user.id);

        const { count: activeCount } = await supabaseAdmin
            .from('series')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', user.id)
            .eq('status', 'active');

        stats.total = totalCount || 0;
        stats.scheduled = activeCount || 0;
    }

    return (
        <div className="p-8 pb-20">
            <header className="flex items-center justify-between mb-10">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                    <p className="text-zinc-500 dark:text-zinc-400">Welcome back! Manage your AI-generated video series here.</p>
                </div>
                <Link href="/dashboard/create">
                    <Button className="bg-indigo-600 text-white hover:bg-indigo-700 shadow-md transition-all hover:scale-105 gap-2">
                        <Plus className="h-4 w-4" />
                        New Series
                    </Button>
                </Link>
            </header>

            <div className="grid gap-6 md:grid-cols-3 mb-10">
                <div className="rounded-2xl border-2 border-zinc-100 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 transition-all hover:shadow-md">
                    <p className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">Total Series</p>
                    <h3 className="text-4xl font-black">{stats.total}</h3>
                </div>
                <div className="rounded-2xl border-2 border-zinc-100 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 transition-all hover:shadow-md">
                    <p className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">Total Views</p>
                    <h3 className="text-4xl font-black">{stats.views}</h3>
                </div>
                <div className="rounded-2xl border-2 border-zinc-100 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 transition-all hover:shadow-md">
                    <p className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">Currently Active</p>
                    <h3 className="text-4xl font-black text-emerald-500">{stats.scheduled}</h3>
                </div>
            </div>

            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold">Your Series</h2>
                </div>

                <SeriesList />
            </div>
        </div>
    );
}
