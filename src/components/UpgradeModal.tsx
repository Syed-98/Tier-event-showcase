'use client';

import React from 'react';
import { UpgradeModalProps, Tier } from '@/types';

const tierDetails: Record<Tier, { name: string; price: string; description: string }> = {
    silver: {
        name: 'Silver',
        price: '$9.99/month',
        description: 'Access to Silver and Free events'
    },
    gold: {
        name: 'Gold',
        price: '$19.99/month',
        description: 'Access to Gold, Silver and Free events'
    },
    platinum: {
        name: 'Platinum',
        price: '$29.99/month',
        description: 'Access to all events including Platinum'
    },
    free: {
        name: '',
        price: '',
        description: ''
    }
};

const tierColors: Record<Tier, string> = {
  free: 'bg-gray-200 text-gray-800',
  silver: 'bg-gray-300 text-gray-800',
  gold: 'bg-yellow-100 text-yellow-800',
  platinum: 'bg-green-100 text-green-800'
};

export default function UpgradeModal({ currentTier, onClose, onUpgrade }: UpgradeModalProps) {
  const availableTiers = (Object.keys(tierDetails) as Tier[]).filter(
    tier => tier !== currentTier
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-800">Upgrade Your Membership</h3>
            <button 
              className="text-gray-500 hover:text-gray-700"
              onClick={onClose}
            >
              ✕
            </button>
          </div>
          
          <div className="space-y-4">
            <p className="text-gray-600">
              Choose a higher tier to unlock more exclusive events and features.
            </p>
            
            <div className="space-y-3">
              {availableTiers.map((tier) => (
                <div 
                  key={tier}
                  className={`p-4 border rounded-lg transition ${
                    tierColors[tier]
                  } border-transparent hover:border-gray-300`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-semibold">{tierDetails[tier].name}</h4>
                      <p className="text-sm">{tierDetails[tier].description}</p>
                    </div>
                    <button
                      onClick={() => onUpgrade(tier)}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
                    >
                      {tierDetails[tier].price}
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Note: This is a demo. In a real app, this would process payment.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}