import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const convertGMTStringToDate = (gmtString: string): string => {
  try {
    const date = new Date(gmtString);
    if (isNaN(date.getTime())) {
      throw new Error('Invalid date string');
    }

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  } catch (error) {
    console.error('Error al convertir la fecha:', error);
    return '';
  }
}

export const onDevEnv = () => {
  return process.env.NODE_ENV === 'development' || process.env.VERCEL_ENV === 'preview'
}