import { AdminAuthSchema, orderSchema } from "@/lib/zod/Schemas";
import * as z from 'zod'
export type T_Category = {

    id: string;
    name: string;
    description: string;
    image: string;

}
export type T_Product = {
    id: string,
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
    items : {
        productId:string,
        quantity:number,
        name:string,
        price:number,
        image:string,
        discountedPrice:number
        description:string
    }[]
}
export type T_Order = z.infer<typeof orderSchema>
export type T_Admin_Auth = z.infer<typeof AdminAuthSchema>



export interface TextAreaBoxProps extends React.ComponentProps<'textarea'>, ILabelBaseProps, IInstructionBaseProps {
    containerClassName?: string
    labelClassName?: string
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
 