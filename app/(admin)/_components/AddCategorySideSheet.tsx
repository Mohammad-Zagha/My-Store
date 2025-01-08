'use client'
import { AddButton, FullAddButton } from '@/components/animated/AddButton'
import { Button } from '@/components/chadcn/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/chadcn/sheet'
import { DragAndDropImage } from '@/components/ui/DND'
import { InputBox } from '@/components/ui/input'
import { useCreateCategory } from '@/hooks/api/Categories'
import { CategorySchema } from '@/lib/zod/Schemas'
import { T_Category } from '@/types/objects'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

const AddCategorySideSheet = () => {
   const createCategoryMutation = useCreateCategory()
   const queryClient = useQueryClient()
   const { register, formState, trigger, reset, watch, handleSubmit, setValue } = useForm<T_Category>({
      resolver: zodResolver(CategorySchema),
      mode: 'all',
      defaultValues: {
         banner: null,
      },
   })
   const [open, setOpen] = React.useState(false)
   const onSubmit: SubmitHandler<T_Category> = (data) => {
      createCategoryMutation.mutateAsync(data, {
         onSuccess: (newCategory) => {
            queryClient.setQueriesData({ queryKey: ['admin-categories'] }, (oldData: any) => {
               if (!oldData) return oldData
               return {
                  ...oldData,
                  pages: oldData.pages.map((page: any, index: number) => {
                     if (index === 0) {
                        return {
                           ...page,
                           results: [{ ...newCategory }, ...page.results],
                        }
                     }
                     return page
                  }),
               }
            })
            toast.success('تم اضافة القسم بنجاح')
            setOpen(false)
            reset()
         },
      })
   }

   return (
      <Sheet open={open} onOpenChange={setOpen}>
         <SheetTrigger asChild>
            <AddButton />
         </SheetTrigger>
         <SheetContent side="right" className="min-w-[40%] max-sm:min-w-full z-50 " dir="rtl">
            <form onSubmit={handleSubmit(onSubmit)} className="!p-2 !px-4 !pt-8 flex flex-col justify-between h-full ">
               <div className="flex flex-col gap-4">
                  <DragAndDropImage
                     file={watch('image')}
                     setFile={(file) => {
                        setValue('image', file as File)
                     }}
                     imageContainerClassName="rounded-lg w-full border-none"
                     innerContainerClassName="w-full"
                     className="w-full"
                     width={1000}
                     height={280}
                  />
                  <InputBox
                     {...register('name')}
                     type="text"
                     placeholder="اسم التصنيف"
                     isRequired
                     label="اسم التصنيف"
                     instruction={{
                        text: formState.errors.name?.message,
                        type: 'error',
                     }}
                  />
                  <InputBox
                     {...register('description')}
                     placeholder="وصف التصنيف"
                     isRequired
                     label="وصف التصنيف"
                     instruction={{
                        text: formState.errors.description?.message,
                        type: 'error',
                     }}
                  />
               </div>
               <FullAddButton type="submit" isLoading={createCategoryMutation.isPending}>
                  اضافة
               </FullAddButton>
            </form>
         </SheetContent>
      </Sheet>
   )
}

export default AddCategorySideSheet
