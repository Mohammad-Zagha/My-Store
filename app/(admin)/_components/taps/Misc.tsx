'use client'
import { AddButton, FullAddButton } from '@/components/animated/AddButton'
import { Button } from '@/components/chadcn/button'
import { DialogContent, DialogTrigger } from '@/components/chadcn/dialog'
import DataTable from '@/components/ui/DataTable'
import { Input, InputBox } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/Skeletons'
import { T_DeliveryAddress, useAddDeliveryAddress, useDeleteDeliveryAddress } from '@/hooks/api/Admin'
import { useGetDeliveryAdress } from '@/hooks/api/Cart'
import { deliveryAddressSchema } from '@/lib/zod/Schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Dialog } from '@radix-ui/react-dialog'
import { useQueryClient } from '@tanstack/react-query'
import { ColumnDef } from '@tanstack/react-table'
import React, { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { MdOutlineDelete } from 'react-icons/md'
import { toast } from 'sonner'
import { EditDeliveryAddressDialog } from '../EditDeliveryAddressDialog'

const Misc = () => {
   return (
      <div className="w-full h-full grid grid-cols-12 " dir="rtl">
         <AddressDataTable />
      </div>
   )
}

export default Misc

function AddressDataTable() {
   const { data: addresses, isLoading } = useGetDeliveryAdress()
   const { mutate: addAddressMutation, isPending } = useAddDeliveryAddress()
   const { mutate: deleteAddressMutation, isPending: isDeleting } = useDeleteDeliveryAddress()
   const queryClient = useQueryClient()
   const { register, formState, handleSubmit, watch, setValue, trigger, reset } = useForm<T_DeliveryAddress>({
      resolver: zodResolver(deliveryAddressSchema),
      mode: 'all',
      defaultValues: {
         cost: 0,
      },
   })
   const Columns: ColumnDef<T_DeliveryAddress>[] = useMemo(
      () => [
         {
            header: 'المدينة',
            accessorKey: 'address',
            cell: ({ row }) => <span className=" text-sm font-semibold">{row.original.address}</span>,
         },
         {
            header: 'سعر التوصيل',
            accessorKey: 'cost',
            cell: ({ row }) => <div className=" text-sm font-semibold  w-[50%] text-center ">{row.original.cost}</div>,
         },
         {
            header: 'العمليات',
            accessorKey: 'operations',
            cell: ({ row }) => (
               <div className="w-[50%] flex justify-center items-center gap-2   ">
                  <Button
                     size={'sm'}
                     variant={'destructive'}
                     isLoading={isDeleting}
                     onClick={() => handleDelete(row.original.id)}
                  >
                     <MdOutlineDelete className="tex-lg" size={10} />
                  </Button>
                  <EditDeliveryAddressDialog address={row.original} />
               </div>
            ),
         },
      ],
      [],
   )
   const onSubmit = (data: T_DeliveryAddress) => {
      trigger()
      addAddressMutation(
         {
            data,
         },
         {
            onSuccess: () => {
               reset()
               toast.success('تم اضافة المدينة بنجاح')
               queryClient.invalidateQueries({ queryKey: ['delivery-address'] })
            },
         },
      )
   }
   const handleDelete = (id: string) => {
      deleteAddressMutation(
         { id },
         {
            onSuccess: () => {
               toast.success('تم حذف المدينة بنجاح')
               queryClient.invalidateQueries({ queryKey: ['delivery-address'] })
            },
         },
      )
   }

   return (
      <div className=" col-span-full lg:col-span-6 xl:col-span-4  h-full  flex flex-col gap-2 ">
         <div className="flex items-center gap-1">
            <span className="text-sm font-semibold ">المدن و اسعار التوصيل</span>
            <span className="text-sm font-semibold ">
               {isLoading ? (
                  <Skeleton className="h-5 w-10 rounded-lg bg-background-dark"></Skeleton>
               ) : (
                  addresses?.length
               )}
            </span>
         </div>
         <div className="overflow-y-auto shadow-card flex flex-col gap-2 rounded-lg p-2 ring-1 ring-gray-100 h-full">
            <div className="h-fit  rounded-lg flex justify-between items-center ">
               <Input placeholder="بحث" className="w-2/3 !rounded-lg" />
               <Dialog>
                  <DialogTrigger asChild>
                     <AddButton />
                  </DialogTrigger>
                  <DialogContent className="bg-white " dir="rtl">
                     <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-2 gap-y-4">
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
                        <FullAddButton className="col-span-full center  text-sm" type="submit" isLoading={isPending}>
                           اضافة عنوان
                        </FullAddButton>
                     </form>
                  </DialogContent>
               </Dialog>
            </div>
            <DataTable columns={Columns} data={addresses || []} />
         </div>
      </div>
   )
}
