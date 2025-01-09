'use client'
import { useGetCart } from '@/hooks/api/Cart'
import React from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '../chadcn/sheet'
import { Button } from '../chadcn/button'
import { Skeleton } from '../ui/Skeletons'
import { AnimatePresence } from 'framer-motion'
import { motion } from 'framer-motion'
import { BsFillBagHeartFill } from 'react-icons/bs'
import AnimatedLink from '../animated/AnimatedLink'
import { CartItem } from './CartItem'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { IoCartOutline } from 'react-icons/io5'

export function Cart() {
   const { data: cart, isLoading } = useGetCart()
   const [open, setOpen] = React.useState(false)
   return (
      <Sheet open={open} onOpenChange={setOpen}>
         <SheetTrigger asChild>
            <Button
               variant="default"
               className="flex center  gap-1 relative size-8 !p-0 bg-transparent hover:bg-transparent text-primary-dark font-bold"
            >
               {isLoading ? (
                  <Skeleton className="w-8 h-2" />
               ) : (
                  <div className="w-fit flex center gap-2 relative">
                     <div className="rounded-full absolute bg-red-500 text-white text-[8px] flex center p-2 size-2 -right-3 -top-1">
                        {cart && cart.items.length > 0 ? cart.items.length : 0}
                     </div>
                     <IoCartOutline className="text-xl font-bold" />
                     <span className="text-sm font-semibold">
                        ₪
                        {cart && cart.items.length > 0
                           ? cart.items
                                .reduce((acc, item) => acc + (item.price - item.discount) * item.quantity, 0)
                                .toFixed(1)
                           : 0}
                     </span>
                  </div>
               )}
            </Button>
         </SheetTrigger>

         <SheetContent side="left" className="!p-2 !pt-10 flex flex-col h-full min-w-[30%] max-sm:min-w-full">
            <SheetHeader className="flex justify-center items-center text-center">السلة</SheetHeader>

            {/* Scrollable Cart Items Section */}
            {cart && cart.items.length > 0 ? (
               <div className="flex-1 overflow-y-auto flex flex-col px-4 gap-4">
                  <AnimatePresence>
                     {cart?.items.map((item) => (
                        <motion.div
                           key={item.productId}
                           initial={{ opacity: 0, y: -20 }}
                           animate={{ opacity: 1, y: 0 }}
                           exit={{ opacity: 0, y: -50, edgeMode: 'clap' }}
                           transition={{ duration: 0.3 }}
                           className="rounded-xl"
                        >
                           <CartItem cartItem={item} />
                        </motion.div>
                     ))}
                  </AnimatePresence>
               </div>
            ) : (
               <div className="h-full flex center w-full">
                  <div className="flex flex-col items-center">
                     <BsFillBagHeartFill size={80} />
                     <span className="text-lg ">السلة فارغة</span>
                     <AnimatedLink
                        href={'/'}
                        className="text-primary-light text-sm"
                        onClick={() => setOpen(false)}
                        title="تسوق الان"
                     />
                  </div>
               </div>
            )}

            <div className="bg-transparent h-fit px-8 py-8    " dir="rtl">
               <div className="flex justify-between items-center px-4 ">
                  <span className="text-lg font-semibold">المجموع:</span>
                  <span className="text-lg font-semibold">
                     {cart?.items
                        .reduce((acc, item) => acc + (item.price - item.discount) * item.quantity, 0)
                        .toFixed(2)}
                  </span>
               </div>
               <Link
                  className={cn(
                     'w-full mt-4 text-white rounded-xl py-4 center bg-primary-dark hover:bg-primary-dark/75',
                  )}
                  href={'/mycart'}
               >
                  إتمام الشراء
               </Link>
            </div>
         </SheetContent>
      </Sheet>
   )
}
