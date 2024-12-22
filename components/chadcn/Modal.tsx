import React from 'react'
import * as modal from '@/components/chadcn/dialog'
import { cn } from '@/lib/utils'

type TModal = {
   trigger: React.ReactNode
   title?: string
   description?: string
   children?: React.ReactNode
   className?: string
   contentClassName?: string
} & React.ComponentProps<typeof modal.Dialog>

const Modal = ({ trigger, className, contentClassName, children, title = '', description = '', ...props }: TModal) => {
   return (
      <modal.Dialog modal {...props}>
         <modal.DialogTrigger asChild>
            <div className={cn('', className)}>{trigger}</div>
         </modal.DialogTrigger>
         <modal.DialogContent className={cn('lg:!rounded-3xl', contentClassName)}>
            {(title || description) && (
               <modal.DialogHeader>
                  {title && <modal.DialogTitle>{title}</modal.DialogTitle>}
                  {description && <modal.DialogDescription>{description}</modal.DialogDescription>}
               </modal.DialogHeader>
            )}
            {children}
         </modal.DialogContent>
      </modal.Dialog>
   )
}

export default Modal
