import { currentUser } from '@clerk/nextjs'
import Link from 'next/link'

export default async function Home() {
  const user = await currentUser()

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Tier Event Showcase</h1>
      {user ? (
        <Link href="/events" className="text-blue-500 hover:underline">
          View Events
        </Link>
      ) : (
        <div className="space-x-4">
          <Link href="/sign-in" className="text-blue-500 hover:underline">
            Sign In
          </Link>
          <Link href="/sign-up" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </div>
      )}
    </main>
  )
}