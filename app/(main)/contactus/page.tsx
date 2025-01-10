'use client'
import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'

const ContactPage = () => {
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

   return (
      <div className="h-screen w-screen flex justify-center items-center bg-background-dark relative">
         <div className="container mx-auto h-[80%] grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left Section */}
            <div className="relative h-full w-full">
               <Image
                  src="https://cdn.usegalileo.ai/stability/6c819219-c4f3-43c2-8d36-adc8984c8b9d.png"
                  alt="Contact Background"
                  fill
                  className="object-cover object-center rounded-xl"
                  quality={100}
               />
               <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.3)] to-[rgba(0,0,0,0.7)] rounded-xl"></div>
               <div
                  ref={contentRef}
                  className="absolute inset-0 flex flex-col gap-6 items-center justify-center p-4 text-center fade-in"
               >
                  <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] md:text-5xl ">
                     تواصل معنا
                  </h1>
                  <p className="text-white text-sm  font-medium md:text-lg">
                     نحن هنا للإجابة على جميع استفساراتك. دعنا نعرف كيف يمكننا مساعدتك.
                  </p>
               </div>
            </div>

            {/* Right Section - Contact Details */}
            <div className="relative flex flex-col gap-6 bg-white p-8 rounded-xl shadow-lg">
               <h2 className="fade-in text-2xl font-bold text-gray-800 text-end">اتصل بنا</h2>
               <div className="fade-in flex flex-col gap-4 text-gray-700  " dir="rtl">
                  <div>
                     <h3 className="text-lg font-semibold">الموقع</h3>
                     <p className="text-sm">123 شارع رئيسي، مدينة الرياض، المملكة العربية السعودية</p>
                  </div>
                  <div>
                     <h3 className="text-lg font-semibold">الهاتف</h3>
                     <p className="text-sm">+966 123 456 789</p>
                  </div>
                  <div>
                     <h3 className="text-lg font-semibold">ساعات العمل</h3>
                     <p className="text-sm">الأحد - الخميس: 9:00 صباحًا - 6:00 مساءً</p>
                     <p className="text-sm">الجمعة - السبت: مغلق</p>
                  </div>
               </div>

               <div className="fade-in text-gray-600 text-sm mt-4 text-end">
                  <p>
                     إذا كانت لديك أي استفسارات أو تحتاج إلى دعم إضافي، لا تتردد في التواصل معنا عبر الهاتف أو زيارة
                     مكتبنا. نحن هنا لمساعدتك!
                  </p>
               </div>
            </div>
         </div>
      </div>
   )
}

export default ContactPage
