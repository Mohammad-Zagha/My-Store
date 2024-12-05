import React from 'react'
import { CiDeliveryTruck, CiLocationOn } from 'react-icons/ci'
import { motion } from 'framer-motion'
import { RiCustomerService2Line, RiSecurePaymentLine } from 'react-icons/ri'

const StatsSection = () => {
   const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
         opacity: 1,
         transition: {
            staggerChildren: 0.2,
         },
      },
   }

   const itemVariants = {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0 },
   }

   return (
      <motion.div
         className="w-full grid grid-cols-2 md:grid-cols-4  gap-y-4"
         initial="hidden"
         whileInView="visible"
         viewport={{ once: true, amount: 0.5 }}
         variants={containerVariants}
      >
         <motion.div className="col-span-1 flex flex-col center gap-2" variants={itemVariants}>
            <CiDeliveryTruck size={42} className="text-primary-light" />
            <span className="text-primary-light text-lg max-md:text-sm font-semibold text-center font-sans">
               <span className="text-primary-dark">توصيل سريع</span>
               <br /> خلال 1 - 3 أيام عمل
            </span>
         </motion.div>
         <motion.div className="col-span-1 flex flex-col center gap-2" variants={itemVariants}>
            <RiSecurePaymentLine size={42} className="text-primary-light" />
            <span className="text-primary-light text-lg max-md:text-sm  font-semibold text-center font-sans">
               <span className="text-primary-dark">طرق دفع آمنة</span>
               <br />
               لا نحتفظ ببياناتك الشخصية
            </span>
         </motion.div>
         <motion.div className="col-span-1 flex flex-col center gap-2" variants={itemVariants}>
            <RiCustomerService2Line size={42} className="text-primary-light" />
            <span className="text-primary-light text-lg max-md:text-sm  font-semibold text-center font-sans">
               <span className="text-primary-dark"> خدمة عملاء مميزة</span>
               <br /> للرد على استفساراتكم
            </span>
         </motion.div>
         <motion.div className="col-span-1 flex flex-col center gap-2" variants={itemVariants}>
            <CiLocationOn size={42} className="text-primary-light" />
            <span className="text-primary-light text-lg font-semibold max-md:text-sm  text-center font-sans">
               <span className="text-primary-dark"> رام الله - عمارة البيتوني</span>
               <br /> دوار المنارة - محلات صالح خلف
            </span>
         </motion.div>
      </motion.div>
   )
}

export default StatsSection
