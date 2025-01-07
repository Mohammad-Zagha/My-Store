'use client'
import { Button } from '@/components/chadcn/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/chadcn/dialog'
import CustomAlertDialog from '@/components/common/AlertDialog'
import CustomAvatar from '@/components/ui/ImageHandler'
import { InputBox } from '@/components/ui/input'
import { useUpdateProduct } from '@/hooks/api/Products'
import { cn } from '@/lib/utils'
import { T_Product } from '@/types/objects'
import { useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { useForm } from 'react-hook-form'
import { TbDiscountOff, TbPencilDiscount } from 'react-icons/tb'
import { toast } from 'sonner'

function AdminProductDiscountCard({ product }: { product: T_Product }) {
   const queryClient = useQueryClient()
   const { mutateAsync: updateProduct, isPending: updatePending } = useUpdateProduct()
   const { register, watch, setValue } = useForm<{ discount: number }>({
      defaultValues: {
         discount: product.discount,
      },
   })
   const handleEditDiscount = async ({ discount }: { discount: number }) => {
      await updateProduct(
         {
            ...product,
            discount: discount,
         },
         {
            onSuccess: () => {
               queryClient.invalidateQueries({ queryKey: ['discounted-products'] })
               toast.success('تم تعديل الخصم بنجاح')
            },
         },
      )
   }
   return (
      <div
         className=" w-full rounded-[30px] bg-background-light shadow-card p-2 grid grid-rows-[auto_minmax(0,1fr)] gap-y-2"
         dir="rtl"
      >
         <div className="w-full flex justify-between items-center gap-2 px-2">
            <span
               className={cn(
                  'font-extrabold text-lg  text-primary-dark',
                  product?.discount !== 0 && 'line-through text-primary-dark/50 text-sm decoration-[1px] ',
               )}
            >
               ₪ {product?.price ?? 'N/A'}
            </span>
            {product?.discount ? (
               <span className={cn('font-extrabold text-lg  text-primary-dark')}>
                  ₪ {(product.price - product.discount).toFixed(2)}
               </span>
            ) : null}
         </div>
         <CustomAvatar
            onHover={false}
            src={(product.images[0]?.url as string) ?? ''}
            alt={product.name}
            className="rounded-[30px] shadow-sm object-cover aspect-auto h-[250px] w-full hover:scale-105 transition-transform duration-300"
         />
         <span className="line-clamp-1  text-sm font-semibold text-primary-dark">{product.name}</span>
         <div className="w-full flex justify-between items-center p-2">
            <Dialog>
               <DialogTrigger asChild>
                  <Button size="icon" variant="ghost" className="ring-0  bg-primary-light hover:bg-primary-light  ">
                     <TbPencilDiscount className="text-gray-100 !size-[12px]" />
                  </Button>
               </DialogTrigger>
               <DialogContent className="bg-white flex center gap-2" dir="rtl">
                  <InputBox
                     value={watch('discount') ?? 0}
                     label="الخصم"
                     type="number"
                     onChange={(e) => {
                        const value = Number(e.target.value)
                        if (!isNaN(value)) {
                           setValue('discount', Number(value))
                        }
                     }}
                     placeholder="الخصم"
                     isRequired
                  />
                  <Button
                     variant={'default'}
                     className="mt-7 rounded-xl"
                     isLoading={updatePending}
                     onClick={() => handleEditDiscount({ discount: watch('discount') })}
                  >
                     حفظ
                  </Button>
               </DialogContent>
            </Dialog>
            <CustomAlertDialog
               header="تأكيد ازالة الخصم"
               description="هل أنت متأكد من أنك تريد إزالة الخصم من هذا المنتج؟"
               trigger={
                  <Button size="icon" variant="ghost" className="ring-0 bg-red-500 hover:bg-red-500 ">
                     <TbDiscountOff className="text-gray-100 !size-[12px]" />
                  </Button>
               }
               onClick={() => handleEditDiscount({ discount: 0 })}
            />
         </div>
      </div>
   )
}

export default AdminProductDiscountCard
