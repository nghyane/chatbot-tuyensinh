import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Constructs the full endpoint URL from a base URL
 * @param endpoint - The base endpoint URL
 * @returns The constructed endpoint URL
 */
export function constructEndpointUrl(endpoint: string): string {
  // Remove trailing slash if present
  return endpoint.replace(/\/$/, '')
}

/**
 * Converts an object to JSON markdown format
 * @param content - The content to convert to JSON markdown
 * @returns Formatted JSON markdown string
 */
export function getJsonMarkdown(content: unknown): string {
  try {
    const jsonString = typeof content === 'string' 
      ? content 
      : JSON.stringify(content, null, 2)
    
    return `\`\`\`json\n${jsonString}\n\`\`\``
  } catch (error) {
    console.error('Error converting to JSON markdown:', error)
    return `\`\`\`\n${String(content)}\n\`\`\``
  }
}

/**
 * Formats a timestamp to a readable date string
 * @param timestamp - Unix timestamp
 * @returns Formatted date string
 */
export function formatTimestamp(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleString('vi-VN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

/**
 * Truncates text to a specified length
 * @param text - The text to truncate
 * @param maxLength - Maximum length of the text
 * @returns Truncated text with ellipsis if needed
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

/**
 * Validates if a URL is valid
 * @param url - The URL to validate
 * @returns True if URL is valid, false otherwise
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Debounce function to limit the rate of function calls
 * @param func - The function to debounce
 * @param wait - The number of milliseconds to delay
 * @returns Debounced function
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}
