import AnimatedLink from '@/components/animated/AnimatedLink'
import CustomAvatar from '@/components/ui/ImageHandler'
import { useDeleteProduct } from '@/hooks/api/Products'
import { T_Product } from '@/types/objects'
import { IoPricetagsOutline } from 'react-icons/io5'
import { RiDiscountPercentLine } from 'react-icons/ri'
import { TbBuildingWarehouse } from 'react-icons/tb'
import ProductEditDialog from '../ProductEditDialog'
import CustomAlertDialog from '@/components/common/AlertDialog'
import { Button } from '@/components/chadcn/button'
import { AiFillDelete } from 'react-icons/ai'
import { toast } from 'sonner'

export function AdminProductCard({ product }: { product: T_Product }) {
   const deleteMutation = useDeleteProduct()
   return (
      <div
         className="h-[300px] w-full rounded-lg bg-background-dark/30 shadow-card p-2 grid grid-rows-[auto_minmax(0,1fr)]"
         dir="rtl"
      >
         <div className="w-full flex gap-2 items-center border-b pb-2 ">
            <CustomAvatar
               src={(product.images[0]?.url as string) ?? ''}
               alt={product.name}
               className="size-[70px] !rounded-lg  "
            />
            <div className="w-full flex flex-col h-full text-start justify-center gap-0.5">
               <span className=" ml-1 line-clamp-1 text-sm font-semibold"> {product.name}</span>
               <span className=" text-primary-light ml-1 line-clamp-1 text-xs font-semibold"> {product.productId}</span>
               <AnimatedLink
                  href={`/admin/products/${product.productId}`}
                  className="text-xs"
                  title={product.category.name}
               />
            </div>
         </div>
         <div className="h-full w-full flex flex-col gap-2  pt-2  font-Cairo text-sm font-semibold text-primary-dark/80 pb-2 border-b">
            <span className="font-Cairo text-xs text-primary-dark/70 line-clamp-2 font-normal  min-h-[40px] ">
               {product.description}
            </span>
            <div className="flex justify-between items-center">
               <div className="flex center w-fit gap-2">
                  <IoPricetagsOutline size={15} className="mt-1" />
                  <span>سعر المنتج</span>
               </div>
               <span>₪ {product.price} </span>
            </div>
            <div className="flex justify-between items-center">
               <div className="flex center w-fit gap-2">
                  <RiDiscountPercentLine size={15} className="mt-1" />
                  <span> الخصم الحالي </span>
               </div>
               <span>₪ {product.discount} </span>
            </div>
            <div className="flex justify-between items-center">
               <div className="flex center w-fit gap-2">
                  <TbBuildingWarehouse size={15} className="mt-1" />
                  <span> المخزون الحالي </span>
               </div>
               <span> {product.stock} </span>
            </div>
         </div>
         <div className="flex w-full justify-between p-1 pt-2">
            <ProductEditDialog product={product} />
            <CustomAlertDialog
               header="هل أنت متأكد من حذف المنتج؟"
               description="هل أنت متأكد من حذف المنتج ؟ لن يتم إعادة الحذف"
               trigger={
                  <Button
                     isLoading={deleteMutation.isPending}
                     size={'icon'}
                     variant={'ghost'}
                     className="ring-red-500 bg-red-50 hover:bg-red-100"
                  >
                     <AiFillDelete className="text-red-500 !size-3" />
                  </Button>
               }
               onClick={() => {
                  deleteMutation.mutate(product.productId, {
                     onSuccess: () => {
                        toast.success('تم حذف المنتج بنجاح')
                     },
                  })
               }}
            />
         </div>
      </div>
   )
}
