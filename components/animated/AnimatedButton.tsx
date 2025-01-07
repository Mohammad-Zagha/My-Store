'use client'
import Link from 'next/link'
import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { cn } from '@/lib/utils'
import { Button } from '../chadcn/button'

type T_AnimatedButton = {
   onClick?: () => void
   className?: string
   children?: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const AnimatedButton = ({ onClick, className, children, ...props }: T_AnimatedButton) => {
   const ButtonRef = useRef<HTMLButtonElement>(null)
   const lineRef = useRef<HTMLDivElement>(null)

   useEffect(() => {
      const link = ButtonRef.current
      const line = lineRef.current

      if (!link || !line) return

      const handleMouseEnter = () => {
         // Animate line width to full on hover
         gsap.to(line, {
            width: '100%',
            duration: 0.3,
            ease: 'expo.in',
         })
      }

      const handleMouseLeave = () => {
         // Animate line width back to zero on mouse leave
         gsap.to(line, {
            width: '0%',
            duration: 0.3,
            ease: 'expo.out',
         })
      }

      link.addEventListener('mouseenter', handleMouseEnter)
      link.addEventListener('mouseleave', handleMouseLeave)

      return () => {
         link.removeEventListener('mouseenter', handleMouseEnter)
         link.removeEventListener('mouseleave', handleMouseLeave)
      }
   }, [])

   return (
      <button
         ref={ButtonRef}
         onClick={onClick}
         {...props}
         className={cn(
            'bg-transparent hover:bg-transparent relative  text-lg max-md:text-sm font-bold text-primary-dark/75 w-fit',
            className,
         )}
      >
         <>
            {children}
            <div ref={lineRef} className="absolute right-0 bottom-0 h-[1px] w-0 bg-primary-dark" />
            <div className="absolute right-0 bottom-0 h-[1px] w-full bg-primary-dark opacity-10" />
         </>
      </button>
   )
}

export default AnimatedButton
