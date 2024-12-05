'use client'
import { useState } from 'react'
import { Lens } from '../ui/lens'
import { cn } from '@/lib/utils'
import CustomAvatar from '../ui/ImageHandler'

type LensProps = {
   src: string
   alt: string
   containerClassname?: string
   imageClassname?: string
   fallbackClassName?: string
}

export function LensImage({
   src,
   alt = 'Lens Image',
   containerClassname,
   imageClassname,
   fallbackClassName,
}: LensProps) {
   const [hovering, setHovering] = useState(false)

   return (
      <div className="relative z-10">
         <div className={cn(`relative overflow-hidden`, containerClassname)}>
            <Lens hovering={hovering} setHovering={setHovering}>
               <CustomAvatar
                  src={src}
                  alt={alt}
                  className={cn(`rounded-lg object-cover`, imageClassname)}
                  fallbackClassName={cn('', fallbackClassName)}
               />
            </Lens>
         </div>
      </div>
   )
}
