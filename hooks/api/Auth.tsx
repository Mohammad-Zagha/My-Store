'use client'
import { axiosInstance } from '@/lib/Axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter, useSearchParams } from 'next/navigation'
import { toast } from 'sonner'

export const useAdminLogin = () => {
   const { push } = useRouter()
   const queryClient = useQueryClient()
   const searchParams = useSearchParams()
   return useMutation({
      mutationFn: async ({ email, password }: { email: string; password: string }) => {
         const { data } = await axiosInstance.post('/admin/signin/', { email, password })
         return data
      },
      async onSuccess() {
         push('/admin')
      },
      onError: (error) => toast.error('حدث خطاء ما الرجاء المحاولة مرة اخرى'),
   })
}
