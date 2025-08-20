/**
 * Formats a number as Serbian price with thousands separators and "DIN" suffix.
 * @param price Number to format
 * @returns Formatted price string, e.g. "1.234 DIN"
 */
export function formatPrice(price: number): string {
  return price.toLocaleString('sr-RS') + ' DIN';
}