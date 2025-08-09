// src/lib/utils.ts

/**
 * Merge class names conditionally.
 * Filters out falsy values and joins with a space.
 */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Format a date to a human-readable string
 * @param date Date object or string
 * @returns Formatted date string (e.g., "Aug 8, 2025")
 */
export function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

/**
 * Format a date with time
 * @param date Date object or string
 * @returns Formatted datetime string (e.g., "Aug 8, 2025, 10:30 AM")
 */
export function formatDateTime(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });
}

/**
 * Truncate text to a specified length
 * @param text Input text
 * @param maxLength Maximum length before truncation
 * @returns Truncated text with ellipsis if needed
 */
export function truncateText(text: string, maxLength: number = 100): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

/**
 * Generate initials from a name
 * @param name Full name
 * @returns Initials (e.g., "JS" for "John Smith")
 */
export function getInitials(name: string): string {
  if (!name) return '';
  const names = name.split(' ');
  let initials = names[0].substring(0, 1).toUpperCase();
  
  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  
  return initials;
}

/**
 * Validate an email address
 * @param email Email address to validate
 * @returns True if valid, false otherwise
 */
export function isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Generate a random number between min and max
 * @param min Minimum value
 * @param max Maximum value
 * @returns Random number
 */
export function randomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Convert a string to title case
 * @param str Input string
 * @returns Title-cased string
 */
export function toTitleCase(str: string): string {
  return str.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
}

/**
 * Generate a random hexadecimal color
 * @returns Hex color string (e.g., "#3d4a8b")
 */
export function randomHexColor(): string {
  return `#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0')}`;
}

/**
 * Debounce a function
 * @param func Function to debounce
 * @param wait Debounce time in milliseconds
 * @returns Debounced function
 */
export function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>): void => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * Get domain from email address
 * @param email Email address
 * @returns Domain portion of email
 */
export function getEmailDomain(email: string): string {
  return email.split('@')[1] || '';
}

/**
 * Generate a unique ID
 * @returns Unique ID string
 */
export function generateUniqueId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

/**
 * Format a number as currency
 * @param amount Amount to format
 * @param currency Currency code (default: USD)
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

/**
 * Convert CSV string to array of objects
 * @param csv CSV string
 * @param delimiter Delimiter character (default: ',')
 * @returns Array of objects
 */
export function csvToArray(csv: string, delimiter: string = ','): Record<string, string>[] {
  const lines = csv.split('\n');
  const result: Record<string, string>[] = [];
  const headers = lines[0].split(delimiter).map(h => h.trim());
  
  for (let i = 1; i < lines.length; i++) {
    const obj: Record<string, string> = {};
    const currentline = lines[i].split(delimiter);
    
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j] ? currentline[j].trim() : '';
    }
    
    result.push(obj);
  }
  
  return result;
}

/**
 * Capitalize the first letter of a string
 * @param str Input string
 * @returns Capitalized string
 */
export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Check if a value is empty (null, undefined, empty string, empty array, empty object)
 * @param value Value to check
 * @returns True if empty, false otherwise
 */
export function isEmpty(value: any): boolean {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string' && value.trim() === '') return true;
  if (Array.isArray(value) && value.length === 0) return true;
  if (typeof value === 'object' && Object.keys(value).length === 0) return true;
  return false;
}

/**
 * Generate a gradient style object
 * @param color1 First color
 * @param color2 Second color
 * @param angle Gradient angle (default: 90deg)
 * @returns CSS gradient string
 */
export function generateGradient(color1: string, color2: string, angle: string = '90deg'): string {
  return `linear-gradient(${angle}, ${color1}, ${color2})`;
}

/**
 * Convert object to query string
 * @param params Object to convert
 * @returns Query string
 */
export function objectToQueryString(params: Record<string, any>): string {
  return Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');
}

/**
 * Parse query string to object
 * @param queryString Query string
 * @returns Parsed object
 */
export function parseQueryString(queryString: string): Record<string, string> {
  const params = new URLSearchParams(queryString);
  const result: Record<string, string> = {};
  
  for (const [key, value] of params.entries()) {
    result[key] = value;
  }
  
  return result;
}
