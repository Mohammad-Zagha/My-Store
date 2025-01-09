'use client'
import React from 'react'
import CustomAvatar from '../ui/ImageHandler'
import { Button } from '../chadcn/button'
import { IoIosAdd } from 'react-icons/io'
import { LucideMinus } from 'lucide-react'
import { MdDeleteForever } from 'react-icons/md'
import { useBatchDecreaseQuantity, useBatchIncreaseQuantity, useRemoveFromCart } from '@/hooks/api/Cart'
import { cn } from '@/lib/utils'
import { T_Product } from '@/types/objects'

export type T_CartItem = {
   productId: string
   quantity: number
   name: string
   price: number
   image: string
   discountedPrice: number
   description: string
}

export const CartItem = ({ cartItem }: { cartItem: T_Product & { quantity: number } }) => {
   const removeMutation = useRemoveFromCart()
   const IncreaseQuantity = useBatchIncreaseQuantity()
   const decreaseQuantity = useBatchDecreaseQuantity()
   return (
      <div className="w-full shadow-card relative  h-fit flex justify-between gap-6 px-5 py-3 rounded-xl " dir="rtl">
         {cartItem.discount > 0 && (
            <div className="w-fit h-fit  text-xs bg-primary-dark text-white p-1 absolute top-0 left-0 rounded-tl-xl rounded-b-xl">
               عرض خاص
            </div>
         )}
         <CustomAvatar
            src={(cartItem.images[0]?.url as string) ?? ''}
            alt={cartItem.name}
            className="size-[80px] rounded-xl "
         />
         <div className="flex flex-col justify-between p-1">
            <span className="line-clamp-1  font-semibold text-sm text-primary-dark/85">{cartItem.name}</span>
            <div className="flex gap-2 justify-start items-center ">
               <span
                  className={cn(
                     'text-lg  font-bold',
                     cartItem?.discount > 0 ? 'line-through text-primary-light text-sm' : 'text-primary-dark',
                  )}
               >
                  {cartItem?.price} ₪
               </span>
               {cartItem && cartItem.discount > 0 && (
                  <span className="leading-3   text-lg font-semibold text-primary-dark">
                     {(cartItem?.price - cartItem?.discount).toFixed(2)} ₪
                  </span>
               )}
            </div>
            <div className="flex center w-fit gap-4">
               <Button
                  variant="default"
                  size={'icon'}
                  className="bg-gray-200 rounded-full size-5 hover:bg-primary-light"
                  onClick={() => {
                     IncreaseQuantity({ productId: cartItem.productId })
                  }}
               >
                  <IoIosAdd className="text-primary-dark " />
               </Button>
               <span className="text-primary-dark text-sm">{cartItem.quantity}</span>
               <Button
                  variant="default"
                  size={'icon'}
                  className="bg-gray-200 rounded-full size-5 hover:bg-primary-light"
                  onClick={() => {
                     if (cartItem.quantity > 1) decreaseQuantity({ productId: cartItem.productId })
                  }}
               >
                  <LucideMinus className="text-primary-dark" />
               </Button>
            </div>
         </div>
         <div className="w-fit min-h-full flex flex-col justify-center items-center">
            <Button
               variant="destructive"
               size={'icon'}
               className="size-fit p-2"
               onClick={() => {
                  removeMutation.mutate({ productId: cartItem.productId })
               }}
            >
               <MdDeleteForever className="text-red-500 " />
            </Button>
         </div>
      </div>
   )
}

export const CartPageItem = ({ cartItem }: { cartItem: T_Product & { quantity: number } }) => {
   const removeMutation = useRemoveFromCart()
   const IncreaseQuantity = useBatchIncreaseQuantity()
   const decreaseQuantity = useBatchDecreaseQuantity()
   return (
      <div className="w-full flex justify-between relative shadow-card  rounded-xl " dir="rtl">
         {cartItem.discount > 0 && (
            <div className="w-fit h-fit  text-xs bg-primary-dark text-white p-1 px-2 absolute top-0 left-4  rounded-b-lg">
               عرض خاص
            </div>
         )}
         <div className="flex center gap-2 w-fit ">
            <CustomAvatar
               src={(cartItem.images[0]?.url as string) ?? ''}
               alt={cartItem.name}
               className="size-[80px] rounded-xl "
            />
            <div className="flex flex-col justify-between p-1">
               <span className="line-clamp-1  font-semibold text-sm text-primary-dark/85">{cartItem.name}</span>
               <span className=" text-xs text-primary-dark/70 max-w-[250px] line-clamp-2">{cartItem.description}</span>
               <div className="flex gap-2 justify-start items-center  ">
                  <span
                     className={cn(
                        'text-lg  font-bold',
                        cartItem?.discount > 0 ? 'line-through text-primary-light text-sm' : 'text-primary-dark',
                     )}
                  >
                     {cartItem?.price} ₪
                  </span>
                  {cartItem && cartItem.discount > 0 && (
                     <span className="leading-3   text-lg font-semibold text-primary-dark">
                        {(cartItem?.price - cartItem?.discount).toFixed(2)} ₪
                     </span>
                  )}
               </div>
            </div>
         </div>
         <div className=" flex flex-col justify-center items-center gap-2">
            {' '}
            <div className="flex center w-fit gap-4 px-4">
               <Button
                  variant="default"
                  size={'icon'}
                  className="bg-gray-200 rounded-full size-5 hover:bg-primary-light"
                  onClick={() => {
                     IncreaseQuantity({ productId: cartItem.productId })
                  }}
               >
                  <IoIosAdd className="text-primary-dark " />
               </Button>
               <span className="text-primary-dark text-sm">{cartItem.quantity}</span>
               <Button
                  variant="default"
                  size={'icon'}
                  className="bg-gray-200 rounded-full size-5 hover:bg-primary-light"
                  onClick={() => {
                     if (cartItem.quantity > 1) decreaseQuantity({ productId: cartItem.productId })
                  }}
               >
                  <LucideMinus className="text-primary-dark" />
               </Button>
            </div>{' '}
         </div>
      </div>
   )
}
