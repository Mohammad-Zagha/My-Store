import React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'
import '@/styles/AddButton.css'
import { motion } from 'framer-motion'
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
   asChild?: boolean
   isLoading?: boolean
   icon?: React.ReactNode
}
const AddButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
   ({ className, isLoading = false, asChild = false, children, ...props }, ref) => {
      const Comp = asChild ? Slot : 'button'
      return (
         <Comp
            className={cn(
               className,
               isLoading && 'cursor-not-allowed opacity-75', // Optionally add a loading style
            )}
            ref={ref}
            disabled={isLoading || props.disabled} // Disable the button when loading
            {...props}
         >
            <div tabIndex={0} className="plusButton">
               <svg className="plusIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30">
                  <g mask="url(#mask0_21_345)">
                     <path d="M13.75 23.75V16.25H6.25V13.75H13.75V6.25H16.25V13.75H23.75V16.25H16.25V23.75H13.75Z"></path>
                  </g>
               </svg>
            </div>
         </Comp>
      )
   },
)

AddButton.displayName = 'Button'

const FullAddButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
   ({ className, isLoading = false, asChild = false, children, icon, ...props }, ref) => {
      const Comp = asChild ? Slot : 'button'
      return (
         <Comp
            className={cn(
               'rounded-lg relative w-full h-10 cursor-pointer flex items-center justify-center border border-primary-dark bg-primary-dark overflow-hidden group hover:bg-primary-dark active:bg-primary-dark active:border-primary-dark',
               className,
               isLoading && 'cursor-not-allowed opacity-75', // Optionally add a loading style
            )}
            ref={ref}
            disabled={isLoading || props.disabled} // Disable the button when loading
            {...props}
         >
            {/* Loading Spinner */}
            {isLoading ? (
               <motion.div
                  className="absolute flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
               >
                  <svg
                     className="animate-spin w-6 h-6 text-white"
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                  >
                     <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                     ></circle>
                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                  </svg>
               </motion.div>
            ) : (
               <>
                  {/* Text */}
                  <span className="text-gray-200 font-semibold transform transition-all duration-300 group-hover:translate-x-20">
                     {children}
                  </span>

                  {/* Hover Effect */}
                  <span className="absolute right-0 h-full w-10 rounded-lg bg-primary-dark flex items-center justify-center transform translate-x-0 group-hover:translate-x-0 group-hover:w-full transition-all duration-300 overflow-hidden">
                     {icon || (
                        <svg
                           className="svg w-8 text-white"
                           fill="none"
                           height="24"
                           stroke="currentColor"
                           stroke-linecap="round"
                           stroke-linejoin="round"
                           stroke-width="2"
                           viewBox="0 0 24 24"
                           xmlns="http://www.w3.org/2000/svg"
                        >
                           <line x1="12" x2="12" y1="5" y2="19"></line>
                           <line x1="5" x2="19" y1="12" y2="12"></line>
                        </svg>
                     )}
                  </span>
               </>
            )}
         </Comp>
      )
   },
)

FullAddButton.displayName = 'FullAddButton'

export { AddButton, FullAddButton }
