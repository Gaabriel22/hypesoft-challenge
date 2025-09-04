"use client"

import { Category } from "@/src/types/Category"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import z from "zod"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { Button } from "../ui/button"

const categorySchema = z.object({
  name: z.string().min(1, "Name is required"),
})

type Props = {
  initialValues?: Partial<Category>
  onSubmit: (data: z.infer<typeof categorySchema>) => void
}

export function CategoryForm({ initialValues, onSubmit }: Props) {
  const { register, handleSubmit } = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: initialValues || { name: "" },
  })

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white p-6 rounded-lg shadow-md space-y-4 max-w-md mx-auto"
    >
      <Label htmlFor="name">Name</Label>
      <Input id="name" {...register("name")} />
      <Button
        type="submit"
        className="bg-purple-600 hover:bg-purple-700 text-white"
      >
        Submit
      </Button>
    </form>
  )
}
