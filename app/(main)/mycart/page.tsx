'use client'
import { CartPageItem } from '@/components/cart/CartItem'
import TextAreaBox from '@/components/common/text-area-box'
import { useGetCart } from '@/hooks/api/Cart'
import React, { useEffect } from 'react'
import OrderForm from './_components/OrderForm'
import { cn } from '@/lib/utils'
import { BsFillBagHeartFill } from 'react-icons/bs'
import AnimatedLink from '@/components/animated/AnimatedLink'

const Page = () => {
   const { data: cart, isLoading, error } = useGetCart()
   const [total, setTotal] = React.useState<number>(0)

   useEffect(() => {
      if (cart) {
         const total = cart.items
            .reduce((acc, item) => acc + (item.price - item.discount) * item.quantity, 0)
            .toFixed(2)
         setTotal(Number(total))
      }
   }, [cart])

   return (
      <div className="min-h-screen w-screen bg-background-dark   grid grid-cols-12  p-8 pt-20 gap-4" dir="rtl">
         {/* Cart Section */}
         <div className="col-span-8 bg-white rounded-xl flex flex-col justify-between p-6 max-md:col-span-full">
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
                  'flex-1 max-h-[350px] min-h-[350px] px-2  overflow-y-auto gap-2 flex flex-col',
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
         </div>

         <div className="col-span-4 max-md:mb-6 bg-white rounded-xl flex flex-col   max-md:col-span-full">
            <div className="p-6  space-y-4 h-fit text-center">
               <h2 className="text-primary-dark font-Cairo ">المجموع</h2>
               <div className="flex justify-between items-center gap-2">
                  <span className="text-primary-dark font-Cairo">المجموع الفرعي</span>
                  <span className="text-primary-dark font-Cairo">{total} ₪</span>
               </div>
               <div className="flex justify-between items-center gap-2">
                  <span className="text-primary-dark font-Cairo">الشحن</span>
                  <span className="text-primary-dark font-Cairo">10.00 ₪</span>
               </div>
               <div className="flex justify-between items-center gap-2">
                  <span className="text-primary-dark font-Cairo">الضريبة</span>
                  <span className="text-primary-dark font-Cairo">00.00 ₪</span>
               </div>
               <div className="flex justify-between items-center gap-2 font-bold">
                  <span className="text-primary-dark font-Cairo">المجموع الكلي</span>
                  <span className="text-primary-dark font-Cairo">{total + 10} ₪</span>
               </div>
            </div>
            <div className="p-6 border-t ">
               <OrderForm disabled={!cart || cart.items.length === 0} />
            </div>
         </div>
      </div>
   )
}

export default Page
