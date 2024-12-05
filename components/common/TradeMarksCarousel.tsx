'use client'

import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'

interface TradeMarksCarouselProps {
   images?: string[]
   text?: string[]
   className?: string
   textStyle?: string
}

const TradeMarksCarousel: React.FC<TradeMarksCarouselProps> = ({ images = [], text = [], className, textStyle }) => {
   const containerRef = useRef<HTMLDivElement>(null)
   const isInView = useInView(containerRef, { once: true }) // Trigger only once when in view

   useEffect(() => {
      if (isInView) {
         gsap.to(containerRef.current, {
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)', // Reveal the element
            duration: 1.5,
            ease: 'expo.inOut',
         })
      }
   }, [isInView])

   const items = text.length > 0 ? text : images

   return (
      <motion.div
         ref={containerRef}
         initial={{ clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' }} // Hidden state
         className={cn('overflow-hidden w-full h-fit py-16 ', className)}
      >
         <div className="flex w-full h-fit">
            {[...Array(3)].map((_, idx) => (
               <motion.div
                  key={idx}
                  initial={{ x: '150%' }}
                  animate={{ x: '-100%' }}
                  transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                  className="flex flex-shrink-0 items-center drop-shadow-md"
               >
                  {items.map((item, index) =>
                     text.length > 0 ? (
                        <div className={cn('mx-4 text-lg font-bold text-center', textStyle)} key={index}>
                           {item}
                        </div>
                     ) : (
                        <img
                           className="h-32 w-32 mx-4 rounded-full"
                           src={item}
                           alt={`Trademark ${index}`}
                           key={index}
                        />
                     ),
                  )}
               </motion.div>
            ))}
         </div>
      </motion.div>
   )
}

export default TradeMarksCarousel
