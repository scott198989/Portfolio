import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Detects if the current device is mobile based on user agent and screen size.
 * Only call this on the client side (after mount).
 */
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;

  const userAgent = navigator.userAgent || '';
  const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
  const isSmallScreen = window.innerWidth < 768;

  return isMobileUA || isSmallScreen;
}

/**
 * Detects iOS specifically (has stricter CSS limitations)
 */
export function isIOSDevice(): boolean {
  if (typeof window === 'undefined') return false;

  const userAgent = navigator.userAgent || '';
  return /iPhone|iPad|iPod/i.test(userAgent);
}
