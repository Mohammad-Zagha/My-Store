import { T_CartItem } from '@/components/cart/CartItem'
import CustomAvatar from '@/components/ui/ImageHandler'
import { cn } from '@/lib/utils'
import { T_Product } from '@/types/objects'
import React from 'react'

const OrderItem = ({ item }: { item: T_Product & { quantity: number } }) => {
   const discountAmount = item.price - item.discount
   return (
      <div className="w-full flex justify-between p-1" dir="rtl">
         <div className="flex center gap-2 w-fit">
            <CustomAvatar src={item.images[0].url ?? ''} alt={item.name} className="size-[80px] rounded-xl " />
            <div className="flex flex-col justify-between p-1">
               <span className="line-clamp-1 font-SFPro font-semibold text-sm text-primary-dark/85">{item.name}</span>

               <span className="font-Cairo text-xs text-primary-dark/70 max-w-[250px] line-clamp-2">
                  {item.description}
               </span>
               <span className="font-Cairo text-xs text-primary-dark/70">x{item.quantity}</span>
            </div>
         </div>
         <div className="flex justify-center items-center flex-col w-fit  ">
            <span
               className={cn(
                  'font-Cairo text-lg text-primary-dark leading-none',
                  discountAmount > 0 ? 'text-gray-400 line-through' : '',
               )}
            >
               ₪ {(item.price * item.quantity).toFixed(2)}
            </span>
            {discountAmount > 0 && (
               <span className="font-Cairo text-lg text-primary-dark leading-none">
                  ₪ {((item.price - item.discount) * item.quantity).toFixed(2)}
               </span>
            )}
         </div>
      </div>
   )
}

export default OrderItem
