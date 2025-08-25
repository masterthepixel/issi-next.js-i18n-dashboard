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

## Button Component Migration (2024)

- **Button**: All UI buttons now use the [enhanced-button](https://github.com/jakobhoeg/enhanced-button) implementation, replacing shadcn/ui's default Button.
- **Features**: Supports effects, icon placement (left/right), and full compatibility with shadcn/ui props and Tailwind theme variables.
- **Usage**: Import from `src/components/ui/button.tsx` for all button needs. See CLAUDE.md for usage examples.
- **Migration Rationale**: Enhanced-button provides improved accessibility, visual effects, and easier icon integration.
- **Theme Support**: Fully supports Tailwind CSS theme variables for colors, radii, and effects.
- **Documentation**: Refer to CLAUDE.md and COMPONENT_INTEGRATION_GUIDE.md for migration details and usage patterns.