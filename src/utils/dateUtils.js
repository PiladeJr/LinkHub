/**
 * Helper function to format time unit with proper pluralization
 * @param {number} value - The time value
 * @param {string} unit - The time unit (e.g., 'minute', 'hour', 'day')
 * @returns {string} Formatted string with proper pluralization
 */
const formatTimeUnit = (value, unit) => {
  return `${value} ${value === 1 ? unit : unit + 's'} ago`;
};

/**
 * Formats a date into a relative time string (e.g., "2 hours ago", "3 days ago")
 * @param {string|Date} date - The date to format (ISO string or Date object)
 * @returns {string} Formatted relative time string
 */
export const formatRelativeTime = (date) => {
  if (!date) return 'Never';

  const now = new Date();
  const past = new Date(date);
  
  // Check if date is valid
  if (isNaN(past.getTime())) {
    return 'Unknown';
  }

  const diffInSeconds = Math.floor((now - past) / 1000);

  // Time unit configurations: [seconds in unit, divisor, unit name, threshold]
  const timeUnits = [
    { seconds: 60, name: 'minute', divisor: 60 },
    { seconds: 3600, name: 'hour', divisor: 3600 },
    { seconds: 86400, name: 'day', divisor: 86400 },
    { seconds: 604800, name: 'week', divisor: 604800 },
    { seconds: 2592000, name: 'month', divisor: 2592000 },
    { seconds: 31536000, name: 'year', divisor: 31536000 }
  ];

  if (diffInSeconds < 60) return 'just now';

  // Find the appropriate time unit
  for (let i = timeUnits.length - 1; i >= 0; i--) {
    if (diffInSeconds >= timeUnits[i].seconds) {
      const value = Math.floor(diffInSeconds / timeUnits[i].divisor);
      return formatTimeUnit(value, timeUnits[i].name);
    }
  }

  return 'just now';
};

/**
 * Gets the most recent date from an array of links
 * @param {Array} links - Array of link objects with addedAt property
 * @returns {string|null} Most recent date or null if no links
 */
export const getMostRecentLinkDate = (links) => {
  if (!links || links.length === 0) return null;
  
  const dates = links
    .map(link => new Date(link.addedAt))
    .filter(date => !isNaN(date.getTime()));
  
  if (dates.length === 0) return null;
  
  const mostRecent = new Date(Math.max(...dates));
  return mostRecent.toISOString();
};
