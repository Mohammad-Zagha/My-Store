'use client'
import { ProductCardSkeleton, Skeleton } from '@/components/ui/Skeletons'
import { useGetHomeCategories } from '@/hooks/api/Categories'
import React, { useEffect, useRef } from 'react'
import usePagination from '@/hooks/Pagination'
import { useInView } from 'framer-motion'
import { AddProductSideSheet } from '../AddProductSideSheet'
import { Input } from '@/components/ui/input'
import { CategoryCard } from '../Cards/AdminCategoryCard'
import AddCategorySideSheet from '../AddCategorySideSheet'
import ApiLoader from '@/components/common/ApiLoader'

const Categories = () => {
   const { page, limit } = usePagination({
      limit: 10,
   })
   const {
      data: categories,
      isLoading,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
   } = useGetHomeCategories({
      page,
      limit,
   })

   const categoriesData = categories?.pages?.flatMap((page) => page?.results ?? []) || []

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
            <AddCategorySideSheet />
            <div className="flex gap-3 center max-sm:w-full md:w-1/2 lg:w-1/3">
               <Input placeholder="ابحث عن منتج" containerClassName="w-full" />
            </div>
            <div></div>
         </div>
         <div
            className="w-full rounded-xl p-2 overflow-y-auto   h-full grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] grid-rows-[auto] gap-5"
            dir="rtl"
         >
            {isLoading && (
               <>
                  <Skeleton className="h-[300px] w-full rounded-lg  bg-background-light"></Skeleton>
                  <Skeleton className="h-[300px] w-full rounded-lg  bg-background-light"></Skeleton>
                  <Skeleton className="h-[300px] w-full rounded-lg  bg-background-light"></Skeleton>
                  <Skeleton className="h-[300px] w-full rounded-lg  bg-background-light"></Skeleton>
                  <Skeleton className="h-[300px] w-full rounded-lg  bg-background-light"></Skeleton>
                  <Skeleton className="h-[300px] w-full rounded-lg  bg-background-light"></Skeleton>
               </>
            )}
            {categoriesData.map((category, index) => (
               <CategoryCard key={index} category={category} />
            ))}
            <div ref={loadMoreRef} className="h-[200px] col-span-full flex justify-center items-center">
               {isFetchingNextPage && <ApiLoader />}
            </div>
         </div>
      </div>
   )
}

export default Categories
