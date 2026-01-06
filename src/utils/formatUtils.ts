/**
 * Formats a number into a human-readable watch count string
 * @param count - The number to format
 * @returns Formatted string (e.g., "1.5M" for 1500000, "2k" for 2000, "500" for 500)
 */
export const formatWatchCount = (count: number): string => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(0)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(0)}k`;
  }
  return count.toString();
};

    