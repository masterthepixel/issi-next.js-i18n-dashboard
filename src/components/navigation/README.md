# Navigation Components

This directory contains the new Navbar-08 implementation with modern shadcn/ui components.

## Components

### `Navbar.tsx`

Main navbar component with:

- Sticky positioning (respects banner visibility)
- Logo with ISSI branding
- Desktop navigation with NavigationMenu
- Language switcher (EN/FR/ES)
- Theme toggle (light/dark mode)
- Mobile menu with Sheet component
- Fully accessible with ARIA labels

### `NavLinks.tsx`

Desktop navigation links component:

- Uses shadcn NavigationMenu for accessible navigation
- Active link highlighting
- Localized labels with FormattedMessage
- Responsive design

### `LanguageSwitcher.tsx`

Language selection dropdown:

- 3 languages: English, French, Spanish
- Flag icons using flag-icons library
- Smart URL routing (preserves current page)
- Check mark for current language

### `MobileNav.tsx`

Mobile navigation drawer:

- Sheet component from shadcn/ui
- Vertical nav links with icons
- Language and theme settings
- Sign In button
- Clean, touch-friendly interface

## Features

### ✅ Preserved from Previous Navbar

- Sticky positioning
- Language switcher (EN/FR/ES with flags)
- Dark/light mode toggle
- All navigation links with icons
- Sign In button
- Banner-aware spacing
- Logo (56x56 ISSI image + serif text)

### ✅ New Improvements

- Modern shadcn/ui NavigationMenu
- Better mobile experience with Sheet
- Cleaner component structure
- Improved accessibility (ARIA labels, keyboard navigation)
- Better TypeScript types
- Separation of concerns (each feature in its own component)

## Usage

```tsx
import { Navbar } from "@/components/navigation";

<Navbar locale="en" bannerVisible={false} />;
```

## Localization

All navigation labels use React Intl with keys:

- `common.navigation.*` - Nav items
- `common.auth.signIn` - Sign In button
- `common.theme-switcher.*` - Theme toggle tooltips

## Styling

- Uses `font-sans` (Geist Sans) for navigation text
- Uses `font-serif` (Instrument Serif) for logo text
- Sticky with backdrop blur
- Respects `bannerVisible` prop for top positioning
- Height: `h-16` (64px)
- Container: `max-w-7xl` with responsive padding

## Accessibility

- ARIA labels on all interactive elements
- Keyboard navigation support (built into NavigationMenu)
- Focus management in Sheet component
- Screen reader friendly with semantic HTML
- Proper button types and roles

## Dependencies

- `@/components/ui/navigation-menu` - Radix UI NavigationMenu
- `@/components/ui/sheet` - Radix UI Dialog (Sheet variant)
- `@/components/ui/button` - shadcn Button
- `@/components/ui/dropdown-menu` - Radix UI DropdownMenu
- `@/components/ui/separator` - Radix UI Separator
- `@/components/ThemeToggle` - Existing theme toggle component
- `flag-icons` - Country flag CSS library
- `lucide-react` - Icon library
- `react-intl` - Internationalization
- `next-themes` - Theme management

## Browser Support

- All modern browsers
- Mobile responsive
- Touch-friendly on mobile devices
- Keyboard accessible
- Screen reader compatible
