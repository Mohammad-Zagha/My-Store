'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { CategoriesCarousel } from '@/components/Carousels/HeroCarousel'
import StatsSection from '@/components/pages/home/StatsSection'
import { CatgoryCarousel } from '@/components/Carousels/CatgoryCarousel'
import NewArrivalsCarousel from '@/components/Carousels/NewArrivalsCarousel'
import CollectionCard from '@/components/ui/CollectionCard'
import BlueChanelDisplay from '@/components/pages/home/BlueChanelDisplay'
import TodaysOffers from '@/components/pages/home/TodaysOffers'
import HomeWomanSection from '@/components/pages/home/HomeWomanSection'
import TradeMarksCarousel from '@/components/common/TradeMarksCarousel'
import CustomerStatement from '@/components/pages/home/CustomerStatement'
import HeroSwiper from '@/components/common/HeroSwiper'
import BestSellingCarousel from '@/components/Carousels/BestSellingCarousel'
export default function Home() {
   const contentRef = useRef<HTMLDivElement>(null)

   useEffect(() => {
      // Staggered upshift animation for inner elements
      gsap.fromTo(
         contentRef.current ? Array.from(contentRef.current.children) : [],
         { opacity: 0 },
         { opacity: 1, duration: 1, ease: 'power4.out', stagger: 0.5, delay: 0.3 },
      )
   }, [])

   return (
      <div className="  bg-background-dark grid grid-cols-12 overflow-y-auto  grid-rows-[auto_minmax(0,1fr)]" dir="rtl">
         {/* Hero */}
         <div ref={contentRef} className="col-span-full  pt-16 space-y-[1.5em] bg-background-dark">
            <div className="h-[500px] w-full flex center">
               <HeroSwiper />
            </div>
            <TradeMarksCarousel
               text={[
                  'خصم 50% على جميع العطور',
                  'خصم 50% على جميع العطور',
                  'خصم 50% على جميع العطور',
                  'خصم 50% على جميع العطور',
                  'خصم 50% على جميع العطور',
               ]}
               className="py-4 font-semibold text-lg text-primary-dark font-Cario bg-yellow-300"
            />
            <div className="px-6 ">
               <CategoriesCarousel />
            </div>
         </div>
         <div className="h-full col-span-full  p-6   bg-background-light grid-rows-[auto_minmax(0,1fr)] ">
            <StatsSection />
            <CatgoryCarousel />
            <NewArrivalsCarousel />
         </div>

         <div className="h-full col-span-full p-6   flex center bg-background-dark ">
            <BestSellingCarousel />
         </div>
         {/* <div className="h-full col-span-full  flex center bg-background-light ">
            <BlueChanelDisplay />
         </div> */}
         <div className="h-screen col-span-full  p-6 grid grid-cols-12 gap-4 overflow-y-auto  bg-background-dark grid-rows-[auto_minmax(0,1fr)]">
            <TodaysOffers />
         </div>
         <div className="h-screen col-span-full  p-6 grid grid-cols-12 gap-4 overflow-y-auto  bg-background-light grid-rows-[auto_minmax(0,1fr)]">
            <HomeWomanSection />
         </div>
         <div className="h-screen col-span-full p-6  flex center  bg-background-light">
            <CollectionCard
               src="/perfums/image-5.png"
               title="منتجات متجري النسائية"
               disc="تنيسبنيتلابنيتلابينتلايبنلتابينلتايبنلابينلتبيلنتيبالنتيباليبتنلان"
               href="/"
            />
         </div>
         <div className="h-full col-span-full  flex flex-col gap-2 p-6   bg-background-light grid-rows-[auto_minmax(0,1fr)]">
            <div className="w-full font-Cario font-bold text-4xl  text-primary-dark text-center">شركات العطور</div>

            <TradeMarksCarousel
               images={[
                  'https://geniecollection.ps/cdn/shop/files/French-Avenue-logo-web.png?v=1725188497&width=303',
                  'https://geniecollection.ps/cdn/shop/files/ZARAGOZA-LOGO_9cb949c2-261a-4db9-83df-b241cb2c29e5.png?v=1729589265&width=303',
                  'https://geniecollection.ps/cdn/shop/files/rue-broca-logo-web.png?v=1725188422&width=303',
                  'https://geniecollection.ps/cdn/shop/files/zimaya-Logo-web.png?v=1725190114&width=303',
                  'https://geniecollection.ps/cdn/shop/files/AFNAN-logo-web_a3b389c4-d60f-4745-987e-a3a4e0520390.png?v=1725188289&width=303',
               ]}
            />
            <div className="w-full font-Cario font-bold text-4xl text-primary-dark text-center"> اراء الزبائن</div>

            <div className="w-full  text-3xl text-primary-dark text-center h-full flex justify-center items-center">
               <CustomerStatement />
            </div>
         </div>
      </div>
   )
}
