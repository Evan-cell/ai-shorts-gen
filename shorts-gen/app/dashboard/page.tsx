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

            <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
                    <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
                    <div className="space-y-3">
                        <Link href="/dashboard/create" className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900/30">
                                <Plus className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-sm">Create New Series</h3>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400">Start a fresh AI video series</p>
                            </div>
                        </Link>
                        <Link href="/dashboard/series" className="flex items-center gap-3 p-3 rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100 dark:bg-emerald-900/30">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-600 dark:text-emerald-400"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.29 7 12 12 20.71 7"></polyline><line x1="12" y1="22" x2="12" y2="12"></line></svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-sm">Manage Active Series</h3>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400">View and edit your running series</p>
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="rounded-2xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900 flex flex-col justify-center items-center text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 dark:bg-indigo-900/30 mb-4">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600 dark:text-indigo-400"><path d="M12 2v20"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                    </div>
                    <h2 className="text-xl font-bold mb-2">Upgrade to Pro</h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-6 max-w-[250px]">Get more credits, higher quality voices, and remove watermarks.</p>
                    <Button className="bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 w-full sm:w-auto">View Plans</Button>
                </div>
            </div>
        </div>
    );
}
