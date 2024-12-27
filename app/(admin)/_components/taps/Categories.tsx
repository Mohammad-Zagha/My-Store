'use client'
import CustomAvatar from '@/components/ui/ImageHandler'
import { ProductCardSkeleton, Skeleton } from '@/components/ui/Skeletons'
import { useGetHomeCategories } from '@/hooks/api/Categories'
import { T_Category } from '@/types/objects'
import React, { useEffect, useRef } from 'react'
import CategoryEditDialog from '../CategoryEditDialog'
import usePagination from '@/hooks/Pagination'
import { useInView } from 'framer-motion'

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
         <div ref={loadMoreRef} className="h-[400px] col-span-full flex justify-center items-center">
            {isFetchingNextPage && <ProductCardSkeleton />}
         </div>
      </div>
   )
}

export default Categories

function CategoryCard({ category }: { category: T_Category }) {
   return (
      <div className="h-[380px] w-full rounded-lg shadow-card flex flex-col justify-between  relative">
         <CustomAvatar
            src={(category.image as string) ?? ''}
            alt={category.name}
            className="w-full !rounded-lg h-[200px] "
         />
         <div className="w-full h-full p-2 mt-10 flex flex-col gap-2">
            <span className="font-Cairo text-sm font-semibold text-primary-dark">{category.name}</span>
            <span className="font-Cairo text-xs text-primary-dark/70 line-clamp-2   ">{category.description}</span>
         </div>
         <div className="flex justify-between items-center p-2">
            <CategoryEditDialog category={category} />
         </div>
      </div>
   )
}
