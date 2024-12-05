'use client'
import { useEffect, useRef } from 'react'
import './globals.css'
import Navbar from '@/components/common/Navbar'
import gsap from 'gsap'
import Footer from '@/components/ui/Footer'
import { Toaster } from 'sonner'
import CacheProvider from '@/lib/Cache'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
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
      <html lang="en">
         <body className={`antialiased bg-primary-dark relative opacity-0 overscroll-none `} ref={contentRef}>
            <CacheProvider>
               <div className="fixed top-0 right-0 col-span-full w-full h-fit   z-[999] ">
                  <Navbar />
               </div>
               {children}
               <Toaster
                  position={'bottom-right'}
                  richColors
                  visibleToasts={6}
                  closeButton
                  expand
                  toastOptions={{
                     closeButton: true,
                  }}
                  duration={3000}
               />
               <Footer />
            </CacheProvider>
         </body>
      </html>
   )
}
