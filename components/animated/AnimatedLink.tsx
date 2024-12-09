'use client'
import Link from 'next/link'
import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { cn } from '@/lib/utils'

type T_AnimatedLink = {
   href: string
   title: string
   className?: string
} & React.AnchorHTMLAttributes<HTMLAnchorElement>

const AnimatedLink = ({ title, href, className, ...props }: T_AnimatedLink) => {
   const linkRef = useRef<HTMLAnchorElement>(null)
   const lineRef = useRef<HTMLDivElement>(null)

   useEffect(() => {
      const link = linkRef.current
      const line = lineRef.current

      if (!link || !line) return

      const handleMouseEnter = () => {
         // Animate line width to full on hover
         gsap.to(line, {
            width: '100%',
            duration: 0.4,
            ease: 'power3.out',
         })
      }

      const handleMouseLeave = () => {
         // Animate line width back to zero on mouse leave
         gsap.to(line, {
            width: '0%',
            duration: 0.4,
            ease: 'power3.out',
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
      <Link
         href={href}
         ref={linkRef}
         {...props}
         className={cn('relative font-Cairo text-lg max-md:text-sm font-bold text-primary-dark/75 w-fit', className)}
      >
         {title}
         <div ref={lineRef} className="absolute right-0 bottom-0 h-[1px] w-0 bg-primary-dark" />
         <div className="absolute right-0 bottom-0 h-[1px] w-full bg-primary-dark opacity-10" />
      </Link>
   )
}

export default AnimatedLink
