'use client'
import { useEffect, useRef } from 'react'
import '../globals.css'
import Navbar from '@/components/common/Navbar'
import gsap from 'gsap'
import Footer from '@/components/ui/Footer'
import { Toaster } from 'sonner'
import CacheProvider from '@/lib/Cache'
export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode
}>) {
   const contentRef = useRef<any>(null)

   useEffect(() => {
      // Main clip-path reveal animation
      gsap.fromTo(
         contentRef.current,
         { clipPath: 'inset(80% 0 0 0)', opacity: 0 },
         { clipPath: 'inset(0% 0 0 0)', opacity: 1, duration: 1, ease: 'expo.out' },
      )
   }, [])
   return (
      <div
         className={`antialiased bg-primary-dark relative opacity-0 overscroll-none w-dvw overflow-x-clip   `}
         ref={contentRef}
      >
         <div className="fixed top-0 right-0 col-span-full w-full h-fit   z-[999] ">
            <Navbar />
         </div>
         {children}

         <Footer />
      </div>
   )
}
