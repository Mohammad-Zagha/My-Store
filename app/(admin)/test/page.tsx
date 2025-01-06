import { logCookie } from '@/app/actions'
import React from 'react'

// Define the server action
export const foo = async () => {
   'use server'
   logCookie()
   // You can access cookies or perform other server-side logic here.
}

const Page = async () => {
   return (
      <div>
         <h1>Server Component</h1>
         <button
            onClick={() => {
               foo()
            }}
         >
            Log Cookie
         </button>
      </div>
   )
}

export default Page
