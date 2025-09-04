"use client"

import { useProducts } from "@/src/hooks/useProducts"
import { z } from "zod"
import { useRouter } from "next/navigation"
import { ProductForm } from "@/src/components/forms/ProductForm"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card"

export default function CreateProductPage() {
  const { createProduct } = useProducts()
  const router = useRouter()

  const handleSubmit = (
    data: z.infer<(typeof ProductForm.prototype)["props"]["onSubmit"]>
  ) => {
    createProduct.mutate(data, {
      onSuccess: () => {
        alert("Product created successfully!")
        router.push("/products")
      },
      onError: (err) => {
        alert("Failed to create product")
        console.error(err)
      },
    })
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Create Product
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ProductForm onSubmit={handleSubmit} />
        </CardContent>
      </Card>
    </div>
  )
}
