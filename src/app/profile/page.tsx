import { currentUser } from '@clerk/nextjs/server'
import Link from 'next/link'
import UpgradeButton from '../../components/UpgradeButton'

export default async function ProfilePage() {
  const user = await currentUser()
  if (!user) return <div>Please sign in</div>

  // Get user tier from Clerk metadata
  const tier: string = (user.publicMetadata.tier as string) || 'free'

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md">
        <h2 className="text-xl font-semibold mb-2">
          {user.firstName} {user.lastName}
        </h2>
        <p className="text-gray-600 mb-4">{user.emailAddresses[0].emailAddress}</p>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Your Tier</h3>
          <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
            tier === 'free' ? 'bg-gray-200 text-gray-800' :
            tier === 'silver' ? 'bg-silver-200 text-silver-800' :
            tier === 'gold' ? 'bg-yellow-200 text-yellow-800' :
            'bg-purple-200 text-purple-800'
          }`}>
            {tier.toUpperCase()}
          </div>
        </div>

        <UpgradeButton currentTier={tier as string} />
        
        <Link 
          href="/events" 
          className="mt-4 inline-block text-blue-500 hover:underline"
        >
          Back to Events
        </Link>
      </div>
    </div>
  )
}