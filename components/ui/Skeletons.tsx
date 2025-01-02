import { cn } from '@/lib/utils'

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
   return <div className={cn('bg-gray-100 rounded-lg animate-shimmer', className)} {...props} />
}

export const ProductCardSkeleton = ({ className }: { className?: string }) => {
   return <Skeleton className={cn('w-full h-[400px] flex flex-col bg-gray-200', className)} />
}
