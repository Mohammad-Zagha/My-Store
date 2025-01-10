'use client'

import Banner from '@/components/common/Banner'
import { Input } from '@/components/ui/input'
import ProductCard from '@/components/common/ProductCard'
import ProductOrderFilter from '@/components/common/ProductOrderFilter'
import { useGetCategoryProducts } from '@/hooks/api/Products'
import { useParams } from 'next/navigation'
import React, { useRef, useEffect, useState } from 'react'
import { AnimatePresence, motion, useInView } from 'framer-motion'
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

   const categoryVariants = {
      hidden: { opacity: 0, y: 50 }, // Start with opacity 0 and slide in from below
      visible: { opacity: 1, y: 0 }, // End with opacity 1 and at original position
   }

   const containerVariants = {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { staggerChildren: 0.1 } }, // Stagger children animations
   }
   if (isCategoryLoading || isLoading)
      return (
         <div className="min-w-[dvw] min-h-[100dvh] bg-background-dark pt-20 flex flex-col  gap-8" dir="rtl">
            <Skeleton />
         </div>
      )
   return (
      <div
         className={cn(
            'min-w-[dvw] min-h-[100dvh] bg-background-dark pt-14 grid grid-cols-12  gap-8',
            !category?.banner && 'pt-20',
         )}
         dir="rtl"
      >
         {category?.banner && (
            <div className="col-span-full overflow-x-clip h-[100dvh]" dir="ltr">
               <Banner banner={category?.banner} />
            </div>
         )}
         <span className="col-span-full  text-3xl max-sm:text-lg font-semibold text-primary-dark text-center">
            {category?.name}
         </span>

         <div className="col-span-full min-h-screen  h-full flex flex-col gap-4 mt-4 px-10 mx-auto">
            <div className="w-full flex justify-between items-center ">
               <Input
                  type="text"
                  placeholder="ابحث عن منتج ..."
                  containerClassName="w-1/3 max-sm:w-full"
                  className="bg-white"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
               />
               <ProductOrderFilter order={order} handleSelect={setOrder} /> {/* Order filter */}
            </div>

            {/* Animate categories */}
            <motion.div
               className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
               variants={containerVariants}
               initial="hidden"
               animate="visible"
               exit="hidden"
            >
               <AnimatePresence>
                  {products.map((product) => (
                     <motion.div
                        key={product.productId}
                        className="w-full"
                        variants={categoryVariants}
                        initial="hidden"
                        animate="visible"
                        exit={{ opacity: 0, scale: 0.9 }} // Add exit animation
                     >
                        <ProductCard product={product} />
                     </motion.div>
                  ))}
               </AnimatePresence>
               <div ref={loadMoreRef} className="h-[100px] col-span-full flex justify-center items-center ">
                  {isFetchingNextPage && <ApiLoader />}
               </div>
            </motion.div>
         </div>
         <div ref={loadMoreRef} />
      </div>
   )
}

export default Page
