# Overlapping Pill Breadcrumb System

## Overview

The Overlapping Pill Breadcrumb system provides a modern, interactive navigation experience with overlapping pill-shaped containers that expand on hover to reveal additional context.

## Design Features

### Visual Characteristics

- **Overlapping Layout**: Each breadcrumb item overlaps the previous one by 24px (`-ml-6`)
- **Pill Shape**: Rounded-full containers matching the main navigation design language
- **Z-Index Stacking**: Items are layered with decreasing z-index from left to right
- **Consistent Shadows**: Uses the same `box-shadow: 0 2px 4px rgba(0,0,0,0.2)` as navigation

### Interactive Behavior

- **Home Item**: Always shows "Home" text by default
- **Other Items**: Show only icons, expand to show text on hover
- **Hover Expansion**: Pills expand horizontally (`hover:px-8 hover:pr-10`)
- **Smooth Transitions**: 300ms ease-in-out transitions for all state changes

### Responsive Design

- **Consistent Height**: All pills maintain 48px height (`h-12`)
- **Flexible Width**: Pills expand/contract based on content and hover state
- **Overflow Handling**: Container uses `overflow-visible` to prevent clipping

## Theme Compatibility

### Light Mode

- **Background**: `bg-white` for standard items
- **Text**: `text-slate-600` default, `text-blue-600` on hover
- **Current Page**: `bg-blue-50` with `text-blue-600`

### Dark Mode

- **Background**: `dark:bg-black` for standard items
- **Text**: `dark:text-slate-300` default, `dark:text-blue-400` on hover
- **Current Page**: `dark:bg-blue-900/20` with `dark:text-blue-400`

## Accessibility Features

### ARIA Support

- **Navigation Role**: Proper `nav` element with `aria-label`
- **Current Page**: Uses `aria-current="page"` for active items
- **Home Link**: Descriptive `aria-label` for screen readers

### Focus Management

- **Focus Rings**: Blue focus rings with 2px width (`focus:ring-2 focus:ring-blue-500`)
- **Focus Offset**: 2px offset from element (`focus:ring-offset-2`)
- **Keyboard Navigation**: Full keyboard accessibility

## Internationalization

### Localized Text

- **Home Label**: Uses `breadcrumb.home` translation key
- **ARIA Labels**: Localized using `breadcrumb.home.aria` and `breadcrumb.seo.description`
- **Auto-Translation**: Falls back to AutoTranslationSystem for dynamic segments

### RTL Support

- Layout automatically adapts to right-to-left languages
- Icon positioning remains consistent across language directions

## Implementation Details

### Component Structure

```tsx
<nav aria-label="Breadcrumb">
  <div className="flex items-center justify-start overflow-visible">
    {breadcrumbs.map((item, index) => (
      <div className="relative -ml-6" style={{ zIndex: breadcrumbs.length - index }}>
        {/* Pill Content */}
      </div>
    ))}
  </div>
</nav>
```

### Styling Approach

- **Utility Classes**: Tailwind CSS for consistent styling
- **Inline Styles**: Box shadows and z-index for dynamic values
- **CSS Transitions**: Smooth animations for hover states

## Browser Compatibility

- **Modern Browsers**: Full support for CSS transitions and transforms
- **Fallback Behavior**: Graceful degradation without animations
- **Mobile Support**: Touch-friendly with proper sizing

## Performance Considerations

- **Minimal Re-renders**: Memoized breadcrumb generation
- **Efficient Animations**: GPU-accelerated transitions
- **Lightweight**: No external dependencies beyond existing icons

## Usage Examples

### Basic Implementation

```tsx
<UniversalIntelligentBreadcrumb showHome={true} className="mb-4" lang="en" />
```

### With Custom Items

```tsx
<UniversalIntelligentBreadcrumb
  customItems={[
    { name: "Home", href: "/home", current: false },
    { name: "Products", href: "/products", current: false },
    { name: "Details", href: "/products/123", current: true },
  ]}
  showHome={true}
/>
```

## Testing Recommendations

### Visual Testing

1. Test hover states on all screen sizes
2. Verify overlapping behavior in different browsers
3. Check theme transitions (light/dark mode)

### Accessibility Testing

1. Screen reader navigation
2. Keyboard-only navigation
3. Focus indicator visibility

### Internationalization Testing

1. Test with long translated text
2. Verify RTL language support
3. Check character encoding edge cases
