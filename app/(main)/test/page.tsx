'use client'
import { EnumCombobox } from '@/components/ui/combobox'
import { useGetListOfCategories } from '@/hooks/api/Admin'
import React from 'react'

const page = () => {
   const { data: categories, isLoading: categoriesLoading } = useGetListOfCategories()
   const [cat, setCat] = React.useState<string>('')

   return (
      <div className="w-screen h-screen flex center bg-background-dark text-primary-dark text-xl font-Cairo font-semibold"></div>
   )
}

export default page
