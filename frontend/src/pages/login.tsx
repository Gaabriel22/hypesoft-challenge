"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import keycloak from "@/src/lib/keycloackClient"
import { Button } from "@/src/components/ui/button"

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    keycloak
      .init({ onLoad: "login-required" })
      .then((authenticated) => {
        if (authenticated) {
          router.push("/dashboard")
        } else {
          setError("Authentication failed")
        }
        setLoading(false)
      })
      .catch(() => {
        setError("Failed to initialize Keycloak")
        setLoading(false)
      })
  }, [router])

  if (loading) return <p>Loading...</p>

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold mb-4 text-foreground">Login</h1>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <Button
          className="bg-purple-600 hover:bg-purple-700 text-white w-full"
          onClick={() => keycloak.login()}
        >
          Login with Keycloak
        </Button>
      </div>
    </div>
  )
}
