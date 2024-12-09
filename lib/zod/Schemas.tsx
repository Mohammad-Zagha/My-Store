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
