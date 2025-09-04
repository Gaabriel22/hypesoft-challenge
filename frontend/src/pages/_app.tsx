import "../globals.css"
import { AppProps } from "next/app"
import { ReactQueryProvider } from "../lib/reactQueryProvider"
import { AuthGuard } from "@/src/components/layout/AuthGuard"
import { MainLayout } from "@/src/components/layout/MainLayout"

export default function MyApp({ Component, pageProps }: AppProps) {
  const isPublicPage = (Component as any).publicPage

  return (
    <ReactQueryProvider>
      {isPublicPage ? (
        <Component {...pageProps} />
      ) : (
        <AuthGuard>
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </AuthGuard>
      )}
    </ReactQueryProvider>
  )
}
