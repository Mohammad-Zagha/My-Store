'use client'
import { axiosInstance } from '@/lib/Axios'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export const useAdminLogin = () => {
   const { push } = useRouter()

   return useMutation({
      mutationFn: async ({ email, password }: { email: string; password: string }) => {
         const { data } = await axiosInstance.post(
            '/admin/signin/',
            { email, password },
            {
               headers: {
                  'Content-Type': 'application/json',
               },
               withCredentials: true,
            },
         )
         return data
      },
      async onSuccess() {
         push('/admin')
      },
      onError: (error) => toast.error('حدث خطاء ما الرجاء المحاولة مرة اخرى'),
   })
}
