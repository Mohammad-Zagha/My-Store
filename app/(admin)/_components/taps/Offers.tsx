'use client'
import { ProductCardSkeleton, Skeleton } from '@/components/ui/Skeletons'
import { useGetDiscountedProducts, useUpdateProduct } from '@/hooks/api/Products'
import usePagination from '@/hooks/Pagination'
import React, { useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'
import AdminProductDiscountCard from '../Cards/AdminProductDiscountCard'

const Offers = () => {
   const { page, limit } = usePagination({
      limit: 10,
   })
   const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetDiscountedProducts({
      page,
      limit,
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
      <div
         className="w-full rounded-xl p-2 max-md:px-6 overflow-y-auto bg-background-light  h-full grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] grid-rows-[auto] gap-5"
         dir="rtl"
      >
         {isLoading && (
            <>
               <Skeleton className="h-[350px] w-full rounded-lg  bg-background-dark"></Skeleton>
               <Skeleton className="h-[350px] w-full rounded-lg  bg-background-dark"></Skeleton>
               <Skeleton className="h-[350px] w-full rounded-lg  bg-background-dark"></Skeleton>
               <Skeleton className="h-[350px] w-full rounded-lg  bg-background-dark"></Skeleton>
               <Skeleton className="h-[350px] w-full rounded-lg  bg-background-dark"></Skeleton>
               <Skeleton className="h-[350px] w-full rounded-lg  bg-background-dark"></Skeleton>
            </>
         )}
         {products.map((product, index) => (
            <AdminProductDiscountCard key={product.productId} product={product} />
         ))}
         <div ref={loadMoreRef} className="h-[400px] col-span-full flex justify-center items-center">
            {isFetchingNextPage && <ProductCardSkeleton />}
         </div>
      </div>
   )
}

export default Offers
