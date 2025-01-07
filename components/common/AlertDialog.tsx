import React from 'react'
import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogTrigger,
} from '@/components/chadcn/alert-dialog'
type T_Alert_Dialog = {
   header?: string
   description?: string
   trigger?: React.ReactNode
   onClick?: () => void
}
const CustomAlertDialog = ({ ...props }: T_Alert_Dialog) => {
   return (
      <AlertDialog>
         <AlertDialogTrigger asChild>{props.trigger}</AlertDialogTrigger>
         <AlertDialogContent className="bg-white " dir="rtl">
            <AlertDialogHeader>
               <AlertDialogTitle className="text-start">{props.header}</AlertDialogTitle>
               <AlertDialogDescription className="text-start">{props.description}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter dir="ltr">
               <AlertDialogCancel className="font-semibold">الغاء</AlertDialogCancel>
               <AlertDialogAction className="bg-red-500" onClick={props.onClick}>
                  اكمل العملية
               </AlertDialogAction>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   )
}

export default CustomAlertDialog
