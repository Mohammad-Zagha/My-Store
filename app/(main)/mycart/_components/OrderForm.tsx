import { Input, InputBox } from '@/components/ui/input'
import { T_Order } from '@/types/objects'
import React, { useEffect } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { orderSchema } from '@/lib/zod/Schemas'
import { Combobox } from '@/components/ui/combobox'
import { cn } from '@/lib/utils'
import { useCheckoutMutation, useGetDeliveryAdress } from '@/hooks/api/Cart'
import { useQueryClient } from '@tanstack/react-query'
import { FullAddButton } from '@/components/animated/AddButton'
import { IoBagCheckOutline } from 'react-icons/io5'
import { T_DeliveryAddress } from '@/hooks/api/Admin'
const OrderForm = ({
   disabled = true,
   setDeliveryAddress,
}: {
   disabled: boolean
   setDeliveryAddress: (address: T_DeliveryAddress | null) => void
}) => {
   const { mutateAsync: checkoutMutation, isPending: isCheckoutPending } = useCheckoutMutation()
   const { data: deliveryAddress, isPending } = useGetDeliveryAdress()
   const queryClient = useQueryClient()
   const { register, control, formState, handleSubmit, reset, trigger } = useForm<T_Order>({
      resolver: zodResolver(orderSchema),
      defaultValues: {
         city: '',
      },
      mode: 'all',
   })
   const onSubmit: SubmitHandler<T_Order> = (data) => {
      trigger()
      checkoutMutation(
         {
            name: data.firstName + ' ' + data.lastName,
            phone: data.phone,
            city: data.city,
            address: data.address,
         },
         {
            onSuccess: () => {
               queryClient.invalidateQueries({ queryKey: ['cart'] })
               reset()
               setDeliveryAddress(null)
            },
         },
      )
   }
   useEffect(() => {
      if (disabled) {
         reset()
         setDeliveryAddress(null)
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
                  options={deliveryAddress?.map((item) => item.address) ?? []}
                  value={field.value}
                  setValue={(value) => {
                     field.onChange(value)
                     const address = deliveryAddress?.find((item) => item.address === value)
                     if (address) {
                        setDeliveryAddress(address)
                     } else {
                        setDeliveryAddress(null)
                     }
                  }}
                  disabled={isPending}
                  label="المدينة"
                  placeholder="المدينة"
                  isRequired
                  triggerClassName="col-span-1 h-10 rounded-lg "
                  instructions={{
                     error: formState.errors.city?.message ?? '',
                  }}
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
         <FullAddButton
            className="col-span-full"
            disabled={disabled || isPending}
            isLoading={isCheckoutPending}
            icon={<IoBagCheckOutline className="text-white" size={24} />}
         >
            اكمال الطلب
         </FullAddButton>
      </form>
   )
}

export default OrderForm
