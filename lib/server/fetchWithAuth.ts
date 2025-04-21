// lib/server/fetchWithAuth.ts
'use server'

import { cookies, headers} from 'next/headers'
import { redirect } from 'next/navigation'

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT}`

export async function fetchWithAuth(
  endpoint: string,
  options: RequestInit = {}
): Promise<any> {
  const token = (await cookies()).get('access_token')?.value
  
  if (!token) {
    const path = (await headers()).get('x-invoke-path') || '/' ;
    (await cookies()).set('returnTo', path)
    redirect('/login')
  }

  const url = `${API_BASE_URL}${endpoint}`
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
      ...options.headers,
    },
    cache: 'no-store'
  })

  if (response.status === 401) {
    (await cookies()).delete('access_token')
    const path = (await headers()).get('x-invoke-path') || '/'
    ;(await cookies()).set('returnTo', path)
    redirect('/login')
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.message || `API request failed: ${response.statusText}`)
  }

  // Handle 204 No Content responses
  if (response.status === 204) {
    return null
  }

  return response.json()
}