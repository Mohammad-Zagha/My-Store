'use client'
import React, { useEffect, useRef, useState, createContext } from 'react'
import { IconArrowNarrowLeft, IconArrowNarrowRight, IconX } from '@tabler/icons-react'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { Skeleton } from '../ui/Skeletons'

interface CarouselProps {
   items: JSX.Element[]
   initialScroll?: number
   isLoading: boolean
   buttonsClassName?: string
   containerClassName?: string
}

export type Card = {
   src: string
   title: string
   category: string
   content: React.ReactNode
}

export const CarouselContext = createContext<{
   onCardClose: (index: number) => void
   currentIndex: number
}>({
   onCardClose: () => {},
   currentIndex: 0,
})

export const Carousel = ({
   items,
   buttonsClassName,
   containerClassName,
   initialScroll = 0,
   isLoading,
}: CarouselProps) => {
   const carouselRef = React.useRef<HTMLDivElement>(null)
   const [canScrollLeft, setCanScrollLeft] = React.useState(false)
   const [canScrollRight, setCanScrollRight] = React.useState(true)
   const [currentIndex, setCurrentIndex] = useState(0)

   useEffect(() => {
      if (carouselRef.current) {
         carouselRef.current.scrollLeft = initialScroll
         checkScrollability()
      }
   }, [initialScroll])

   const checkScrollability = () => {
      if (carouselRef.current) {
         const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current
         setCanScrollLeft(scrollLeft > 0)
         setCanScrollRight(scrollLeft < scrollWidth - clientWidth)
      }
   }

   const scrollLeft = () => {
      if (carouselRef.current) {
         carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' })
         checkScrollability()
      }
   }

   const scrollRight = () => {
      if (carouselRef.current) {
         carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' })
         checkScrollability()
      }
   }

   const handleCardClose = (index: number) => {
      if (carouselRef.current) {
         const cardWidth = isMobile() ? 230 : 384 // (md:w-96)
         const gap = isMobile() ? 4 : 8
         const scrollPosition = (cardWidth + gap) * (index + 1)
         carouselRef.current.scrollTo({
            left: scrollPosition,
            behavior: 'smooth',
         })
         setCurrentIndex(index)
      }
   }

   const isMobile = () => {
      return window && window.innerWidth < 768
   }

   return (
      <CarouselContext.Provider value={{ onCardClose: handleCardClose, currentIndex }}>
         <div className={cn('relative w-full overflow-hidden', containerClassName)}>
            {/* Overflow hidden added */}
            <div
               className="flex w-full overflow-x-scroll py-5  scroll-smooth [scrollbar-width:none]"
               ref={carouselRef}
               onScroll={checkScrollability}
            >
               <div
                  className={cn(
                     'flex flex-row gap-4 max-w-full w-full h-fit  mx-auto flex-nowrap', // Updated for width control and no-wrap
                  )}
               >
                  {isLoading
                     ? [...Array(5)].map((_, index) => (
                          <motion.div
                             initial={{ opacity: 0, y: 20 }}
                             animate={{
                                opacity: 1,
                                y: 0,
                                transition: { duration: 0.5, delay: 0.2 * index, ease: 'easeOut' },
                             }}
                             key={'card' + index}
                             className="rounded-3xl flex-shrink-0 flex flex-col gap-3" // Added flex-shrink-0 to prevent resizing
                          >
                             <Skeleton className="w-[370px] h-[500px] object-cover rounded-xl bg-gray-300" />
                             <div className="space-y-0.25r">
                                <Skeleton className="w-28 h-4 bg-gray-300" />
                                <Skeleton className="w-36 h-4 bg-gray-300" />
                                <Skeleton className="w-28 h-4 bg-gray-300" />
                             </div>
                          </motion.div>
                       ))
                     : items.map((item, index) => (
                          <motion.div
                             initial={{ opacity: 0, y: 20 }}
                             animate={{
                                opacity: 1,
                                y: 0,
                                transition: { duration: 0.5, delay: 0.2 * index, ease: 'easeOut' },
                             }}
                             key={'card' + index}
                             className="rounded-3xl flex-shrink-0 w-[370px] h-fit " // Added flex-shrink-0 to prevent resizing
                          >
                             {item}
                          </motion.div>
                       ))}
               </div>
            </div>
            <div className={cn('absolute top-1/2 left-4 transform -translate-y-1/2 z-10', buttonsClassName)}>
               <button
                  className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50"
                  onClick={scrollRight}
               >
                  <IconArrowNarrowLeft className="h-6 w-6 text-gray-500" />
               </button>
            </div>
            <div className={cn('absolute top-1/2 right-4 transform -translate-y-1/2 z-10', buttonsClassName)}>
               <button
                  className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center disabled:opacity-50"
                  onClick={scrollLeft}
               >
                  <IconArrowNarrowRight className="h-6 w-6 text-gray-500" />
               </button>
            </div>
         </div>
      </CarouselContext.Provider>
   )
}
