'use client'
import { axiosInstance } from '@/lib/Axios'
import { handleError, hasFileKey, hasProductImageKey, objectToFormData } from '@/lib/utils'
import { T_Category, T_Paginated_Response, T_Product, T_Sort } from '@/types/objects'
import { keepPreviousData, useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export function useGetCategoryProducts({
   page = 1,
   limit = 5,
   id,
   sort = '',
   search = '',
}: {
   page: number
   limit: number
   id: string
   sort?: T_Sort
   search?: string
}) {
   return useInfiniteQuery({
      queryKey: ['category-products', { id, page, limit, sort, search }],
      initialPageParam: 1,
      queryFn: async ({ pageParam = 1 }) => {
         try {
            const { data } = await axiosInstance.get<T_Paginated_Response<T_Product>>(`/products/category/${id}`, {
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
export function useGetAllProducts({
   page = 1,
   limit = 8,
   newest = false,
   search,
   sort,
}: {
   page: number
   limit: number
   newest?: boolean
   search?: string
   sort?: 'lowestPrice' | 'highestPrice'
}) {
   return useInfiniteQuery({
      queryKey: ['products', { page, limit, search, newest, sort }],
      initialPageParam: 1,
      queryFn: async ({ pageParam = 1 }) => {
         try {
            const { data } = await axiosInstance.get<T_Paginated_Response<T_Product>>(`/products`, {
               params: { page: pageParam, limit, newest, search, sort },
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
   return useMutation({
      mutationFn: async (product: Partial<T_Product>) => {
         try {
            const hasImage = hasProductImageKey(product)
            const body = hasImage ? objectToFormData(product) : product
            const { data } = await axiosInstance.patch<T_Product>(`/products/${product.productId}`, body, {
               headers: {
                  'Content-Type': hasImage ? 'multipart/form-data' : 'application/json',
               },
            })
            return data
         } catch (error: any) {
            handleError(error)
            throw error
         }
      },
   })
}

export function useDeleteProduct() {
   const queryClient = useQueryClient()

   return useMutation({
      mutationFn: async (id: string) => {
         const { data } = await axiosInstance.delete(`/products/${id}`)
         return data
      },
      onMutate: async (id: string) => {
         await queryClient.cancelQueries({ queryKey: ['products'] })

         const previousData = queryClient.getQueriesData({ queryKey: ['products'] })

         queryClient.setQueriesData({ queryKey: ['products'] }, (oldData: any) => {
            if (!oldData) return
            return {
               ...oldData,
               pages: oldData.pages.map((page: T_Paginated_Response<T_Product>) => ({
                  ...page,
                  results: page.results.filter((item: T_Product) => item.productId !== id),
               })),
            }
         })

         // Return context with previous data for rollback
         return { previousData }
      },
      onError: (err, id, context: any) => {
         // Rollback to previous cache state
         if (context?.previousData) {
            queryClient.setQueriesData({ queryKey: ['products'] }, context.previousData)
         }
         console.error(err)
      },
      onSuccess: () => {
         toast.success('تم حذف المنتج بنجاح')
      },
   })
}

export function useGetDiscountedProducts({ page = 1, limit = 8 }: { page: number; limit: number }) {
   return useInfiniteQuery({
      queryKey: ['discounted-products', { page, limit }],
      initialPageParam: 1,
      queryFn: async ({ pageParam = 1 }) => {
         try {
            const { data } = await axiosInstance.get<T_Paginated_Response<T_Product>>(`/products/discounted`, {
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

export function useAddProduct() {
   const queryClient = useQueryClient()

   return useMutation({
      mutationFn: async ({ product }: { product: T_Product }) => {
         const hasImage = hasProductImageKey(product)
         const body = objectToFormData(product)
         const { data } = await axiosInstance.post<T_Product>(`/products`, body, {
            headers: {
               'Content-Type': hasImage ? 'multipart/form-data' : 'application/json',
            },
         })
         return data
      },
   })
}

export function useGetNewProducts({ page = 1, limit = 8 }: { page: number; limit: number }) {
   return useInfiniteQuery({
      queryKey: ['new-products', { page, limit }],
      initialPageParam: 1,
      queryFn: async ({ pageParam = 1 }) => {
         try {
            const { data } = await axiosInstance.get<T_Paginated_Response<T_Product>>(`/products/new`, {
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
export function useGetMostSoldProducts({ page = 1, limit = 8 }: { page: number; limit: number }) {
   return useInfiniteQuery({
      queryKey: ['most-sold-products', { page, limit }],
      initialPageParam: 1,
      queryFn: async ({ pageParam = 1 }) => {
         try {
            const { data } = await axiosInstance.get<T_Paginated_Response<T_Product>>(`/products/mostSold`, {
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
