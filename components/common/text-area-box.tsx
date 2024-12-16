import { forwardRef } from 'react'

import { cn } from '@/lib/utils'
import { InputLabel, Instruction } from '../ui/input'
import { Textarea } from '../chadcn/textarea'
import { TextAreaBoxProps } from '@/types/objects'

const TextAreaBox = forwardRef<HTMLTextAreaElement, TextAreaBoxProps>(
   (
      { label, instructions, containerClassName, placeholder = 'اكبت هنا ...', isRequired, labelClassName, ...props },
      ref,
   ) => {
      return (
         <div className={cn('flex flex-col items-start gap-2', containerClassName)}>
            {label && (
               <InputLabel isRequired={isRequired} className={cn('ms-1.5 ', labelClassName)} htmlFor={props.id}>
                  {label}
               </InputLabel>
            )}
            <Textarea ref={ref} placeholder={placeholder} rows={4} {...props} />
            {instructions && <Instruction {...instructions} className="text-[8px] font-Cairo font-semibold" />}
         </div>
      )
   },
)

TextAreaBox.displayName = 'InputBox'

export default TextAreaBox
