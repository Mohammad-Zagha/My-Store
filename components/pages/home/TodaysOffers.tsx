'use client'
import React, { useRef, useEffect } from 'react'
import { FlipWords } from '../../ui/flip-words'
import Image from 'next/image'
import AnimatedLink from '../../animated/AnimatedLink'
import ProductCard from '../../common/ProductCard'
import { useInView } from 'framer-motion'
import { gsap } from 'gsap'
import { useGetAllProducts, useGetDiscountedProducts } from '@/hooks/api/Products'
import { ProductCardSkeleton } from '@/components/ui/Skeletons'

const TodaysOffers = () => {
   const containerRef = useRef<HTMLDivElement>(null)
   const inView = useInView(containerRef, { once: true })
   const { data, isLoading } = useGetDiscountedProducts({ page: 1, limit: 10 })
   const products = data?.pages.flatMap((page) => page?.results ?? []) || []

   useEffect(() => {
      if (inView) {
         const cards = gsap.utils.toArray('.product-card') // Select all ProductCard components
         gsap.fromTo(
            cards,
            { opacity: 0, y: 50 }, // Initial state
            {
               opacity: 1,
               y: 0,
               duration: 0.8,
               stagger: 0.2, // Stagger each card by 0.2 seconds
               ease: 'power3.out',
            },
         )
      }
   }, [inView])

   return (
      <>
         <div className="col-span-3 max-md:hidden rounded-xl relative w-full h-full overflow-hidden">
            <Image
               alt="product"
               src="https://images.unsplash.com/photo-1623742310401-d8057c3c43c8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGVyZnVtZXxlbnwwfHwwfHx8MA%3D%3D"
               fill
               className="rounded-xl object-cover shadow-lg hover:scale-105 transition-transform duration-300"
            />
         </div>

         <div
            ref={containerRef}
            className="col-span-9 max-md:col-span-full overflow-y-auto grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 p-3 grid-rows-[auto_minmax(400px,1fr)]"
         >
            <div className=" col-span-full h-auto flex justify-between items-end">
               <h1 className="text-primary-dark  text-lg">تعرف على عروض اليوم</h1>
               <span className="text-sm  text-primary-light inline-block max-md:hidden">
                  مع عروض متجري اليومية و المتجددة
                  <span className="inline-block min-w-[5em] text-start">
                     <FlipWords words={['وفر', 'اجمع', 'استمتع']} />
                  </span>
               </span>
               <AnimatedLink title="مشاهدة الكل" href="/offers" className=" font-bold text-sm" />
            </div>
            {isLoading ? (
               <>
                  <ProductCardSkeleton />
                  <ProductCardSkeleton />
                  <ProductCardSkeleton />
                  <ProductCardSkeleton />
                  <ProductCardSkeleton />
                  <ProductCardSkeleton />
               </>
            ) : (
               products?.map((product) => <ProductCard key={product.productId} product={product} />)
            )}
         </div>
      </>
   )
}

export default TodaysOffers
