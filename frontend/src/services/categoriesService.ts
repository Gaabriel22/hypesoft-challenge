import { Category } from "../types/Category"
import { handleApiError } from "../utils/handleApiError"

const BASE_URL = "http://localhost:5000/api/categories"

export const categoriesService = {
  async getAll(): Promise<Category[]> {
    const res = await fetch(BASE_URL)
    await handleApiError(res)
    return res.json()
  },

  async getById(id: string): Promise<Category> {
    const res = await fetch(`${BASE_URL}/${id}`)
    await handleApiError(res)
    return res.json()
  },

  async create(category: Omit<Category, "id">): Promise<Category> {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(category),
    })
    await handleApiError(res)
    return res.json()
  },

  async update(id: string, category: Omit<Category, "id">): Promise<Category> {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(category),
    })
    await handleApiError(res)
    return res.json()
  },

  async delete(id: string): Promise<void> {
    const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" })
    await handleApiError(res)
  },
}
