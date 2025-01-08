import { getSessionId, setSessionCookie } from '../utils/sessionCookieUtils'
import 'server-only'
import DAL from '@dal'
import {redirect} from 'next/navigation'
import { log } from 'console'
import { Profile } from '@/lib/models/user'

/**
 * A utility function to retrieve the profile of the currently logged-in user, if any.
 */
export async function getSessionProfile(): Promise<Profile | null> {
  const sessionId = await getSessionId()
  const sessionProfile = sessionId ? await DAL.getSessionProfile(sessionId) : null
  return sessionProfile ? sessionProfile.user : null
}

/**
 * Retrieve the profile of the logged-in user, if there isn't one, redirect to the given URL.
 *
 * @param url The URL to redirect to if the user is not logged in, defaults to '/login'.
 */
export async function getSessionProfileOrRedirect(url: string = '/login'): Promise<Profile> {
  const sessionId = await getSessionId()
  const sessionProfile = sessionId ? await DAL.getSessionProfile(sessionId) : null

  log("Testing redirect.")
  
  if (!sessionProfile) {
    log("No session profile found")
    return redirect(url)
  }

  log("Sessionprofiel found:", sessionProfile)

  return sessionProfile.user
}

/**
 * Check if a session is about to expire and extend it if necessary.
 *
 */
export async function getSessionProfileAndOptionallyRenew(): Promise<Profile> {
  const sessionId = await getSessionId()
  const sessionProfile = sessionId ? await DAL.getSessionProfile(sessionId) : null

  if (!sessionProfile) throw new Error('User not logged in')

  if (sessionProfile.activeUntil.getTime() - Date.now() < 1000 * 60 * 60 * 12) {
    const extendedSession = await DAL.extendSession(sessionProfile.id)
    await setSessionCookie(extendedSession)
  }

  return sessionProfile.user
}
