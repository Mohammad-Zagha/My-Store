'use client'
import React from 'react'
import { IoSearchOutline } from 'react-icons/io5'
import Link from 'next/link'
import { motion, useMotionValueEvent, useScroll } from 'framer-motion'

import { Cart } from '../cart/Cart'

const Navbar = () => {
   const { scrollY } = useScroll()
   useMotionValueEvent(scrollY, 'change', (latest) => {
      const prev = scrollY.getPrevious()
      if (prev && latest > prev && latest > 100) {
         setHiiden(true)
      } else {
         setHiiden(false)
      }
   })
   const [hidden, setHiiden] = React.useState<boolean>(false)
   return (
      <motion.nav
         variants={{
            hidden: { y: '-100%' },
            visible: { y: '0%' },
         }}
         initial="hidden"
         animate={hidden ? 'hidden' : 'visible'}
         transition={{ duration: 0.3, ease: 'easeInOut', delay: 0.2 }}
         className="  p-3 w-full flex justify-between  bg-background-light    transition-transform"
         dir="rtl"
      >
         <Link href={'/'} className="flex center font-SFPro text-3xl font-thin">
            متجري
         </Link>
         <div className="flex justify-center items-center gap-8 max-md:hidden">
            <Link
               href={'/'}
               className="bg-transparent hover:bg-transparent border-0 text-primary-dark/70 flex justify-center items-center text-md font-semibold transition-transform duration-200 ease-in-out transform hover:scale-105 focus:outline-none"
            >
               العروض
            </Link>
            <Link
               href={'/'}
               className="bg-transparent hover:bg-transparent border-0 text-primary-dark/70 flex justify-center items-center text-md font-semibold transition-transform duration-200 ease-in-out transform hover:scale-105 focus:outline-none"
            >
               موقعنا
            </Link>
            <Link
               href={'/'}
               className="bg-transparent hover:bg-transparent border-0 text-primary-dark/70 flex justify-center items-center text-md font-semibold transition-transform duration-200 ease-in-out transform hover:scale-105 focus:outline-none"
            >
               تواصل معنا
            </Link>
         </div>
         <div className="flex justify-center items-center gap-3">
            <span>المفضلة</span>
            <Cart />
            <IoSearchOutline size={24} />
         </div>
      </motion.nav>
   )
}

export default Navbar
