'use client'

import { cn } from '@/lib/utils'
import { useMemo, useState } from 'react'
import { IconContext } from 'react-icons'
import { FaStar } from 'react-icons/fa'

type T_Stars = {
   rating: number
   num_of_ratings: number
   size?: string
   inactiveColor?: string
   className?: string
   forRating?: {
      is_rated: boolean
      onRate: (rate: number) => void
   }
}

const Stars = ({
   rating,
   num_of_ratings,
   inactiveColor = '#d1d5db',
   className,
   size = '1.5rem',
   forRating,
}: T_Stars) => {
   const [hoveredRating, setHoveredRating] = useState<number | null>(null)
   const [isHovering, setIsHovering] = useState(false)

   const not_rated = forRating && !forRating.is_rated
   const hovered = !!isHovering
   const filledStars = hovered && not_rated ? Math.floor(Number(hoveredRating)) : Math.floor(rating)
   const hasHalfStar = rating - filledStars > 0 && !hovered

   const handleMouseEnter = (value: number) => {
      setIsHovering(true)
      setHoveredRating(value)
   }

   const handleMouseLeave = () => {
      setIsHovering(false)
      setHoveredRating(null)
   }

   const handleClick = (value: number) => {
      setIsHovering(false)
      forRating?.onRate(value)
   }

   const iconContextValue = useMemo(() => ({ size, className: 'text-main-crystal' }), [size])

   const renderStar = (star: number) => {
      if (star <= filledStars) {
         return <FaStar />
      } else if (star === filledStars + 1 && hasHalfStar) {
         return (
            <>
               <FaStar color={inactiveColor} className="absolute inset-0" />
               <div
                  className="absolute inset-0 overflow-hidden transition-all"
                  style={{ width: `${Math.round((rating - filledStars) * 100)}%` }}
               >
                  <FaStar className="absolute inset-0 transition-all" />
               </div>
            </>
         )
      } else if (star > filledStars + (hasHalfStar ? 1 : 0)) {
         return <FaStar color={inactiveColor} />
      }
      return null
   }

   return (
      <IconContext.Provider value={iconContextValue}>
         <div
            className={cn('inline-flex items-center gap-1', className)}
            {...(not_rated && { onMouseLeave: handleMouseLeave })}
         >
            {[1, 2, 3, 4, 5].map((star) => (
               <div
                  key={star}
                  className="relative"
                  {...(not_rated && {
                     onMouseEnter: () => handleMouseEnter(star),
                     onClick: () => handleClick(star),
                  })}
                  style={{ cursor: not_rated ? 'pointer' : 'default', width: size, height: size }}
               >
                  {renderStar(star)}
               </div>
            ))}

            <span className="text-sm font-bold select-none">({num_of_ratings})</span>
         </div>
      </IconContext.Provider>
   )
}

export default Stars
