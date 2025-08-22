# Mobile Floating Menu Documentation

This document provides detailed information about the Mobile Floating Menu component used in the ISSI Next.js Multilingual Website.

## Overview

The Mobile Floating Menu is a dock-style navigation bar that appears fixed at the bottom of the screen on mobile devices. It provides easy access to the main sections of the website through a modern, intuitive interface with colorful icons and touch-friendly interactions.

![Mobile Floating Menu](https://placeholder-for-actual-screenshot.png)

## Implementation Structure

The mobile menu is implemented through a combination of components:

### 1. MobileFloatingMenu.tsx

This is the main wrapper component that:

- Renders a fixed-position container at the bottom of the viewport
- Handles icon mapping for navigation items
- Is only visible on mobile devices (hidden on md breakpoint and above)

**Location**: `src/components/MobileFloatingMenu.tsx`

### 2. FloatingDock Component

The UI component that creates the actual dock interface:

- Handles animations and interactions
- Manages hover/touch states and label display
- Provides color-coding for different navigation items

**Location**: `src/components/ui/floating-dock.tsx`

## Features

### Responsive Design

- **Mobile-only**: Shown on small screens, hidden on medium screens and above (`md:hidden`)
- **Bottom Positioning**: Fixed to the bottom of the screen with appropriate spacing (`fixed bottom-4`)
- **Centered Layout**: Centered horizontally using transform (`left-1/2 transform -translate-x-1/2`)

### Visual Effects

- **Glass Morphism**: Translucent background with backdrop blur for a modern look
- **Animations**: Smooth entrance animations and hover interactions
- **Tooltips**: Labels that appear on hover/touch
- **Color Coding**: Each section has a unique color for quick visual recognition:
  - Services: Blue
  - Products: Purple
  - Government: Green
  - eLearning: Orange
  - Compliance: Red
  - About: Teal

### Accessibility Considerations

- **Touch Target Size**: Appropriately sized touch targets (min 44px) for touchscreen users
- **Visible Labels**: Section names appear on hover/touch
- **Color Contrast**: Maintains proper contrast ratios in both light and dark modes
- **Touch Manipulation**: Uses `touch-manipulation` for better touch responsiveness

## Usage

### Integration in Layout

The Mobile Floating Menu is integrated at the application layout level in `src/app/[lang]/layout.tsx`, making it available across all pages.

```tsx
// From src/app/[lang]/layout.tsx
<ThemeProvider>
  <AnimatedBackground />
  <Navbar locale={params.lang} user={user} />
  <UniversalBreadcrumb 
    lang={params.lang} 
    messages={messages}
    className="relative z-10"
  />
  <Content>{children}</Content>
  <FooterWrapper locale={params.lang} />
  <MobileFloatingMenu items={navigationItems} />
</ThemeProvider>
```

### Navigation Items Structure

Navigation items are defined in the layout and passed to the component:

```tsx
const navigationItems = [
  {
    title: intl.formatMessage({ id: "common.navigation.services" }),
    icon: "services",
    href: `/${params.lang}/services`,
  },
  // Additional navigation items...
];
```

### Internationalization

The menu supports internationalization:

- Navigation item titles are localized using `intl.formatMessage`
- URLs include the language parameter

## Component API

### MobileFloatingMenu Props

| Prop | Type | Description |
|------|------|-------------|
| `items` | `NavigationItem[]` | Array of navigation items to display |

### NavigationItem Interface

```tsx
interface NavigationItem {
  title: string;    // Display title (internationalized)
  icon: string;     // Icon identifier
  href: string;     // Navigation URL
}
```

## Icon Mapping

The component maps string identifiers to actual icon components from the Heroicons library:

| Icon Identifier | Component | Color |
|----------------|-----------|-------|
| "services" | `WrenchScrewdriverIcon` | Blue |
| "products" | `CubeIcon` | Purple |
| "government" | `BuildingLibraryIcon` | Green |
| "eLearning" | `AcademicCapIcon` | Orange |
| "compliance" | `ShieldCheckIcon` | Red |
| "about" | `InformationCircleIcon` | Teal |

## Technical Implementation Details

### Floating Dock Mobile Implementation

The mobile version of the dock is implemented with these key features:

1. **Horizontal Layout**: Icons arranged in a horizontal row
2. **Dynamic Tooltips**: Labels shown on hover/touch using AnimatePresence
3. **Gradient Background**: Semi-transparent background with backdrop blur
4. **Item Scaling**: Items scale up slightly when active

### Animation

The component uses the Motion library for animations:

- Initial load animations (fade in, scale up)
- Hover/touch animations for labels (fade in/out)
- Smooth scaling effects for active items

```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  className="flex items-center gap-2 px-3 py-2 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-lg rounded-full border border-gray-200 dark:border-neutral-700 shadow-lg"
>
  {/* Navigation items */}
</motion.div>
```

## Customization

### Adding New Navigation Items

To add a new navigation item:

1. Add the item to the `navigationItems` array in `src/app/[lang]/layout.tsx`
2. Add a corresponding icon mapping in the `getIcon` function in `MobileFloatingMenu.tsx`
3. Add any necessary translations to the language files

### Styling Modifications

The component uses Tailwind CSS for styling. Common modifications:

- **Position**: Adjust the `bottom-4` value to change the distance from the bottom
- **Background**: Modify the background opacity and blur values
- **Colors**: Update the color scheme in the `getItemBgColor` function
- **Size**: Adjust the icon and container sizes with Tailwind sizing classes

## Best Practices

1. **Keep the number of items reasonable** - The mobile dock works best with 4-6 items
2. **Use clear, recognizable icons** - Icons should clearly represent their sections
3. **Maintain consistent coloring** - The color coding helps users recognize sections
4. **Test on real mobile devices** - Ensure touch targets and interactions work well on actual devices

## Related Components

- **TopNav**: Desktop navigation component
- **NavbarContent**: Main navigation logic
- **FloatingNav**: Desktop navigation variant

## Browser Compatibility

Tested and compatible with:

- Chrome for Android (latest)
- Safari iOS (latest)
- Samsung Internet (latest)
- Chrome/Edge/Firefox desktop browsers (latest)

## Future Enhancements

Potential improvements for future versions:

1. **Active state indication** - Highlight the current section
2. **Customizable positioning** - Allow configuration of position
3. **Badge support** - Add notification badges for applicable items
4. **Animation preferences** - Respect reduced motion settings
5. **Swipe gestures** - Add support for swipe navigation between sections
