import { Carousel } from '@/components/Carousels/CardsCarousel'
import { Button } from '@/components/chadcn/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/chadcn/dialog'
import { DragAndDropImage } from '@/components/ui/DND'
import CustomAvatar from '@/components/ui/ImageHandler'
import { InputBox } from '@/components/ui/input'
import { useUpdateProduct } from '@/hooks/api/Products'
import { objectToFormData } from '@/lib/utils'
import { ProductSchema } from '@/lib/zod/Schemas'
import { T_Product, T_Products_Inputs } from '@/types/objects'
import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { AiFillEdit } from 'react-icons/ai'

const ProductEditDialog = ({ product }: { product: T_Product }) => {
   const updateProduct = useUpdateProduct()
   const { register, formState, handleSubmit, control, setValue, watch, getValues } = useForm<T_Product>({
      resolver: zodResolver(ProductSchema),
      mode: 'all',
      defaultValues: {
         ...product,
      },
   })

   const imageCards = product.images.map((image, index) => (
      <Controller
         key={index}
         name={`images.${index}.url`}
         control={control}
         render={({ field }) => (
            <DragAndDropImage
               file={field.value ?? ''}
               setFile={(file) => field.onChange(file)}
               imageContainerClassName="rounded-lg w-full border-none"
               innerContainerClassName="w-full"
               className="w-full"
               width={1000}
               height={250}
            />
         )}
      />
   ))

   return (
      <Dialog>
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
               items={imageCards}
               isLoading={false}
               buttonsClassName="-bottom-10 z-[100] max-md:hidden h-fit"
               containerClassName="w-full min-h-[250px] max-h-[400px] flex items-center justify-center"
            />
            <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-4 p-2 ">
               <InputBox
                  {...register('name')}
                  containerClassName="col-span-1"
                  label="اسم المنتج"
                  placeholder="اسم المنتج"
                  isRequired
                  instruction={{
                     text: formState.errors.name?.message,
                     type: 'error',
                  }}
               />
               <InputBox
                  value={watch('stock')}
                  containerClassName="col-span-1"
                  onChange={(e) => {
                     setValue('stock', Number(e.target.value))
                  }}
                  label="كمية المنتج"
                  placeholder="كمية المنتج"
                  type="number"
                  isRequired
                  instruction={{
                     text: formState.errors.stock?.message,
                     type: 'error',
                  }}
               />
               <InputBox
                  value={watch('price')}
                  containerClassName="col-span-1 h-fit"
                  onChange={(e) => {
                     setValue('price', Number(e.target.value))
                  }}
                  label="سعر المنتج"
                  placeholder="سعر المنتج"
                  type="number"
                  isRequired
                  instruction={{
                     text: formState.errors.price?.message,
                     type: 'error',
                  }}
               />
               <InputBox
                  value={watch('discount')}
                  containerClassName="col-span-1 h-fit"
                  onChange={(e) => {
                     setValue('discount', Number(e.target.value))
                  }}
                  label="خصم المنتج"
                  placeholder="خصم المنتج"
                  type="number"
                  isRequired
                  instruction={{
                     text: formState.errors.discount?.message,
                     type: 'error',
                  }}
               />
               <InputBox
                  {...register('description')}
                  label="وصف المنتج"
                  placeholder="وصف المنتج"
                  containerClassName="col-span-full"
                  isRequired
                  instruction={{
                     text: formState.errors.description?.message,
                     type: 'error',
                  }}
               />
               <Button
                  type="button"
                  className="col-span-full !bg-primary-dark !text-white !text-lg !font-semibold !rounded-lg !py-2.5 !px-4"
                  onClick={() => {
                     updateProduct.mutateAsync(getValues(), {})
                  }}
                  isLoading={updateProduct.isPending}
               >
                  حفظ
               </Button>
            </div>
         </DialogContent>
      </Dialog>
   )
}

export default ProductEditDialog
