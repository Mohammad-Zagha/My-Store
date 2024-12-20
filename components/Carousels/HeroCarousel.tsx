'use client'
import React from 'react'
import { Carousel } from '@/components/Carousels/CardsCarousel'
import AnimatedLink from '@/components/animated/AnimatedLink'
import { useGetHomeCategories } from '@/hooks/api/Categories'
import ImageContainer from '../common/ImageContainer'

export function HeroCarousel() {
   const { data: categories, isLoading } = useGetHomeCategories({
      page: 1,
      limit: 5,
   })
   const cards = categories?.pages?.flatMap((page) => page?.results ?? [])
   const images = cards?.map((category) => {
      return (
         <ImageContainer
            key={category.id}
            href={`/categories/products/${category.id}`}
            title={category.name}
            src={category.image as string}
            description={category.description}
         />
      )
   })

   return (
      <div className="w-full h-full   overflow-hidden">
         {/* Ensures no overflow */}
         <div className="w-full flex justify-between">
            <h2 className="text-primary-dark font-SFPro text-xl max-md:text-lg"> منتجات وصلت حديثا</h2>
            <AnimatedLink href="/" title="مشاهدة الكل" />
         </div>

         {<Carousel items={images!} isLoading={isLoading} />}
      </div>
   )
}
