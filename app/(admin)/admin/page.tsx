'use client'
import React, { Suspense } from 'react'
import AdminTaps from '../_components/AdminTaps'

const Page = () => {
   return (
      <Suspense fallback={<div>Loading...</div>}>
         <AdminTaps />
      </Suspense>
   )
}

export default Page
