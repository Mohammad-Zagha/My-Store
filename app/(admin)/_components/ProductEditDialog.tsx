import React, { useEffect, useState, useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AiFillEdit } from 'react-icons/ai'
import { toast } from 'sonner'

import { Carousel } from '@/components/Carousels/CardsCarousel'
import { Button } from '@/components/chadcn/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/chadcn/dialog'
import { EnumCombobox } from '@/components/ui/combobox'
import { DragAndDropImage } from '@/components/ui/DND'
import { InputBox } from '@/components/ui/input'
import { useGetListOfCategories } from '@/hooks/api/Admin'
import { useUpdateProduct } from '@/hooks/api/Products'
import { ProductSchema } from '@/lib/zod/Schemas'
import { T_Product } from '@/types/objects'

const ProductEditDialog = ({ product }: { product: T_Product }) => {
   const { mutateAsync: updateProduct, isPending } = useUpdateProduct()
   const { data: categories = [], isLoading: categoriesLoading } = useGetListOfCategories()

   const [open, setOpen] = useState(false)

   const {
      register,
      formState: { errors },
      control,
      setValue,
      watch,
      getValues,
   } = useForm<T_Product>({
      resolver: zodResolver(ProductSchema),
      mode: 'all',
      defaultValues: product,
   })

   const images = watch('images') || []

   const handleImageChange = (file: File | string | null, index: number) => {
      const updatedImages = [...images]
      if (file) {
         updatedImages[index] = { url: file }
      } else {
         updatedImages.splice(index, 1)
      }
      setValue('images', updatedImages)
   }

   const generateImageCards = useMemo(() => {
      return [...images, { url: '' }]
         .slice(0, 5)
         .map((image, index) => (
            <DragAndDropImage
               key={index}
               file={image?.url || ''}
               setFile={(file) => handleImageChange(file, index)}
               imageContainerClassName="rounded-lg w-full border-none"
               innerContainerClassName="w-full"
               className="w-full"
               width={1000}
               height={250}
            />
         ))
   }, [images])

   const categoryOptions = useMemo(
      () =>
         categories.map((category: { value: string; display: string }) => ({
            id: category.value,
            name: category.display,
         })),
      [categories],
   )

   useEffect(() => {
      setValue('images', product.images)
   }, [product, setValue])

   const handleSubmit = async () => {
      await updateProduct(getValues(), {
         onSuccess: () => {
            toast.success('تم تعديل المنتج بنجاح')
            setOpen(false)
         },
      })
   }

   return (
      <Dialog open={open} onOpenChange={setOpen}>
         <DialogTrigger asChild>
            <Button size="icon" variant="ghost">
               <AiFillEdit className="text-primary-dark !size-3" />
            </Button>
         </DialogTrigger>
         <DialogContent
            className="max-w-full lg:max-w-[70%] xl:max-w-[65%] bg-white h-full lg:max-h-[90%] overflow-auto !rounded-[2rem] max-lg:!rounded-none p-2 lg:p-6 flex flex-col"
            dir="rtl"
         >
            <Carousel
               items={generateImageCards}
               isLoading={false}
               buttonsClassName="-bottom-10 z-[100] max-md:hidden h-fit"
               containerClassName="w-full min-h-[250px] max-h-[400px] flex items-center justify-center"
            />
            <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-4 p-2">
               <InputBox
                  {...register('name')}
                  containerClassName="col-span-1 !h-fit"
                  label="اسم المنتج"
                  placeholder="اسم المنتج"
                  isRequired
                  instruction={{
                     text: errors.name?.message,
                     type: 'error',
                  }}
               />
               <Controller
                  name="category"
                  control={control}
                  render={({ field }) => (
                     <EnumCombobox
                        triggerClassName="!h-fit"
                        value={field.value.id}
                        setValue={(value) => {
                           const category = categoryOptions.find((cat: any) => cat.id === value)
                           if (category) field.onChange(category)
                        }}
                        label="التصنيف"
                        placeholder="التصنيف"
                        isRequired
                        options={categories}
                     />
                  )}
               />
               <InputBox
                  value={watch('stock')}
                  containerClassName="col-span-1"
                  onChange={(e) => {
                     const value = Number(e.target.value)
                     if (!isNaN(value)) {
                        setValue('stock', Number(value))
                     }
                  }}
                  label="كمية المنتج"
                  placeholder="كمية المنتج"
                  isRequired
                  instruction={{
                     text: errors.stock?.message,
                     type: 'error',
                  }}
               />
               <InputBox
                  value={watch('price')}
                  containerClassName="col-span-1 h-fit"
                  onChange={(e) => {
                     const value = Number(e.target.value)
                     if (!isNaN(value)) {
                        setValue('price', Number(value))
                     }
                  }}
                  label="سعر المنتج"
                  placeholder="سعر المنتج"
                  isRequired
                  instruction={{
                     text: errors.price?.message,
                     type: 'error',
                  }}
               />
               <InputBox
                  value={watch('discount')}
                  containerClassName="col-span-1 h-fit"
                  onChange={(e) => {
                     const value = Number(e.target.value)
                     if (!isNaN(value)) {
                        setValue('discount', Number(value))
                     }
                  }}
                  label="خصم المنتج"
                  placeholder="خصم المنتج"
                  isRequired
                  instruction={{
                     text: errors.discount?.message,
                     type: 'error',
                  }}
               />
               <InputBox
                  {...register('description')}
                  label="وصف المنتج"
                  placeholder="وصف المنتج"
                  containerClassName="col-span-1"
                  isRequired
                  instruction={{
                     text: errors.description?.message,
                     type: 'error',
                  }}
               />
               <Button
                  type="button"
                  className="col-span-full !bg-primary-dark !text-white !text-lg !font-semibold !rounded-lg !py-2.5 !px-4"
                  onClick={handleSubmit}
                  isLoading={isPending}
               >
                  حفظ
               </Button>
            </div>
         </DialogContent>
      </Dialog>
   )
}

export default ProductEditDialog
