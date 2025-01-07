'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/Taps'
import useParamsValues from '@/hooks/use-params'
import React from 'react'
import Orders from './taps/Orders'
import Categories from './taps/Categories'
import Products from './taps/Products'
import Offers from './taps/Offers'
import Misc from './taps/Misc'
import CookiesList from './taps/CookieList'

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
            <TabsTrigger value="Misc">القوائم و الاعدادات</TabsTrigger>
            <TabsTrigger value="cookies"> cookies</TabsTrigger>
         </TabsList>

         <div className="overflow-y-auto">
            <TabsContent value="orders" className="h-full ">
               <Orders />
            </TabsContent>
            <TabsContent value="categories" className="h-full ">
               <Categories />
            </TabsContent>
            <TabsContent value="products" className="h-full ">
               <Products />
            </TabsContent>
            <TabsContent value="offers" className="h-full ">
               <Offers />
            </TabsContent>
            <TabsContent value="Misc" className="h-full ">
               <Misc />
            </TabsContent>
            <TabsContent value="cookies" className="h-full ">
               <CookiesList />
            </TabsContent>
         </div>
      </Tabs>
   )
}

export default AdminTaps
