import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const numToMinSec = (num: number): string => {
  const minutes = Math.floor(num / 60);
  const seconds = Math.floor(num % 60)
      .toString()
      .padStart(2, "0");
  return `${minutes}:${seconds}`;
}
