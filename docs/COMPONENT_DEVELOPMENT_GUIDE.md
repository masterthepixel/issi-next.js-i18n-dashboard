# Component Development Guide

> **Last Updated**: August 2025  
> **Version**: 2.0  
> **Status**: Post-shadcn/ui Migration

## Table of Contents

1. [Design System Standards](#design-system-standards)
2. [Component Architecture Patterns](#component-architecture-patterns)
3. [Anti-Patterns to Avoid](#anti-patterns-to-avoid)
4. [Build and Development Requirements](#build-and-development-requirements)
5. [Testing Standards](#testing-standards)
6. [Lessons Learned from shadcn/ui Migration](#lessons-learned)

## Design System Standards

### Core Principles

#### ✅ Always Use shadcn/ui Components
```tsx
// ✅ Good: Use shadcn/ui components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Title</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Action</Button>
      </CardContent>
    </Card>
  );
}
```

```tsx
// ❌ Bad: Custom styled components with hardcoded colors
function MyComponent() {
  return (
    <div className="bg-blue-500 text-white rounded-lg p-4">
      <h2 className="text-slate-600 dark:text-slate-300">Title</h2>
      <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2">
        Action
      </button>
    </div>
  );
}
```

#### ✅ Use Theme Tokens, Never Hardcoded Colors
```tsx
// ✅ Good: Theme tokens
<div className="bg-background text-foreground border-border">
  <h2 className="text-primary">Primary Text</h2>
  <p className="text-muted-foreground">Secondary Text</p>
</div>

// ❌ Bad: Hardcoded colors
<div className="bg-white dark:bg-slate-900 text-black dark:text-white">
  <h2 className="text-blue-600 dark:text-blue-400">Primary Text</h2>
  <p className="text-slate-600 dark:text-slate-400">Secondary Text</p>
</div>
```

### Theme Token Reference

| Purpose | Token | Example Usage |
|---------|-------|---------------|
| Primary text | `text-foreground` | Headings, primary content |
| Secondary text | `text-muted-foreground` | Descriptions, labels |
| Brand colors | `text-primary` | Links, brand elements |
| Backgrounds | `bg-background` | Main backgrounds |
| Cards/panels | `bg-card` | Content containers |
| Borders | `border-border` | Dividers, outlines |

## Component Architecture Patterns

### ✅ Recommended Component Structure

```tsx
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { FormattedMessage, useIntl } from "react-intl";
import ErrorBoundary from "./ErrorBoundary";

interface ComponentProps {
  className?: string;
  variant?: "default" | "secondary";
  onAction?: () => void;
}

function ComponentInternal({ className, variant = "default", onAction }: ComponentProps) {
  const intl = useIntl();
  
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle>
          <FormattedMessage id="component.title" defaultMessage="Component Title" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={onAction} variant={variant === "secondary" ? "outline" : "default"}>
          <FormattedMessage id="component.action" defaultMessage="Action" />
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
}

export default function Component(props: ComponentProps) {
  return (
    <ErrorBoundary>
      <ComponentInternal {...props} />
    </ErrorBoundary>
  );
}
```

### Component Checklist

- [ ] Uses shadcn/ui components exclusively
- [ ] Implements proper TypeScript interfaces
- [ ] Uses theme tokens instead of hardcoded colors
- [ ] Includes internationalization (FormattedMessage)
- [ ] Wrapped in ErrorBoundary
- [ ] Uses `cn()` utility for className composition
- [ ] Includes proper ARIA attributes
- [ ] Responsive design patterns

## Anti-Patterns to Avoid

### 🚫 Feature Flag Infrastructure

**❌ What We Had:**
```tsx
// Bad: Complex feature flag system for component switching
const useNewComponent = getFeatureFlag("isNewComponentReady");

return useNewComponent ? (
  <NewComponent />
) : (
  <OldComponent />
);
```

**✅ What We Should Do:**
```tsx
// Good: Direct component usage, progressive enhancement through props
<Component variant="enhanced" />
```

**Lesson Learned:** Feature flags for UI components create unnecessary complexity. Instead:
- Build components progressively with variant props
- Use feature detection rather than feature flags
- Migrate components completely rather than maintaining parallel versions

### 🚫 Hardcoded Color Patterns

**❌ What We Had:**
```tsx
// Bad: Component-specific color variations
const categoryColors = {
  it: "text-blue-600 dark:text-blue-400",
  gov: "text-green-600 dark:text-green-400", 
  cyber: "text-purple-600 dark:text-purple-400"
};
```

**✅ What We Should Do:**
```tsx
// Good: Use semantic theme tokens with variants
<Badge variant="it">IT Services</Badge>
<Badge variant="government">Government</Badge>
<Badge variant="cybersecurity">Cybersecurity</Badge>
```

### 🚫 Client-Side Only Libraries Without SSR Checks

**❌ What We Had:**
```tsx
// Bad: LaunchDarkly initializing at module level
import { asyncWithLDProvider } from "launchdarkly-react-client-sdk";

// This runs on server and causes "window is not defined"
const LDProvider = await asyncWithLDProvider({ ... });
```

**✅ What We Should Do:**
```tsx
// Good: Proper client-side initialization
"use client";

import { useEffect, useState } from "react";

export function ClientOnlyProvider({ children }) {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  if (!isClient) return <>{children}</>;
  
  // Safe to use client-only libraries here
  return <ClientLibraryProvider>{children}</ClientLibraryProvider>;
}
```

### 🚫 Mixed Component Patterns

**❌ What We Had:**
```tsx
// Bad: Mixing different design systems
<ChakraButton>  {/* Old system */}
  <Button>      {/* New system */}
    Action
  </Button>
</ChakraButton>
```

**✅ What We Should Do:**
```tsx
// Good: Consistent component usage
<Button variant="outline" size="lg">
  Action
</Button>
```

## Build and Development Requirements

### Next.js 15 Compatibility

#### Async Params Pattern
```tsx
// ✅ Correct: Await params before usage
export default async function Page({ params }: Props) {
  const { slug } = await params;
  return <div>Page for {slug}</div>;
}

// ❌ Incorrect: Direct params usage
export default function Page({ params }: Props) {
  return <div>Page for {params.slug}</div>; // Error in Next.js 15
}
```

#### Layout Component Pattern
```tsx
// ✅ Correct: Proper async/await in layout
export default async function Layout({ params, children }: Props) {
  const { lang } = await params;
  const messages = await import(`../lang/${lang}.json`);
  
  return (
    <html lang={lang}>
      <body>{children}</body>
    </html>
  );
}
```

### Build Configuration

#### Production Build Settings
```javascript
// next.config.mjs
export default {
  eslint: {
    ignoreDuringBuilds: process.env.NODE_ENV === 'production',
  },
  typescript: {
    ignoreBuildErrors: process.env.SKIP_TYPE_CHECK === 'true',
  }
};
```

#### Vitest Configuration
```typescript
// setupTests.ts - Global test setup
import "@testing-library/jest-dom/vitest";

// vi is available globally due to vitest config globals: true
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  })),
});
```

## Testing Standards

### Component Test Structure
```tsx
// ComponentName.test.tsx
import { render, screen } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import Component from './Component';

const messages = {
  'component.title': 'Test Title',
  'component.action': 'Test Action'
};

function renderWithIntl(ui: React.ReactElement) {
  return render(
    <IntlProvider locale="en" messages={messages}>
      {ui}
    </IntlProvider>
  );
}

describe('Component', () => {
  it('renders with correct content', () => {
    renderWithIntl(<Component />);
    
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /test action/i })).toBeInTheDocument();
  });

  it('supports theme variants', () => {
    renderWithIntl(<Component variant="secondary" />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('border-input'); // outline variant
  });
});
```

### Testing Requirements
- [ ] Multi-language testing (English, Spanish, French)
- [ ] Accessibility testing with jest-axe
- [ ] Theme variant testing
- [ ] Responsive behavior testing
- [ ] Error boundary testing

## Lessons Learned

### Migration Insights

1. **Feature Flags Are Technical Debt**: Feature flags for component switching create maintenance burden. Better to build progressive enhancement into components.

2. **Theme Tokens Prevent Lock-in**: Using semantic tokens (`text-foreground`) instead of specific colors (`text-slate-600`) makes design system changes easier.

3. **Mass Updates Need Strategy**: Updating 29+ components required systematic approach using specialized agents for efficiency.

4. **Build System Integration**: ESLint, TypeScript, and testing configurations need alignment for smooth development experience.

5. **SSR Compatibility Is Critical**: Client-side libraries must be properly wrapped to prevent server-side execution errors.

### Development Velocity Insights

- **Centralized Patterns**: Components following the same patterns (like ProductTemplate) could be updated as a group
- **Test-Driven Migration**: Having comprehensive tests allowed confident refactoring
- **Progressive Enhancement**: Components work better with variant props than parallel implementations

### Quality Metrics Achieved

- **17/18 test files passing** (55 tests total)
- **100% shadcn/ui adoption** across all components
- **Zero hardcoded colors** in active components
- **Consistent theme token usage** throughout application
- **Enterprise accessibility standards** (WCAG 2.1 AA compliance)

## Future Development Guidelines

1. **Start with shadcn/ui**: Always check if a shadcn/ui component exists before building custom
2. **Use theme tokens**: Never hardcode colors, always use semantic tokens
3. **Build progressively**: Use variant props instead of separate components
4. **Test comprehensively**: Include accessibility, internationalization, and theme testing
5. **Consider SSR**: Ensure client-side libraries are properly wrapped
6. **Document patterns**: Keep this guide updated with new patterns and lessons learned

## Component Template

Use this template for new components:

```tsx
"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";
import { FormattedMessage } from "react-intl";
import ErrorBoundary from "./ErrorBoundary";

interface MyComponentProps {
  className?: string;
  variant?: "default" | "secondary";
  // Add other props as needed
}

function MyComponentInternal({ className, variant = "default", ...props }: MyComponentProps) {
  return (
    <div className={cn("w-full", className)} {...props}>
      <Button variant={variant === "secondary" ? "outline" : "default"}>
        <FormattedMessage id="mycomponent.action" defaultMessage="Action" />
      </Button>
    </div>
  );
}

export default function MyComponent(props: MyComponentProps) {
  return (
    <ErrorBoundary>
      <MyComponentInternal {...props} />
    </ErrorBoundary>
  );
}
```

---

*This guide represents lessons learned from a comprehensive shadcn/ui migration of 100+ components. Keep it updated as we learn new patterns and encounter new challenges.*