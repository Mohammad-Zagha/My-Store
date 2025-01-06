import { FullAddButton } from '@/components/animated/AddButton'
import { Button } from '@/components/chadcn/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/chadcn/dialog'
import { InputBox } from '@/components/ui/input'
import { T_DeliveryAddress, useUpdateDeliveryAddress } from '@/hooks/api/Admin'
import { deliveryAddressSchema } from '@/lib/zod/Schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { useForm } from 'react-hook-form'
import { MdModeEdit } from 'react-icons/md'
import { toast } from 'sonner'

export function EditDeliveryAddressDialog({ address }: { address: T_DeliveryAddress }) {
   const { mutate: updateAddressMutation, isPending } = useUpdateDeliveryAddress()
   const queryClient = useQueryClient()
   const onSubmit = (data: T_DeliveryAddress) => {
      trigger()
      updateAddressMutation(
         {
            data,
         },
         {
            onSuccess: () => {
               toast.success('تم تعديل المدينة بنجاح')
               queryClient.invalidateQueries({ queryKey: ['delivery-address'] })
            },
         },
      )
   }

   const { register, formState, handleSubmit, watch, setValue, trigger } = useForm<T_DeliveryAddress>({
      resolver: zodResolver(deliveryAddressSchema),
      mode: 'all',
      defaultValues: {
         ...address,
      },
   })
   return (
      <Dialog>
         <DialogTrigger asChild>
            <Button size={'sm'} variant={'outline'} className="hover:bg-primary-light/65">
               <MdModeEdit />
            </Button>
         </DialogTrigger>
         <DialogContent dir="rtl" className="bg-white">
            <form className="grid grid-cols-2 gap-2 gap-y-4" onSubmit={handleSubmit(onSubmit)}>
               <InputBox
                  {...register('address')}
                  label="المدينة"
                  name="address"
                  type="text"
                  placeholder="المدينة"
                  isRequired
                  instruction={{
                     text: formState.errors.address?.message,
                     type: 'error',
                  }}
               />
               <InputBox
                  value={watch('cost')}
                  onChange={(e) => setValue('cost', Number(e.target.value))}
                  label="سعر التوصيل"
                  name="cost"
                  type="number"
                  placeholder="سعر التوصيل"
                  isRequired
                  instruction={{
                     text: formState.errors.cost?.message,
                     type: 'error',
                  }}
               />
               <FullAddButton
                  isLoading={isPending}
                  className="col-span-full center font-Cairo text-sm"
                  type="submit"
                  icon={<MdModeEdit className="text-white size-5" />}
               >
                  تعديل العنوان
               </FullAddButton>
            </form>
         </DialogContent>
      </Dialog>
   )
}
