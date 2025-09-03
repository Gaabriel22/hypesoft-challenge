import Keycloak from "keycloak-js"

const keycloak = new Keycloak({
  url: process.env.NEXT_PUBLIC_KEYCLOAK_URL || "http://localhost:8080/",
  realm: process.env.NEXT_PUBLIC_KEYCLOAK_REALM || "hypesoft",
  clientId: process.env.NEXT_PUBLIC_KEYCLOAK_CLIENT_ID || "frontend",
})

export default keycloak
