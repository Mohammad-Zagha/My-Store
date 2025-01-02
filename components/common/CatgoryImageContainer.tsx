import Image from 'next/image'
import gsap from 'gsap'
import React, { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

type T_CatgoryImageContainerProps = {
   src: string
   title: string
   className?: string
}

const CatgoryImageContainer = ({ src, title, className }: T_CatgoryImageContainerProps) => {
   const imageRef = useRef<HTMLImageElement>(null)
   const overlayRef = useRef<HTMLDivElement>(null)

   useEffect(() => {
      const img = imageRef.current
      const overlay = overlayRef.current

      if (img && overlay) {
         // Hover animation for both image and overlay
         const hoverAnimation = gsap.timeline({ paused: true, ease: 'power2.inOut' })
         hoverAnimation.to([img, overlay], {
            scale: 1.05, // Slight zoom
            clipPath: 'inset(5% 5% 5% 5%)', // Clip the image
            duration: 0.3, // Animation duration
         })

         // Event listeners for hover
         img.parentElement?.addEventListener('mouseenter', () => hoverAnimation.play())
         img.parentElement?.addEventListener('mouseleave', () => hoverAnimation.reverse())

         return () => {
            img.parentElement?.removeEventListener('mouseenter', () => hoverAnimation.play())
            img.parentElement?.removeEventListener('mouseleave', () => hoverAnimation.reverse())
         }
      }
   }, [])

   return (
      <div className={cn('w-fit h-fit relative group', className)}>
         {/* Image */}
         <Image
            ref={imageRef}
            src={src}
            alt="Picture of the author"
            className="w-full h-[400px] object-cover"
            height={400}
            width={400}
         />

         {/* Overlay */}
         <div ref={overlayRef} className="absolute inset-0 bg-black bg-opacity-15  transition-colors duration-300" />

         {/* Title */}
         <span className="absolute bottom-4 right-4 text-xl max-md:text-lg font-Cairo text-background-light font-bold line-clamp-1">
            {title}
         </span>
      </div>
   )
}

export default CatgoryImageContainer
