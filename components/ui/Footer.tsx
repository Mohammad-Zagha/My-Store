'use client'

import React, { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import gsap from 'gsap'
import { FaFacebookSquare, FaInstagram } from 'react-icons/fa'
import { FaSquareWhatsapp } from 'react-icons/fa6'

const Footer = () => {
   const footerRef = useRef<HTMLDivElement>(null)
   const isInView = useInView(footerRef, { once: true })

   useEffect(() => {
      if (isInView) {
         gsap.fromTo(
            footerRef.current,
            { clipPath: 'inset(100% 0 0 0)', opacity: 0 },
            {
               clipPath: 'inset(0% 0 0 0)',
               opacity: 1,
               duration: 1.5,
               ease: 'power3.out',
               delay: 0.3,
            },
         )
      }
   }, [isInView])
   return (
      <motion.div
         ref={footerRef}
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 1 }}
         className="bg-primary-dark text-white py-12 px-6 text-right"
         dir="rtl"
      >
         <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* About Section */}
            <div>
               <h3 className="text-lg font-bold mb-4">من نحن</h3>
               <p className="text-gray-400">نحن ملتزمون بتقديم أفضل الحلول لعملائنا، لمساعدتهم على تحقيق أهدافهم.</p>
            </div>

            {/* Quick Links */}
            <div>
               <h3 className="text-lg font-bold mb-4">روابط سريعة</h3>
               <ul className="space-y-2">
                  {['الرئيسية', 'الخدمات', 'المدونة', 'تواصل معنا'].map((link, index) => (
                     <motion.li
                        key={index}
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.2 }}
                     >
                        <a href="#" className="text-gray-400 hover:text-white">
                           {link}
                        </a>
                     </motion.li>
                  ))}
               </ul>
            </div>

            {/* Social and Contact */}
            <div>
               <h3 className="text-lg font-bold mb-4">تابعنا</h3>
               <div className="flex gap-4 justify-start">
                  <motion.a
                     href="#"
                     className=""
                     initial={{ scale: 0.8, opacity: 0 }}
                     animate={{ scale: 1, opacity: 1 }}
                     transition={{ delay: 0.5 }}
                  >
                     <FaFacebookSquare className="text-gray-400 hover:text-white" size={22} />
                  </motion.a>
                  <motion.a
                     href="#"
                     className=""
                     initial={{ scale: 0.8, opacity: 0 }}
                     animate={{ scale: 1, opacity: 1 }}
                     transition={{ delay: 0.5 }}
                  >
                     <FaInstagram className="text-gray-400 hover:text-white" size={22} />
                  </motion.a>
                  <motion.a
                     href="#"
                     className=""
                     initial={{ scale: 0.8, opacity: 0 }}
                     animate={{ scale: 1, opacity: 1 }}
                     transition={{ delay: 0.5 }}
                  >
                     <FaSquareWhatsapp className="text-gray-400 hover:text-white" size={22} />
                  </motion.a>
               </div>
               <h3 className="text-lg font-bold mt-6">تواصل معنا</h3>
               <p className="text-gray-400 mt-2">البريد الإلكتروني: support@company.com</p>
               <p className="text-gray-400">الهاتف: +123 456 7890</p>
            </div>
         </div>
         <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-500">
            &copy; 2024 Neptune Technology Solutions. جميع الحقوق محفوظة.
         </div>
      </motion.div>
   )
}

export default Footer
