import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Video, Settings, BarChart } from "lucide-react";

export default function Dashboard() {
    return (
        <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950">
            {/* Sidebar */}
            <aside className="w-64 border-r border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 hidden md:block">
                <div className="flex items-center gap-2 mb-10">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
                        <Video className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-xl font-bold">AIshorts</span>
                </div>

                <nav className="space-y-2">
                    <Link href="/dashboard" className="flex items-center gap-3 rounded-lg bg-indigo-50 px-3 py-2 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400">
                        <LayoutDashboard className="h-5 w-5" />
                        <span className="font-medium">Dashboard</span>
                    </Link>
                    <Link href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800 transition-colors">
                        <Video className="h-5 w-5" />
                        <span className="font-medium">My Shorts</span>
                    </Link>
                    <Link href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800 transition-colors">
                        <BarChart className="h-5 w-5" />
                        <span className="font-medium">Analytics</span>
                    </Link>
                    <Link href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800 transition-colors">
                        <Settings className="h-5 w-5" />
                        <span className="font-medium">Settings</span>
                    </Link>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8">
                <header className="flex items-center justify-between mb-8">
                    <h1 className="text-2xl font-bold">Dashboard</h1>
                    <div className="flex items-center gap-4">
                        <Button className="bg-indigo-600 text-white hover:bg-indigo-700">Create New Short</Button>
                        <UserButton afterSignOutUrl="/" />
                    </div>
                </header>

                <div className="grid gap-6 md:grid-cols-3">
                    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                        <p className="text-sm text-zinc-500 mb-1">Total Shorts</p>
                        <h3 className="text-3xl font-bold">12</h3>
                    </div>
                    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                        <p className="text-sm text-zinc-500 mb-1">Total Views</p>
                        <h3 className="text-3xl font-bold">1.2k</h3>
                    </div>
                    <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                        <p className="text-sm text-zinc-500 mb-1">Scheduled</p>
                        <h3 className="text-3xl font-bold">5</h3>
                    </div>
                </div>

                <div className="mt-10 rounded-xl border border-zinc-200 bg-white p-8 text-center dark:border-zinc-800 dark:bg-zinc-900">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 dark:bg-indigo-900/30 mb-4">
                        <Video className="h-8 w-8 text-indigo-600" />
                    </div>
                    <h2 className="text-xl font-bold mb-2">Generate your first AI Short</h2>
                    <p className="text-zinc-500 mb-6 max-w-sm mx-auto">Turn your ideas or long-form videos into viral content in just a few clicks.</p>
                    <Button size="lg" className="bg-indigo-600 text-white hover:bg-indigo-700">Get Started</Button>
                </div>
            </main>
        </div>
    );
}
