// components/LogoutButton.tsx
'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@mui/material'
import { logoutAction } from '@/app/actions/auth'

export default function LogoutButton() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    setLoading(true)
    try {
      // Call the server action
      await logoutAction()
      
      // Client-side cleanup (optional)
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem('user')
      }
      
      // Refresh the router to ensure clean state
      router.refresh()
    } catch (error) {
      console.error('Logout failed:', error)
      setLoading(false)
    }
  }

  return (
    <Button
      variant="outlined"
      color="error"
      onClick={handleLogout}
      disabled={loading}
      sx={{
        mt: 'auto', // Pushes button to bottom if in flex container
        mb: 2,
        mx: 2,
      }}
    >
      {loading ? 'Logging out...' : 'Logout'}
    </Button>
  )
}