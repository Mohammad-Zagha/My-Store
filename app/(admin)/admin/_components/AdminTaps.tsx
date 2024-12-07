'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Taps'
import useParamsValues from '@/hooks/use-params'
import React from 'react'
import Orders from './Orders'

const AdminTaps = () => {
   const { value: activeTab, setValue: setActiveTab } = useParamsValues({
      paramKey: 'active-tab',
      defaultValue: 'orders',
   })
   return (
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} className="overflow-y-auto gap-0 w-dvw h-dvh">
         <TabsList>
            <TabsTrigger value="products">المنتجات</TabsTrigger>
            <TabsTrigger value="offers">العروض</TabsTrigger>
            <TabsTrigger value="categories">التصنيفات</TabsTrigger>
            <TabsTrigger value="orders">الطلبات</TabsTrigger>
         </TabsList>

         <div className="overflow-y-auto">
            <TabsContent value="orders">
               <Orders />
            </TabsContent>
         </div>
      </Tabs>
   )
}

export default AdminTaps
