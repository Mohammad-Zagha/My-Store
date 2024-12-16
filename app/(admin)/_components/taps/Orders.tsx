'use client'
import { CartPageItem } from '@/components/cart/CartItem'
import { Button } from '@/components/chadcn/button'
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from '@/components/chadcn/dialog'
import DataTable from '@/components/ui/DataTable'
import { T_Admin_Order, useGetAllOrders, useUpdateOrderStatus } from '@/hooks/api/Admin'
import { formatUTCDateToLocalTime } from '@/lib/utils'
import { ColumnDef } from '@tanstack/react-table'

import React, { useMemo } from 'react'
import { FaShoppingCart } from 'react-icons/fa'
import OrderItem from '../OrderItem'
import { toast } from 'sonner'

const Orders = () => {
   const { data: orders, isLoading } = useGetAllOrders()

   const tableData = orders?.results || []
   const Columns: ColumnDef<T_Admin_Order>[] = useMemo(
      () => [
         {
            header: 'الاسم',
            accessorKey: 'name',
            cell: ({ row }) => (
               <span className="font-Cairo text-sm font-semibold text-nowrap">{row.original.name}</span>
            ),
         },
         {
            header: 'المدينة',
            accessorKey: 'city',
            cell: ({ row }) => <span className="font-Cairo text-sm font-semibold">{row.original.city}</span>,
         },
         {
            header: 'رقم الهاتف',
            accessorKey: 'phone',
            cell: ({ row }) => <span className="font-Cairo text-sm font-semibold">{row.original.phone}</span>,
         },
         {
            header: 'الحالة',
            accessorKey: 'status',
            cell: ({ row }) => <StatusRow status={row.original.status} />,
         },
         {
            header: 'التاريخ',
            accessorKey: 'created_at',
            cell: ({ row }) => (
               <span className="font-Cairo text-sm font-semibold text-nowrap">
                  {formatUTCDateToLocalTime(row.original.createdAt).date}
               </span>
            ),
         },
         {
            header: 'السعر الكلي',
            accessorKey: 'total',
            cell: ({ row }) => (
               <span className="font-Cairo text-sm font-semibold">{row.original.totalAmount.toFixed(2)}</span>
            ),
         },
      ],
      [],
   )
   return (
      <div className="w-full h-full">
         <DataTable
            data={tableData}
            isPending={isLoading}
            columns={Columns}
            renderAccordionContent={(row) => <RenderAccordion row={row} />}
            modalContent={(row) => <RenderDialog row={row} />}
         />
      </div>
   )
}

export default Orders

function StatusRow({ status }: { status: string }) {
   const getStatusDetails = (status: string) => {
      switch (status) {
         case 'new':
            return { color: 'bg-green-500', label: 'جديد' }
         case 'pending':
            return { color: 'bg-yellow-500', label: 'تم الارسال' }
         case 'completed':
            return { color: 'bg-black', label: 'مكتمل' }
         default:
            return { color: 'bg-red-500', label: 'ملغي' }
      }
   }

   const { color, label } = getStatusDetails(status)

   return (
      <div className="flex items-center gap-2">
         <div className={`size-2 rounded-full mt-1 ${color}`} />
         <span className="font-Cairo text-sm font-semibold">{label}</span>
      </div>
   )
}

function RenderAccordion({ row }: { row: T_Admin_Order }) {
   return (
      <div className="w-full p-2 grid grid-cols-4 gap-y-3 max-md:grid-cols-2">
         <div className="col-span-1 flex flex-col gap-2 ">
            <h4 className="font-Cairo text-primary-light border-b pb-1">تفاصيل الطلب</h4>
            <div className="flex items-center gap-2 font-Cairo text-xs font-semibold">
               <span className=""> السعر قبل الخصومات :</span>
               <span>{row.initialAmount.toFixed(2)}</span>
            </div>
            <div className="flex items-center gap-2 font-Cairo text-xs font-semibold">
               <span className=""> السعر بعد الخصومات :</span>
               <span className=" text-sm">{row.totalAmount.toFixed(2)}</span>
            </div>
         </div>
         <div className="col-span-1 flex flex-col gap-2">
            <h4 className="font-Cairo text-primary-light border-b pb-1">تفاصيل الخصومات</h4>
            <div className="flex items-center gap-2 font-Cairo text-xs font-semibold">
               <span className=""> عدد الاصناف مع خصم :</span>
               <span>{row.numberOfOfferItems}</span>
            </div>
            <div className="flex items-center gap-2 font-Cairo text-xs font-semibold">
               <span className=""> مجموع الخصومات :</span>
               <span className=" text-sm">{row.totalDiscountAmount}</span>
            </div>
         </div>
         <div className="col-span-2 flex flex-col gap-2">
            <h4 className="font-Cairo text-primary-light border-b pb-1">العنوان </h4>
            <span className="font-Cairo text-xs font-semibold">{row.address}</span>
         </div>
      </div>
   )
}
function RenderDialog({ row }: { row: T_Admin_Order }) {
   const updateStatusMutation = useUpdateOrderStatus()
   return (
      <Dialog>
         <DialogTrigger asChild>
            <Button size={'icon'} className="bg-transparent text-primary-dark hover:bg-gray-100">
               <FaShoppingCart />
            </Button>
         </DialogTrigger>

         <DialogContent
            dir="rtl"
            className="max-w-full lg:max-w-[60%] xl:max-w-[50%] h-full lg:max-h-[80%] grid grid-rows-[auto_minmax(0,1fr)_auto] gap-6 !rounded-[2rem] max-lg:!rounded-none p-2 lg:p-6 bg-white"
         >
            {/* Header */}
            <div className="w-full flex justify-between items-center pl-8">
               <span className="font-Cairo text-sm font-semibold text-primary-dark">منتجات الطلبية</span>
               <StatusRow status={row.status} />
            </div>

            {/* Scrollable Content */}
            <div className="max-h-full overflow-y-auto w-full">
               {row && row.items.map((item, index) => <OrderItem item={item} key={index} />)}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center gap-4 mb-4 h-full  ">
               <div className="flex center w-fit gap-2">
                  {row.status === 'new' && (
                     <Button
                        size={'sm'}
                        className="text-white bg-primary-dark hover:bg-primary-dark/70"
                        onClick={() =>
                           updateStatusMutation.mutate(
                              {
                                 id: row.id,
                                 status: 'pending',
                              },
                              {
                                 onSuccess: () => {
                                    toast.success('تم البداء في الطلب بنجاح')
                                 },
                              },
                           )
                        }
                     >
                        البدا في الطلب
                     </Button>
                  )}
                  {row.status === 'pending' && (
                     <Button
                        size={'sm'}
                        className="text-white bg-primary-dark hover:bg-primary-dark/70"
                        onClick={() =>
                           updateStatusMutation.mutate(
                              {
                                 id: row.id,
                                 status: 'completed',
                              },
                              {
                                 onSuccess: () => {
                                    toast.success('تم انهاء في الطلب بنجاح')
                                 },
                              },
                           )
                        }
                     >
                        انهاء الطلب
                     </Button>
                  )}
                  <Button
                     size={'sm'}
                     className="text-primary-dark bg-error hover:bg-error/70"
                     disabled={row.status === 'canceled'}
                     onClick={() =>
                        updateStatusMutation.mutate(
                           { id: row.id, status: 'canceled' },
                           {
                              onSuccess: () => {
                                 toast.success('تم الغاء الطلب بنجاح')
                              },
                           },
                        )
                     }
                  >
                     الغاء
                  </Button>
               </div>
               <div className="flex flex-col items-center gap-2 h-full ">
                  <span className="font-Cairo text-lg font-semibold text-primary-dark">
                     {row.totalAmount.toFixed(2)}
                  </span>
               </div>
            </div>
         </DialogContent>
      </Dialog>
   )
}
