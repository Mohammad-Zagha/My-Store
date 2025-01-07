import React, { useEffect, useRef } from 'react'
import { CiHeart, CiShoppingCart } from 'react-icons/ci'
import Stars from './Stars'
import Image from 'next/image'
import { gsap } from 'gsap'
import { Button } from '../chadcn/button'
import { T_Banner, T_Product } from '@/types/objects'
import Link from 'next/link'

const Banner = ({ banner }: { banner: T_Banner }) => {
   const imageRef = useRef(null)
   const product = (banner.product as T_Product) ?? null
   useEffect(() => {
      const letters = gsap.utils.toArray('.animate-letter')
      const texts = gsap.utils.toArray('.animate-text')

      // Animate letters
      gsap.fromTo(
         letters,
         { y: 50, opacity: 0 },
         {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power4.inOut',
            stagger: 0.1,
         },
      )

      // Animate other text elements
      gsap.fromTo(
         texts,
         { y: 30, opacity: 0 },
         {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power4.inOut',
            stagger: 0.2,
            delay: 0.5,
         },
      )

      // Scale-in effect for the background image
      gsap.fromTo(
         imageRef.current,
         { scale: 1.2 }, // Start slightly zoomed in
         {
            scale: 1, // Scale down to normal size
            duration: 1.5,
            ease: 'power4.out',
         },
      )
   }, [])

   return (
      <div className="relative w-screen h-screen grid grid-cols-1 md:grid-cols-2 p-4 md:p-6">
         {/* Background Image */}
         <Image
            ref={imageRef}
            src={(banner.image as string) ?? ''}
            alt="Banner"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
            priority
         />

         {/* Left Column */}
         <div className="col-span-1 flex flex-col justify-center gap-4 text-white">
            <div className="pl-2 animate-text">
               <Stars num_of_ratings={500} rating={5} className="text-gray-400" />
            </div>
            <div className="flex gap-2 font-Inter text-2xl md:text-4xl font-bold pl-2 animate-text">
               {banner.englishName}
            </div>

            {/* Animated Letters */}
            <div>
               {banner.englishName?.split(' ').map((word, index) => (
                  <span
                     key={word + index}
                     className="block text-[60px] md:text-[120px] lg:text-[150px] font-Ubuntu font-semibold leading-[0.9] tracking-tighter"
                  >
                     {word.split('').map((letter, index) => (
                        <span key={`eros-${index}`} className="animate-letter inline-block">
                           {letter}
                        </span>
                     ))}
                  </span>
               ))}

               {/* <span className="block text-[60px] md:text-[120px] lg:text-[200px] font-Ubuntu font-semibold leading-[0.9] tracking-tighter">
                  {'GOLD'.split('').map((letter, index) => (
                     <span key={`gold-${index}`} className="animate-letter inline-block">
                        {letter}
                     </span>
                  ))}
               </span> */}
            </div>
         </div>

         {/* Right Column */}
         <div className="col-span-1 flex flex-col justify-center gap-4 text-white/90" dir="rtl">
            <div className="flex flex-col gap-4 max-md:bg-black/15 p-2 rounded-lg max-md:backdrop-blur-sm   ">
               <div className="flex gap-2 font-Inter text-2xl md:text-4xl font-bold pl-2 animate-text">
                  {/* <span className="font-extralight text-xl md:text-3xl ">فيرزاتشي</span>
                  <span className="font-SFPro">X</span>
                  <span className="">بيور فيمي</span> */}
                  {banner.arabicName}
               </div>
               <div className="max-w-full md:max-w-[300px] h-full animate-text  ">
                  {/* <span className="text-sm md:text-lg  text-white/60 max-md:text-white break-words">
                     عطر فيرزاتشي بور فام هو رمز للأنوثة والأناقة. بتركيبته الفريدة من الزهور والفواكه، يضفي لمسة من
                     الجاذبية تدوم طوال اليوم. اختيار مثالي لكل امرأة تعشق التميز والبساطة في آن واحد.
                  </span> */}
                  {banner.description}
               </div>

               {product && (
                  <div className="p-4 w-full md:w-fit max-md:justify-center font-Ubuntu text-white text-2xl md:text-4xl flex gap-4 md:gap-6 items-center md:bg-white/10 md:backdrop-blur-md rounded-lg animate-text">
                     <Link
                        className="bg-white/30 size-8 rounded-lg flex center hover:bg-primary-dark"
                        href={`/product/${product.productId}`}
                     >
                        <CiHeart className="text-white" size={22} />
                     </Link>

                     <div className=" size-2 rounded-full bg-white"></div>

                     <Link
                        className="bg-white/30 size-8 rounded-lg flex center hover:bg-primary-dark"
                        href={`/product/${product.productId}`}
                     >
                        <CiShoppingCart size={22} className="text-white" />
                     </Link>
                     <span>{product.price} ₪</span>
                  </div>
               )}
            </div>
         </div>
      </div>
   )
}

export default Banner
