"use client"

import { useState } from "react"
import { useProducts } from "@/src/hooks/useProducts"
import { useCategories } from "@/src/hooks/useCategories"
import { Product } from "@/src/types/Product"
import Link from "next/link"
import { MoreHorizontal, Edit, Trash } from "lucide-react"
import { Card, CardContent, CardTitle } from "@/src/components/ui/card"
import { Input } from "@/src/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select"
import { Button } from "@/src/components/ui/button"

export default function ProductsPage() {
  const { productsQuery, deleteProduct } = useProducts()
  const { categoriesQuery } = useCategories()

  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("")

  if (productsQuery.isLoading || categoriesQuery.isLoading)
    return <p>Loading...</p>
  if (productsQuery.isError || categoriesQuery.isError)
    return <p>Error loading data</p>

  const filteredProducts = productsQuery.data?.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = categoryFilter
      ? p.categoryId === categoryFilter
      : true
    return matchesSearch && matchesCategory
  })

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      deleteProduct.mutate(id)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <CardTitle className="text-2xl font-semibold">Products</CardTitle>
        <div className="flex flex-col md:flex-row gap-2 items-start md:items-center">
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="md:w-64"
          />
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Categories</SelectItem>
              {categoriesQuery.data?.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Link href="/products/create">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              New Product
            </Button>
          </Link>
        </div>
      </div>

      {/* Table */}
      <Card>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="p-3 border-b">Name</th>
                  <th className="p-3 border-b">Category</th>
                  <th className="p-3 border-b">Price</th>
                  <th className="p-3 border-b">Quantity</th>
                  <th className="p-3 border-b">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts?.map((product: Product) => {
                  const categoryName =
                    categoriesQuery.data?.find(
                      (c) => c.id === product.categoryId
                    )?.name || "-"
                  return (
                    <tr
                      key={product.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="p-3 border-b">{product.name}</td>
                      <td className="p-3 border-b">{categoryName}</td>
                      <td className="p-3 border-b">
                        ${product.price.toFixed(2)}
                      </td>
                      <td className="p-3 border-b">{product.quantity}</td>
                      <td className="p-3 border-b flex gap-2">
                        <Link href={`/products/${product.id}/edit`}>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(product.id)}
                        >
                          <Trash className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
