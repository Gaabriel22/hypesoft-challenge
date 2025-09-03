"use client"

import { QueryClientProvider } from "@tanstack/react-query"
import { ReactNode } from "react"
import { queryClient } from "../stores/queryClient"

type Props = {
  children: ReactNode
}

export function ReactQueryProvider({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
