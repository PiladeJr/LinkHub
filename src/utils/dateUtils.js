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

  const diffInMs = now - past;
  const diffInSeconds = Math.floor(diffInMs / 1000);
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInWeeks = Math.floor(diffInDays / 7);
  const diffInMonths = Math.floor(diffInDays / 30);
  const diffInYears = Math.floor(diffInDays / 365);

  if (diffInSeconds < 60) {
    return 'just now';
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
  } else if (diffInDays < 7) {
    return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
  } else if (diffInWeeks < 4) {
    return `${diffInWeeks} ${diffInWeeks === 1 ? 'week' : 'weeks'} ago`;
  } else if (diffInMonths < 12) {
    return `${diffInMonths} ${diffInMonths === 1 ? 'month' : 'months'} ago`;
  } else {
    return `${diffInYears} ${diffInYears === 1 ? 'year' : 'years'} ago`;
  }
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
