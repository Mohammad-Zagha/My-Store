'use client'

import React from 'react'
import { FaSortAlphaDown, FaSortAlphaUp, FaClock, FaStar } from 'react-icons/fa'
import {
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuTrigger,
} from '../chadcn/dropdown'
import { Button } from '../chadcn/button'
import { FaClockRotateLeft } from 'react-icons/fa6'
import { IoIosArrowDown } from 'react-icons/io'

const ProductOrderFilter = () => {
   const [order, setOrder] = React.useState<'new-first' | 'last-first' | 'a-z' | 'z-a' | 'populer'>('new-first')
   const [isOpen, setIsOpen] = React.useState(false) // Track dropdown open state

   const handleSelect = (value: typeof order) => {
      setOrder(value)
      setIsOpen(false) // Close dropdown on selection
   }

   return (
      <DropdownMenu onOpenChange={(open) => setIsOpen(open)}>
         <DropdownMenuTrigger asChild>
            <Button
               variant="default"
               className="flex w-fit bg-transparent text-primary-dark hover:bg-transparent border-none font-Cairo text-sm leading-3 font-semibold items-center gap-2"
            >
               {(() => {
                  switch (order) {
                     case 'new-first':
                        return <>منتجات جديدة</>
                     case 'last-first':
                        return <>منتجات قديمة</>
                     case 'a-z':
                        return <>ا - ي</>
                     case 'z-a':
                        return <>ي - ا</>
                     case 'populer':
                        return <>الاكثر شهرة</>
                     default:
                        return 'Select Order'
                  }
               })()}
               <IoIosArrowDown
                  size={24}
                  className={`text-primary-dark transform transition-transform duration-300 ${
                     isOpen ? 'rotate-180' : 'rotate-0'
                  }`}
               />
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent className="w-48 bg-white" side="bottom">
            <DropdownMenuItem onClick={() => handleSelect('new-first')} className="flex items-center gap-2">
               <FaClock className="text-primary-dark" /> منتجات جديدة
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSelect('last-first')} className="flex items-center gap-2">
               <FaClockRotateLeft className="text-primary-dark" /> منتجات قديمة
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSelect('a-z')} className="flex items-center gap-2">
               <FaSortAlphaDown className="text-primary-dark" /> ا - ي
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSelect('z-a')} className="flex items-center gap-2">
               <FaSortAlphaUp className="text-primary-dark" /> ي - ا
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSelect('populer')} className="flex items-center gap-2">
               <FaStar className="text-primary-dark" /> الاكثر شهرة
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   )
}

export default ProductOrderFilter
