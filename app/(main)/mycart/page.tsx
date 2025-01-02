'use client'
import { CartPageItem } from '@/components/cart/CartItem'
import TextAreaBox from '@/components/common/text-area-box'
import { useGetCart } from '@/hooks/api/Cart'
import React, { useEffect } from 'react'
import OrderForm from './_components/OrderForm'
import { cn } from '@/lib/utils'
import { BsFillBagHeartFill } from 'react-icons/bs'
import AnimatedLink from '@/components/animated/AnimatedLink'
import { T_DeliveryAddress } from '@/hooks/api/Admin'
import { Skeleton } from '@/components/ui/Skeletons'

const Page = () => {
   const { data: cart, isLoading, error } = useGetCart()
   const [total, setTotal] = React.useState<number>(0)
   const [deliveryAddress, setDeliveryAddress] = React.useState<T_DeliveryAddress | null>(null)

   useEffect(() => {
      if (cart) {
         const total = cart.items
            .reduce((acc, item) => acc + (item.price - item.discount) * item.quantity, 0)
            .toFixed(2)
         setTotal(Number(total))
      }
   }, [cart])

   return (
      <div className="min-h-screen w-screen bg-background-dark grid grid-cols-12 p-8 pt-20 gap-4" dir="rtl">
         {/* Cart Section */}
         <div className="col-span-8 bg-white rounded-xl flex flex-col justify-between p-6 max-md:col-span-full">
            {isLoading ? (
               <div className="space-y-4">
                  <Skeleton className="h-8 w-1/4 mx-auto" />
                  <div className="flex-1 max-h-[350px] min-h-[350px] px-2 overflow-y-auto flex flex-col gap-2">
                     {Array.from({ length: 4 }).map((_, index) => (
                        <Skeleton key={index} className="h-20 w-full" />
                     ))}
                  </div>
                  <Skeleton className="h-12 w-full mt-4" />
               </div>
            ) : (
               <>
                  {/* Title Section */}
                  <div className="flex items-center justify-center gap-2 mb-4">
                     <h2 className="text-primary-dark font-Cairo">السلة خاصتك</h2>
                     {cart && cart?.items.length > 0 && (
                        <h2 className="text-primary-dark font-Cairo">({cart?.items.length})</h2>
                     )}
                  </div>

                  {/* Cart Items */}
                  <div
                     className={cn(
                        'flex-1 max-h-[350px] min-h-[350px] px-2 overflow-y-auto gap-2 flex flex-col',
                        cart && cart.items.length > 0 ? '' : 'flex center w-full',
                     )}
                  >
                     {cart && cart.items.length > 0 ? (
                        cart.items.map((item) => <CartPageItem key={item.productId} cartItem={item} />)
                     ) : (
                        <div className="flex flex-col items-center">
                           <BsFillBagHeartFill size={80} />
                           <span className="text-lg font-Cairo">السلة فارغة</span>
                           <AnimatedLink href={'/'} className="text-primary-light text-sm" title="تسوق الان" />
                        </div>
                     )}
                  </div>

                  {/* Notes Section */}
                  <div className="mt-4">
                     <TextAreaBox
                        label="اضف ملاحظاتك"
                        className="w-full rounded-xl"
                        labelClassName="font-Cairo font-semibold"
                     />
                  </div>
               </>
            )}
         </div>

         {/* Summary Section */}
         <div className="col-span-4 max-md:mb-6 bg-white rounded-xl flex flex-col max-md:col-span-full">
            {isLoading ? (
               <div className="p-6 space-y-4">
                  <Skeleton className="h-6 w-1/4 mx-auto" />
                  {Array.from({ length: 4 }).map((_, index) => (
                     <Skeleton key={index} className="h-6 w-full" />
                  ))}
                  <Skeleton className="h-12 w-full mt-4" />
               </div>
            ) : (
               <>
                  <div className="p-6 space-y-4 h-fit text-center">
                     <h2 className="text-primary-dark font-Cairo ">المجموع</h2>
                     <div className="flex justify-between items-center gap-2">
                        <span className="text-primary-dark font-Cairo">المجموع الفرعي</span>
                        <span className="text-primary-dark font-Cairo">{total} ₪</span>
                     </div>
                     <div className="flex justify-between items-center gap-2">
                        <span className="text-primary-dark font-Cairo">الشحن</span>
                        <span className="text-primary-dark font-Cairo">
                           {deliveryAddress ? `${deliveryAddress.cost} ₪` : 'حدد مدينتك'}
                        </span>
                     </div>
                     <div className="flex justify-between items-center gap-2">
                        <span className="text-primary-dark font-Cairo">الضريبة</span>
                        <span className="text-primary-dark font-Cairo">00.00 ₪</span>
                     </div>
                     <div className="flex justify-between items-center gap-2 font-bold">
                        <span className="text-primary-dark font-Cairo">المجموع الكلي</span>
                        <span className="text-primary-dark font-Cairo">
                           {deliveryAddress ? `${total + deliveryAddress.cost} ₪` : 'حدد مدينتك'}
                        </span>
                     </div>
                  </div>
                  <div className="p-6 border-t ">
                     <OrderForm disabled={!cart || cart.items.length === 0} setDeliveryAddress={setDeliveryAddress} />
                  </div>
               </>
            )}
         </div>
      </div>
   )
}

export default Page
