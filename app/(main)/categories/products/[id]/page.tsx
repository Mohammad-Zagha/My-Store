'use client'

import Banner from '@/components/common/Banner'
import { Input } from '@/components/ui/input'
import ProductCard from '@/components/common/ProductCard'
import ProductOrderFilter from '@/components/common/ProductOrderFilter'
import { useGetCategoryProducts } from '@/hooks/api/Products'
import { useParams } from 'next/navigation'
import React, { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import usePagination from '@/hooks/Pagination'
import { ProductCardSkeleton, Skeleton } from '@/components/ui/Skeletons'
import { useGetCategoryById } from '@/hooks/api/Categories'

const staggerContainer = {
   hidden: { opacity: 0 },
   show: {
      opacity: 1,
      transition: {
         staggerChildren: 0.1, // Stagger delay between each card
      },
   },
}

const cardAnimation = {
   hidden: { opacity: 0, y: 50 },
   show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const Page = () => {
   const { id } = useParams<{ id: string }>()
   const { page, limit } = usePagination({
      limit: 10,
   })
   const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetCategoryProducts({
      id,
      page,
      limit,
   })
   const { data: category, isLoading: isCategoryLoading } = useGetCategoryById(id)
   const products = data?.pages?.flatMap((page) => page?.results ?? []) ?? []

   const loadMoreRef = useRef<HTMLDivElement | null>(null)
   const isInView = useInView(loadMoreRef)

   useEffect(() => {
      if (isInView && hasNextPage && !isFetchingNextPage) {
         fetchNextPage()
      }
   }, [isInView, hasNextPage, isFetchingNextPage, fetchNextPage])

   return (
      <div className="h-full w-screen bg-transparent  overflow-x-hidden">
         {category && category.banner && <Banner />}
         <div className="w-screen h-full bg-background-dark grid grid-rows-[auto_minmax(0,1fr)] gap-2 pt-6 overflow-x-hidden px-4 md:px-12">
            <div className="h-fit grid grid-cols-3 font-Cairo text-primary-dark text-lg md:text-4xl">
               <div className="col-span-1 flex justify-start items-center">
                  <ProductOrderFilter />
               </div>

               <div className="col-span-1 flex center font-Cairo">
                  {isLoading ? (
                     <Skeleton className="w-full h-8 bg-gray-200 " />
                  ) : (
                     products.length > 0 && products[0]?.category?.name
                  )}
               </div>

               <div className="col-span-1 flex justify-end items-end">
                  <Input containerClassName="!bg-gray-100 rounded-lg w-2/3 max-md:w-full" placeholder="ابحث" />
               </div>
            </div>
            <motion.div
               dir="rtl"
               className="h-[90%] w-full p-2 gap-4 rounded-lg grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-rows-[auto_minmax(400px,1fr)]"
               variants={staggerContainer}
               initial="hidden"
               animate="show"
            >
               {isLoading ? (
                  Array(3)
                     .fill(0)
                     .map((_, index) => <ProductCardSkeleton key={index} />)
               ) : products.length > 0 ? (
                  products.map((product) => (
                     <motion.div key={product.productId} variants={cardAnimation} className="min-h-[400px] flex">
                        <ProductCard product={product} />
                     </motion.div>
                  ))
               ) : (
                  <div className="col-span-full text-center text-gray-500">No products found</div>
               )}
               <div ref={loadMoreRef} className="h-[400px] col-span-full flex justify-center items-center">
                  {isFetchingNextPage && <ProductCardSkeleton />}
               </div>
            </motion.div>
         </div>
      </div>
   )
}

export default Page
