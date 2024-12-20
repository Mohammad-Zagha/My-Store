import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {format} from 'date-fns'
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
      const formKey = namespace ? `${namespace}[${property}]` : property; // Nested keys use bracket notation
      const value = obj[property];

      // Handle arrays
      if (Array.isArray(value)) {
        value.forEach((item, index) => {
          const indexedKey = `${formKey}[${index}]`; // Array keys: field[0], field[1], etc.
          if (typeof item === "object" && item !== null && !(item instanceof File)) {
            objectToFormData(item, formData, indexedKey);
          } else {
            formData.append(indexedKey, item);
          }
        });
      }
      // Handle objects
      else if (typeof value === "object" && value !== null && !(value instanceof File)) {
        objectToFormData(value, formData, formKey);
      }
      // Handle primitive values and File objects
      else if (value !== null && value !== undefined) {
        formData.append(formKey, value);
      }
    }
  }

  return formData;
}
