import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

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




