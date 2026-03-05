import Link from "next/link";
import { Button } from "@/components/ui/button";
import { VideoList } from "@/components/dashboard/VideoList";
import { Video } from "lucide-react";

export default function VideosPage() {
    return (
        <div className="p-8 pb-20">
            <header className="flex items-center justify-between mb-10">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Your Videos</h1>
                    <p className="text-zinc-500 dark:text-zinc-400">View and manage all your generated AI shorts.</p>
                </div>
            </header>

            <VideoList />
        </div>
    );
}
