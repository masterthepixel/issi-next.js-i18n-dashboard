/**
 * Breadcrumb Utilities
 * Provides homepage detection and path analysis for automatic breadcrumb generation
 */

/**
 * Determines if the current pathname represents the homepage
 * @param pathname - Current URL pathname
 * @param lang - Current language code
 * @returns boolean indicating if this is a homepage route
 */
export const isHomepage = (pathname: string, lang: string): boolean => {
  const segments = pathname.split('/').filter(Boolean);
  
  // Case 1: Root path "/"
  if (segments.length === 0) return true;
  
  // Case 2: Only language code "/en", "/fr", "/es"
  if (segments.length === 1 && segments[0] === lang) return true;
  
  // Case 3: Explicit homepage routes
  const homepageRoutes = ['', 'home', 'index'];
  if (segments.length === 2 && segments[0] === lang && homepageRoutes.includes(segments[1])) {
    return true;
  }
  
  return false;
};

/**
 * Determines if breadcrumb should be shown on current path
 * @param pathname - Current URL pathname
 * @param lang - Current language code
 * @returns boolean indicating if breadcrumb should be displayed
 */
export const shouldShowBreadcrumb = (pathname: string, lang: string): boolean => {
  // Remove language prefix and normalize
  const cleanPath = pathname.replace(`/${lang}`, '') || '/';
  
  // Homepage patterns to exclude
  const homepagePatterns = [
    '/',           // Root homepage
    '',            // Empty path
    `/${lang}`,    // Language-specific homepage
  ];
  
  // Check if current path matches any homepage pattern
  return !homepagePatterns.includes(cleanPath) && !homepagePatterns.includes(pathname);
};

/**
 * Converts URL slug to readable title
 * @param slug - URL segment slug
 * @returns Formatted title string
 */
export const slugToTitle = (slug: string): string => {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Extracts clean path segments from pathname
 * @param pathname - Current URL pathname
 * @param lang - Current language code
 * @returns Array of path segments
 */
export const getPathSegments = (pathname: string, lang: string): string[] => {
  return pathname.replace(`/${lang}`, '').split('/').filter(Boolean);
};
