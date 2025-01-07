'use client'
import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import HeroSwiper from '@/components/common/HeroSwiper'

const Page = () => {
   const contentRef = useRef<HTMLDivElement>(null)

   useEffect(() => {
      const ctx = gsap.context(() => {
         gsap.fromTo(
            '.fade-in',
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1.5, ease: 'power3.out', stagger: 0.3 },
         )
      }, contentRef)

      return () => ctx.revert() // Clean up GSAP context on component unmount
   }, [])

   // return (
   //    <div className="h-screen w-screen flex justify-center items-center bg-background-dark relative">
   //       <div className="container mx-auto h-[70%]">
   //          <div className="p-4 md:p-8 relative h-full w-full">
   //             {/* Background Image */}
   //             <Image
   //                src="https://cdn.usegalileo.ai/stability/35c36e31-01fb-4d32-8f6c-9eda05202603.png"
   //                alt="Background"
   //                fill
   //                className="object-cover object-center rounded-xl"
   //                quality={100}
   //             />
   //             {/* Gradient Overlay */}
   //             <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.1)] to-[rgba(0,0,0,0.4)] rounded-xl"></div>

   //             {/* Content */}
   //             <div
   //                ref={contentRef}
   //                className="relative flex min-h-[480px] flex-col gap-6 items-center justify-center md:gap-8 p-4"
   //             >
   //                <div className="flex flex-col gap-4 text-center">
   //                   <h1 className="fade-in text-white text-4xl font-black leading-tight tracking-[-0.033em] md:text-5xl font-SFPro">
   //                      قصتنا
   //                   </h1>
   //                   <h2 className="fade-in text-white text-sm  leading-normal  font-bold md:text-lg">
   //                      نؤمن بأن العطر هو أداة قوية للتعبير عن الذات، وأنه ينبغي للجميع الحرية في استكشافه والاستمتاع
   //                      به. لهذا السبب نحن في مهمة لجعل العطور الفاخرة أكثر قابلية للوصول. من خلال مجموعتنا المختارة
   //                      بعناية إلى برنامج العينات المبتكر لدينا، كل ما نقوم به مصمم لمساعدتك على اكتشاف عطرك المميز
   //                      بثقة.
   //                   </h2>
   //                </div>
   //             </div>
   //          </div>
   //       </div>
   //    </div>
   // )
   return (
      <div className="h-screen w-screen flex justify-center items-center bg-background-light">
         <HeroSwiper />
      </div>
   )
}

export default Page
