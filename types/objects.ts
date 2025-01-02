import { TInstruction } from "@/components/ui/input";
import { AdminAuthSchema, CategorySchema, orderSchema, ProductSchema } from "@/lib/zod/Schemas";
import * as z from 'zod'
export type T_Banner = {
   arabicName?:string,
   englishName?:string
   description?:string
   image?:File | string
   product:T_Product | string
}
export type T_Category = {
    banner?:T_Banner | null
    id: string;
    name: string;
    description: string;
    image: string | File;
    name_lower: string
    searchKeywords: string[]
    createdAt: string

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
    name_lower: string;
    searchKeywords: string[];
    sold:number
    createdAt: string
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

export type T_Sort = 'newest' | 'oldest' | 'a-z' | 'z-a' | ''