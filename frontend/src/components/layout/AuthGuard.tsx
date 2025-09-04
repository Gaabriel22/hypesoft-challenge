"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/src/hooks/useAuth"

type Props = {
  children: React.ReactNode
}

export function AuthGuard({ children }: Props) {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user === null) return 
    if (!user) router.replace("/login")
  }, [user, router])

  if (user === null) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-purple-700 font-medium">Verifying session...</p>
        </div>
      </div>
    )
  }

  if (!user) return null 

  return <>{children}</>
}
