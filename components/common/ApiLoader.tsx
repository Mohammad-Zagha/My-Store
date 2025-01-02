import React from 'react'
import { motion } from 'framer-motion'
import '@/styles/ApiLoader.css'

const ApiLoader = () => {
   const loaderVariants = {
      hidden: { opacity: 0, scale: 0.8 },
      visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
      exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
   }

   return (
      <motion.section
         className="dots-container"
         variants={loaderVariants}
         initial="hidden"
         animate="visible"
         exit="exit"
      >
         <div className="dot"></div>
         <div className="dot"></div>
         <div className="dot"></div>
         <div className="dot"></div>
         <div className="dot"></div>
      </motion.section>
   )
}

export default ApiLoader
