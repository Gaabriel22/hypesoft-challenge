"use client"

import { MainLayout } from "@/src/components/layout/MainLayout"
import Link from "next/link"

export default function NotFoundPage() {
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center h-full text-center">
        <h1 className="text-4xl font-bold mb-4 text-foreground">404</h1>
        <p className="text-lg text-muted-foreground mb-6">Page not found.</p>
        <Link
          href="/dashboard"
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
        >
          Return to Dashboard
        </Link>
      </div>
    </MainLayout>
  )
}
