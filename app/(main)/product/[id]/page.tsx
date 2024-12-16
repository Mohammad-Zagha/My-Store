'use client'

import React, { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useGetAllProducts, useGetProduct } from '@/hooks/api/Products'
import { LensImage } from '@/components/common/ImageLens'
import Image from 'next/image'
import CustomAvatar from '@/components/ui/ImageHandler'
import Stars from '@/components/common/Stars'
import { cn } from '@/lib/utils'
import AnimatedLink from '@/components/animated/AnimatedLink'
import { Button } from '@/components/chadcn/button'
import { IoIosAdd } from 'react-icons/io'
import { LucideMinus } from 'lucide-react'
import { MdFavoriteBorder } from 'react-icons/md'
import ProductCard from '@/components/common/ProductCard'
import { motion } from 'framer-motion'
import { ProductCardSkeleton, Skeleton } from '@/components/ui/Skeletons'
import { useAddToCart } from '@/hooks/api/Cart'
const Page = () => {
   const { id } = useParams()
   const productId = Array.isArray(id) ? id[0] : id
   const addToCardMutaion = useAddToCart()
   const {
      data: products,
      isLoading: isProductLoading,
      error: productsError,
   } = useGetAllProducts({ page: 1, limit: 10 })
   const { data, isLoading, error } = useGetProduct(productId)
   const [image, setImage] = React.useState<string | undefined>(data?.images[0].url)
   const [count, setCount] = React.useState(1)

   useEffect(() => {
      if (data) {
         setImage(data.images[0].url)
      }
   }, [data])

   return (
      <div
         className="min-h-screen w-screen bg-background-light   grid grid-cols-12  p-8 max-md:p-2 max-md:pt-20 pt-20 gap-4"
         dir="rtl"
      >
         {isLoading ? (
            <div className="col-span-10  rounded-xl flex gap-10 justify-center items-center p-6 max-lg:col-span-full max-md:flex-col-reverse">
               <div className="flex flex-col  gap-6 max-md:gap-3 max-md:w-full">
                  <Skeleton className="w-20 h-4" />
                  <Skeleton className="w-60 h-4" />
                  <Skeleton className="w-40 h-4" />
                  <Skeleton className="w-40 h-4" />
                  <Skeleton className="w-80 h-8" />
               </div>
               <div className="flex flex-col justify-between items-center">
                  <Skeleton className="size-[450px]  mx-auto max-sm:size-[300px]" />
                  <div className="flex justify-center w-full max-w-[450px] p-2 gap-4 items-center overflow-x-auto">
                     {Array(3)
                        .fill(0)
                        .map((_, index) => (
                           <Skeleton key={index} className="w-20 h-20 rounded-lg" />
                        ))}
                  </div>
               </div>
            </div>
         ) : (
            <div className="col-span-10  rounded-xl flex gap-10 justify-center items-center p-6 max-lg:col-span-full max-md:flex-col-reverse">
               <div className="flex flex-col  gap-6 max-md:gap-3 max-md:w-full">
                  <Stars rating={3} num_of_ratings={300} />
                  <span className="text-lg font-Cairo font-bold">{data?.name}</span>
                  <div className="flex gap-2 justify-start items-center ">
                     <span
                        className={cn(
                           'text-lg font-Cairo font-bold',
                           data?.discount ? 'line-through text-primary-light text-sm' : 'text-primary-dark',
                        )}
                     >
                        {data?.price} ₪
                     </span>
                     {data && data.discount > 0 && (
                        <span className="leading-3  font-Cairo text-lg font-semibold text-primary-dark">
                           {data?.price - data?.discount} ₪
                        </span>
                     )}
                  </div>
                  <span className="text-sm font-Cairo max-w-[500px] text-primary-light ">{data?.description}</span>
                  {data && data.category && (
                     <div className="flex gap-2 justify-start items-center">
                        <span className="font-Cairo text-sm font-semibold">التصنيف : </span>
                        <AnimatedLink
                           href={`/categories/products/${data?.category.id}`}
                           className=" text-sm"
                           title={data?.category.name}
                        />
                     </div>
                  )}
                  <div className="flex gap-2 justify-start items-center ">
                     <span className="font-Cairo text-sm font-semibold">متوفر في المخزن : </span>
                     <span className="text-sm font-Cairo text-primary-dark font-bold">{data?.stock}</span>
                  </div>
                  <div className="flex justify-between items-center w-full">
                     <div className="   grid grid-cols-3 gap-4 ">
                        <Button
                           variant="default"
                           size={'icon'}
                           className="bg-gray-200 rounded-full size-5 hover:bg-primary-light"
                           onClick={() => {
                              setCount((prev) => prev + 1)
                           }}
                        >
                           <IoIosAdd className="text-primary-dark " />
                        </Button>
                        <span className="text-primary-dark text-sm font-semibold w-full center">{count}</span>
                        <Button
                           variant="default"
                           size={'icon'}
                           className="bg-gray-200 rounded-full size-5 hover:bg-primary-light"
                           onClick={() => {
                              if (count > 1) setCount((prev) => prev - 1)
                           }}
                        >
                           <LucideMinus className="text-primary-dark" />
                        </Button>
                     </div>
                     <Button
                        variant="default"
                        size={'default'}
                        className="w-1/2 text-white"
                        onClick={() => {
                           addToCardMutaion.mutate({
                              product: data!,
                              quantity: count,
                           })
                        }}
                     >
                        اضافة الى السلة
                     </Button>
                     <Button
                        variant={'default'}
                        size={'icon'}
                        className="rounded-lg text-primary-dark bg-white shadow-md hover:bg-gray-100"
                     >
                        <MdFavoriteBorder size={22} />
                     </Button>
                  </div>
               </div>
               <div className="flex flex-col justify-between items-center">
                  <LensImage
                     src={image ?? ''}
                     alt={'lensImage'}
                     containerClassname=" size-[450px]  mx-auto max-sm:size-[300px] shadow-md rounded-xl "
                     imageClassname=" size-[450px]  mx-auto max-sm:size-[300px] shadow-md rounded-xl"
                  />
                  <div className="flex justify-center w-full max-w-[450px] p-2 gap-4 items-center overflow-x-auto">
                     {data &&
                        data.images.length > 1 &&
                        data.images.map((image, index) => (
                           <CustomAvatar
                              key={index}
                              src={image.url}
                              onClick={() => setImage(image.url)}
                              alt={'img'}
                              className="h-20 w-20 rounded-lg object-cover hover:scale-105 transition-transform duration-300 pointer"
                           />
                        ))}
                  </div>
               </div>
            </div>
         )}
         <div className="col-span-2  max-lg:hidden rounded-xl relative w-full h-full overflow-hidden ">
            <Image
               alt="product"
               src="https://geniecollection.ps/cdn/shop/files/web.png?v=1725268252&width=369"
               fill
               className="rounded-xl object-cover shadow-lg hover:scale-105 transition-transform duration-300"
            />
            <span className="text-white font-Cairo font-bold text-3xl absolute bottom-4 w-full text-center ">
               عروض
               <br />
               خاصة
            </span>
         </div>
         <div className="col-span-full  grid grid-rows-[auto_minmax(0,1fr)]">
            <div className="w-full font-Cairo font-bold text-4xl  text-primary-dark text-center">منتجات مشابهة</div>
            <motion.div
               dir="rtl"
               className="h-[90%] w-full p-2 gap-4 rounded-lg grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-rows-[auto_minmax(400px,1fr)]"
               initial="hidden"
               animate="show"
            >
               {isProductLoading ? (
                  Array(3)
                     .fill(0)
                     .map((_, index) => <ProductCardSkeleton key={index} />)
               ) : products && products.results.length > 0 ? (
                  products.results.map((product) => (
                     <motion.div key={product.productId} className="min-h-[400px] flex">
                        <ProductCard product={product} />
                     </motion.div>
                  ))
               ) : (
                  <div className="col-span-full text-center text-gray-500">No products found</div>
               )}
            </motion.div>
         </div>
      </div>
   )
}

export default Page
