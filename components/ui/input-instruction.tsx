'use client'
import { cn } from '@/lib/utils'
import React, { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { I_InputInstruction } from '@/types/objects'

interface InputInstructionProps extends React.ComponentProps<'div'>, I_InputInstruction {}

const InputInstruction = forwardRef<HTMLParagraphElement, InputInstructionProps>(
   ({ error, info, className, ...props }, ref) => {
      if (!error && !info) return null

      const content = error || info

      return (
         <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: content ? 'auto' : 0, opacity: content ? 1 : 0 }}
            transition={{ duration: 0.15, type: 'tween' }}
            className="overflow-hidden w-full"
         >
            <p
               ref={ref}
               className={cn('text-xs', error ? 'text-destructive' : 'text-muted-foreground', className)}
               {...props}
            >
               {content}
            </p>
         </motion.div>
      )
   },
)

InputInstruction.displayName = 'InputInstruction'

export default InputInstruction
