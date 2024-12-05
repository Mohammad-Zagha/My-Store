'use client'

import * as React from 'react'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
   Command,
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
      <div className="flex flex-col gap-[0.25rem]">
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
      placeholder = 'Select Options...',
      triggerClassName,
   } = props
   const [open, setOpen] = React.useState(false)

   return (
      <div className="flex flex-col gap-2">
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
            <PopoverContent className="w-[--radix-popover-trigger-width] p-0 rounded-lg">
               <Command className="rounded-[inherit]">
                  <CommandInput placeholder={placeholder} />
                  <CommandList>
                     <CommandEmpty>No options found.</CommandEmpty>
                     <CommandGroup>
                        {options.map((item) => (
                           <CommandItem
                              key={item.value}
                              value={item.value}
                              onSelect={(currentValue) => {
                                 setValue(currentValue === value ? '' : currentValue)
                                 setOpen(false)
                              }}
                           >
                              <Check
                                 className={cn('me-2 h-4 w-4', value === item.value ? 'opacity-100' : 'opacity-0')}
                              />
                              {item.display}
                           </CommandItem>
                        ))}
                     </CommandGroup>
                  </CommandList>
               </Command>
            </PopoverContent>
         </Popover>
      </div>
   )
}
