import Image from 'next/image'
import React from 'react'
import AnimatedLink from '../animated/AnimatedLink'

type CollectionCardProps = {
   title: string
   src: string
   disc: string
   href: string
}

const CollectionCard = ({ title, src, disc, href = '/' }: CollectionCardProps) => {
   return (
      <div className="w-full h-full bg-white shadow-lg rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-2 transition-transform hover:scale-95 duration-300">
         <div className="relative">
            <Image src={src} alt={title} layout="fill" objectFit="cover" className="absolute inset-0" />
         </div>
         <div className="p-8 md:p-10 lg:p-12 flex flex-col gap-6 justify-center bg-gradient-to-br from-gray-50 to-gray-100">
            <h1 className="text-2xl md:text-3xl font-bold text-primary-dark leading-tight">{title}</h1>
            <p className="text-base md:text-lg text-primary-light leading-relaxed">{disc}</p>
            <div className="w-fit">
               <AnimatedLink href={href} title="تسوق الآن" />
            </div>
         </div>
      </div>
   )
}

export default CollectionCard
