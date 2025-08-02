import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isProtectedRoute = createRouteMatcher(['/events(.*)'])

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    return auth().then(({ userId }) => {
      if (!userId) {
        // Redirect to sign-in page if not authenticated
        return NextResponse.redirect('/sign-in')
      }
      // Allow request to proceed
      return NextResponse.next()
    })
  }
  // Allow request to proceed
  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}