'use client'

import { cn } from '@/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'
import * as React from 'react'
import { FaEyeSlash, FaRegEye } from 'react-icons/fa'
import { motion } from 'framer-motion'
const inputVariants = cva(
   'flex w-full rounded-[13.8px] ring-1 ring-gray-200/70 bg-transparent px-0.5r focus:px-1r font-400 transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground outline-none focus-visible:ring-[1.5px] focus-visible:ring-main/30 disabled:cursor-not-allowed disabled:opacity-50 invalid:ring-red-500',
   {
      variants: {
         s: {
            lg: 'h-14 text-base',
            md: 'h-12 text-sm',
            sm: 'h-9 text-xs',
         },
      },
      defaultVariants: {
         s: 'md',
      },
   },
)

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {
   containerClassName?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
   ({ containerClassName, className, type, s, ...props }, ref) => {
      const [show, setShow] = React.useState(false)
      const getType = React.useCallback(
         (type: InputProps['type']) => {
            if (type === 'password') {
               return show ? 'text' : 'password'
            }
            return type
         },
         [show, type],
      )
      return (
         <div className={cn('relative w-full', containerClassName)} dir="rtl">
            <input type={getType(type)} className={cn(inputVariants({ s, className }))} ref={ref} {...props} />
            {type == 'password' && (
               <button
                  type="button"
                  onClick={() => setShow((prev) => !prev)}
                  className="absolute center-y left-1r pointer text-muted-foreground"
               >
                  {show ? <FaRegEye size={16} /> : <FaEyeSlash size={16} />}
               </button>
            )}
         </div>
      )
   },
)
Input.displayName = 'Input'

type TInputLabel = React.ComponentProps<'label'> & {
   isRequired?: boolean
}

function InputLabel({ children, isRequired, className, ...props }: TInputLabel) {
   return (
      <label className={cn('w-fit inline-flex gap-1 font-600 text-base capitalize', className)} {...props}>
         {children}
         {isRequired && <span className="text-red-500 select-none">*</span>}
      </label>
   )
}
InputLabel.displayName = 'InputLabel'
export type TInstruction = Readonly<{
   text?: string
   type?: 'info' | 'error'
   className?: string
}>

function Instruction({ text, type = 'info', className }: TInstruction) {
   if (!text) return null

   return (
      <motion.p
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         exit={{ opacity: 0 }}
         transition={{ duration: 0.3 }}
         className={cn('text-sm text-muted-foreground px-0.5r peer-has-[input:focus]:pl-1r transition-all', className)}
      >
         <span className={cn(type === 'error' && 'text-red-500')}>{text}</span>
      </motion.p>
   )
}

Instruction.displayName = 'Instruction'

type TInputBox = {
   label?: string
   instruction?: TInstruction
   isRequired?: boolean
   lableClassName?: string
} & InputProps

const InputBox = React.forwardRef<HTMLInputElement, TInputBox>(
   (
      {
         label,
         instruction,
         type = 'text',
         containerClassName,
         className,
         id,
         name,
         isRequired,
         lableClassName,
         ...props
      }: TInputBox,
      ref,
   ) => {
      return (
         <div className={cn('flex flex-col gap-0.5r w-full transition-all', containerClassName)}>
            {label && (
               <InputLabel
                  htmlFor={id}
                  isRequired={isRequired}
                  className={cn('font-Cairo text-sm font-semibold', lableClassName)}
               >
                  {label}
               </InputLabel>
            )}
            <Input
               ref={ref}
               type={type}
               id={id}
               name={name}
               className={cn('rounded-lg h-10', className)}
               containerClassName="peer"
               {...props}
            />
            {instruction && <Instruction {...instruction} className="text-[8px] font-Cairo font-semibold" />}
         </div>
      )
   },
)
InputBox.displayName = 'InputBox'

export { Input, InputBox, InputLabel, Instruction }
