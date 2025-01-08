'use server'

import DAL from '@dal'
import {redirect} from 'next/navigation'
import {Prisma} from '@prisma/client'
import { clearSessionCookie, getSessionId, setSessionCookie } from '../utils/sessionCookieUtils'
import { verifyPassword } from '../utils/passwordUtils'
import {revalidatePath} from 'next/cache'
import {ActionResponse} from '@/lib/models/actions'
import { createUserSchema, loginSchema, updateUserSchema } from '@/lib/schemas/userSchemas'
import { formAction } from '../mediators/actionMediators' 
import { log } from 'console'
import { sendEmail } from '../utils/mailSender'
import { getSessionProfile } from './sessionActions'

export async function signInOrRegister(_prevState: ActionResponse, formData: FormData): Promise<ActionResponse> {

  if (formData.has('username')) {

    return formAction(createUserSchema, formData, async data => {
      const input = {...data} as Prisma.UserCreateInput & {passwordConfirmation?: string}
      delete input.passwordConfirmation
      const profile = await DAL.createUser(input)
      log(profile)

      // Een sessie aanmaken in de database is niet voldoende, we moeten de sessie ook doorgeven aan de gebruiken.
      // Hiervoor gebruiken we een cookie.
      const session = await DAL.startSession(profile.id)
      await setSessionCookie(session)


      await sendEmail(profile.email, profile.username, 'Welcome to Codemastery!')

      // De gebruiker is ingelogd, dus redirecten we naar de contactenpagina.
      redirect('/')
    })
  }

  return formAction(loginSchema, formData, async data => {
    const user = await DAL.getUserByEmail(data?.email)

    const errorResponse = {
      errors: {errors: ['No user found with the provided user/password combination.']},
      success: false,
    }
    if (!user) return errorResponse

    const isValidPassword = verifyPassword(user.password, data.password)
    if (!isValidPassword) return errorResponse

    // Een sessie aanmaken in de database is niet voldoende, we moeten de sessie ook doorgeven aan de gebruiken.
    // Hiervoor gebruiken we een cookie.
    const session = await DAL.startSession(user.id)
    await setSessionCookie(session)

    // De gebruiker is ingelogd, dus redirecten we naar de contactenpagina.
    redirect('/')
})
}

export async function signOut(): Promise<void> {
  const sessionId = await getSessionId()
  if (sessionId) {
    await DAL.stopSession(sessionId)
    await clearSessionCookie()
  }
}

export async function updateProfile(_prevState: ActionResponse, data: FormData): Promise<ActionResponse> {
  return formAction(updateUserSchema, data, async (data, profile) => {
    await DAL.updateUser(profile.id, data)
    revalidatePath('/', 'layout')
    revalidatePath('/account', 'page')
  })
}

export async function isLoggedIn(): Promise<boolean> {
  const sessionId = await getSessionId()
  return !!sessionId;
}

export async function isAdmin(): Promise<boolean> {
  const profile = await getSessionProfile()
  

  if(profile == null) {
    return false
  }

  if(profile.role.name !== 'Admin' && profile.role.name !== 'SuperAdmin') {
    return false
  }

  return true
}


export async function isSuperAdmin(): Promise<boolean> {
  const profile = await getSessionProfile()
  

  if(profile == null) {
    return false
  }

  if(profile.role.name !== 'SuperAdmin') {
    return false
  }

  return true
}

export const addScore = async (score: number) => {
  const profile = await getSessionProfile()
  await DAL.updateUser(profile!.id, {score: profile!.score + score})
}
