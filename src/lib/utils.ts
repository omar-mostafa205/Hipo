import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function formatPrice (
  price : string | number ,
  currency?: 'USD' | 'EUR' | 'GBP' | 'BDT' ,
  notation?: Intl.NumberFormatOptions['notation']
){
  const numericPrice =
  typeof price === 'string' ? parseFloat(price) : price

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency || 'USD',
    notation: notation || 'standard',
  }).format(numericPrice)
}