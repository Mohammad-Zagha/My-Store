'use client'
import { Button } from '@/components/chadcn/button'
import { InputBox } from '@/components/ui/input'
import { useAdminLogin } from '@/hooks/api/Auth'
import { AdminAuthSchema } from '@/lib/zod/Schemas'
import { T_Admin_Auth } from '@/types/objects'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'

const AdminLoginForm = () => {
   const { register, formState, handleSubmit } = useForm<T_Admin_Auth>({
      resolver: zodResolver(AdminAuthSchema),
      mode: 'all',
   })
   const loginMutaion = useAdminLogin()
   return (
      <form
         className="flex w-full flex-col gap-6 max-md:gap-4"
         onSubmit={handleSubmit((data) => {
            loginMutaion.mutateAsync(data)
            //redirect to dashboard
         })}
      >
         <InputBox
            {...register('email')}
            type="email"
            placeholder="البريد الاكتروني"
            isRequired
            label="البريد الاكتروني"
            instruction={{
               text: formState.errors.email?.message,
               type: 'error',
            }}
         />

         <InputBox
            {...register('password')}
            type="password"
            placeholder="كلمة المرور"
            isRequired
            label="كلمة المرور"
            instruction={{
               text: formState.errors.password?.message,
               type: 'error',
            }}
         />
         <Button className="w-1/2 mx-auto" type="submit" isLoading={loginMutaion.isPending}>
            تسجيل الدخول
         </Button>
      </form>
   )
}

export default AdminLoginForm
