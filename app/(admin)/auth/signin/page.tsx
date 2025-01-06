'use client'
import AnimatedLink from '@/components/animated/AnimatedLink'
import React from 'react'
import AdminLoginForm from '../../_components/AdminLoginForm'

const Signin = () => {
   return (
      <div
         dir="rtl"
         className="bg-white w-full md:w-1/2 h-full md:max-h-[min(600px,90vh)] md:rounded-[3rem] p-1.5r  overflow-hidden shadow-card flex flex-col justify-between max-md:justify-center max-md:items-center max-md:gap-4"
      >
         <div className="space-y-0.75r max-md:w-full max-md:text-center">
            <span className="font-Cairo text-xl font-semibold">تسجيل الدخول</span>
            <p className="text-sm font-Cairo text-primary-light">ادخل بياناتك لتسجيل الدخول</p>
         </div>
         <AdminLoginForm />
         <span className="text-center text-xs font-Cairo text-primary-light">
            اتصل على 0569748922 في حال نسيت كلمة السر
         </span>
         <div className="w-full flex max-md:justify-center justify-start items-center gap-4">
            <AnimatedLink href={'#'} title=" المساعدة" className="text-sm" />
            <AnimatedLink href={'#'} title="طلب تغيرات " className="text-sm" />
         </div>
      </div>
   )
}

export default Signin
