import { Event } from '@/types';

interface LockedEventCardProps {
  event: Event;
  onUpgrade: () => void;
}

export default function LockedEventCard({ event, onUpgrade }: LockedEventCardProps) {
  const eventDate = new Date(event.event_date);
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const tierColors = {
    free: 'bg-gray-200 text-gray-800',
    silver: 'bg-gray-300 text-gray-800',
    gold: 'bg-yellow-100 text-yellow-800',
    platinum: 'bg-green-100 text-green-800',
  };

  return (
    <div className="event-card bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg opacity-75 transition-all">
      <div className="h-48 overflow-hidden relative">
        <img src={event.image_url} alt={event.title} className="w-full h-full object-cover brightness-50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-white font-bold text-lg bg-black bg-opacity-50 px-4 py-2 rounded-lg">
            {event.tier.charAt(0).toUpperCase() + event.tier.slice(1)} Tier Required
          </span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{event.title}</h3>
          <span className={`text-xs px-2 py-1 rounded-full ${tierColors[event.tier]}`}>
            {event.tier.charAt(0).toUpperCase() + event.tier.slice(1)}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-3">{event.description}</p>
        <div className="flex items-center text-sm text-gray-500">
          <span>{formattedDate}</span>
        </div>
        <button
          className="mt-3 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition text-sm"
          onClick={onUpgrade}
        >
          Upgrade to {event.tier.charAt(0).toUpperCase() + event.tier.slice(1)} Tier
        </button>
      </div>
    </div>
  );
}