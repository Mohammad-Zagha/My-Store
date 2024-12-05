'use client'
import React, { useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'
import gsap from 'gsap'
import CatgoryImageContainer from '../common/CatgoryImageContainer'

export function CatgoryCarousel() {
   const containerRef = useRef(null)
   const childRefs = useRef<(HTMLDivElement | null)[]>([])

   const inView = useInView(containerRef, { once: true, margin: '0px' }) // Customize margin as needed

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

         // Animate the scale of each child element
         childRefs.current.forEach((child) => {
            gsap.fromTo(
               child,
               { scale: 1.2, opacity: 0 }, // Start zoomed in
               {
                  scale: 1, // Zoom out to normal
                  duration: 1.5,
                  ease: 'power3.out',
                  opacity: 1,
               },
            )
         })
      } else {
         gsap.set(containerRef.current, { clipPath: 'inset(50% 50% 50% 50%)' })
         childRefs.current.forEach((child) => gsap.set(child, { scale: 1.2 }))
      }
   }, [inView])

   return (
      <div ref={containerRef} className="w-full py-10 overflow-hidden flex justify-between  ">
         {[...Array(3)].map((_, index) => (
            <div
               ref={(el) => {
                  childRefs.current[index] = el
               }}
               key={index}
            >
               <CatgoryImageContainer src={`/perfums/image-${index + 1}.png`} title="عطور رجالي 200 مل" />
            </div>
         ))}
      </div>
   )
}
