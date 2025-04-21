// app/actions/auth.ts
'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function logoutAction() {
  // Clear the access token cookie
  (await
        // Clear the access token cookie
        cookies()).delete('access_token')
  
  // Optional: Clear any other auth-related cookies
  ;(await
        // Optional: Clear any other auth-related cookies
        cookies()).delete('refresh_token')
  
  // Redirect to login page
  redirect('/login')
}