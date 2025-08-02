import { Tier } from '../lib/utils'

interface Event {
  id: string
  title: string
  description: string
  event_date: string
  image_url: string
  tier: Tier
}

export default function EventCard({ event }: { event: Event }) {
  const tierColors = {
    free: 'bg-gray-200 text-gray-800',
    silver: 'bg-silver-200 text-silver-800',
    gold: 'bg-yellow-200 text-yellow-800',
    platinum: 'bg-purple-200 text-purple-800',
  }

  return (
    <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      <img 
        src={event.image_url} 
        alt={event.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-xl font-bold">{event.title}</h2>
          <span className={`text-xs px-2 py-1 rounded-full ${tierColors[event.tier]}`}>
            {event.tier.toUpperCase()}
          </span>
        </div>
        <p className="text-gray-600 mb-3">{event.description}</p>
        <p className="text-sm text-gray-500">
          {new Date(event.event_date).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      </div>
    </div>
  )
}