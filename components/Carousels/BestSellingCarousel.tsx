'use client'
import React, { useEffect, useRef } from 'react'

import gsap from 'gsap'
import { useInView } from 'framer-motion'
import { useGetAllProducts, useGetMostSoldProducts } from '@/hooks/api/Products'
import ProductContainer from '@/components/common/ProductContainer'
import AnimatedLink from '@/components/animated/AnimatedLink'
import { Carousel } from '@/components/Carousels/CardsCarousel'

const BestSellingCarousel = () => {
   const { data, isLoading } = useGetMostSoldProducts({ page: 1, limit: 8 })
   const containerRef = useRef<HTMLDivElement>(null)
   const childRefs = useRef<(HTMLDivElement | null)[]>([])
   const inView = useInView(containerRef, { once: true, margin: '0px' })
   const products = data?.pages.flatMap((page) => page?.results ?? []) || []

   useEffect(() => {
      if (inView) {
         // Animate the clipPath of the container
         gsap.fromTo(
            containerRef.current,
            { clipPath: 'inset(50% 50% 50% 50%)' },
            {
               clipPath: 'inset(0% 0% 0% 0%)',
               duration: 1.5,
               ease: 'power3.out',
            },
         )

         // Animate each product item
         childRefs.current.forEach((child) => {
            gsap.fromTo(
               child,
               { scale: 1.2, opacity: 0 },
               {
                  scale: 1,
                  opacity: 1,
                  duration: 1.5,
                  ease: 'power3.out',
               },
            )
         })
      } else {
         // Set initial clipPath state for re-entry
         gsap.set(containerRef.current, { clipPath: 'inset(50% 50% 50% 50%)' })
         childRefs.current.forEach((child) => gsap.set(child, { scale: 1.2, opacity: 0 }))
      }
   }, [inView])

   const cards = products?.map((product, i) => (
      <ProductContainer
         key={i}
         src={product.images[0]?.url as string}
         title={product.name}
         price={product.price}
         productid={product.productId}
      />
   ))
   return (
      <div ref={containerRef} className="w-full space-y-0.25r mt-[100px]">
         <div className="w-full flex justify-between">
            <h2 className="text-primary-dark  text-xl max-md:text-lg">المنتجات الاكثر مبيعا </h2>
            <AnimatedLink href="/" title="مشاهدة الكل" />
         </div>
         <Carousel items={cards || []} isLoading={isLoading} />
      </div>
   )
}

export default BestSellingCarousel
