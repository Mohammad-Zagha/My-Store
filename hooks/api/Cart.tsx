import { T_CartItem } from '@/components/cart/CartItem'
import { axiosInstance } from '@/lib/Axios'
import { T_Cart, T_Product } from '@/types/objects'
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRef } from 'react'
import { toast } from 'sonner'

export function useGetCart() {
   return useQuery({
      queryKey: ['cart'],
      queryFn: async () => {
         try {
            const { data } = await axiosInstance.get<T_Cart>('/cart/cart/')
            return data
         } catch (error) {
            console.log(error)
         }
      },
      placeholderData: keepPreviousData,
   })
}

type T_Add_To_Cart_Response = {
   message: string
   cart: {
      items: {
         productId: string
         quantity: number
         name: string
         price: number
      }[]
   }
}
export function useAddToCart() {
   const queryClient = useQueryClient()
   return useMutation({
      mutationFn: async ({ product, quantity = 1 }: { product: T_Product; quantity: number }) => {
         const { data } = await axiosInstance.post<T_Add_To_Cart_Response>('/cart/add-to-cart/', {
            productId: product.id,
            quantity,
         })
         return data
      },
      onSuccess: () => {
         toast.success('تمت الاضافة الى السلة')
      },
      onMutate: async ({ product, quantity = 1 }: { product: T_Product; quantity: number }) => {
         const previousCart = queryClient.getQueryData<{ items: T_CartItem[] }>(['cart'])
         if (previousCart) {
            queryClient.setQueryData(['cart'], {
               ...previousCart,
               items: [
                  ...previousCart.items,
                  {
                     productId: product.id,
                     quantity,
                     name: product.name,
                     price: product.price,
                     image: product.images[0].url,
                     discountedPrice: product.discount,
                     description: product.description,
                  },
               ],
            })
         }
         return { previousCart }
      },
      onError: (err: any, variables, context) => {
         if (context?.previousCart) {
            queryClient.setQueryData(['cart'], context.previousCart)
         }
         if (err.response?.status === 404) {
            queryClient.setQueryData(['cart'], { items: [] })
            toast.error('انتهت جلسة سلتك ')
         } else {
            toast.error('حدث خطأ ما الرجاء المحاولة مرة اخرى')
         }
      },
      onSettled: () => {
         queryClient.invalidateQueries({ queryKey: ['cart'] })
      },
   })
}

export function useRemoveFromCart() {
   const queryClient = useQueryClient()

   return useMutation({
      mutationFn: async ({ productId }: { productId: string }) => {
         const { data } = await axiosInstance.delete<T_Add_To_Cart_Response>(`/cart/remove-from-cart/${productId}`)
         return data
      },
      onMutate: async ({ productId }: { productId: string }) => {
         await queryClient.cancelQueries({ queryKey: ['cart'] })
         const previousCart = queryClient.getQueryData<{ items: T_CartItem[] }>(['cart'])
         if (previousCart) {
            queryClient.setQueryData(['cart'], {
               ...previousCart,
               items: previousCart.items.filter((item) => item.productId !== productId),
            })
         }

         return { previousCart }
      },
      onError: (err: any, variables, context) => {
         if (context?.previousCart) {
            queryClient.setQueryData(['cart'], context.previousCart)
         }

         if (err.response?.status === 404) {
            queryClient.setQueryData(['cart'], { items: [] })

            toast.error('انتهت جلسة سلتك ')
         } else {
            toast.error('حدث خطأ ما الرجاء المحاولة مرة اخرى')
         }
      },
      onSettled: () => {
         queryClient.invalidateQueries({ queryKey: ['cart'] })
      },
   })
}

export function useIncreaseQuantity() {
   const queryClient = useQueryClient()

   return useMutation({
      mutationFn: async ({ productId, totalQuantity }: { productId: string; totalQuantity: number }) => {
         const { data } = await axiosInstance.post(`/cart/increase-quantity/${productId}`, { quantity: totalQuantity })
         return data
      },
      onMutate: async ({ productId, totalQuantity }: { productId: string; totalQuantity: number }) => {
         const previousCart = queryClient.getQueryData<{ items: T_CartItem[] }>(['cart'])
         if (previousCart) {
            queryClient.setQueryData(['cart'], {
               ...previousCart,
               items: previousCart.items.map((item) =>
                  item.productId === productId ? { ...item, quantity: item.quantity + totalQuantity } : item,
               ),
            })
         }
         return { previousCart }
      },
      onError: (err: any, variables, context) => {
         if (context?.previousCart) {
            queryClient.setQueryData(['cart'], context.previousCart)
         }

         if (err.response?.status === 404) {
            queryClient.setQueryData(['cart'], { items: [] })
            toast.error('انتهت جلسة سلتك ')
         } else {
            toast.error('حدث خطأ ما الرجاء المحاولة مرة اخرى')
         }
      },
      // onSettled: () => {
      //    queryClient.invalidateQueries({ queryKey: ['cart'] })
      // }
   })
}

export function useBatchIncreaseQuantity() {
   const { mutate } = useIncreaseQuantity()
   const quantityQueueRef = useRef<{ [productId: string]: number }>({})
   const debounceTimeoutRef = useRef<{ [productId: string]: NodeJS.Timeout }>({})
   const handleIncreaseQuantity = ({ productId }: { productId: string }) => {
      // Initialize queue for the product if it doesn't exist
      if (!quantityQueueRef.current[productId]) {
         quantityQueueRef.current[productId] = 0
      }

      // Add one to the queued quantity
      quantityQueueRef.current[productId] += 1

      // Clear any existing timeout
      if (debounceTimeoutRef.current[productId]) {
         clearTimeout(debounceTimeoutRef.current[productId])
      }

      // Set a new timeout to process the queue after a delay
      debounceTimeoutRef.current[productId] = setTimeout(() => {
         const totalQuantity = quantityQueueRef.current[productId]
         delete quantityQueueRef.current[productId] // Clear the queue for the product
         delete debounceTimeoutRef.current[productId] // Clear the timeout for the product

         // Trigger the mutation with the consolidated quantity
         mutate({ productId, totalQuantity })
      }, 300) // Adjust delay as needed
   }

   return handleIncreaseQuantity
}

export function useDecreaseQuantity() {
   const queryClient = useQueryClient()

   return useMutation({
      mutationFn: async ({ productId, totalQuantity }: { productId: string; totalQuantity: number }) => {
         const { data } = await axiosInstance.post(`/cart/decrease-quantity/${productId}`, { quantity: totalQuantity })
         return data
      },
      onMutate: async ({ productId, totalQuantity }: { productId: string; totalQuantity: number }) => {
         const previousCart = queryClient.getQueryData<{ items: T_CartItem[] }>(['cart'])
         if (previousCart) {
            queryClient.setQueryData(['cart'], {
               ...previousCart,
               items: previousCart.items.map((item) =>
                  item.productId === productId
                     ? { ...item, quantity: Math.max(item.quantity - totalQuantity, 0) }
                     : item,
               ),
            })
         }
         return { previousCart }
      },
      onError: (err: any, variables, context) => {
         if (context?.previousCart) {
            queryClient.setQueryData(['cart'], context.previousCart)
         }

         if (err.response?.status === 404) {
            queryClient.setQueryData(['cart'], { items: [] })
            toast.error('انتهت جلسة سلتك ')
         } else {
            toast.error('حدث خطأ ما الرجاء المحاولة مرة اخرى')
         }
      },
      //    onSettled: () => {
      //    queryClient.invalidateQueries({ queryKey: ['cart'] })
      // }
   })
}

export function useBatchDecreaseQuantity() {
   const { mutate } = useDecreaseQuantity()
   const queryClient = useQueryClient()
   const quantityQueueRef = useRef<{ [productId: string]: number }>({})
   const debounceTimeoutRef = useRef<{ [productId: string]: NodeJS.Timeout }>({})

   const handleDecreaseQuantity = ({ productId }: { productId: string }) => {
      // Initialize queue for the product if it doesn't exist
      if (!quantityQueueRef.current[productId]) {
         quantityQueueRef.current[productId] = 0
      }

      // Add one to the queued quantity
      quantityQueueRef.current[productId] += 1

      // Clear any existing timeout
      if (debounceTimeoutRef.current[productId]) {
         clearTimeout(debounceTimeoutRef.current[productId])
      }

      // Set a new timeout to process the queue after a delay
      debounceTimeoutRef.current[productId] = setTimeout(() => {
         const totalQuantity = quantityQueueRef.current[productId]
         delete quantityQueueRef.current[productId] // Clear the queue for the product
         delete debounceTimeoutRef.current[productId] // Clear the timeout for the product

         // Ensure we don't decrease below 1
         const cart = queryClient.getQueryData<{ items: T_CartItem[] }>(['cart'])
         const currentItem = cart?.items.find((item) => item.productId === productId)
         const currentQuantity = currentItem?.quantity ?? 0

         if (currentQuantity <= 1) {
            toast.error('لا يمكن تقليل الكمية إلى أقل من واحد')
            return
         }

         // Adjust totalQuantity to prevent excessive decreases
         const adjustedQuantity = Math.min(totalQuantity, currentQuantity - 1)

         if (adjustedQuantity > 0) {
            mutate({ productId, totalQuantity: adjustedQuantity })
         }
      }, 300) // Adjust delay as needed
   }

   return handleDecreaseQuantity
}

type T_Cart_Checkout = {
   // city:string,
   // address:string,
   name: string
   // lastName:string,
   phone: string
}
export function useCheckoutMutation() {
   return useMutation({
      mutationFn: async (details: T_Cart_Checkout) => {
         const { data } = await axiosInstance.post('/cart/checkout/', details)
         return data
      },
      onSuccess: () => {
         toast.success('تم ارسال الطلب بنجاح')
      },
   })
}
