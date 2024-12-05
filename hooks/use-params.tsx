'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
type T_Use_Params_Values<T> = {
   paramKey: string
   defaultValue?: T
}

function useParamsValues<T = string>({ paramKey, defaultValue }: T_Use_Params_Values<T>) {
   const searchParams = useSearchParams()
   const params = useMemo(() => new URLSearchParams(searchParams), [searchParams])
   const pathname = usePathname()
   const router = useRouter()

   const [value, setValue] = useState<T>((params.get(paramKey) as T) || defaultValue || ('' as T))

   useEffect(() => {
      params.set(paramKey, value as string)
      router.replace(`${pathname}?${params.toString()}`)
   }, [value, paramKey, pathname, router, searchParams, params])

   return {
      value,
      setValue,
   }
}

export default useParamsValues
