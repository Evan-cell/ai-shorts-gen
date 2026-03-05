import { currentUser } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { inngest } from '@/inngest/client'

export async function POST(req: Request) {
    try {
        const user = await currentUser()
        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { seriesId } = await req.json()
        console.log("DEBUG: API /api/series/generate received seriesId:", seriesId)

        if (!seriesId) {
            console.error("DEBUG: API error - seriesId is missing in request body")
            return NextResponse.json({ error: 'Series ID is required' }, { status: 400 })
        }

        // Trigger the Inngest function
        console.log("DEBUG: Sending 'series/generate' event to Inngest with data:", { seriesId, userId: user.id })
        await inngest.send({
            name: 'series/generate',
            data: {
                seriesId,
                userId: user.id
            }
        })
        console.log("DEBUG: Inngest event sent successfully")

        return NextResponse.json({ message: 'Generation started' }, { status: 200 })
    } catch (error: any) {
        console.error('API Error:', error)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
