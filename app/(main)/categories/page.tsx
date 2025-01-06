'use client'

import { motion, AnimatePresence } from 'framer-motion'
import CatgoryImageContainer from '@/components/common/CatgoryImageContainer'
import ProductOrderFilter from '@/components/common/ProductOrderFilter'
import { useGetHomeCategories } from '@/hooks/api/Categories'
import usePagination from '@/hooks/Pagination'
import { T_Sort } from '@/types/objects'
import { useInView } from 'framer-motion'
import React, { useEffect, useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import { useDebounce } from 'use-debounce'
import { ProductCardSkeleton } from '@/components/ui/Skeletons'
import ApiLoader from '@/components/common/ApiLoader'

const Page = () => {
   const [search, setSearch] = useState<string>('')
   const [debouncedSearch] = useDebounce(search, 500)
   const [order, setOrder] = useState<T_Sort>('')
   const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useGetHomeCategories({
      page: 1,
      limit: 10,
      search: debouncedSearch,
      sort: order, // Pass order to API
   })

   const categories = data?.pages?.flatMap((page) => page?.results ?? []) ?? []
   const loadMoreRef = useRef<HTMLDivElement | null>(null)
   const isInView = useInView(loadMoreRef)

   useEffect(() => {
      if (isInView && hasNextPage && !isFetchingNextPage) {
         fetchNextPage()
      }
   }, [isInView, hasNextPage, isFetchingNextPage, fetchNextPage])

   // Animation variants
   const categoryVariants = {
      hidden: { opacity: 0, y: 50 }, // Start with opacity 0 and slide in from below
      visible: { opacity: 1, y: 0 }, // End with opacity 1 and at original position
   }

   const containerVariants = {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { staggerChildren: 0.1 } }, // Stagger children animations
   }

   return (
      <div className="min-w-[dvw] min-h-[100dvh] bg-background-light pt-20 flex flex-col p-6 gap-8" dir="rtl">
         <span className="w-full font-Cairo text-3xl max-sm:text-lg font-semibold text-primary-dark text-center">
            جميع القوائم
         </span>

         <div className="w-full md:w-4/5 min-h-screen h-full flex flex-col gap-4 mt-4 mx-auto">
            <div className="col-span-full flex justify-between items-center ">
               <Input
                  type="text"
                  placeholder="ابحث عن قوائم"
                  containerClassName="w-1/3 "
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
                  {categories.map((category) => (
                     <motion.a
                        key={category.id}
                        className="w-full"
                        variants={categoryVariants}
                        initial="hidden"
                        animate="visible"
                        exit={{ opacity: 0, scale: 0.9 }} // Add exit animation
                        href={`/categories/products/${category.id}`}
                     >
                        <CatgoryImageContainer
                           src={category.image as string}
                           title={category.name}
                           className="w-full"
                        />
                     </motion.a>
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
