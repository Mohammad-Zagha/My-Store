import { TInstruction } from "@/components/ui/input";
import { AdminAuthSchema, CategorySchema, orderSchema } from "@/lib/zod/Schemas";
import * as z from 'zod'
export type T_Category = {

    id: string;
    name: string;
    description: string;
    image: string;

}
export type T_Product = {
    productId: string,
    description: string,
    discount: number,
    price: 100,
    category: {
        id: string,
        name: string
    },
    images:[
        {
            url:string,
      
        }
    ],
    name:string,
    stock:number
}
export type T_Paginated_Response<T> = {
    results: T[],
    currentPage:number,
    hasNextPage:boolean,
    nextPage:number,


}
export type T_Cart ={
    items : (T_Product & { quantity: number })[],
}
export type T_Order = z.infer<typeof orderSchema>
export type T_Admin_Auth = z.infer<typeof AdminAuthSchema>
export type T_Category_Inputs = z.infer<typeof CategorySchema>


export interface TextAreaBoxProps extends React.ComponentProps<'textarea'>, ILabelBaseProps, IInstructionBaseProps {
    containerClassName?: string
    labelClassName?: string
    instruction?: TInstruction
    
 }
 export interface I_InputInstruction {
    error?: string
    info?: string
 }
 export interface ILabelBaseProps {
    label?: string
    isRequired?: boolean
 }
 export interface IInstructionBaseProps {
    instructions?: I_InputInstruction
 }
 
 export type T_General_Response = {
    message: string
 }

 export function objectToFormData(
    obj: Record<string, any>,
    formData: FormData = new FormData(),
    namespace?: string,
 ): FormData {
    for (const property in obj) {
       if (obj.hasOwnProperty(property)) {
          const formKey = namespace ? `${namespace}.${property}` : property
          const value = obj[property]
 
          if (Array.isArray(value)) {
             value.forEach((item) => {
                const indexedKey = `${formKey}`
                if (typeof item === 'object' && item !== null && !(item instanceof File)) {
                   objectToFormData(item, formData, indexedKey)
                } else {
                   formData.append(indexedKey, item)
                }
             })
          } else if (typeof value === 'object' && value !== null && !(value instanceof File)) {
             objectToFormData(value, formData, formKey)
          } else {
             formData.append(formKey, value)
          }
       }
    }
 
    return formData
 }