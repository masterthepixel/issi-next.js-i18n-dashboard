# Motion Primitives Installation Guide

## ⚠️ Important: Directory Structure Issue

The `motion-primitives` CLI installs components to `components/motion-primitives/` at the project root, but our Next.js project uses `src/components/` structure.

## 🔧 Correct Installation Process

When installing new motion-primitives components, follow these steps:

### 1. Install the component normally

```bash
npx motion-primitives@latest add <component-name>
```

### 2. Move to correct directory

```bash
# Windows PowerShell
move "components\motion-primitives\<component-name>.tsx" "src\components\motion-primitives\<component-name>.tsx"

# Mac/Linux
mv components/motion-primitives/<component-name>.tsx src/components/motion-primitives/<component-name>.tsx
```

### 3. Clean up empty directories

```bash
# Windows PowerShell
rmdir "components\motion-primitives"
rmdir "components"

# Mac/Linux
rmdir components/motion-primitives
rmdir components
```

## 📁 Current Motion Primitives Components

Located in `src/components/motion-primitives/`:

- `dock.tsx` - Dock component with magnetic hover effects
- `glow-effect.tsx` - Glow effect animations
- `infinite-slider.tsx` - Infinite scrolling slider
- `morphing-dialog.tsx` - Morphing dialog animations
- `progressive-blur.tsx` - Progressive blur effects
- `useClickOutside.tsx` - Click outside hook

## 🎯 Import Paths

Always use: `@/components/motion-primitives/<component-name>`

Examples:

```typescript
import { GlowEffect } from "@/components/motion-primitives/glow-effect";
import { Dock, DockItem, DockIcon, DockLabel } from "@/components/motion-primitives/dock";
import { MorphingDialog } from "@/components/motion-primitives/morphing-dialog";
```

## 🚨 Troubleshooting

If you see errors like:

```
Module not found: Can't resolve '@/components/motion-primitives/component-name'
```

1. Check if the component file exists in `src/components/motion-primitives/`
2. If it's in `components/motion-primitives/`, move it following the steps above
3. Restart the development server

## 🔮 Future Improvement

Consider creating a post-install script or custom CLI wrapper to automate this directory movement process.
