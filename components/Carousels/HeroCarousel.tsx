'use client'
import React from 'react'
import { Carousel } from '@/components/Carousels/CardsCarousel'
import AnimatedLink from '@/components/animated/AnimatedLink'
import { useGetHomeCategories } from '@/hooks/api/Categories'
import ImageContainer from '../common/ImageContainer'

export function HeroCarousel() {
   const { data: categories, isLoading } = useGetHomeCategories()
   const cards = categories?.results?.map((category) => {
      return (
         <ImageContainer
            key={category.id}
            href={`/categories/products/${category.id}`}
            title={category.name}
            src={category.image}
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

         {<Carousel items={cards!} isLoading={isLoading} />}
      </div>
   )
}

const data = [
   {
      href: '/',
      title: 'عطور ستاتي',
      src: '/perfums/image-1.png',
      description: 'عطر فاكهي حلو يتكون من الاناناس ، الياسمين المغربي ، أخشاب البتولا ، الحمضيات.',
   },
   {
      href: '/',
      title: 'عطور رجالي',
      description: '  عطر خشبي حار يتكون من الفلفل الوردي ، الباتشولي ، العنبر ، الفانيليا.',
      src: '/perfums/image-2.png',
   },
   {
      href: '/',
      title: 'عطور 100 مل',
      description: ' عطر زهري خشبي يتكون من الورد ، الياسمين ، الباتشولي ، العنبر.',
      src: '/perfums/image-3.png',
   },
   {
      href: '/',
      title: 'عطور اطفال',
      description: ' عطر زهري خشبي يتكون من الورد ، الياسمين ، الباتشولي ، العنبر.',
      src: '/perfums/image-4.png',
   },
   {
      href: '/',
      title: 'عطور 50 مل',
      description: ' عطر زهري خشبي يتكون من الورد ، الياسمين ، الباتشولي ، العنبر.',
      src: '/perfums/image-5.png',
   },
]
