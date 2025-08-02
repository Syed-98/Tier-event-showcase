import { supabase } from '@/lib/supabase'
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const { userId } = await auth()
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    // Get user tier from Clerk metadata
    const { data: user } = await supabase
      .from('users')
      .select('tier')
      .eq('clerk_user_id', userId)
      .single()

    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 })

    // Get events for user's tier or below
    const { data: events } = await supabase
      .from('events')
      .select('*')
      .lte('tier', user.tier)
      .order('event_date', { ascending: true })

    return NextResponse.json(events)
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}