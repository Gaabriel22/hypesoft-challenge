import "../globals.css"
import { AppProps } from "next/app"
import { ReactQueryProvider } from "../lib/reactQueryProvider"
import { AuthGuard } from "@/src/components/layout/AuthGuard"

export default function MyApp({ Component, pageProps }: AppProps) {
  const isPublicPage = (Component as any).publicPage

  return (
    <ReactQueryProvider>
      {isPublicPage ? (
        <Component {...pageProps} />
      ) : (
        <AuthGuard>
          <Component {...pageProps} />
        </AuthGuard>
      )}
    </ReactQueryProvider>
  )
}
