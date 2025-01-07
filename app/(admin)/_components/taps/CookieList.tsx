'use client'
import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'

const CookiesList = () => {
   const [cookies, setCookies] = useState<{ key: string; value: string }[]>([])

   useEffect(() => {
      const fetchCookies = () => {
         const allCookies = Cookies.get() // Get all cookies as an object
         const formattedCookies = Object.entries(allCookies).map(([key, value]) => ({
            key,
            value: value || 'Not Found',
         }))
         setCookies(formattedCookies)
      }

      fetchCookies()
   }, [])

   return (
      <div className="p-4">
         <h2 className="text-lg font-semibold mb-4">Browser Cookies</h2>
         {cookies.length === 0 ? (
            <p>No cookies found.</p>
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
