'use client'
import { ProductCardSkeleton, Skeleton } from '@/components/ui/Skeletons'
import { useAddProduct, useGetAllProducts } from '@/hooks/api/Products'
import usePagination from '@/hooks/Pagination'
import { useInView } from 'framer-motion'
import React, { useEffect, useMemo, useRef } from 'react'
import { AdminProductCard } from '../Cards/AdminProductCard'
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@/components/chadcn/sheet'
import { Controller, useForm } from 'react-hook-form'
import { T_Product } from '@/types/objects'
import { zodResolver } from '@hookform/resolvers/zod'
import { ProductSchema } from '@/lib/zod/Schemas'
import { DragAndDropImage } from '@/components/ui/DND'
import { useQueryClient } from '@tanstack/react-query'
import { Carousel } from '@/components/Carousels/CardsCarousel'
import { Input, InputBox } from '@/components/ui/input'
import { EnumCombobox } from '@/components/ui/combobox'
import { useGetListOfCategories } from '@/hooks/api/Admin'
import { Button } from '@/components/chadcn/button'
import { toast } from 'sonner'
import { useDebounce } from 'use-debounce'
import ApiLoader from '@/components/common/ApiLoader'
import { AddProductSideSheet } from '../AddProductSideSheet'

const Products = () => {
   const [search, setSearch] = React.useState<string>('')
   const [debouncedSearch] = useDebounce(search, 500)
   const { page, limit } = usePagination({ limit: 10 })
   const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending, isFetching } = useGetAllProducts({
      page,
      limit,
      search: debouncedSearch,
   })
   const products = data?.pages?.flatMap((page) => page?.results ?? []) ?? []
   const loadMoreRef = useRef<HTMLDivElement | null>(null)
   const isInView = useInView(loadMoreRef)
   useEffect(() => {
      if (isInView && hasNextPage && !isFetchingNextPage) {
         fetchNextPage()
      }
   }, [isInView, hasNextPage, isFetchingNextPage, fetchNextPage])
   useEffect(() => {
      console.log(isPending)
   }, [isPending])
   return (
      <div className="grid grid-rows-[auto_minmax(0,1fr)] h-screen gap-2">
         <div className="w-full flex justify-between items-center gap-2" dir="rtl">
            <AddProductSideSheet />
            <div className="flex gap-3 center max-sm:w-full md:w-1/2 lg:w-1/3">
               <Input
                  placeholder="ابحث عن منتج"
                  containerClassName="w-full"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  isPending={isFetching}
               />
            </div>
            <div></div>
         </div>
         <div
            className="w-full rounded-xl p-2 overflow-y-auto h-full grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] grid-rows-[auto] gap-5"
            dir="rtl"
         >
            {products.map((product) => (
               <AdminProductCard key={product.productId} product={product} />
            ))}
            <div ref={loadMoreRef} className="h-[400px] col-span-full flex justify-center items-center">
               {isFetchingNextPage && <ApiLoader />}
            </div>
         </div>
      </div>
   )
}

export default Products
