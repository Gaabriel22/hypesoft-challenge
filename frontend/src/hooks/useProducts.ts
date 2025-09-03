import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { productsService } from "./../services/productsService"
import { Product } from "../types/Product"

export function useProducts() {
  const queryClient = useQueryClient()

  const productsQuery = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: productsService.getAll,
  })

  const createProduct = useMutation<Product, Error, Omit<Product, "id">>({
    mutationFn: productsService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
    },
  })

  const updateProduct = useMutation<
    Product,
    Error,
    { id: string; product: Omit<Product, "id"> }
  >({
    mutationFn: ({ id, product }) => productsService.update(id, product),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
    },
  })

  const deleteProduct = useMutation<void, Error, string>({
    mutationFn: productsService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] })
    },
  })

  return { productsQuery, createProduct, updateProduct, deleteProduct }
}
