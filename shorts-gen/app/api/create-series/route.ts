import { currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: Request) {
    try {
        const user = await currentUser()
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const body = await req.json()
        const {
            seriesName,
            niche,
            language,
            voice,
            backgroundMusic,
            videoStyle,
            captionStyle,
            duration,
            platform,
            scheduleTime
        } = body

        // Validate required fields
        if (!seriesName || !niche || !language || !voice || !videoStyle || !captionStyle || !duration || !platform || !scheduleTime) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        const { data, error } = await supabaseAdmin
            .from('series')
            .insert([
                {
                    user_id: user.id,
                    name: seriesName,
                    niche,
                    language,
                    voice,
                    background_music: backgroundMusic || null,
                    video_style: videoStyle,
                    caption_style: captionStyle,
                    duration,
                    platform,
                    schedule_time: scheduleTime,
                    status: 'active'
                }
            ])
            .select()

        if (error) {
            console.error('Error inserting series:', error)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json({ success: true, data }, { status: 200 })
    } catch (error: any) {
        console.error('API Error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
