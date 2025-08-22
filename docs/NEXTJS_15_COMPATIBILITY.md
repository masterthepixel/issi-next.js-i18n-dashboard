# Next.js 15 Compatibility Guide

> **Next.js Version**: 15.5.0  
> **Migration Date**: August 2025  
> **Status**: Complete

## Overview

This guide documents the breaking changes and compatibility requirements discovered during our Next.js 15 upgrade, with specific focus on issues that caused runtime errors and build failures.

## Breaking Changes and Solutions

### 1. Async Params Requirement

**Breaking Change**: In Next.js 15, `params` in page and layout components must be awaited before accessing properties.

#### Page Components

```typescript
// ❌ Breaks in Next.js 15
export default function Page({ params: { slug } }: Props) {
  return <div>Page for {slug}</div>;
}

// ✅ Correct in Next.js 15
export default async function Page({ params }: Props) {
  const { slug } = await params;
  return <div>Page for {slug}</div>;
}
```

#### Layout Components

```typescript
// ❌ Breaks in Next.js 15
export default function Layout({ params, children }: Props) {
  const { lang } = params; // Error!
  return <html lang={lang}>{children}</html>;
}

// ✅ Correct in Next.js 15
export default async function Layout({ params, children }: Props) {
  const { lang } = await params;
  return <html lang={lang}>{children}</html>;
}
```

#### Complex Layout Example

```typescript
// Real example from our codebase
export default async function Root({ params, children }: Props) {
  const { lang } = await params; // Await first!
  
  const user = await getUser();
  const intl = await getIntl(lang);
  const messages = (await import(`../../lang/${lang}.json`)).default;

  const navigationItems = [
    {
      title: intl.formatMessage({ id: "common.navigation.services" }),
      href: `/${lang}/services`, // Now safe to use lang
    },
    // ... more items
  ];

  return (
    <html lang={lang}>
      <body>
        <Navbar locale={lang} user={user} />
        {/* ... */}
      </body>
    </html>
  );
}
```

### 2. SearchParams Changes

**Note**: SearchParams follow the same pattern as params.

```typescript
// ❌ Old pattern
export default function Page({ searchParams }: Props) {
  const { query } = searchParams;
  return <div>Search: {query}</div>;
}

// ✅ New pattern
export default async function Page({ searchParams }: Props) {
  const { query } = await searchParams;
  return <div>Search: {query}</div>;
}
```

### 3. generateStaticParams Impact

```typescript
// ✅ generateStaticParams works with async params
export async function generateStaticParams() {
  return [
    { lang: 'en' },
    { lang: 'es' },
    { lang: 'fr' }
  ];
}

export default async function Page({ params }: Props) {
  const { lang } = await params; // Works correctly with static generation
  return <div>Language: {lang}</div>;
}
```

## Error Messages and Diagnostics

### Common Error Messages

1. **Params Access Error**:
   ```
   Error: Route "/[lang]/home" used `params.lang`. `params` should be awaited before using its properties.
   ```

2. **Build Time Error**:
   ```
   Type error: Property 'lang' does not exist on type 'Promise<{ lang: string }>'
   ```

3. **Runtime Error**:
   ```
   Cannot read properties of undefined (reading 'lang')
   ```

### TypeScript Configuration

Update your type definitions:

```typescript
// Before: Direct access
interface PageProps {
  params: { slug: string };
}

// After: Promise-wrapped params
interface PageProps {
  params: Promise<{ slug: string }>;
}
```

## Build System Compatibility

### ESLint Configuration

Next.js 15 changed some ESLint behaviors. Clean up configuration:

```javascript
// .eslintrc.json - Keep this simple
{
  "extends": ["next/core-web-vitals"],
  "rules": {
    "@next/next/no-img-element": "warn"
  }
}

// Remove these files to avoid conflicts:
// - .eslintrc.js
// - eslint.config.js
```

### Production Build Optimization

```javascript
// next.config.mjs
export default {
  eslint: {
    // Skip ESLint in production for faster builds
    ignoreDuringBuilds: process.env.NODE_ENV === 'production',
  },
  
  typescript: {
    // Allow CI systems to skip type checking if needed
    ignoreBuildErrors: process.env.SKIP_TYPE_CHECK === 'true',
  },

  // Next.js 15 optimizations
  experimental: {
    optimizePackageImports: [
      '@react-three/fiber',
      '@react-three/drei', 
      'lucide-react',
      '@heroicons/react'
    ],
  }
};
```

## Testing Compatibility

### Vitest Configuration

Next.js 15 works well with Vitest, but update your setup:

```typescript
// vitest.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true, // Important for Next.js 15
    setupFiles: './src/setupTests.ts',
  },
});
```

### Test File Updates

```typescript
// setupTests.ts - Updated for Next.js 15
import "@testing-library/jest-dom/vitest";

// vi is available globally
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
```

## Performance Improvements

### Static Site Generation

Next.js 15 improves SSG performance:

```typescript
// This pattern now generates pages more efficiently
export async function generateStaticParams() {
  return [
    { lang: 'en', slug: 'about' },
    { lang: 'en', slug: 'services' },
    // Large lists handled better in Next.js 15
  ];
}
```

### Bundle Optimization

Next.js 15 includes better tree shaking:

```typescript
// This now bundles more efficiently
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
// Only used exports are bundled
```

## Migration Checklist

### Pre-Migration
- [ ] Update Next.js to 15.x: `pnpm add next@latest`
- [ ] Update React: `pnpm add react@latest react-dom@latest`
- [ ] Update TypeScript: `pnpm add -D typescript@latest`
- [ ] Review breaking changes documentation

### Code Changes
- [ ] Convert all page components to async functions
- [ ] Convert all layout components to async functions  
- [ ] Await `params` before accessing properties
- [ ] Await `searchParams` before accessing properties
- [ ] Update TypeScript interfaces for Promise-wrapped params

### Build System
- [ ] Clean up ESLint configuration files
- [ ] Update production build settings
- [ ] Test build performance
- [ ] Verify CI/CD compatibility

### Testing
- [ ] Update test configuration
- [ ] Fix any test failures
- [ ] Verify test coverage maintained
- [ ] Test both development and production builds

### Verification
- [ ] All pages render correctly
- [ ] Dynamic routes work properly
- [ ] Static generation works
- [ ] No console errors in development
- [ ] Production build completes successfully

## Common Gotchas

### 1. Destructuring in Function Parameters

```typescript
// ❌ This doesn't work anymore
export default function Page({ params: { lang } }) {
  // params is a Promise, can't destructure directly
}

// ✅ Must await first
export default async function Page({ params }) {
  const { lang } = await params;
}
```

### 2. Using Params in Multiple Places

```typescript
// ✅ Await once, use everywhere
export default async function Layout({ params, children }) {
  const { lang } = await params; // Await once
  
  const user = await getUser();
  const intl = await getIntl(lang); // Use awaited value
  
  return (
    <html lang={lang}>
      <body>
        <Navbar locale={lang} />
        {children}
      </body>
    </html>
  );
}
```

### 3. TypeScript Interface Updates

```typescript
// Update all page/layout prop interfaces
interface Props {
  params: Promise<{ lang: string; slug?: string }>;
  children: React.ReactNode;
}
```

## Troubleshooting

### Development Server Issues

If you see `params` errors in development:

1. Check all page and layout components for direct `params` access
2. Ensure all components accessing `params` are `async`
3. Restart development server after changes

### Build Failures

If builds fail with `params` errors:

1. Run TypeScript check: `npx tsc --noEmit`
2. Look for all `params.` usage in error output
3. Convert those files to async pattern

### Runtime Errors

If pages crash at runtime:

1. Check browser console for specific error
2. Verify all `params` usage is awaited
3. Check that async functions are properly exported

## Performance Impact

### Positive Changes
- ✅ Faster static site generation
- ✅ Better bundle optimization  
- ✅ Improved tree shaking
- ✅ More efficient hot reload

### Things to Monitor
- Build time (generally improved)
- Runtime performance (async overhead is minimal)
- Bundle size (generally reduced)

## Future Considerations

### Next.js 15+ Features to Explore
- Improved Turbopack support
- Better React Server Components integration
- Enhanced static generation capabilities

### Compatibility Planning
- Plan for regular Next.js updates
- Keep async/await patterns consistent
- Monitor Next.js release notes for future breaking changes

---

*This guide reflects our real-world experience migrating a large Next.js application to version 15. Update it as new compatibility issues are discovered.*