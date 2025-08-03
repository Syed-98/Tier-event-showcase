'use client'

import { useUser } from '@clerk/nextjs'
import { useState } from 'react'

export default function UpgradeButton({ currentTier }: { currentTier: string }) {
  const { user } = useUser()
  const [isLoading, setIsLoading] = useState(false)

  const tiers = ['free', 'silver', 'gold', 'platinum']
  const currentIndex = tiers.indexOf(currentTier)
  const nextTier = currentIndex < tiers.length - 1 ? tiers[currentIndex + 1] : null

  const handleUpgrade = async () => {
    if (!user || !nextTier) return
    
    setIsLoading(true)
    try {
      await user.update({
        unsafeMetadata: {
          tier: nextTier
        }
      })
      // In a real app, you might want to refresh the page or state
      window.location.reload()
    } catch (error) {
      console.error('Error upgrading tier:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!nextTier) {
    return (
      <div className="bg-green-100 text-green-800 p-3 rounded-md">
        You have the highest tier available!
      </div>
    )
  }

  return (
    <div>
      <h3 className="text-lg font-medium mb-2">Upgrade Your Tier</h3>
      <button
        onClick={handleUpgrade}
        disabled={isLoading}
        className={`px-4 py-2 rounded-md text-white ${
          isLoading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
        }`}
      >
        {isLoading ? 'Processing...' : `Upgrade to ${nextTier.toUpperCase()}`}
      </button>
      <p className="mt-2 text-sm text-gray-600">
        Note: This is a demo. In a real app, this would trigger a payment process.
      </p>
    </div>
  )
}