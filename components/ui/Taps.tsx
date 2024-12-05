'use client'

import { cn } from '@/lib/utils'
import { HTMLMotionProps, motion } from 'framer-motion'
import React, { ComponentProps, Dispatch, PropsWithChildren, SetStateAction, useContext, useMemo } from 'react'

type T_Tabs_Context = {
   activeTab: string
   setActiveTab: React.Dispatch<React.SetStateAction<string>>
}

const TabsContext = React.createContext<T_Tabs_Context | undefined>(undefined)

type T_Tabs = PropsWithChildren & {
   className?: string
   activeTab: string
   setActiveTab: Dispatch<SetStateAction<string>>
}

const Tabs = ({ className, children, activeTab, setActiveTab }: T_Tabs) => {
   const value = useMemo(() => ({ activeTab, setActiveTab }), [activeTab, setActiveTab])
   return (
      <TabsContext.Provider value={value}>
         <div className={cn('bg-white grid grid-rows-[auto_minmax(0,1fr)] gap-1.5', className)}>{children}</div>
      </TabsContext.Provider>
   )
}

Tabs.displayName = 'Tabs'

type T_TabsList = ComponentProps<'div'>

const TabsList: React.FC<T_TabsList> = ({ children, className, ...props }) => {
   return (
      <div
         className={cn(
            'w-full h-full flex bg-gray-100 border [border-top-left-radius:inherit] [border-top-right-radius:inherit] overflow-x-auto overflow-y-visible max-lg:no-scrollbar',
            className,
         )}
         {...props}
      >
         {children}
      </div>
   )
}

TabsList.displayName = 'TabsList'

type T_Tabs_Trigger = {
   value: string
} & ComponentProps<'button'>

const TabsTrigger: React.FC<T_Tabs_Trigger> = ({ value, children, className, ...props }) => {
   const { activeTab, setActiveTab } = useTabsContext()
   const isActive = activeTab === value
   return (
      <button
         aria-selected={isActive}
         role="tab"
         type="button"
         data-active={isActive}
         className={cn('group custom-tab-button', className)}
         onClick={() => setActiveTab(value)}
         {...props}
      >
         <>{children}</>
         {isActive ? (
            <span className="-z-[1] absolute inset-x-0 bottom-0 bg-success h-1" />
         ) : (
            <span className="-z-[1] transition-all absolute opacity-0 inset-x-12 bottom-0 bg-success/50 h-1 group-hover:opacity-100 group-hover:inset-x-0" />
         )}
      </button>
   )
}

TabsTrigger.displayName = 'TabsTrigger'

type T_Tabs_Content = {
   value: string
} & HTMLMotionProps<'div'>

const TabsContent: React.FC<T_Tabs_Content> = ({ value, children, className, ...props }) => {
   const { activeTab } = useTabsContext()
   if (activeTab !== value) {
      return null
   }
   return (
      <motion.div
         key={value + 'content'}
         variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
            exit: { opacity: 0 },
         }}
         initial="hidden"
         animate={activeTab === value ? 'visible' : 'hidden'}
         exit={activeTab === value ? 'exit' : 'hidden'}
         transition={{ duration: 0.5, type: 'tween' }}
         className={cn('p-1.5 lg:p-4', className)}
         {...props}
      >
         {children}
      </motion.div>
   )
}

TabsContent.displayName = 'TabsContent'

export { Tabs, TabsContent, TabsList, TabsTrigger }

function useTabsContext() {
   const context = useContext(TabsContext)
   if (!context) {
      throw new Error('useTabsContext must be used within a TabsContextProvider')
   }
   return context
}
