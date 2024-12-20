import { axiosInstance } from '@/lib/Axios'
import { hasFileKey, objectToFormData } from '@/lib/utils'
import { T_Category, T_Paginated_Response, T_Product } from '@/types/objects'
import { keepPreviousData, useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export function useGetCategoryProducts({ page = 1, limit = 5, id }: { page: number; limit: number; id: string }) {
   return useInfiniteQuery({
      queryKey: ['category-products', { id, page, limit }],
      initialPageParam: 1,
      queryFn: async ({ pageParam = 1 }) => {
         try {
            const { data } = await axiosInstance.get<T_Paginated_Response<T_Product>>(`/products/category/${id}`, {
               params: { page: pageParam, limit },
            })
            return data
         } catch (error) {
            console.log(error)
         }
      },
      getNextPageParam: (lastPage, allPages) => {
         // Ensure lastPage has a nextPage property
         if (lastPage?.hasNextPage) {
            console.log(lastPage)
            return lastPage.nextPage
         }
         return undefined // No more pages
      },

      placeholderData: keepPreviousData,
   })
}
export function useGetAllProducts({ page = 1, limit = 8 }: { page: number; limit: number }) {
   return useInfiniteQuery({
      queryKey: ['products', { page, limit }],
      initialPageParam: 1,
      queryFn: async ({ pageParam = 1 }) => {
         try {
            const { data } = await axiosInstance.get<T_Paginated_Response<T_Product>>(`/products`, {
               params: { page: pageParam, limit },
            })
            return data
         } catch (error) {
            console.log(error)
         }
      },
      getNextPageParam: (lastPage, allPages) => {
         // Ensure lastPage has a nextPage property
         if (lastPage?.hasNextPage) {
            return lastPage.nextPage
         }
         return undefined // No more pages
      },

      placeholderData: keepPreviousData,
   })
}
export function useGetProduct(id: string) {
   return useQuery({
      queryKey: ['product', id],
      queryFn: async () => {
         try {
            const { data } = await axiosInstance.get<T_Product>(`/products/${id}`)
            return data
         } catch (error) {
            console.log(error)
         }
      },
      placeholderData: keepPreviousData,
   })
}

export function useUpdateProduct() {
   const queryClient = useQueryClient()

   return useMutation({
      mutationFn: async (product: Partial<T_Product>) => {
         try {
            const hasImage = hasProductImageKey(product)
            console.log(hasImage)
            const body = objectToFormData(product)
            const { data } = await axiosInstance.patch<T_Product>(`/products/${product.productId}`, body, {
               headers: {
                  'Content-Type': hasImage ? 'multipart/form-data' : 'application/json',
               },
            })
            return data
         } catch (error) {
            console.log(error)
            throw error
         }
      },
      onSuccess: (updatedProduct) => {
         console.log(updatedProduct)
         queryClient.setQueriesData({ queryKey: ['products'] }, (oldData: any) => {
            if (!oldData) return
            const updatedData = {
               ...oldData,
               pages: oldData.pages.map((page: T_Paginated_Response<T_Product>) => {
                  const updatedItems = page.results.map((item: T_Product) =>
                     item.productId === updatedProduct.productId ? updatedProduct : item,
                  )
                  return { ...page, results: updatedItems }
               }),
            }
            return updatedData
         })
      },
   })
}

export function useDeleteProduct() {
   const queryClient = useQueryClient()
   return useMutation({
      mutationFn: async (id: string) => {
         try {
            const { data } = await axiosInstance.delete(`/products/${id}`)
            return data
         } catch (error) {
            console.log(error)
         }
      },
      onSettled: () => {
         queryClient.invalidateQueries({ queryKey: ['products'] })
      },
   })
}

function hasProductImageKey(product: Partial<T_Product>): boolean {
   return product.images?.some((image) => image.url instanceof File) ?? false
}
