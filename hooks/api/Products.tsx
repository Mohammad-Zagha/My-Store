import { axiosInstance } from '@/lib/Axios'
import { T_Category, T_Paginated_Response, T_Product } from '@/types/objects'
import { keepPreviousData, useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'

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
   return useQuery({
      queryKey: ['all-products'],
      queryFn: async () => {
         try {
            const { data } = await axiosInstance.get<T_Paginated_Response<T_Product>>('/products', {
               params: { page, limit },
            })
            return data
         } catch (error) {
            console.log(error)
         }
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
