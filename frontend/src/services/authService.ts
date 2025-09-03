import keycloak from "../lib/keycloackClient"
import { User } from "../types/User"

export const authService = {
  async login(): Promise<void> {
    const authenticated = await keycloak.init({ onLoad: "login-required" })
    if (!authenticated) keycloak.login()
  },

  logout(): void {
    keycloak.logout()
  },

  getUser(): User | null {
    if (!keycloak.token) return null
    return {
      id: keycloak.subject || "",
      name: keycloak.tokenParsed?.name || "",
      roles: keycloak.tokenParsed?.realm_access?.roles || [],
      token: keycloak.token,
    }
  },
}
