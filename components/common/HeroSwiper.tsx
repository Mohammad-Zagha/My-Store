'use client' // For Next.js to enable client-side rendering

import React, { useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, EffectFade } from 'swiper/modules'

import Image from 'next/image'
import gsap from 'gsap'

import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const HeroSwiper = () => {
   const swiperRef = useRef<any>(null)

   useEffect(() => {
      const slides = swiperRef.current?.el?.querySelectorAll('.swiper-slide')
      if (slides) {
         gsap.fromTo(
            slides,
            { opacity: 0, y: 50 },
            {
               opacity: 1,
               y: 0,
               stagger: 0.3,
               duration: 1,
               ease: 'power2.out',
            },
         )
      }
   }, [])

   return (
      <section className="relative h-full w-[80%] max-md:w-full rounded-xl">
         <Swiper
            ref={swiperRef}
            modules={[EffectFade, Navigation, Pagination]}
            effect="fade"
            navigation
            pagination={{ clickable: true }}
            loop={true}
            className="h-full drop-shadow-lg"
         >
            <SwiperSlide>
               <div className="relative h-full flex items-center justify-center text-white">
                  <div className="absolute inset-0 w-full h-full">
                     <Image
                        src="https://images.unsplash.com/photo-1593487568720-92097fb460fb?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Futuristic Slide 1"
                        fill
                        className="object-cover rounded-xl  aspect-video"
                     />
                  </div>
                  <h1 className="text-5xl md:text-7xl font-extrabold z-10 text-center">Welcome to the Future</h1>
               </div>
            </SwiperSlide>

            <SwiperSlide>
               <div className="relative h-full flex items-center justify-center text-white">
                  <div className="absolute inset-0 w-full h-full">
                     <Image
                        src="https://images.unsplash.com/photo-1721190171118-c5c0921ea6c0?q=80&w=1911&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Futuristic Slide 2"
                        fill
                        className="object-cover rounded-xl aspect-video"
                     />
                  </div>
                  <h1 className="text-5xl md:text-7xl font-extrabold text-center z-10">Innovate with Us</h1>
               </div>
            </SwiperSlide>

            <SwiperSlide>
               <div className="relative h-full flex items-center justify-center text-white">
                  <div className="absolute inset-0 w-full h-full">
                     <Image
                        src="https://images.unsplash.com/photo-1668686635437-14f1cf149866?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="Futuristic Slide 3"
                        fill
                        className="object-cover rounded-xl aspect-video"
                     />
                  </div>
                  <h1 className="text-5xl md:text-7xl font-extrabold z-10 text-center">Discover the Unknown</h1>
               </div>
            </SwiperSlide>
         </Swiper>

         <div className="absolute bottom-8 w-full flex justify-center z-10">
            <div className="swiper-pagination swiper-pagination-custom"></div>
         </div>
      </section>
   )
}

export default HeroSwiper
