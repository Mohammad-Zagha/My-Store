'use client'
import React, { useEffect, useRef } from 'react'
import ProductContainer from '../common/ProductContainer'
import { Carousel } from './CardsCarousel'
import AnimatedLink from '../animated/AnimatedLink'
import gsap from 'gsap'
import { useInView } from 'framer-motion'
import { useGetNewProducts } from '@/hooks/api/Products'

const NewArrivalsCarousel = () => {
   const { data, isLoading } = useGetNewProducts({ page: 1, limit: 8 })
   const containerRef = useRef<HTMLDivElement>(null)
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
      } else {
         // Set initial clipPath state for re-entry
         gsap.set(containerRef.current, { clipPath: 'inset(50% 50% 50% 50%)' })
      }
   }, [inView])

   return (
      <div ref={containerRef} className="w-full space-y-0.25r mt-[100px] ">
         <div className="w-full flex justify-between">
            <h2 className="text-primary-dark font-SFPro text-xl max-md:text-lg">منتجات وصلت حديثا</h2>
            <AnimatedLink href="/" title="مشاهدة الكل" />
         </div>
         {isLoading ? (
            <></>
         ) : products?.length === 0 ? (
            <></>
         ) : (
            <Carousel
               items={
                  !products
                     ? []
                     : products?.map((product) => (
                          <>
                             <ProductContainer
                                src={(product.images[0]?.url as string) ?? ''}
                                price={product.price}
                                productid={product.productId}
                                title={product.name}
                             />
                          </>
                       ))
               }
               isLoading={isLoading}
            />
         )}
      </div>
   )
}

export default NewArrivalsCarousel
