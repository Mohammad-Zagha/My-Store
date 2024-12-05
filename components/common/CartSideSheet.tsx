'use client'
import { useGetCart } from '@/hooks/api/Cart'
import React from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '../chadcn/sheet'
import { Button } from '../chadcn/button'
import { Input } from '../ui/input'

const CartSideSheet = () => {
   const { data, isLoading } = useGetCart()

   return (
      <Sheet>
         <SheetTrigger asChild>
            <Button variant="outline">Open</Button>
         </SheetTrigger>
         <SheetContent></SheetContent>
      </Sheet>
   )
}

export default CartSideSheet
