import { UserButton } from "@clerk/nextjs"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
    LayoutDashboard,
    Video,
    Plus,
    Layers,
    BookOpen,
    CreditCard,
    Settings,
    Zap,
    User
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
            {/* Sidebar */}
            <aside className="w-64 border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900 hidden md:flex flex-col sticky top-0 h-screen">
                <div className="p-6">
                    <Link href="/dashboard" className="flex items-center gap-2 mb-8">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600">
                            <Video className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-xl font-bold">AIshorts</span>
                    </Link>

                    <Link href="/dashboard/create">
                        <Button className="w-full justify-start gap-2 bg-indigo-600 text-white hover:bg-indigo-700 mb-6 font-semibold">
                            <Plus className="h-5 w-5" />
                            Create New Series
                        </Button>
                    </Link>

                    <nav className="space-y-1">
                        <NavItem href="/dashboard" icon={<LayoutDashboard className="h-5 w-5" />} label="Dashboard" />
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
            <main className="flex-1 flex flex-col min-w-0">
                <header className="h-16 border-b border-zinc-200 bg-white/80 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-10 dark:border-zinc-800 dark:bg-zinc-900/80">
                    <div className="flex items-center gap-4">
                        <div className="md:hidden flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 mr-2">
                            <Video className="h-5 w-5 text-white" />
                        </div>
                        <h1 className="text-xl font-semibold">Dashboard</h1>
                    </div>
                    <div className="flex items-center gap-4">
                        <ThemeToggle />
                        <UserButton afterSignOutUrl="/" />
                    </div>
                </header>

                <div className="flex-1">
                    {children}
                </div>
            </main>
        </div>
    )
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
    )
}
