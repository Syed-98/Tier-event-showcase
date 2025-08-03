'use client';

import React, { useState } from 'react';
import { useUser } from '@clerk/nextjs';
import EventCard from '@/components/Eventcard';
import LockedEventcard from '@/components/LockedEventcard';
import LoginModal from '@/components/LoginModal';
import UpgradeModal from '@/components/UpgradeModal';
import { Tier, Event } from '@/types';

const tierOrder: Record<Tier, number> = {
  free: 0,
  silver: 1,
  gold: 2,
  platinum: 3,
};

const tierColors: Record<Tier, string> = {
  free: 'bg-gray-200 text-gray-800',
  silver: 'bg-gray-300 text-gray-800',
  gold: 'bg-yellow-100 text-yellow-800',
  platinum: 'bg-green-100 text-green-800',
};

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Community Meetup',
    description: 'Join our free community meetup to network with like-minded individuals.',
    event_date: '2025-08-15T18:00:00',
    image_url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    tier: 'free'
  },
  // ... include all your other mock events here
];

export default function EventsPage() {
  const { isSignedIn, user } = useUser();
  const [showLogin, setShowLogin] = useState(false);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const currentTier = (user?.publicMetadata.tier as Tier) || 'free';

  const filteredEvents = mockEvents.filter(event => 
    tierOrder[event.tier] <= tierOrder[currentTier]
  );

  const lockedEvents = mockEvents.filter(event =>
    tierOrder[event.tier] > tierOrder[currentTier]
  );

  const handleLogin = (username: string, tier: Tier) => {
    // In a real app, you would authenticate here
    console.log(`Logged in as ${username} with ${tier} tier`);
    setShowLogin(false);
  };

  const handleUpgrade = (newTier: Tier) => {
    // In a real app, you would handle payment and tier upgrade here
    console.log(`Upgraded to ${newTier} tier`);
    setShowUpgrade(false);
  };

  if (!isSignedIn) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome to EventShowcase</h2>
          <p className="text-gray-600 mb-6">Please login to view events available for your tier.</p>
          <button
            className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition"
            onClick={() => setShowLogin(true)}
          >
            Login to Continue
          </button>
        </div>
        {showLogin && (
          <LoginModal
            onClose={() => setShowLogin(false)}
            onLogin={handleLogin}
          />
        )}
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-indigo-600">EventShowcase</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold tier-${currentTier}`}>
                {currentTier.charAt(0).toUpperCase() + currentTier.slice(1)}
              </span>
              <span className="font-medium">{user?.firstName || user?.username}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Events for You</h2>
            {currentTier !== 'platinum' && (
              <button
                className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-4 py-2 rounded-md hover:opacity-90 transition"
                onClick={() => setShowUpgrade(true)}
              >
                Upgrade Tier
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
            {lockedEvents.length > 0 && (
              <>
                <div className="col-span-full mt-12 mb-4">
                  <h3 className="text-xl font-bold text-gray-800">Upgrade to Access More Events</h3>
                  <p className="text-gray-600">These events are available with a higher tier membership.</p>
                </div>
                {lockedEvents.map(event => (
                  <LockedEventcard 
                    key={event.id} 
                    event={event} 
                    onUpgrade={() => setShowUpgrade(true)} 
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </main>

      {showUpgrade && (
        <UpgradeModal
          currentTier={currentTier}
          onClose={() => setShowUpgrade(false)}
          onUpgrade={handleUpgrade}
        />
      )}

      <style jsx>{`
        .tier-free { background-color: #6b7280; color: #fff; }
        .tier-silver { background-color: #c0c0c0; color: #222; }
        .tier-gold { background-color: #f59e0b; color: #fff; }
        .tier-platinum { background-color: #10b981; color: #fff; }
      `}</style>
    </div>
  );
}