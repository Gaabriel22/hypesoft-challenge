import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { categoriesService } from "../services/categoriesService"
import { Category } from "../types/Category"

export function useCategories() {
  const queryClient = useQueryClient()

  const categoriesQuery = useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: categoriesService.getAll,
  })

  const createCategory = useMutation<Category, Error, Omit<Category, "id">>({
    mutationFn: categoriesService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] })
    },
  })

  const updateCategory = useMutation<
    Category,
    Error,
    { id: string; category: Omit<Category, "id"> }
  >({
    mutationFn: ({ id, category }) => categoriesService.update(id, category),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] })
    },
  })

  const deleteCategory = useMutation<void, Error, string>({
    mutationFn: categoriesService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] })
    },
  })

  return {
    categoriesQuery,
    createCategory,
    updateCategory,
    deleteCategory,
  }
}
