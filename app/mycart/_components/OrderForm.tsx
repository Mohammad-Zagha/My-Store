import { Input, InputBox } from '@/components/ui/input'
import { T_Order } from '@/types/objects'
import React, { useEffect } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { orderSchema } from '@/lib/zod/Schemas'
import { Combobox } from '@/components/ui/combobox'
import { Button } from '@/components/chadcn/button'
import { cn } from '@/lib/utils'
import { useCheckoutMutation } from '@/hooks/api/Cart'
import { useQueryClient } from '@tanstack/react-query'
const OrderForm = ({ disabled = true }: { disabled: boolean }) => {
   const checkoutMutation = useCheckoutMutation()
   const queryClient = useQueryClient()
   const { register, control, formState, handleSubmit, reset, getValues } = useForm<T_Order>({
      resolver: zodResolver(orderSchema),
      defaultValues: {},
      mode: 'all',
   })
   const onSubmit: SubmitHandler<T_Order> = (data) => {
      checkoutMutation.mutateAsync(
         {
            name: data.firstName + ' ' + data.lastName,
            phone: data.phone,
         },
         {
            onSuccess: () => {
               queryClient.invalidateQueries({ queryKey: ['cart'] })
               reset()
            },
         },
      )
   }
   useEffect(() => {
      if (disabled) {
         reset()
      }
   }, [disabled])
   return (
      <form
         className={cn(
            'w-full h-full grid grid-cols-2 grid-rows-[auto_minmax(0,1fr)] gap-2 ',
            disabled ? 'pointer-events-none opacity-50' : '',
         )}
         onSubmit={handleSubmit(onSubmit)}
      >
         <InputBox
            {...register('firstName')}
            label="الاسم الاول"
            isRequired
            containerClassName="col-span-1"
            instruction={{
               text: formState.errors.firstName?.message ?? '',
               type: 'error',
            }}
         />
         <InputBox
            label="الاسم الاخير"
            {...register('lastName')}
            isRequired
            containerClassName="col-span-1"
            instruction={{
               text: formState.errors.lastName?.message ?? '',
               type: 'error',
            }}
         />
         <Controller
            name="city"
            control={control}
            render={({ field }) => (
               <Combobox
                  options={['رام الله', 'طولكرم', 'نابلس', 'الخليل']}
                  value={field.value}
                  setValue={(value) => field.onChange(value)}
                  label="المدينة"
                  placeholder="المدينة"
                  isRequired
                  triggerClassName="col-span-1 h-10 rounded-lg "
               />
            )}
         />
         <InputBox
            label="رقم الهاتف"
            isRequired
            containerClassName="col-span-1"
            {...register('phone')}
            instruction={{
               text: formState.errors.phone?.message ?? '',
               type: 'error',
            }}
         />

         <InputBox
            label="العنوان"
            isRequired
            {...register('address')}
            containerClassName="col-span-full"
            instruction={{
               text: formState.errors.address?.message ?? '',
               type: 'error',
            }}
         />
         {/* <InputBox label="البريد الالكتروني" type="email" {...register('email')} containerClassName="col-span-full" /> */}
         <Button type="submit" size={'sm'} className="col-span-full" disabled={!formState.isValid}>
            اكمال الطلب
         </Button>
      </form>
   )
}

export default OrderForm
