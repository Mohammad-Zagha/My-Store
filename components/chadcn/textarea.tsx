import * as React from 'react'

import { cn } from '@/lib/utils'

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<'textarea'>>(
   ({ className, ...props }, ref) => {
      return (
         <textarea
            className={cn(
               'flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm transition-all placeholder:text-muted-foreground focus-visible:outline-none placeholder:text-xs focus-visible:ring-1 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none',
               className,
            )}
            ref={ref}
            {...props}
         />
      )
   },
)
Textarea.displayName = 'Textarea'

export { Textarea }
