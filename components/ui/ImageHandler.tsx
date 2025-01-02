'use client'
import { MdImageNotSupported } from 'react-icons/md'
import { Avatar, AvatarFallback, AvatarImage } from './Avatar'
import { cn } from '@/lib/utils'
import gsap from 'gsap'
import React, { useRef, useEffect } from 'react'

type AvatarProps = {
   src?: string
   alt?: string
   avatarClassName?: string
   fallbackClassName?: string
   className?: string
   onHover?: boolean // Optional hover scaling prop
   onClick?: () => void
}

const CustomAvatar = ({
   src,
   alt = 'No Image',
   avatarClassName,
   fallbackClassName,
   className,
   onClick,
   onHover = false,
}: AvatarProps) => {
   const avatarRef = useRef<HTMLDivElement>(null)
   const imageRef = useRef<HTMLImageElement>(null)

   useEffect(() => {
      if (onHover) {
         const avatar = avatarRef.current
         const image = imageRef.current

         const handleMouseEnter = () => {
            gsap.to(image, {
               scale: 1.1,
               duration: 0.3,
               ease: 'power2.out',
            })
         }

         const handleMouseLeave = () => {
            gsap.to(image, {
               scale: 1,
               duration: 0.3,
               ease: 'power2.out',
            })
         }

         avatar?.addEventListener('mouseenter', handleMouseEnter)
         avatar?.addEventListener('mouseleave', handleMouseLeave)

         return () => {
            avatar?.removeEventListener('mouseenter', handleMouseEnter)
            avatar?.removeEventListener('mouseleave', handleMouseLeave)
         }
      }
   }, [onHover])

   return (
      <Avatar ref={avatarRef} className={cn('shrink-0', avatarClassName, className)} onClick={onClick}>
         <AvatarImage
            ref={imageRef}
            loading="lazy"
            src={src ?? ''}
            alt={alt}
            className={onHover ? 'transition-transform' : ''} // Ensure smooth transitions if hover is enabled
         />
         <AvatarFallback
            className={cn(
               'bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 text-primary-dark/80 flex items-center justify-center',
               fallbackClassName,
               className,
            )}
         >
            <div className="flex flex-col items-center">
               <MdImageNotSupported size={24} className="mb-1 text-black" /> {/* No Image Icon */}
            </div>
         </AvatarFallback>
      </Avatar>
   )
}

export default CustomAvatar
