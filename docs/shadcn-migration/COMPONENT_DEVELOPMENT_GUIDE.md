# Component Development Guide (shadcn/ui)

> **Last Updated**: August 22, 2025  
> **Theme Status**: ✅ CONNECTED - All variables now available  
> **Conversion Progress**: 1/48 components using theme variables

## 🎨 CRITICAL: Theme Variables Now Working

**As of August 22, 2025**: Theme system is properly connected. All new components MUST use semantic theme variables.

### **Required Theme Variable Patterns**

```tsx
// ✅ REQUIRED: Semantic theme variables
<h1 className="text-foreground">Main Headings</h1>
<p className="text-muted-foreground">Secondary Text</p>
<span className="text-primary">Brand/Links</span>
<div className="bg-background">Page Background</div>
<div className="bg-card">Card/Panel Background</div>

// ❌ DEPRECATED: Hardcoded colors (48 components need conversion)
<h1 className="text-slate-900 dark:text-white">Main Headings</h1>
<p className="text-slate-600 dark:text-slate-300">Secondary Text</p>
<span className="text-blue-600 dark:text-blue-400">Brand/Links</span>
```

### **Conversion Example: AboutPartnerNetwork.tsx**
```tsx
// ❌ Before
className="text-slate-900 dark:text-white"        // Heading
className="text-slate-600 dark:text-slate-300"    // Description

// ✅ After  
className="text-foreground"                       // Heading
className="text-muted-foreground"                 // Description
```

## Enterprise Component Standards
- **MANDATORY**: Use semantic theme variables for all colors
- Use shadcn/ui primitives and patterns for all new components
- Never use hardcoded colors with manual dark mode prefixes
- Follow the provided component template for consistency

## Anti-Patterns to Avoid
- ❌ **Hardcoded Colors**: `text-slate-900 dark:text-white` (use `text-foreground`)
- ❌ **Manual Dark Mode**: Any `dark:` prefixes for colors (theme handles automatically)
- ❌ **Feature flags**: For UI toggling (should be removed post-migration)
- ❌ **Mixed Systems**: Legacy and shadcn/ui components in same module

## Component Template & Testing
- Use the provided template for new components.
- All components must have unit and accessibility tests.

## TypeScript & Accessibility
- Use strict TypeScript interfaces for props.
- Follow accessibility standards (ARIA, keyboard navigation, etc.).
