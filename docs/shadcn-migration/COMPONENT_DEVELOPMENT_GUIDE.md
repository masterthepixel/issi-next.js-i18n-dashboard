# Component Development Guide (shadcn/ui)

> **Last Updated**: August 25, 2025  
> **Phase 2 Status**: ✅ COMPLETE - All components migrated  
> **Phase 3 Status**: ⏳ READY - Component replacements with shadcn/ui primitives

## 🎉 Phase 2 COMPLETE: Theme Variables Migration

**As of August 25, 2025**: Successfully migrated 55+ components to semantic theme variables. All components now use proper shadcn/ui theming.

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

## 🚀 Phase 3: Component Replacement Standards

### **MANDATORY for New Components:**
- **Use shadcn/ui primitives** instead of custom implementations
- **Leverage built-in accessibility** features (keyboard navigation, ARIA labels)
- **Utilize advanced functionality** (loading states, validation, focus management)
- **Follow shadcn/ui patterns** for consistent behavior across application

### **Phase 3 Replacement Priority:**
1. **Forms & Inputs**: Replace with shadcn/ui Form + Input + Button components
2. **Navigation**: Replace with NavigationMenu + DropdownMenu + Sheet
3. **Modals/Dialogs**: Replace with Dialog + AlertDialog components
4. **Data Display**: Replace with Table + Card + Badge components

### **Enterprise Component Standards**
- **MANDATORY**: Use semantic theme variables for all colors (Phase 2 ✅ Complete)
- **REQUIRED**: Use shadcn/ui primitives for enhanced functionality and accessibility
- **FORBIDDEN**: Custom implementations where shadcn/ui primitives exist
- **ENCOURAGED**: Composition of shadcn/ui primitives for complex components

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
