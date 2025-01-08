import Image from 'next/image'
import React, { useRef, useEffect } from 'react'
import { Button } from '../chadcn/button'
import gsap from 'gsap'
import CustomAvatar from '../ui/ImageHandler'
import { useAddToCart } from '@/hooks/api/Cart'
import Link from 'next/link'

type T_ProductContainer = {
   src?: string
   title: string
   price: number
   productid: string
}

const ProductContainer = ({ src, title, price, productid }: T_ProductContainer) => {
   const containerRef = useRef<HTMLDivElement>(null)
   const priceRef = useRef<HTMLDivElement>(null)
   const buttonRef = useRef<HTMLAnchorElement>(null)
   const imageRef = useRef<HTMLImageElement>(null)
   useEffect(() => {
      const container = containerRef.current
      const price = priceRef.current
      const button = buttonRef.current
      const image = imageRef.current

      // Create a GSAP timeline for the animations
      const tl = gsap.timeline({ paused: true })

      tl.to(container, {
         scale: 0.95,
         duration: 0.3,
      })
         .to(
            image,
            {
               clipPath: 'inset(5% 5% 5% 5%)',
               scale: 1.1,
               duration: 0.3,
            },
            0,
         ) // Apply the image clip and zoom at the same time as the container scale
         .to(
            price,
            {
               y: -20,
               opacity: 0,
               duration: 0.4,
            },
            '<', // Start price animation at the same time as container and image
         )
         .to(
            button,
            {
               y: -20,
               opacity: 1,
               duration: 0.3,
            },
            '-=0.3', // Start button animation slightly after
         )

      const handleMouseEnter = () => {
         tl.play() // Play the timeline on hover
      }

      const handleMouseLeave = () => {
         tl.reverse() // Reverse the timeline on mouse leave
      }

      container?.addEventListener('mouseenter', handleMouseEnter)
      container?.addEventListener('mouseleave', handleMouseLeave)

      return () => {
         container?.removeEventListener('mouseenter', handleMouseEnter)
         container?.removeEventListener('mouseleave', handleMouseLeave)
      }
   }, [])

   return (
      <div
         className="flex flex-col justify-between gap-2 drop-shadow-md w-[350px] h-[500px]   p-2"
         ref={containerRef}
         dir="rtl"
      >
         <Link href={`/product/${productid}`} className="w-full h-full">
            <CustomAvatar
               src={src}
               className="h-[400px] max-h-[400px]  bg-white rounded-xl w-full"
               fallbackClassName="w-full "
            />
         </Link>

         <div className="grid grid-cols-2 h-full">
            <span className="text-primary-dark text-center  col-span-full   text-sm text-wrap line-clamp-2 font-semibold">
               {title}
            </span>

            <div ref={priceRef} className="text-primary-dark text-xl flex items-center gap-1 w-fit col-span-full">
               {price}
               <Image src="/icons/ILS.svg" alt="ILS" height={16} width={16} className="h-[16px] w-[16px] mt-1" />
            </div>

            <Link
               ref={buttonRef}
               href={`/product/${productid}`}
               className="text-primary-dark flex justify-start col-span-full font-bold  bg-transparent hover:bg-transparent h-fit p-0 text-sm  opacity-0 transition-opacity"
            >
               تفاصيل المنتج
            </Link>
         </div>
      </div>

      // <div className="h-[400px] w-full rounded-xl bg-green-500"></div>
   )
}

export default ProductContainer
