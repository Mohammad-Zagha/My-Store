'use client'

import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
   Command,
   CommandDialog,
   CommandEmpty,
   CommandGroup,
   CommandInput,
   CommandItem,
   CommandList,
} from '@/components/chadcn/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/chadcn/popover'
import { InputLabel } from './input'
import { buttonVariants } from '../chadcn/button'
import { IInstructionBaseProps, ILabelBaseProps } from '@/types/objects'

interface ComboboxProps extends ILabelBaseProps, IInstructionBaseProps {
   options: string[]
   value: string
   setValue: (value: string) => void
   placeholder?: string
   triggerClassName?: string
   labelClassName?: string
   disabled?: boolean
}

export function Combobox(props: ComboboxProps) {
   const {
      instructions,
      isRequired,
      label,
      value,
      disabled,
      setValue,
      options,
      labelClassName,
      placeholder = 'اختر الخيارات...',
      triggerClassName,
   } = props
   const [open, setOpen] = React.useState(false)

   return (
      <div className="flex flex-col gap-[0.25rem] ">
         {label && (
            <InputLabel className={cn(labelClassName)} isRequired={isRequired}>
               {label}
            </InputLabel>
         )}
         <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger
               className={buttonVariants({
                  variant: 'outline',
                  className: cn('justify-between', triggerClassName),
               })}
               disabled={disabled}
               role="combobox"
               aria-expanded={open}
            >
               {value ? options.find((item) => item === value) : placeholder}
               <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] p-0 rounded-lg bg-white font-Cairo" dir="rtl">
               <Command className="rounded-[inherit]">
                  <CommandInput placeholder={placeholder} />
                  <CommandList>
                     <CommandEmpty>لا يوجد خيارات</CommandEmpty>
                     <CommandGroup>
                        {options.map((item) => (
                           <CommandItem
                              key={item}
                              value={item}
                              onSelect={(currentValue) => {
                                 setValue(currentValue === value ? '' : currentValue)
                                 setOpen(false)
                              }}
                           >
                              <Check className={cn('me-2 h-4 w-4', value === item ? 'opacity-100' : 'opacity-0')} />
                              {item}
                           </CommandItem>
                        ))}
                     </CommandGroup>
                  </CommandList>
               </Command>
            </PopoverContent>
         </Popover>
         {instructions && <p className="text-xs text-red-500">{instructions.error}</p>}
      </div>
   )
}

interface EnumComboboxProps extends ILabelBaseProps, IInstructionBaseProps {
   options: { value: string; display: string }[]
   value: string
   setValue: (value: string) => void
   placeholder?: string
   triggerClassName?: string
}

export function EnumCombobox(props: EnumComboboxProps) {
   const {
      instructions,
      isRequired,
      label,
      value,
      setValue,
      options,
      placeholder = 'اختر الخيارات...',
      triggerClassName,
   } = props
   const [open, setOpen] = React.useState(false)
   return (
      <div className="flex flex-col gap-2 bg-white">
         {label && <InputLabel isRequired={isRequired}>{label}</InputLabel>}
         <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger
               className={buttonVariants({
                  variant: 'outline',
                  className: cn('justify-between', triggerClassName),
               })}
               role="combobox"
               aria-expanded={open}
            >
               {value ? options.find((item) => item.value === value)?.display : placeholder}
               <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </PopoverTrigger>

            <CommandDialog open={open} onOpenChange={setOpen}>
               <CommandInput placeholder={placeholder} className="" dir="rtl" />
               <CommandList className="min-h-[300px] bg-white ">
                  <CommandEmpty>لا يوجد خيارات</CommandEmpty>
                  <CommandGroup>
                     {options.map((item) => (
                        <CommandItem
                           key={item.value}
                           value={item.value}
                           className="text-right hover:bg-gray-100"
                           onSelect={(currentValue) => {
                              setValue(currentValue === value ? '' : currentValue)
                              setOpen(false)
                           }}
                        >
                           <Check className={cn('me-2 h-4 w-4', value === item.value ? 'opacity-100' : 'opacity-0')} />
                           {item.display}
                        </CommandItem>
                     ))}
                  </CommandGroup>
               </CommandList>
            </CommandDialog>
         </Popover>
      </div>
   )
}
interface ElementCombobox<T extends { productId: string }> extends ILabelBaseProps, IInstructionBaseProps {
   options: T[]
   value: string
   setValue: (value: string) => void
   placeholder?: string
   triggerClassName?: string
   renderItem: (item: T) => JSX.Element
}
// TODO: Edit productId to just id
export function ElementCombobox<T extends { productId: string }>(props: ElementCombobox<T>) {
   const {
      instructions,
      isRequired,
      label,
      value,
      setValue,
      options,
      placeholder = 'اختر الخيارات...',
      triggerClassName,
      renderItem,
   } = props
   const [open, setOpen] = React.useState(false)

   const selectedItem = options.find((item) => item.productId === value)

   return (
      <div className="flex flex-col gap-2 bg-white">
         {label && <InputLabel isRequired={isRequired}>{label}</InputLabel>}
         <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger
               className={buttonVariants({
                  variant: 'outline',
                  className: cn('justify-between !py-6', triggerClassName),
               })}
               role="combobox"
               aria-expanded={open}
            >
               {selectedItem ? renderItem(selectedItem) : placeholder}
               <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </PopoverTrigger>

            <CommandDialog open={open} onOpenChange={setOpen}>
               <CommandInput placeholder={placeholder} className="" dir="rtl" />
               <CommandList className="min-h-[300px] bg-white ">
                  <CommandEmpty>لا يوجد خيارات</CommandEmpty>
                  <CommandGroup>
                     {options.map((item) => (
                        <CommandItem
                           dir="rtl"
                           key={item.productId}
                           value={item.productId}
                           className="text-right hover:bg-gray-100"
                           onSelect={(currentValue) => {
                              setValue(currentValue === value ? '' : currentValue)
                              setOpen(false)
                           }}
                        >
                           {renderItem(item)}
                           <Check
                              className={cn('me-2 h-4 w-4', value === item.productId ? 'opacity-100' : 'opacity-0')}
                           />
                        </CommandItem>
                     ))}
                  </CommandGroup>
               </CommandList>
            </CommandDialog>
         </Popover>
      </div>
   )
}
