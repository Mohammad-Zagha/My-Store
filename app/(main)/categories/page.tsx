'use client'
import { useGetHomeCategories } from '@/hooks/api/Categories'
import usePagination from '@/hooks/Pagination'
import { useInView } from 'framer-motion'
import React, { useEffect, useRef } from 'react'

const Page = () => {
   const { page, limit } = usePagination({ limit: 10 })
   const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useGetHomeCategories({ page, limit })
   const categories = data?.pages?.flatMap((page) => page?.results ?? []) ?? []

   const loadMoreRef = useRef<HTMLDivElement | null>(null)
   const isInView = useInView(loadMoreRef)

   useEffect(() => {
      if (isInView && hasNextPage && !isFetchingNextPage) {
         fetchNextPage()
      }
   }, [isInView, hasNextPage, isFetchingNextPage, fetchNextPage])
   return (
      <div className="min-w-screen min-h-[100dvh] bg-background-light pt-20 flex flex-col" dir="rtl">
         <span className="w-full font-Cairo text-3xl max-sm:text-lg font-semibold text-primary-dark text-center outline mx-2">
            جميع القوائم
         </span>
      </div>
   )
}

export default Page
