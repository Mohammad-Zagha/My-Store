'use client'
import { axiosInstance } from '@/lib/Axios'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export const useAdminLogin = () => {
   const { push } = useRouter()

   return useMutation({
      mutationFn: async ({ email, password }: { email: string; password: string }) => {
         const response = await axiosInstance.post(
            '/admin/signin/',
            { email, password },
            {
               headers: {
                  'Content-Type': 'application/json',
               },
               withCredentials: true,
            },
         )
         console.log(response)
         return response.data
      },
      onSuccess() {
         push('/admin')
      },
      onError: (error) => toast.error('حدث خطاء ما الرجاء المحاولة مرة اخرى'),
   })
}

export const useAdminSignup = () => {
   const { push } = useRouter()

   return useMutation({
      mutationFn: async ({ email, password }: { email: string; password: string }) => {
         const response = await axiosInstance.post(
            '/admin/signup/',
            { email, password },
            {
               headers: {
                  'Content-Type': 'application/json',
               },
               withCredentials: true,
            },
         )
         console.log(response)
         return response.data
      },
      onSuccess() {
         push('/admin')
      },
      onError: (error) => toast.error('حدث خطاء ما الرجاء المحاولة مرة اخرى'),
   })
}
