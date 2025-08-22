# Component Development Guide (shadcn/ui)

## Enterprise Component Standards
- Use shadcn/ui primitives and patterns for all new components.
- Avoid feature flags, hardcoded colors, and mixing UI systems.
- Follow the provided component template for consistency.

## Anti-Patterns to Avoid
- Feature flags for UI toggling (should be removed post-migration).
- Hardcoded color values (use Tailwind theme variables).
- Mixing legacy and shadcn/ui components in the same module.

## Component Template & Testing
- Use the provided template for new components.
- All components must have unit and accessibility tests.

## TypeScript & Accessibility
- Use strict TypeScript interfaces for props.
- Follow accessibility standards (ARIA, keyboard navigation, etc.).
