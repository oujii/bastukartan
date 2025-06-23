/**
 * Utility functions for the Stockholm Sauna Directory
 */

/**
 * Generate a URL-friendly slug from a sauna name
 * @param name - The sauna name
 * @returns A URL-safe slug
 */
export function generateSaunaSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[åä]/g, 'a')
    .replace(/[ö]/g, 'o')
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters except spaces and hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Generate a sauna ID from a slug by reversing the slug process
 * This is a simple implementation - in production you'd want a proper mapping
 * @param slug - The URL slug
 * @returns A search-friendly name
 */
export function slugToSearchName(slug: string): string {
  return slug
    .replace(/-/g, ' ')
    .toLowerCase();
}

/**
 * Format opening hours for display
 * @param openingHours - The opening hours object
 * @returns Formatted opening hours
 */
export function formatOpeningHours(openingHours: Record<string, string>): string {
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  return days.map((day, index) => {
    const hours = openingHours[day] || 'Closed';
    return `${dayNames[index]}: ${hours}`;
  }).join('\n');
}

/**
 * Get the current day of the week
 * @returns The current day name in lowercase
 */
export function getCurrentDay(): string {
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  return days[new Date().getDay()];
}

/**
 * Check if a sauna is currently open
 * @param openingHours - The opening hours object
 * @returns Whether the sauna is currently open
 */
export function isSaunaOpen(openingHours: Record<string, string>): boolean {
  const currentDay = getCurrentDay();
  const todayHours = openingHours[currentDay];
  
  if (!todayHours || todayHours.toLowerCase() === 'closed') {
    return false;
  }
  
  // Simple time check - in production you'd want more robust time parsing
  const now = new Date();
  const currentTime = now.getHours() * 100 + now.getMinutes();
  
  // Parse hours like "09:00-21:00"
  const timeMatch = todayHours.match(/(\d{2}):(\d{2})-(\d{2}):(\d{2})/);
  if (timeMatch) {
    const openTime = parseInt(timeMatch[1]) * 100 + parseInt(timeMatch[2]);
    const closeTime = parseInt(timeMatch[3]) * 100 + parseInt(timeMatch[4]);
    
    return currentTime >= openTime && currentTime <= closeTime;
  }
  
  return false;
}
