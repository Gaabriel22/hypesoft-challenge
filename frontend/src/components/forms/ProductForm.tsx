"use client"

import { useCategories } from "@/src/hooks/useCategories"
import { zodResolver } from "@hookform/resolvers/zod"
import { Product } from "@/src/types/Product"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { Input } from "../ui/input"
import { Select } from "../ui/select"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@radix-ui/react-select"

const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  price: z.number().min(0, "Price cannot be negative"),
  quantity: z.number().min(0, "Quantity cannot be negative"),
  categoryId: z.string().min(1, "Category is required"),
})

type Props = {
  initialValues?: Partial<Product>
  onSubmit: (data: z.infer<typeof productSchema>) => void
}

export function ProductForm({ initialValues, onSubmit }: Props) {
  const { categoriesQuery } = useCategories()

  const { register, handleSubmit, formState, control } = useForm<
    z.infer<typeof productSchema>
  >({
    resolver: zodResolver(productSchema),
    defaultValues: initialValues || {
      name: "",
      description: "",
      price: 0,
      quantity: 0,
      categoryId: "",
    },
  })

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 rounded-lg shadow-md space-y-4 max-w-md mx-auto"
    >
      <Label htmlFor="name">Name</Label>
      <Input id="name" {...register("name")} />

      <Label htmlFor="description">Description</Label>
      <Input id="description" {...register("description")} />

      <Label htmlFor="price">Price</Label>
      <Input
        type="number"
        id="price"
        {...register("price", { valueAsNumber: true })}
      />

      <Label htmlFor="quantity">Quantity</Label>
      <Input
        type="number"
        id="quantity"
        {...register("quantity", { valueAsNumber: true })}
      />

      <Label htmlFor="category">Category</Label>
      <Controller
        name="categoryId"
        control={control}
        render={({ field }) => (
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger id="category" className="w-full">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categoriesQuery.data?.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      />

      <Button
        type="submit"
        className="bg-purple-600 hover:bg-purple-700 text-white"
      >
        Submit
      </Button>
    </form>
  )
}
