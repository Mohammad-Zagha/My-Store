import * as z from 'zod'

const phone_number_schema = z
   .string()
   .max(15, 'رقم الهاتف يجب ان يحتوي على 15 رقم كحد اقصى')
   .regex(/^\d{0,15}$/, 'رقم الهاتف يجب ان يحتوي على ارقام فقط')

export const orderSchema = z.object({
   // email: z.string().email().optional(),
   city: z.string({ message: 'المدينة مطلوبة' }),
   address: z.string({ message: 'العنوان مطلوب' }).min(5, 'العنوان يجب ان يحتوي على 5 احرف على الاقل'),
   firstName: z.string({ message: 'الاسم الاول مطلوب' }).min(2, 'الاسم الاول يجب ان يحتوي على حرفين على الاقل'),
   lastName: z.string({ message: 'الاسم الاخير مطلوب' }).min(2, 'الاسم الاخير يجب ان يحتوي على حرفين على الاقل'),
   phone: phone_number_schema,
})

export const AdminAuthSchema = z.object({
   email: z.string().email({ message: 'البريد الالكتروني مطلوب' }),
   password: z.string().min(1, 'كلمة المرور مطلوبة'),
})
export const BannerSchema = z.object({
   arabicName: z.string(),
   englishName: z.string(),
   description: z.string(),
   image: z.string().or(z.instanceof(File)),
   product: z.string(),
})
export const CategorySchema = z.object({
   name: z.string().min(2, 'اسم القسم يجب ان يحتوي على حرفين على الاقل'),
   description: z.string().min(2, 'وصف القسم يجب ان يحتوي على حرفين على الاقل'),
   image: z.string().or(z.instanceof(File)).optional(),
   banner: BannerSchema.optional().nullable(),
})

export const ProductSchema = z.object({
   name: z.string().min(2, 'اسم المنتج يجب ان يحتوي على حرفين على الاقل'),
   description: z.string().min(2, 'وصف المنتج يجب ان يحتوي على حرفين على الاقل'),
   price: z.number().min(1, 'السعر يجب ان يكون على الاقل'),
   stock: z.number().min(1, 'الكمية يجب ان تكون على الاقل'),
   discount: z.number().default(0),
   category: z.object({
      id: z.string(),
      name: z.string(),
   }),
   images: z.array(
      z.object({
         url: z.string().or(z.instanceof(File)).optional(),
      }),
   ),
   sold: z.number().default(0),
})
