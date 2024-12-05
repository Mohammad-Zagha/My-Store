'use client'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/Taps'
import useParamsValues from '@/hooks/use-params'
import React from 'react'

const AdminTaps = () => {
   const { value: activeTab, setValue: setActiveTab } = useParamsValues({
      paramKey: 'active-tab',
      defaultValue: 'orders',
   })
   return (
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} className="overflow-y-auto rounded-2xl gap-0">
         <TabsList>
            <TabsTrigger value="orders">Orders</TabsTrigger>
         </TabsList>
      </Tabs>
   )
}

export default AdminTaps
