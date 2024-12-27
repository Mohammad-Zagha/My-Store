'use client'
import { axiosInstance } from '@/lib/Axios'
import { hasFileKey, objectToFormData } from '@/lib/utils'
import { T_Category, T_General_Response, T_Paginated_Response } from '@/types/objects'
import { keepPreviousData, useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export function useGetHomeCategories({ page = 1, limit = 5 }: { page: number; limit: number }) {
   return useInfiniteQuery({
      queryKey: ['admin-categories', { page, limit }],
      initialPageParam: 1,
      queryFn: async ({ pageParam = 1 }) => {
         try {
            const { data } = await axiosInstance.get<T_Paginated_Response<T_Category>>(`/categories/`, {
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
export function useUpdateCategory() {
   const queryClient = useQueryClient()
   return useMutation({
      mutationFn: async ({ id, values }: { id: string; values: Partial<T_Category> }) => {
         try {
            const hasFile = hasFileKey(values, 'image')
            const body = hasFile ? objectToFormData(values) : values

            const { data } = await axiosInstance.patch<T_General_Response>(
               `/categories/${id}`,
               body,

               {
                  headers: {
                     'Content-Type': hasFile ? 'multipart/form-data' : 'application/json',
                  },
               },
            )
            return data
         } catch (error) {
            console.log(error)
            throw error
         }
      },

      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['admin-categories'] })
      },
   })
}

export function useGetCategoryById(id: string) {
   return useQuery({
      queryKey: ['category', id],
      queryFn: async () => {
         try {
            const { data } = await axiosInstance.get<T_Category>(`/categories/${id}`)
            return data
         } catch (error) {
            console.log(error)
         }
      },
      placeholderData: keepPreviousData,
   })
}
