import React from 'react'

type LoopProps<T> = {
   children?: React.ReactNode
   items: T[]
   render: (item: T, index: number, arr: T[]) => React.ReactNode
   loading?: {
      isLoading: boolean
      loadingSkeleton: React.ReactNode
   }
}

const Loop = <T,>({ items, render, children, loading }: LoopProps<T>) => {
   if (loading && loading.isLoading) return loading.loadingSkeleton

   if (items.length === 0) return children ? <>{children}</> : null

   return <>{items.map((item, index, arr) => render(item, index, arr))}</>
}

export default Loop
