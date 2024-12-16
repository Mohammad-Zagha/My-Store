import Image from 'next/image'
import React, { useRef, useEffect, use, useState } from 'react'
import AnimatedLink from '../animated/AnimatedLink'
import { Button } from '../chadcn/button'
import { gsap } from 'gsap'
import Stars from './Stars'
import { cn } from '@/lib/utils'
import { T_Product } from '@/types/objects'
import CustomAvatar from '../ui/ImageHandler'
import { useAddToCart } from '@/hooks/api/Cart'
import { useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'

type T_ProductCard = {
   className?: string
   product: T_Product
}

const ProductCard = ({ className, product }: T_ProductCard) => {
   const addToCardMutaion = useAddToCart()
   const [count, setCount] = useState(1)
   const queryClient = useQueryClient()
   const cardRef = useRef<HTMLDivElement>(null)
   const sheetRef = useRef<HTMLDivElement>(null)

   useEffect(() => {
      const ctx = gsap.context(() => {
         // Set initial clip-path to hide the sheet
         gsap.set(sheetRef.current, { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0 })

         const enterAnim = gsap.to(sheetRef.current, {
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            duration: 0.5,
            ease: 'power3.out',
            paused: true,
         })

         cardRef.current?.addEventListener('mouseenter', () => enterAnim.play())
         cardRef.current?.addEventListener('mouseleave', () => enterAnim.reverse())
      }, cardRef)

      return () => ctx.revert()
   }, [])

   return (
      <div
         ref={cardRef}
         className={cn(
            'w-full h-[400px] p-4  bg-white shadow-md rounded-xl flex flex-col items-center gap-3 relative overflow-hidden',
            className,
         )}
      >
         {/* Title & Image */}
         <Link href="/" className="flex w-full justify-between items-center cursor-pointer" dir="ltr">
            <div className="flex center gap-2 cursor-pointer">
               {product?.discount ? (
                  <div className="w-fit flex items-center text-primary-dark gap-0.5">
                     <Image alt="currency" src="/icons/ILS.svg" width={10} height={10} className={cn('mt-1')} />
                     <span className={cn('font-extrabold text-lg font-Cairo text-primary-dark')}>
                        {product.discount}
                     </span>
                  </div>
               ) : null}
               <div className="w-fit flex items-center text-primary-dark gap-0.5">
                  <Image
                     alt="currency"
                     src="/icons/ILS.svg"
                     width={10}
                     height={10}
                     // className={cn('mt-1', discount ? 'opacity-50' : 'opacity-100')}
                  />
                  <span
                     className={cn(
                        'font-extrabold text-lg font-Cairo text-primary-dark',
                        product?.discount ?? 'line-through text-primary-dark/50 text-sm decoration-[1px] ',
                     )}
                  >
                     {product?.price ?? '0'}
                  </span>
               </div>
            </div>
            <AnimatedLink
               className="font-bold text-sm font-Cairo max-w-28 truncate"
               title={product?.category?.name ?? 'N/A'}
               href={`/categories/products/${product?.category.id}`}
            />
         </Link>
         {product?.images[0] && (
            <Link href={`/product/${product.productId}`} className="w-full h-[220px]">
               <CustomAvatar
                  className="rounded-lg object-cover aspect-auto h-[220px] w-full hover:scale-105 transition-transform duration-300"
                  alt="product"
                  src={product.images[0].url}
               />
            </Link>
         )}
         <span className="text-sm font-Cairo text-primary-dark font-semibold text-center h-[100px] overflow-hidden text-ellipsis line-clamp-5">
            {product?.name ?? 'N/A'}
         </span>
         <div className="w-full flex center">
            <Stars rating={4} className="text-primary-dark" num_of_ratings={100} size="0.5rem" />
         </div>
         {/* Hover Sheet */}
         <div
            ref={sheetRef}
            className="absolute bottom-0 left-0 w-full h-1/3 bg-white/20 backdrop-blur-md p-4 flex flex-col justify-center items-center gap-2 shadow-md rounded-t-xl"
         >
            <div className="flex items-center gap-3">
               <Button
                  className="bg-transparent text-primary-dark px-3 py-1 text-lg hover:bg-transparent"
                  onClick={() => {
                     setCount((prev) => prev + 1)
                  }}
               >
                  +
               </Button>
               <span className="text-lg font-bold font-Cairo ">{count}</span>
               <Button
                  className="bg-transparent text-primary-dark px-3 py-1 text-lg hover:bg-transparent"
                  onClick={(prev) => {
                     if (count > 1) {
                        setCount((prev) => prev - 1)
                     }
                  }}
               >
                  -
               </Button>
            </div>
            <Button
               onClick={() => {
                  addToCardMutaion.mutate(
                     {
                        product: product,
                        quantity: count,
                     },
                     {
                        onSuccess: () => {
                           setCount(1)
                           queryClient.invalidateQueries({
                              queryKey: ['cart'],
                           })
                        },
                     },
                  )
               }}
               className="font-Cairo text-xs font-bold bg-background-dark text-primary-dark hover:bg-background-dark px-4 py-1 rounded-xl shadow-md hover:shadow-lg transition"
            >
               اضافة الى السلة
            </Button>
         </div>
      </div>
   )
}

export default ProductCard
