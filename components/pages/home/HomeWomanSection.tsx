import Image from 'next/image'
import React from 'react'
import AnimatedLink from '../../animated/AnimatedLink'
import { useGetAllProducts } from '@/hooks/api/Products'
import { ProductCardSkeleton } from '@/components/ui/Skeletons'
import ProductCard from '@/components/common/ProductCard'
const HomeWomanSection = () => {
   const { data, isLoading } = useGetAllProducts({ page: 1, limit: 10 })
   const products = data?.pages.flatMap((page) => page?.results ?? []) || []

   return (
      <>
         <div className="col-span-3 max-md:hidden rounded-xl relative w-full h-full overflow-hidden">
            <Image
               alt="product"
               src="https://geniecollection.ps/cdn/shop/files/web.png?v=1725268252&width=369"
               fill
               className="rounded-xl object-cover shadow-lg hover:scale-105 transition-transform duration-300"
            />
         </div>

         <div className="col-span-9 max-md:col-span-full overflow-y-auto grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4 p-3 grid-rows-[auto_minmax(400px,1fr)]">
            <div className=" col-span-full h-auto flex justify-between items-end">
               <h1 className="text-primary-dark font-Cairo  text-lg"> عطور ستاتي 25مل</h1>

               <AnimatedLink title="مشاهدة الكل" href="/offers" className="font-Cairo font-bold text-sm" />
            </div>
            {isLoading ? (
               <>
                  <ProductCardSkeleton />
                  <ProductCardSkeleton />
                  <ProductCardSkeleton />
                  <ProductCardSkeleton />
                  <ProductCardSkeleton />
                  <ProductCardSkeleton />
               </>
            ) : (
               products?.map((product) => <ProductCard key={product.productId} product={product} />)
            )}
         </div>
      </>
   )
}

export default HomeWomanSection
