"use client"

import { useCategories } from "@/src/hooks/useCategories"
import { useProducts } from "@/src/hooks/useProducts"
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts"

const COLORS = ["#4f46e5", "#7c3aed", "#9333ea", "#c084fc", "#a78bf4"]

export function ProductsByCategoryChart() {
  const { productsQuery } = useProducts()
  const { categoriesQuery } = useCategories()

  if (productsQuery.isLoading || categoriesQuery.isLoading) {
    return <p>Loading chart...</p>
  }

  if (productsQuery.isError || categoriesQuery.isError) {
    return <p>Failed to load data</p>
  }

  const categoriesMap = new Map(
    categoriesQuery.data?.map((c) => [c.id, c.name]) || []
  )

  const data = categoriesQuery.data?.map((category) => {
    const total =
      productsQuery.data?.filter((p) => p.categoryId === category.id).length ||
      0
    return { name: category.name, value: total }
  })

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-purple-700 mb-4">
        Products by Category
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            name="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#4f46e5"
            label
          >
            {data?.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
