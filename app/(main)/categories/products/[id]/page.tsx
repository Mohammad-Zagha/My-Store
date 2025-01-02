'use client'

import Banner from '@/components/common/Banner'
import { Input } from '@/components/ui/input'
import ProductCard from '@/components/common/ProductCard'
import ProductOrderFilter from '@/components/common/ProductOrderFilter'
import { useGetCategoryProducts } from '@/hooks/api/Products'
import { useParams } from 'next/navigation'
import React, { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import usePagination from '@/hooks/Pagination'
import { ProductCardSkeleton, Skeleton } from '@/components/ui/Skeletons'
import { useGetCategoryById } from '@/hooks/api/Categories'
import ApiLoader from '@/components/common/ApiLoader'
import { cn } from '@/lib/utils'
import { T_Sort } from '@/types/objects'
import { useDebounce } from 'use-debounce'

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
   const [order, setOrder] = React.useState<T_Sort>('')
   const [search, setSearch] = useState<string>('')
   const [debouncedSearch] = useDebounce(search, 500)
   const { page, limit } = usePagination({
      limit: 10,
   })
   const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useGetCategoryProducts({
      id,
      page,
      limit,
      sort: order,
      search: debouncedSearch,
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
      <div className="h-full w-[dvw] bg-transparent ">
         {category?.banner && <Banner banner={category?.banner} />}
         <div
            className={cn(
               'w-full h-full bg-background-dark grid grid-rows-[auto_minmax(0,1fr)] gap-2 pt-6  px-4 md:px-12',
               !category?.banner ? 'pt-20' : 'pt-10',
            )}
         >
            <motion.div
               dir="rtl"
               className="w-full md:w-4/5 mx-auto p-2 gap-2  rounded-lg grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-rows-[auto_minmax(400px,1fr)]"
               variants={staggerContainer}
               initial="hidden"
               animate="show"
            >
               <div className="col-span-full grid grid-cols-3  ">
                  <Input
                     placeholder="ابحث عن منتج"
                     containerClassName="w-full"
                     disabled={isLoading}
                     onChange={(e) => setSearch(e.target.value)}
                     className="bg-background-light"
                  />
                  <span className="text-lg md:text-2xl font-Cairo font-semibold  pt-2 w-full text-center">
                     {category?.name}
                  </span>
                  <div className="flex justify-end items-center">
                     <ProductOrderFilter order={order} handleSelect={setOrder} />
                  </div>
               </div>
               {products.length > 0 ? (
                  products.map((product) => (
                     <motion.div key={product.productId} variants={cardAnimation} className="min-h-[400px] flex">
                        <ProductCard product={product} />
                     </motion.div>
                  ))
               ) : (
                  <div className="col-span-full text-center text-gray-500">No products found</div>
               )}
               <div ref={loadMoreRef} className="h-[200px] col-span-full flex justify-center items-center">
                  {isFetchingNextPage && <ApiLoader />}
               </div>
            </motion.div>
         </div>
      </div>
   )
}

export default Page
