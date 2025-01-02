'use client'

import React from 'react'
import { FaSortAlphaDown, FaSortAlphaUp, FaClock } from 'react-icons/fa'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../chadcn/dropdown'
import { Button } from '../chadcn/button'
import { FaClockRotateLeft } from 'react-icons/fa6'
import { IoIosArrowDown } from 'react-icons/io'
import useSort from '@/hooks/use-sort'
import { T_Sort } from '@/types/objects'

type T_OrderFilter = {
   order: T_Sort
   handleSelect: (order: T_Sort) => void
}
const ProductOrderFilter = ({ order, handleSelect }: T_OrderFilter) => {
   return (
      <DropdownMenu>
         <DropdownMenuTrigger asChild>
            <Button
               variant="default"
               className="flex w-fit bg-transparent text-primary-dark hover:bg-transparent border-none font-Cairo text-sm leading-3  font-semibold items-center gap-2"
            >
               <IoIosArrowDown size={24} className="text-primary-dark" />

               {(() => {
                  switch (order) {
                     case 'newest':
                        return <>الجديدة اولا</>
                     case 'oldest':
                        return <>القديمة اولا</>
                     case 'a-z':
                        return <>ا - ي</>
                     case 'z-a':
                        return <>ي - ا</>
                     default:
                        return 'الترتيب'
                  }
               })()}
            </Button>
         </DropdownMenuTrigger>
         <DropdownMenuContent className="w-48 bg-white" side="bottom">
            <DropdownMenuItem onClick={() => handleSelect('newest')} className="flex items-center gap-2">
               <FaClock className="text-primary-dark" /> الجديدة اولا
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSelect('oldest')} className="flex items-center gap-2">
               <FaClockRotateLeft className="text-primary-dark" /> القديمة اولا
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSelect('a-z')} className="flex items-center gap-2">
               <FaSortAlphaDown className="text-primary-dark" /> ا - ي
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleSelect('z-a')} className="flex items-center gap-2">
               <FaSortAlphaUp className="text-primary-dark" /> ي - ا
            </DropdownMenuItem>
         </DropdownMenuContent>
      </DropdownMenu>
   )
}

export default ProductOrderFilter
