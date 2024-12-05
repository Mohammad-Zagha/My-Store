'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

const usePagination = ({ paramKey = 'page', limit = 10 }: { paramKey?: string; limit?: number } = {}) => {
   const router = useRouter()
   const pathname = usePathname()
   const searchParams = useSearchParams()
   const [page, setPage] = useState<number>(Number(searchParams.get(paramKey)) || 1)

   return {
      page,
      setPage: (newPage: number) => {
         setPage(newPage)
         const params = new URLSearchParams(searchParams)
         params.set(paramKey, newPage.toString())
         router.replace(`${pathname}?${params.toString()}`)
      },
      limit,
   }
}

export default usePagination
