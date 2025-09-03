import { useEffect, useState } from "react"
import { authService } from "./../services/authService"
import { User } from "../types/User"

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const u = authService.getUser()
    setUser(u)
  }, [])

  const login = async () => {
    await authService.login()
    setUser(authService.getUser())
  }

  const logout = async () => {
    authService.logout()
    setUser(null)
  }

  const hasRole = (role: string) => user?.roles.includes(role)

  return { user, login, logout, hasRole }
}
