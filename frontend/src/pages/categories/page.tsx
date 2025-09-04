"use client"

import { Button } from "@/src/components/ui/button"
import { Card, CardContent } from "@/src/components/ui/card"
import { Input } from "@/src/components/ui/input"
import { useCategories } from "@/src/hooks/useCategories"
import { MoreHorizontal } from "lucide-react"

export default function CategoriesPage() {
  const { categoriesQuery, deleteCategory } = useCategories()

  if (categoriesQuery.isLoading) return <p>Loading...</p>
  if (categoriesQuery.isError) return <p>Error loading categories</p>

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-foreground">Categories</h1>
        <Button
          ref="/categories/create"
          className="bg-purple-600 hover:bg-purple-700 text-white"
        >
          Add Category
        </Button>
      </div>

      <Input placeholder="Search categories..." className="max-w-sm" />

      <div className="grid gap-4">
        {categoriesQuery.data?.map((category) => (
          <Card key={category.id} className="bg-white shadow-md">
            <CardContent className="flex justify-between items-center">
              <span className="font-medium text-foreground">
                {category.name}
              </span>
              <div className="flex gap-2">
                <Button
                  ref={`/categories/${category.id}/edit`}
                  variant="outline"
                  size="sm"
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => deleteCategory.mutate(category.id)}
                >
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
