"use client"

import { ProductForm } from "@/src/components/forms/ProductForm"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card"
import { useProducts } from "@/src/hooks/useProducts"
import { useParams, useRouter } from "next/navigation"

export default function EditProductPage() {
  const { id } = useParams()
  const { productsQuery, updateProduct } = useProducts()
  const router = useRouter()

  if (productsQuery.isLoading) return <p>Loading...</p>
  if (productsQuery.isError) return <p>Error loading product</p>

  const productId = Array.isArray(id) ? id[0] : id
  const product = productsQuery.data?.find((p) => p.id === productId)
  if (!product) return <p>Product not found</p>

  const handleSubmit = (data: any) => {
    updateProduct.mutate(
      { id: productId, product: data },
      {
        onSuccess: () => {
          alert("Product updated successfully!")
          router.push("/products")
        },
        onError: (err) => {
          alert("Failed to update product")
          console.error(err)
        },
      }
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Edit Product</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductForm initialValues={product} onSubmit={handleSubmit} />
        </CardContent>
      </Card>
    </div>
  )
}
