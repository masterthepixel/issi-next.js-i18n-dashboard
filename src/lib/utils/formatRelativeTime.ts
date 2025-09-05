export function formatRelativeTime(date: Date | string): string {
  const now = new Date();
  const targetDate = typeof date === 'string' ? new Date(date) : date;
  const diffInDays = Math.floor(
    (now.getTime() - targetDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffInDays === 0) {
    return "Posted Today";
  } else if (diffInDays === 1) {
    return "Posted 1 day ago";
  } else if (diffInDays < 0) {
    return "Posted recently";
  } else {
    return `Posted ${diffInDays} days ago`;
  }
}

export function formatDateForDisplay(date: Date | string): string {
  const targetDate = typeof date === 'string' ? new Date(date) : date;
  return targetDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}