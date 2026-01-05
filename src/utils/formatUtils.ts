export const formatWatchCount = (count: number): string => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(0)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(0)}k`;
  }
  return count.toString();
};

    