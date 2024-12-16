import AnimatedButton from '@/components/animated/AnimatedButton'
import { Button } from '@/components/chadcn/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/chadcn/dialog'
import Loader from '@/components/common/Loader'
import TextAreaBox from '@/components/common/text-area-box'
import { DragAndDropImage } from '@/components/ui/DND'
import { InputBox } from '@/components/ui/input'
import { useUpdateCategory } from '@/hooks/api/Categories'
import { CategorySchema } from '@/lib/zod/Schemas'
import { T_Category, T_Category_Inputs } from '@/types/objects'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useEffect } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

const CategoryEditDialog = ({ category }: { category: T_Category }) => {
   const updateMutation = useUpdateCategory()
   const { register, control, formState, setValue, handleSubmit } = useForm<T_Category_Inputs>({
      resolver: zodResolver(CategorySchema),
      mode: 'onBlur',
   })
   useEffect(() => {
      setValue('name', category.name)
      setValue('image', category.image)
      setValue('description', category.description)
   }, [])
   const onSubmit: SubmitHandler<T_Category_Inputs> = (data) => {
      console.log(data)
      updateMutation.mutateAsync(
         {
            id: category.id,
            values: {
               ...data,
            },
         },
         {
            onSuccess: () => {
               toast.success('تم تعديل التصنيف بنجاح')
            },
         },
      )
   }

   return (
      <Dialog>
         <DialogTrigger asChild>
            <AnimatedButton className="text-xs w-fit">تعديل التصنيف</AnimatedButton>
         </DialogTrigger>
         <DialogContent
            className="max-w-full lg:max-w-[60%] xl:max-w-[50%] h-full lg:max-h-[80%] grid grid-rows-[auto_minmax(0,1fr)_auto] gap-6 !rounded-[2rem] max-lg:!rounded-none p-2 lg:p-6 bg-white"
            dir="rtl"
         >
            <Controller
               name="image"
               control={control}
               render={({ field }) => (
                  <DragAndDropImage
                     file={field.value ?? null}
                     setFile={(file) => field.onChange(file)}
                     imageContainerClassName="rounded-lg w-full border-none"
                     innerContainerClassName="w-full"
                     className="w-full "
                     width={1000}
                     height={250}
                  />
               )}
            />

            <form
               className="w-full min-h-full grid grid-cols-1 gap-1 grid-rows-[auto_minmax(0,1fr)]"
               onSubmit={handleSubmit(onSubmit)}
            >
               <InputBox
                  isRequired
                  label="اسم التصنيف"
                  {...register('name')}
                  instruction={{
                     text: formState.errors.name?.message,
                     type: 'error',
                  }}
                  name="name"
                  defaultValue={category.name}
               />
               <TextAreaBox
                  isRequired
                  containerClassName="col-span-full"
                  label="وصف التصنيف"
                  {...register('description')}
                  instruction={{
                     text: formState.errors.description?.message,
                     type: 'error',
                  }}
               />

               <div className="col-span-full flex justify-between items-center mt-2">
                  <Button
                     type="submit"
                     isLoading={updateMutation.isPending}
                     disabled={!formState.isValid}
                     className="min-w-[200px]"
                  >
                     تعديل التصنيف
                  </Button>
               </div>
            </form>
         </DialogContent>
      </Dialog>
   )
}

export default CategoryEditDialog
