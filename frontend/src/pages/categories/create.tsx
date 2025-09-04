"use client"

import { useCategories } from "@/src/hooks/useCategories"
import { useRouter } from "next/navigation"
import { CategoryForm } from "@/src/components/forms/CategoryForm"

export default function CreateCategoryPage() {
  const { createCategory } = useCategories()
  const router = useRouter()

  const handleSubmit = (data: { name: string }) => {
    createCategory.mutate(data, {
      onSuccess: () => router.push("/categories"),
    })
  }

  return <CategoryForm onSubmit={handleSubmit} />
}
