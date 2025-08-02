import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { supabase } from '@/lib/supabase'

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET
  if (!WEBHOOK_SECRET) throw new Error('CLERK_WEBHOOK_SECRET not set')

  const headerPayload = await headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occurred -- no svix headers', { status: 400 })
  }

  const payload = await req.json()
  const body = JSON.stringify(payload)

  const wh = new Webhook(WEBHOOK_SECRET)
  let evt: WebhookEvent

  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent
  } catch (err) {
    return new Response('Error verifying webhook', { status: 400 })
  }

  const { id } = evt.data
  const eventType = evt.type

  // Sync user data with Supabase
  if (eventType === 'user.created' || eventType === 'user.updated') {
    const { first_name, last_name, email_addresses, public_metadata } = evt.data
    
    await supabase
      .from('users')
      .upsert({
        clerk_user_id: id,
        email: email_addresses[0].email_address,
        first_name: first_name,
        last_name: last_name,
        tier: public_metadata.tier || 'free',
      })
  }

  return new Response('', { status: 200 })
}