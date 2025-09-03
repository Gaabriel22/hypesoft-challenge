import { Product } from "../types/Product"
import { handleApiError } from "../utils/handleApiError"

const BASE_URL = "http://localhost:5000/api/products"

export const productsService = {
  async getAll(): Promise<Product[]> {
    const res = await fetch(BASE_URL)
    await handleApiError(res)
    return res.json()
  },

  async getById(id: string): Promise<Product> {
    const res = await fetch(`${BASE_URL}/${id}`)
    await handleApiError(res)
    return res.json()
  },

  async create(product: Omit<Product, "id">): Promise<Product> {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    })
    await handleApiError(res)
    return res.json()
  },

  async update(id: string, product: Omit<Product, "id">): Promise<Product> {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    })
    await handleApiError(res)
    return res.json()
  },

  async delete(id: string): Promise<void> {
    const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" })
    await handleApiError(res)
  },
}
