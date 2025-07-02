# ScrollToTopButton Component

A floating scroll-to-top button with animated pulse effect that appears when users scroll down the page.

## Overview

The ScrollToTopButton provides an elegant way for users to quickly return to the top of long pages. It features a pulsing animation effect and full dark/light mode compatibility.

## Features

- ✅ **Auto-show/hide**: Appears after scrolling 300px down
- ✅ **Smooth scrolling**: Uses `behavior: 'smooth'` with fallbacks
- ✅ **Dark/light mode**: Proper contrast ratios for both themes
- ✅ **Pulse animation**: Dual-ring pulse effect behind button
- ✅ **Accessibility**: Proper ARIA labels and keyboard support
- ✅ **Cross-browser**: Multiple scroll methods for compatibility
- ✅ **Responsive**: Works on all screen sizes

## Usage

The component is automatically included in the main layout and doesn't require manual implementation on individual pages.

```tsx
import ScrollToTopButton from '@/components/ScrollToTopButton';

// Already integrated in layout - no manual setup needed
```

## Styling

### Light Mode
- Button: `bg-blue-600 hover:bg-blue-700`
- Text: `text-white`
- Pulse rings: `bg-blue-600`

### Dark Mode  
- Button: `dark:bg-blue-500 dark:hover:bg-blue-600`
- Text: `text-white`
- Pulse rings: `dark:bg-blue-500`

## Animation Details

### Pulse Effect
- **First ring**: 3-second pulse with `ease-in-out` timing
- **Second ring**: 4-second ping animation with `ease-in-out` timing
- **Button**: Hover scale effect with smooth transitions

### Timing Configuration
```css
animate-[pulse_3s_ease-in-out_infinite]  /* Background pulse */
animate-[ping_4s_ease-in-out_infinite]   /* Expanding ring */
```

## Technical Implementation

### Scroll Detection
```tsx
const toggleVisibility = () => {
  if (window.scrollY > 300) {
    setIsVisible(true);
  } else {
    setIsVisible(false);
  }
};
```

### Scroll Methods
The component uses multiple scroll methods for maximum compatibility:

1. **Primary**: `window.scrollTo()` with smooth behavior
2. **Fallback 1**: `document.documentElement.scrollTo()`
3. **Fallback 2**: `document.body.scrollTo()`
4. **Final fallback**: Direct property assignment after 100ms timeout

### Event Cleanup
Properly removes scroll event listeners on component unmount to prevent memory leaks.

## Positioning

- **Desktop**: Fixed position `bottom-24 right-8`
- **Z-index**: High z-index for visibility above other elements
- **Responsive**: Maintains position across all screen sizes

## Dependencies

- `@/components/ui/button` - shadcn/ui Button component
- `lucide-react` - ArrowUp icon
- `react` - useState, useEffect hooks

## Accessibility

- **ARIA label**: "Scroll to top" for screen readers
- **Keyboard support**: Inherits button keyboard navigation
- **Focus management**: Proper focus states with hover effects
- **Motion preference**: Respects user's motion settings

## Browser Support

- ✅ Modern browsers with smooth scroll support
- ✅ Fallback support for older browsers
- ✅ Mobile touch devices
- ✅ Keyboard navigation

## Performance

- **Optimized**: Only renders when visible (conditional rendering)
- **Efficient**: Single scroll event listener with proper cleanup
- **Lightweight**: Minimal DOM impact with CSS animations

## Customization

To modify the appearance or behavior:

1. **Scroll threshold**: Change `300` in `toggleVisibility` function
2. **Animation speed**: Modify animation duration in className
3. **Colors**: Update Tailwind classes for different color schemes
4. **Position**: Adjust `bottom-24 right-8` classes
5. **Icon**: Replace `ArrowUp` with different Lucide icon

## Integration

The component is automatically included in the main layout:

```tsx
// app/layout.tsx
export default function Layout({ children }) {
  return (
    <ThemeProvider>
      {children}
      <ScrollToTopButton />
    </ThemeProvider>
  );
}
```

## Testing

To test the component:

1. Scroll down more than 300px on any page
2. Verify button appears with pulse animation
3. Click button to confirm smooth scroll to top
4. Test in both light and dark modes
5. Verify accessibility with keyboard navigation