# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Package Management
- Uses pnpm as the package manager (`packageManager": "pnpm@10.12.4"`)
- Install dependencies: `pnpm install`
- Approve scripts when prompted: `pnpm approve unrs-resolver`

### Development Server
- Start development server: `pnpm dev`
- Server runs on http://localhost:3000

### Build & Deployment
- Build application: `pnpm build` (includes JSON validation pre-build step)
- Start production server: `pnpm start`

### Code Quality & Testing
- Run linter: `pnpm lint`
- Run tests: `pnpm test` (Vitest)
- Run tests once: `pnpm test:run`
- Validate JSON files: `pnpm validate:json`
- Run all validations: `pnpm validate:all`
- Pre-commit checks: `pnpm pre-commit`

### Product URL Testing
- Test English product URLs: `pnpm test:products`
- Test all locales: `pnpm test:products:all`
- Test actual BentoGrid URLs: `node test-actual-product-urls.js`

## Architecture Overview

### Internationalization (i18n) System
- **Multi-locale support**: English (en), French (fr), Spanish (es)
- **Route structure**: `/[lang]/[page]` - all routes are prefixed with locale
- **Middleware**: Automatic locale detection and redirection in `src/middleware.ts`
- **Translation files**: Located in `src/lang/` directory as JSON files
- **Integration**: Uses `@formatjs/intl` and `react-intl` for message formatting
- **Server-side**: `src/lib/intl.ts` provides `getIntl()` function for server components
- **Automatic fallback**: Intelligent translation fallbacks with auto-translation system

### Universal Breadcrumb System
- **Zero-configuration**: Automatically works for any new page without setup
- **3D Globe integration**: Every breadcrumb includes Three.js-powered globe background
- **SEO optimization**: Automatic JSON-LD structured data generation
- **Components**: `BreadcrumbWithGlobe.tsx` and wrapper components
- **Smart i18n**: Automatic multi-language support

### Component Architecture
- **Wrapper Pattern**: Most components have corresponding wrapper components (e.g., `Component.tsx` + `ComponentWrapper.tsx`)
- **Client/Server Split**: Server components handle i18n, client components handle interactivity
- **Type Safety**: Comprehensive TypeScript with types in `src/types/`

### Product System
- **Dynamic routing**: `/products/[slug]/page.tsx` for individual products
- **BentoGrid showcase**: Main products page uses custom BentoGrid layout
- **ProductDetailsPage**: Reusable component for detailed product views
- **URL testing**: Automated scripts ensure all product URLs are accessible

### UI Components
- **Custom UI library**: Located in `src/components/ui/`
- **Three.js integration**: Globe components using `@react-three/fiber` and `cobe`
- **Headless UI**: Accessible components using `@headlessui/react`
- **Tailwind CSS**: Custom design system with dark mode support

### Page Structure
- **App Router**: Uses Next.js 14+ App Router
- **Nested layouts**: `src/app/[lang]/layout.tsx` provides locale-aware layout
- **Page types**: Each page follows the pattern: `src/app/[lang]/[page]/page.tsx`

## Key Files & Directories

### Configuration
- `i18n-config.ts`: Locale configuration
- `next.config.mjs`: Next.js configuration with image domains
- `tailwind.config.ts`: Tailwind with dark mode and custom animations
- `vitest.config.ts`: Testing configuration

### Core Components
- `src/components/BreadcrumbWithGlobe.tsx`: Universal breadcrumb system
- `src/components/products/ProductDetailsPage.tsx`: Product detail views
- `src/lib/intl.ts`: Server-side internationalization helper
- `src/middleware.ts`: Locale detection and routing

### Language Files
- `src/lang/en.json`: English translations
- `src/lang/fr.json`: French translations  
- `src/lang/es.json`: Spanish translations

## Development Guidelines

### Accessibility Standards
- Follows strict accessibility rules from `.github/copilot-instructions.md`
- ARIA labels required for all interactive elements
- Screen reader compatibility mandatory
- Proper semantic HTML structure

### Component Development
- Always create wrapper components for i18n integration
- Use TypeScript with strict typing
- Follow the existing component patterns
- Include proper ARIA attributes and accessibility features

### Internationalization
- Add new translations to all three language files
- Use `FormattedMessage` for client components
- Use `getIntl()` for server components
- Test all locale routes when adding new pages

### Testing
- Use Vitest for unit testing
- Test components in `src/components/__tests__/`
- Run product URL tests after adding new products
- Validate JSON files before committing

### Performance
- Three.js components are optimized for SSR
- Images configured for `images.unsplash.com` and `tailwindcss.com`
- Proper code splitting with dynamic imports for translations

## Important Notes

- Never use `<img>` elements - Next.js Image component required
- Always include proper TypeScript types
- Follow the wrapper component pattern for new features  
- Test all locale routes when making routing changes
- Validate JSON files before deployment
- Use pnpm for all package management operations