import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {format} from 'date-fns'
import { AxiosError } from "axios";
import { toast } from "sonner";
import { T_Product } from "@/types/objects";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}       


export function getAvatarFallback(text: string): string {
  if (!text) return ''
  const textStrings = text?.trim().split(' ').filter(Boolean)
  if (textStrings.length == 0) return ''
  const firstLetter = textStrings[0][0]
  const secondLetter = textStrings.length > 1 ? textStrings[1][0] : textStrings[0][1]
  return (firstLetter + secondLetter).toUpperCase()
}



export function formatUTCDateToLocalTime(dateInput: Date | string): { date: string; time: string } {
  const userTimeZoneDate = typeof dateInput === 'string' ? new Date(dateInput) : dateInput
  return {
     date: format(userTimeZoneDate, 'MMM d, yyyy'),
     time: format(userTimeZoneDate, 'hh:mm a'),
  }
}

export function hasFileKey<T extends Record<string, any>, K extends keyof T>(obj: T, ...keys: K[]): boolean {
  return keys.some((key) => obj[key] && (obj[key] as unknown) instanceof File)
}


export function isImage(file: File): boolean {
  return file.type.startsWith('image/')
}

export function objectToFormData(
  obj: Record<string, any>,
  formData: FormData = new FormData(),
  namespace?: string,
): FormData {
  for (const property in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, property)) {
      const formKey = namespace ? `${namespace}[${property}]` : property; 
      const value = obj[property];
      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          const indexedKey = `${formKey}[${index}]`;
          if (typeof item === "object" && item !== null && !(item instanceof File)) {
            objectToFormData(item, formData, indexedKey);
          } else {
            formData.append(indexedKey, item);
          }
        });
      }
      else if (typeof value === "object" && value !== null && !(value instanceof File)) {
        objectToFormData(value, formData, formKey);
      }
      else if (value !== null && value !== undefined) {
        formData.append(formKey, value);
      }
    }
  }

  return formData;
}


export function isObject(value: any): value is object {
  return typeof value === 'object' && !Array.isArray(value) && !(value instanceof Date) && !(value instanceof File)
}
function isValid(v: any) {
  return v !== '' && v !== null && v !== undefined && !(typeof v === 'object' && v !== null && Object.keys(v).length === 0);
}

export function clean<T extends object>(val: T): T {
  const data = Array.isArray(val) ? val.filter(isValid) : val
  return Object.entries(data).reduce(
     (acc: any, [key, value]) => {
        if (isValid(value)) {
           if (isObject(value)) {
              acc[key] = clean(value)
           } else if (Array.isArray(value)) {
              acc[key] = value.map((i) => (isObject(i) || Array.isArray(i) ? clean(i) : i))
           } else {
              acc[key] = value
           }
        }
        return acc
     },
     Array.isArray(val) ? [] : {},
  )
}


export function handleError(error: unknown, message: string = 'حدث خطأ ما') {
  if (error instanceof AxiosError) {
      const errorData = error.response?.data
      if(errorData && errorData.message){
         toast.error(errorData.message)
      }
   
  } else {
     toast.error(message)
  }
}

export function hasProductImageKey(product: Partial<T_Product>): boolean {
  return product.images?.some((image) => image.url instanceof File) ?? false
}