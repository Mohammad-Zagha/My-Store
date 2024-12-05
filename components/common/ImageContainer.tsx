'use client'
import Image from 'next/image'
import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import Link from 'next/link'
import CustomAvatar from '../ui/ImageHandler'

type T_ImageContainer = {
   src: string
   title: string
   description: string
   href: string
}

const ImageContainer = ({ src, title, description, href }: T_ImageContainer) => {
   const imageRef = useRef<HTMLImageElement>(null)

   useEffect(() => {
      const img = imageRef.current
      if (img) {
         const hoverAnimation = gsap.to(img, {
            scale: 1.05, // Slight zoom
            clipPath: 'inset(5% 5% 5% 5%)', // Clip the image
            duration: 0.3, // Animation duration
            paused: true, // Start paused to only play on hover
            // Easing function
         })

         img.addEventListener('mouseenter', () => hoverAnimation.play())
         img.addEventListener('mouseleave', () => hoverAnimation.reverse())

         return () => {
            img.removeEventListener('mouseenter', () => hoverAnimation.play())
            img.removeEventListener('mouseleave', () => hoverAnimation.reverse())
         }
      }
   }, [])

   return (
      <div className="flex flex-col gap-3" dir="rtl">
         <CustomAvatar
            src={src}
            className="h-[400px] max-h-[400px] object-cover rounded-xl w-full"
            fallbackClassName="w-full "
         />

         <div className="space-y-0.25r">
            <span className="text-primary-dark font-SFPro text-xl"> {title}</span>
            <p className="text-primary-light max-w-[300px]">{description}</p>
            <Link className="text-primary-dark font-SFPro text-sm font-semibold" href={href}>
               جميع المنتجات
            </Link>
         </div>
      </div>
   )
}

export default ImageContainer
