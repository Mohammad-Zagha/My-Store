import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'
import Loader from '../common/Loader'

const buttonVariants = cva(
   'inline-flex items-center  justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors    disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
   {
      variants: {
         variant: {
            default: 'bg-primary-dark text-white hover:bg-primary-dark/90',
            destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
            outline: 'border border-input bg-white hover:bg-accent hover:text-accent-foreground',
            secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
            ghost: 'ring-1 ring-primary-dark text-primary-dark hover:bg-gray-100 rounded-full',
            link: 'text-primary underline-offset-4 hover:underline',
         },
         size: {
            default: 'h-10 px-4 py-2',
            sm: 'h-9 rounded-md px-3',
            lg: 'h-11 rounded-md px-8',
            icon: 'h-5 w-5',
         },
      },
      defaultVariants: {
         variant: 'default',
         size: 'default',
      },
   },
)

export interface ButtonProps
   extends React.ButtonHTMLAttributes<HTMLButtonElement>,
      VariantProps<typeof buttonVariants> {
   asChild?: boolean
   isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
   ({ className, variant, isLoading = false, size, asChild = false, children, ...props }, ref) => {
      const Comp = asChild ? Slot : 'button'
      return (
         <Comp
            className={cn(
               buttonVariants({ variant, size, className }),
               isLoading && 'cursor-not-allowed opacity-75', // Optionally add a loading style
            )}
            ref={ref}
            disabled={isLoading || props.disabled} // Disable the button when loading
            {...props}
         >
            {isLoading ? <Loader /> : children}
         </Comp>
      )
   },
)

Button.displayName = 'Button'

export { Button, buttonVariants }
