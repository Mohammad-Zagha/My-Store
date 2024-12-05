import { cn } from '@/lib/utils'

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
   return <div className={cn('animate-pulse bg-gray-100 rounded-lg', className)} {...props} />
}
export const ProductCardSkeleton = () => {
   return <Skeleton className="w-full h-[400px] flex flex-col bg-gray-200" />
}
