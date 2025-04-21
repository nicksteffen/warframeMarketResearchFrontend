// lib/api-client.ts
"use server"
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

class ApiClient {
  private baseUrl: string
  private defaultHeaders: Record<string, string>

  constructor() {
    this.baseUrl = `${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT}`
    this.defaultHeaders = {
      'Content-Type': 'application/json',
    }
  }

  private async getAuthToken(): Promise<string> {
    const cookieStore = await cookies()
    const token = cookieStore.get('access_token')?.value
    
    if (!token) {
      // Store current path for redirect after login
      const path = typeof window !== 'undefined' ? window.location.pathname : '/'
      await cookieStore.set('returnTo', path)
      redirect('/login')
    }
    return token
  }

  private async handleResponse(response: Response): Promise<any> {
    if (response.status === 401) {
      // Token expired or invalid
      const cookieStore = await cookies()
      await cookieStore.delete('access_token')
      
      const path = typeof window !== 'undefined' ? window.location.pathname : '/'
      await cookieStore.set('returnTo', path)
      
      redirect('/login')
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new Error(
        errorData.message || `API request failed: ${response.statusText}`
      )
    }

    // Handle 204 No Content responses
    if (response.status === 204) {
      return null
    }

    return response.json()
  }

  public async get(endpoint: string): Promise<any> {
    const token = await this.getAuthToken()
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'GET',
      headers: {
        ...this.defaultHeaders,
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    })
    return this.handleResponse(response)
  }

  public async post(endpoint: string, body: any): Promise<any> {
    const token = await this.getAuthToken()
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        ...this.defaultHeaders,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    })
    return this.handleResponse(response)
  }

  public async put(endpoint: string, body: any): Promise<any> {
    const token = await this.getAuthToken()
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'PUT',
      headers: {
        ...this.defaultHeaders,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    })
    return this.handleResponse(response)
  }

  public async patch(endpoint: string, body: any): Promise<any> {
    const token = await this.getAuthToken()
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'PATCH',
      headers: {
        ...this.defaultHeaders,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    })
    return this.handleResponse(response)
  }

  public async delete(endpoint: string): Promise<any> {
    const token = await this.getAuthToken()
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'DELETE',
      headers: {
        ...this.defaultHeaders,
        Authorization: `Bearer ${token}`,
      },
    })
    return this.handleResponse(response)
  }

  // Optional: FormData support for file uploads
  public async postFormData(endpoint: string, formData: FormData): Promise<any> {
    const token = await this.getAuthToken()
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        // Let browser set Content-Type with boundary for FormData
      },
      body: formData,
    })
    return this.handleResponse(response)
  }
}

export const apiClient = new ApiClient()