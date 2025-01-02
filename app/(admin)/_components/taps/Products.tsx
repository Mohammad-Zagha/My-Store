'use client'
import { useGetAllProducts } from '@/hooks/api/Products'
import usePagination from '@/hooks/Pagination'
import { useInView } from 'framer-motion'
import React, { useEffect, useMemo, useRef } from 'react'
import { AdminProductCard } from '../Cards/AdminProductCard'

import { Input } from '@/components/ui/input'

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
