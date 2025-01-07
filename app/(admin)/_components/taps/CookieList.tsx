'use client'
import { getCookie } from '@/app/actions'
import React, { useEffect, useState } from 'react'

const CookiesList = () => {
   const [cookies, setCookies] = useState<{ key: string; value: string }[]>([])

   useEffect(() => {
      const fetchCookies = async () => {
         const keys = ['AccessToken', 'connect.id'] // Replace with the cookie keys you want to retrieve.
         const fetchedCookies = await Promise.all(
            keys.map(async (key) => {
               const value = await getCookie(key)
               return { key, value: value || 'Not Found' }
            }),
         )
         setCookies(fetchedCookies)
      }

      fetchCookies()
   }, [])

   return (
      <div className="p-4">
         <h2 className="text-lg font-semibold mb-4">Browser Cookies</h2>
         {cookies.length === 0 ? (
            <p>Loading cookies...</p>
         ) : (
            <ul className="list-disc pl-5">
               {cookies.map((cookie, index) => (
                  <li key={index}>
                     <strong>{cookie.key}:</strong> {cookie.value}
                  </li>
               ))}
            </ul>
         )}
      </div>
   )
}

export default CookiesList
