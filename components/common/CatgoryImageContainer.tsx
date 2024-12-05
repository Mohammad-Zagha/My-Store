import Image from 'next/image'
import gsap from 'gsap'
import React, { useEffect, useRef } from 'react'
type T_CatgoryImageContainerProps = {
   src: string
   title: string
}
const CatgoryImageContainer = ({ src, title }: T_CatgoryImageContainerProps) => {
   const imageRef = useRef<HTMLImageElement>(null)

   useEffect(() => {
      const img = imageRef.current
      if (img) {
         const hoverAnimation = gsap.to(img, {
            scale: 1.05, // Slight zoom
            clipPath: 'inset(5% 5% 5% 5%)', // Clip the image
            duration: 0.3, // Animation duration
            paused: true,
            ease: 'power2.inOut', // Start paused to only play on hover
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
      <div className="w-fit h-fit relative">
         <Image
            ref={imageRef}
            src={src}
            alt="Picture of the author"
            className="w-[400px] h-[400px] object-cover  "
            height={400}
            width={400}
         />
         <span className="absolute bottom-4 right-4 text-2xl max-md:text-lg font-SFPro text-background-light font-bold">
            {title}
         </span>
      </div>
   )
}

export default CatgoryImageContainer
