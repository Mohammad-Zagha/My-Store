'use client'
import { useState } from 'react'
import { T_Sort } from '@/types/objects'

const useSort = (initialSort: T_Sort = '') => {
   const [order, setOrder] = useState<T_Sort>(initialSort)

   const handleSelect = (value: T_Sort) => {
      setOrder(value)
   }

   return { order, handleSelect }
}

export default useSort
