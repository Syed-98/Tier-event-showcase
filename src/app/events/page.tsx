import { currentUser } from '@clerk/nextjs/server'
import EventCard from '@/components/Eventcard'

export default async function EventsPage() {
  const user = await currentUser()
  if (!user) return <div>Please sign in to view events</div>

  // Fetch events from our API route
  const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/events`)
  const events = await response.json()

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Events for {user.firstName}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event: any) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  )
}