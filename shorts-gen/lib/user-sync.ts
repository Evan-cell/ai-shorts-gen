import { currentUser } from '@clerk/nextjs/server'
import { supabaseAdmin } from './supabase'

/**
 * Syncs the currently authenticated Clerk user to the Supabase 'app_users' table.
 */
export async function syncUser() {
    console.log('--- Syncing User ---')
    const user = await currentUser()

    if (!user) {
        console.log('No Clerk user found.')
        return { success: false, error: 'No user found' }
    }

    console.log('Clerk User ID:', user.id)

    const email = user.emailAddresses[0]?.emailAddress
    const name = `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim()

    console.log('Syncing data to Supabase:', { email, name })

    const { data, error } = await supabaseAdmin
        .from('app_users')
        .upsert(
            {
                clerk_id: user.id,
                email: email,
                name: name,
            },
            { onConflict: 'clerk_id' }
        )
        .select()

    if (error) {
        console.error('Error syncing user to Supabase:', {
            code: error.code,
            message: error.message,
            details: error.details,
            hint: error.hint
        })
        return { success: false, error: error.message }
    }

    console.log('Sync successful! Supabase Result:', data)
    return { success: true }
}
