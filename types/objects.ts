import { TInstruction } from "@/components/ui/input";
import { AdminAuthSchema, CategorySchema, orderSchema, ProductSchema } from "@/lib/zod/Schemas";
import * as z from 'zod'

export type T_Category = {

    id: string;
    name: string;
    description: string;
    image: string | File;

}

export type T_Product = {
    productId: string;
    description: string;
    discount: number;
    price: number;
    category: {
       id: string;
       name: string;
    };
    images: {
       url: string | File | undefined;
    }[];
    name: string;
    stock: number;
 };
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
export type T_Products_Inputs = z.infer<typeof ProductSchema>

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

