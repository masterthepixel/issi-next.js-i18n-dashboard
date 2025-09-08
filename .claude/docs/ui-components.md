## UI Component Migration & Standards

- All form elements (Button, Input, Select, etc.) use shadcn/ui primitives. See [COMPONENT_INTEGRATION_GUIDE.md](docs/COMPONENT_INTEGRATION_GUIDE.md).
- Button uses [enhanced-button](https://github.com/jakobhoeg/enhanced-button) for accessibility (focus, ARIA, keyboard, WCAG). See [AI_PERSONA_ENHANCED_BUTTON.md](docs/AI_PERSONA_ENHANCED_BUTTON.md).
- Use lucide-react or shadcn/ui Icon for icons. See [CRUSH.md](docs/CRUSH.md).
- Use theme variables for colors/radii/effects. No hardcoded values.
- Accessibility and i18n linting are enforced in CI/CD.
- Fix all lint errors before merge.

### ⚠️ CRITICAL: Button asChild Pattern Rules

**Never use `asChild` with complex children** - this causes React.Children.only errors:

```tsx
// ❌ WRONG - Causes React.Children.only error
<Button asChild>
  <Link href="/page">
    <span><Icon /> Text</span>
  </Link>
</Button>

// ✅ CORRECT - Use onClick pattern instead
<Button onClick={() => router.push('/page')}>
  <Icon /> Text
</Button>
```

**When to use each pattern**:

- **onClick**: Navigation buttons, complex children (icon+text), FormattedMessage
- **asChild**: Single child element only, no nested structures
- **Always import useRouter**: `import { useRouter } from 'next/navigation'`

### 🚨 CRITICAL: Next.js 15 Server/Client Component Rules

**Stories 1.1 & 1.2 Lessons Learned** - These patterns prevent createContext and hydration errors:

#### Server Component Rules (NO "use client")

- ❌ **NEVER use React Context directly** in layout.tsx or server components
- ❌ **NEVER import client components with hooks** (useState, useRouter, etc.)
- ❌ **NEVER use browser APIs** (localStorage, window, document)
- ✅ **Only data fetching, async operations, and static content**

#### Client Component Separation Pattern

```tsx
// ❌ WRONG - Causes createContext errors
// src/app/[lang]/layout.tsx
"use client"; // Never add this to layouts!
import { ThemeProvider } from "next-themes";
export default async function RootLayout({ children }) {
  return <ThemeProvider>{children}</ThemeProvider>; // Server component!
}

// ✅ CORRECT - Separate Client Wrapper
// src/components/ClientLayout.tsx
("use client");
import { ThemeProvider } from "next-themes";
export default function ClientLayout({ children }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}

// src/app/[lang]/layout.tsx (Server Component)
import ClientLayout from "@/components/ClientLayout";
export default async function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
```

#### useSearchParams + Suspense Pattern

```tsx
// ❌ WRONG - Causes prerender errors
export default function LoginPage({ params }) {
  const searchParams = useSearchParams(); // No Suspense boundary!
  return <form>...</form>;
}

// ✅ CORRECT - Suspense Wrapper Pattern
// LoginForm.tsx
("use client");
export default function LoginForm({ lang }) {
  const searchParams = useSearchParams(); // OK in client component
  return <form>...</form>;
}

// page.tsx
import { Suspense } from "react";
export default function LoginPage({ params }) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm lang={params.lang} />
    </Suspense>
  );
}
```

#### Context Provider Architecture

```tsx
// ✅ CORRECT - Layered Provider Structure
Server Layout → ClientLayout → ThemeProvider → Content
// Each layer handles its own concerns, no mixing server/client
```

**Critical Prevention Checklist**:

- [ ] All Context providers in separate "use client" components
- [ ] useSearchParams wrapped in Suspense boundaries
- [ ] No client hooks directly in page.tsx files
- [ ] Server components never import client-only dependencies
- [ ] Build passes without createContext/useSearchParams errors

## Key Development Patterns from Migration

The default Button (`@/components/ui/button`) is now the enhanced-button version.
Supports effects (expandIcon, gooeyRight, shineHover) and icon placement.
Example usage:

```tsx
<Button effect="expandIcon" icon={<ArrowRightIcon />} iconPlacement="right">Icon right</Button>
<Button effect="gooeyRight">Gooey right</Button>
<Button variant="outline" effect="shineHover">Outline with shine hover</Button>
```

All theme variables are respected via Tailwind config.
See COMPONENT_INTEGRATION_GUIDE.md for full details.

```tsx
"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FormattedMessage } from "react-intl";
import ErrorBoundary from "./ErrorBoundary";

interface Props {
  className?: string;
  variant?: "default" | "secondary";
}

function ComponentInternal({ className, variant = "default" }: Props) {
  return (
    <div className={cn("w-full", className)}>
      <Button variant={variant === "secondary" ? "outline" : "default"}>
        <FormattedMessage id="component.action" defaultMessage="Action" />
      </Button>
    </div>
  );
}

export default function Component(props: Props) {
  return (
    <ErrorBoundary>
      <ComponentInternal {...props} />
    </ErrorBoundary>
  );
}
```
