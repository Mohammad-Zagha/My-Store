import { T_CartItem } from '@/components/cart/CartItem'
import { axiosInstance } from '@/lib/Axios'
import { T_Paginated_Response, T_Product } from '@/types/objects'
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export type T_Admin_Order = {
   id: string
   city: string
   address: string
   name: string
   phone: string
   items: (T_Product & { quantity: number })[]
   status: 'new' | 'pending' | 'completed' | 'canceled' // Use union type for specific statuses
   totalAmount: number
   initialAmount: number
   numberOfOfferItems: number
   totalDiscountAmount: number
   createdAt: string // Use
}
export function useGetAllOrders() {
   return useQuery({
      queryKey: ['completed_orders'],
      queryFn: async () => {
         try {
            const { data } = await axiosInstance.get<T_Paginated_Response<T_Admin_Order>>('/order/orders')
            return data
         } catch (error) {
            console.log(error)
         }
      },
      placeholderData: keepPreviousData,
   })
}

export function useUpdateOrderStatus() {
   const queryClient = useQueryClient()
   return useMutation({
      mutationFn: async ({ status, id }: { status: string; id: string }) => {
         try {
            const { data } = await axiosInstance.put(`/order/orders/${id}`, { status })
            return data
         } catch (error) {
            console.log(error)
         }
      },
      onMutate: async ({ status, id }: { status: string; id: string }) => {
         await queryClient.cancelQueries({ queryKey: ['completed_orders'] })
         const previousOrders = queryClient.getQueryData<T_Paginated_Response<T_Admin_Order>>(['completed_orders'])
         if (previousOrders) {
            queryClient.setQueryData(['completed_orders'], {
               ...previousOrders,
               data: previousOrders.results.map((order) => (order.id === id ? { ...order, status } : order)),
            })
         }

         return { previousOrders }
      },
      onError: (err: any, variables, context) => {
         if (context?.previousOrders) {
            queryClient.setQueryData(['completed_orders'], context.previousOrders)
         }
      },
      onSettled: () => {
         queryClient.invalidateQueries({ queryKey: ['completed_orders'] })
      },
   })
}
