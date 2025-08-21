# Build & Test Commands
```bash
pnpm dev              # Start dev server
pnpm build           # Build with JSON validation
pnpm type-check      # TypeScript check
pnpm lint            # ESLint for code quality
pnpm test            # Run vitest tests
pnpm test:run        # Run vitest once
pnpm validate:json   # Validate JSON data files
pnpm validate:all    # Full validation (lint + JSON)
```

# Code Style Guide
- **Imports**: Use `@/*` for src/* paths, standard ES modules, explicit imports
- **Types**: Strict TypeScript (`strict: true, strictNullChecks: true`)
- **React**: Functional components with hooks, prefer named exports
- **JSON**: Validate with `validate:json`, avoid trailing commas in .json files
- **Styling**: Radix UI + Tailwind (shadcn/ui), `cn()` utility for class merging, mobile-first responsive design
- **I18n**: Use react-intl syntax, avoid hardcoded strings
- **No-unused-vars**: Prefix with `_` to ignore unused params/vars
- **Formatting**: 120 char width, 2 space indent
- **Icons**: Use shadcn/ui icon components (lucide-react)
- **Colors**: Use tailwind CSS variables via `hsl(var(--foreground))` pattern