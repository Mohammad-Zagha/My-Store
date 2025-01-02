'use client'
import { axiosInstance } from '@/lib/Axios'
import { handleError, hasFileKey, objectToFormData } from '@/lib/utils'
import { T_Banner, T_Category, T_General_Response, T_Paginated_Response, T_Sort } from '@/types/objects'
import { keepPreviousData, useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export function useGetHomeCategories({
   page = 1,
   limit = 5,
   sort,
   search,
}: {
   page: number
   limit: number
   sort?: T_Sort
   search?: string
}) {
   return useInfiniteQuery({
      queryKey: ['admin-categories', { page, limit, sort, search }],
      initialPageParam: 1,
      queryFn: async ({ pageParam = 1 }) => {
         try {
            const { data } = await axiosInstance.get<T_Paginated_Response<T_Category>>(`/categories/`, {
               params: { page: pageParam, limit, sort, search },
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
export function useCreateCategory() {
   const queryClient = useQueryClient()
   return useMutation({
      mutationFn: async (values: T_Category) => {
         try {
            const hasFile = hasFileKey(values, 'image')
            const body = hasFile ? objectToFormData(values) : values

            const { data } = await axiosInstance.post<T_Category>(`/categories/`, body, {
               headers: {
                  'Content-Type': hasFile ? 'multipart/form-data' : 'application/json',
               },
            })
            return data
         } catch (error) {
            handleError(error)
            throw error
         }
      },
   })
}

export function useEditCategoryBanner() {
   const queryClient = useQueryClient()
   return useMutation({
      mutationFn: async ({ id, banner }: { id: string; banner: T_Banner }) => {
         try {
            const hasFile = hasFileKey(banner, 'image')
            const body = hasFile ? objectToFormData(banner) : banner
            const { data } = await axiosInstance.patch<T_Category>(`/categories/${id}/banner`, body, {
               headers: {
                  'Content-Type': hasFile ? 'multipart/form-data' : 'application/json',
               },
            })
            return data
         } catch (error) {
            handleError(error)
            throw error
         }
      },
   })
}
