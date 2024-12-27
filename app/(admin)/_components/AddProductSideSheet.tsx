import { Carousel } from '@/components/Carousels/CardsCarousel'
import { Button } from '@/components/chadcn/button'
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@/components/chadcn/sheet'
import { EnumCombobox } from '@/components/ui/combobox'
import { DragAndDropImage } from '@/components/ui/DND'
import { InputBox } from '@/components/ui/input'
import { useGetListOfCategories } from '@/hooks/api/Admin'
import { useAddProduct } from '@/hooks/api/Products'
import { ProductSchema } from '@/lib/zod/Schemas'
import { T_Product } from '@/types/objects'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import React, { useMemo } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
export function AddProductSideSheet() {
   const [open, setOpen] = React.useState(false)
   const { data: categories = [], isLoading: categoriesLoading } = useGetListOfCategories()
   const addProductMutaion = useAddProduct()
   const queryClient = useQueryClient()
   const {
      register,
      formState: { errors },
      control,
      setValue,
      watch,
      trigger,
      reset,
      getValues,
   } = useForm<T_Product>({
      resolver: zodResolver(ProductSchema),
      mode: 'all',
      defaultValues: {
         discount: 0,
         stock: 1,
         price: 1,
         category: undefined,
      },
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
   const handleAddProduct = ({ product }: { product: T_Product }) => {
      trigger()
      addProductMutaion.mutate(
         { product },
         {
            onSuccess: (newProduct) => {
               queryClient.setQueriesData({ queryKey: ['products'] }, (oldData: any) => {
                  if (!oldData) return oldData
                  return {
                     ...oldData,
                     pages: oldData.pages.map((page: any, index: number) => {
                        if (index === 0) {
                           return {
                              ...page,
                              results: [{ ...newProduct }, ...page.results],
                           }
                        }
                        return page
                     }),
                  }
               })
               toast.success('تم اضافة المنتج بنجاح')
               setOpen(false)
               reset()
            },
         },
      )
   }
   return (
      <Sheet open={open} onOpenChange={setOpen}>
         <SheetTrigger asChild>
            <button title="اضافة منتج" className="group cursor-pointer outline-none hover:rotate-90 duration-300">
               <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30px"
                  height="30px"
                  viewBox="0 0 24 24"
                  className="stroke-yellow-300 fill-none group-hover:fill-yellow-500 group-active:stroke-yellow-200 group-active:fill-yellow-600 group-active:duration-0 duration-300"
               >
                  <path
                     d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
                     strokeWidth="1.5"
                  ></path>
                  <path d="M8 12H16" strokeWidth="1.5"></path>
                  <path d="M12 16V8" strokeWidth="1.5"></path>
               </svg>
            </button>
         </SheetTrigger>
         <SheetContent
            side="right"
            className="!p-2 !px-4 !pt-5 flex flex-col h-full min-w-[40%] max-sm:min-w-full z-50"
            dir="rtl"
         >
            <SheetHeader className="flex justify-center items-center text-center font-Cairo font-semibold">
               اضافة منتج
            </SheetHeader>
            <Carousel
               items={generateImageCards}
               isLoading={false}
               buttonsClassName="-bottom-10 z-[100] max-md:hidden h-fit"
               containerClassName="w-full min-h-[250px] max-h-[400px] flex items-center justify-center"
            />
            <div className="w-full h-full flex flex-col justify-between">
               <div className="w-full  grid grid-cols-1 md:grid-cols-2 gap-2 gap-y-4 p-2">
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
                           value={field.value?.id || ''}
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
                        if (!isNaN(value) && typeof value === 'number') {
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
               </div>
               <Button
                  type="button"
                  className="col-span-full !bg-primary-dark !text-white !text-lg !font-semibold !rounded-lg !py-2.5 !px-4"
                  onClick={() => handleAddProduct({ product: getValues() })}
                  isLoading={addProductMutaion.isPending}
               >
                  حفظ
               </Button>
            </div>
         </SheetContent>
      </Sheet>
   )
}
