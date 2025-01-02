'use client'
import AnimatedButton from '@/components/animated/AnimatedButton'
import { Button } from '@/components/chadcn/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/chadcn/dialog'
import TextAreaBox from '@/components/common/text-area-box'
import { Combobox, ElementCombobox } from '@/components/ui/combobox'
import { DragAndDropImage } from '@/components/ui/DND'
import CustomAvatar from '@/components/ui/ImageHandler'
import { InputBox } from '@/components/ui/input'
import { useEditCategoryBanner } from '@/hooks/api/Categories'
import { useGetAllProducts, useGetCategoryProducts } from '@/hooks/api/Products'
import usePagination from '@/hooks/Pagination'
import { BannerSchema } from '@/lib/zod/Schemas'
import { T_Banner, T_Category } from '@/types/objects'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useInView } from 'framer-motion'
import React, { useEffect, useRef } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useDebounce } from 'use-debounce'

const EditBannerDialog = ({ category }: { category: T_Category }) => {
   const updateBannerMutation = useEditCategoryBanner()
   const queryClient = useQueryClient()
   const { register, control, formState, handleSubmit, watch, setValue } = useForm<T_Banner>({
      resolver: zodResolver(BannerSchema),
      mode: 'all',
      defaultValues: category.banner
         ? {
              ...category.banner,
           }
         : {},
   })
   const [open, setOpen] = React.useState(false)
   const { page, limit } = usePagination({ limit: 10 })
   const [search, setSearch] = React.useState<string>('')
   const [debouncedSearch] = useDebounce(search, 500)
   const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending, isFetching } = useGetCategoryProducts({
      id: category.id,
      page,
      limit,
      search: debouncedSearch,
   })
   const products = data?.pages?.flatMap((page) => page?.results ?? []) ?? []
   const loadMoreRef = useRef<HTMLDivElement | null>(null)
   const isInView = useInView(loadMoreRef)
   useEffect(() => {
      if (isInView && hasNextPage && !isFetchingNextPage) {
         fetchNextPage()
      }
   }, [isInView, hasNextPage, isFetchingNextPage, fetchNextPage])
   const onSubmit: SubmitHandler<T_Banner> = (data) => {
      updateBannerMutation.mutate(
         {
            id: category.id,
            banner: data,
         },
         {
            onSuccess: (updatedCategory) => {
               queryClient.invalidateQueries({ queryKey: ['admin-categories'] })
               toast.success('تم تعديل الراية بنجاح')
               setOpen(false)
            },
         },
      )
   }
   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger asChild>
            <AnimatedButton className="text-xs">تعديل الراية</AnimatedButton>
         </DialogTrigger>
         <DialogContent
            className="max-w-full lg:max-w-[70%] xl:max-w-[60%] h-full lg:max-h-[95%] grid grid-rows-[auto_minmax(0,1fr)_auto] gap-6 !rounded-[2rem] max-lg:!rounded-none p-2 lg:p-6 bg-white"
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
               className="w-full min-h-full grid grid-cols-1  md:grid-cols-2  grid-rows-[auto_minmax(0,1fr)] gap-2"
               onSubmit={handleSubmit(onSubmit)}
            >
               <InputBox
                  label="الاسم العربي"
                  {...register('arabicName')}
                  instruction={{
                     text: formState.errors.arabicName?.message,
                     type: 'error',
                  }}
                  name="arabicName"
               />
               <InputBox
                  label="الاسم الانجليزي"
                  {...register('englishName')}
                  instruction={{
                     text: formState.errors.englishName?.message,
                     type: 'error',
                  }}
                  name="englishName"
               />
               <TextAreaBox
                  containerClassName="col-span-full"
                  label=" الوصف"
                  {...register('description')}
                  instruction={{
                     text: formState.errors.description?.message,
                     type: 'error',
                  }}
                  name="description"
               />
               <ElementCombobox
                  options={products}
                  value={watch('product') as string}
                  setValue={(value) => {
                     setValue('product', value)
                  }}
                  label="ارقف منتج"
                  renderItem={(item) => (
                     <div className="w-full flex justify-start items-center gap-2 ">
                        <CustomAvatar
                           src={(item.images[0]?.url as string) ?? ''}
                           alt="product"
                           className="size-[40px] rounded-lg"
                        />
                        <span className="font-Cairo text-xs font-semibold text-primary-dark">{item.name}</span>
                     </div>
                  )}
               />
               <div className="col-span-full flex justify-between items-center mt-2">
                  <Button type="submit" className="min-w-[200px]">
                     تعديل التصنيف
                  </Button>
               </div>
            </form>
         </DialogContent>
      </Dialog>
   )
}

export default EditBannerDialog
