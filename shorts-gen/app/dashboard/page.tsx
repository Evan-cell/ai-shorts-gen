import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
    LayoutDashboard,
    Video,
    Settings,
    BarChart,
    Plus,
    Layers,
    BookOpen,
    CreditCard,
    Zap,
    User,
    Library
} from "lucide-react";
import { syncUser } from "@/lib/user-sync";
import { ThemeToggle } from "@/components/theme-toggle";

export default async function Dashboard() {
    await syncUser();

    return (
        <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
            {/* Sidebar */}
            <aside className="w-64 border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 hidden md:flex flex-col">
                <div className="p-6">
                    <div className="flex items-center gap-2 mb-8">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
                            <Video className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-xl font-bold">AIshorts</span>
                    </div>

                    <Link href="/dashboard/create">
                        <Button className="w-full justify-start gap-2 bg-indigo-600 text-white hover:bg-indigo-700 mb-6 font-semibold">
                            <Plus className="h-5 w-5" />
                            Create New Series
                        </Button>
                    </Link>

                    <nav className="space-y-1">
                        <NavItem href="/dashboard" icon={<LayoutDashboard className="h-5 w-5" />} label="Dashboard" active />
                        <NavItem href="#" icon={<Layers className="h-5 w-5" />} label="Series" />
                        <NavItem href="#" icon={<Video className="h-5 w-5" />} label="Videos" />
                        <NavItem href="#" icon={<BookOpen className="h-5 w-5" />} label="Guides" />
                        <NavItem href="#" icon={<CreditCard className="h-5 w-5" />} label="Billing" />
                        <NavItem href="#" icon={<Settings className="h-5 w-5" />} label="Settings" />
                    </nav>
                </div>

                <div className="mt-auto p-6 border-t border-zinc-100 dark:border-zinc-800">
                    <nav className="space-y-1">
                        <NavItem href="#" icon={<Zap className="h-5 w-5 text-amber-500" />} label="Upgrade" />
                        <NavItem href="#" icon={<User className="h-5 w-5" />} label="Profile Setting" />
                    </nav>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col">
                <header className="h-16 border-b border-zinc-200 bg-white/80 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-10 dark:border-zinc-800 dark:bg-zinc-900/80">
                    <h1 className="text-xl font-semibold">Dashboard</h1>
                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <UserButton afterSignOutUrl="/" />
                    </div>
                </header>

                <div className="p-8">
                    <div className="grid gap-6 md:grid-cols-3">
                        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">Total Shorts</p>
                            <h3 className="text-3xl font-bold">12</h3>
                        </div>
                        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">Total Views</p>
                            <h3 className="text-3xl font-bold">1.2k</h3>
                        </div>
                        <div className="rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-1">Scheduled</p>
                            <h3 className="text-3xl font-bold">5</h3>
                        </div>
                    </div>

                    <div className="mt-10 rounded-xl border border-zinc-200 bg-white p-12 text-center dark:border-zinc-800 dark:bg-zinc-900">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 dark:bg-indigo-900/30 mb-4">
                            <Video className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <h2 className="text-2xl font-bold mb-2">Generate your first AI Short</h2>
                        <p className="text-zinc-500 dark:text-zinc-400 mb-8 max-w-sm mx-auto">Turn your ideas or long-form videos into viral content in just a few clicks.</p>
                        <Button size="lg" className="bg-indigo-600 text-white hover:bg-indigo-700">Get Started</Button>
                    </div>
                </div>
            </main>
        </div>
    );
}

function NavItem({ href, icon, label, active = false }: { href: string, icon: React.ReactNode, label: string, active?: boolean }) {
    return (
        <Link
            href={href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${active
                ? "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400"
                : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                }`}
        >
            {icon}
            {label}
        </Link>
    );
}
