// app/actions/api.ts
'use server'

import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { fetchWithAuth } from '@/lib/server/fetchWithAuth'


interface List {
    _id: string
    name: string
  }

// const API_URL = `${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT}`

// async function fetchWithAuth(url: string, options: RequestInit = {}) {
//   const token = (await cookies()).get('access_token')?.value
  
//   if (!token) {
//     const path = (await headers()).get('x-invoke-path') || '/'
//     ;(await cookies()).set('returnTo', path)
//     redirect('/login')
//   }

//   const response = await fetch(url, {
//     ...options,
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`,
//       ...options.headers,
//     },
//     cache: 'no-store'
//   })

//   if (response.status === 401) {
//     (await cookies()).delete('access_token')
//     const path = (await headers()).get('x-invoke-path') || '/'
//     ;(await cookies()).set('returnTo', path)
//     redirect('/login')
//   }

//   if (!response.ok) {
//     throw new Error(`API request failed: ${response.statusText}`)
//   }

//   return response.json()
// }

export async function getLists(): Promise<List[]> {
  return fetchWithAuth('/lists')
}

export async function createList(listData: any): Promise<List> {
  return fetchWithAuth(`/lists`, {
    method: 'POST',
    body: JSON.stringify(listData)
  })
}

export async function updateList(id: string, listData: any): Promise<List> {
  return fetchWithAuth(`/lists/${id}`, {
    method: 'PUT',
    body: JSON.stringify(listData)
  })
}

export async function deleteList(id: string): Promise<void> {
  return fetchWithAuth(`/lists/${id}`, {
    method: 'DELETE'
  })
}