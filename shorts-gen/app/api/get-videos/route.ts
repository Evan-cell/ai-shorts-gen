import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { currentUser } from "@clerk/nextjs/server";

export async function GET() {
    try {
        const user = await currentUser();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { data, error } = await supabaseAdmin
            .from("generated_videos")
            .select(`
                *,
                series:series_id (
                    name,
                    video_style
                )
            `)
            .eq("user_id", user.id)
            .order("created_at", { ascending: false });

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ videos: data });
    } catch (error: any) {
        console.error("Get Videos Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
