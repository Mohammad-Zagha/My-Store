import React from 'react'
import '@/styles/ButtonLoader.css'
import { cn } from '@/lib/utils'
const ButtonLoader = ({ className }: { className?: string }) => {
   return (
      <div className={cn('dot-spinner --uib-color:black', className)}>
         <div className="dot-spinner__dot"></div>
         <div className="dot-spinner__dot"></div>
         <div className="dot-spinner__dot"></div>
         <div className="dot-spinner__dot"></div>
         <div className="dot-spinner__dot"></div>
         <div className="dot-spinner__dot"></div>
         <div className="dot-spinner__dot"></div>
         <div className="dot-spinner__dot"></div>
      </div>
   )
}

export default ButtonLoader
