import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function transformString (string) {
  // Converting a string from kebab-case to Title Case
  return string.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}