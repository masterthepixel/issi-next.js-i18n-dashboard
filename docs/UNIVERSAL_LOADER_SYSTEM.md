# Universal Loader System

## Overview

The Universal Loader System provides consistent, accessible, and performant loading states across the ISSI Next.js i18n Dashboard. Built on top of the shadcn AI loader component, it offers multiple variants and presets for different use cases.

## Installation

The system uses the shadcn AI loader as its foundation:

```bash
pnpm dlx shadcn@latest add https://www.shadcn.io/registry/ai.json
```

## Core Component

### UniversalLoader

**File**: `src/components/ui/universal-loader.tsx`

```tsx
import { UniversalLoader } from '@/components/ui/universal-loader';

<UniversalLoader 
  size="md"
  variant="default"
  message="Loading..."
  description="Please wait"
  showSpinner={true}
/>
```

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Loader size |
| `variant` | `'default' \| 'globe' \| 'minimal' \| 'card'` | `'default'` | Visual style |
| `message` | `string` | - | Primary loading message |
| `description` | `string` | - | Secondary description |
| `showSpinner` | `boolean` | `true` | Whether to show spinner |

## Variants

### 1. Default Loader
```tsx
<UniversalLoader 
  variant="default"
  message="Loading..."
/>
```
- Standard background with border
- Suitable for most loading states
- Clean, professional appearance

### 2. Globe Loader
```tsx
<UniversalLoader 
  variant="globe"
  message="Loading Globe..."
  showSpinner={false}
/>
```
- Specialized for 3D globe components
- Multi-layer animated rings
- Globe emoji with bounce animation
- No standard spinner (uses custom animation)

### 3. Minimal Loader
```tsx
<UniversalLoader 
  variant="minimal"
  size="sm"
  showSpinner={true}
/>
```
- Transparent background
- Just the spinner and optional text
- Suitable for inline loading states

### 4. Card Loader
```tsx
<UniversalLoader 
  variant="card"
  message="Loading content..."
/>
```
- Card-style background with shadow
- Suitable for content areas and panels

## Preset Components

### GlobeLoader
**Use Case**: 3D Globe components, heavy visualizations

```tsx
import { GlobeLoader } from '@/components/ui/universal-loader';

<GlobeLoader />
```

**Features**:
- Optimized for globe loading states
- Multi-layer animation effects
- Custom size: `lg` (h-48 w-48)
- Built-in messaging: "Loading Globe..." / "Preparing 3D visualization"

### ComponentLoader
**Use Case**: General component and page loading

```tsx
import { ComponentLoader } from '@/components/ui/universal-loader';

<ComponentLoader message="Loading dashboard..." />
```

**Features**:
- Standard size: `md` (h-32 w-32)
- Customizable message
- Clean, professional appearance

### CardLoader
**Use Case**: Card content, small components

```tsx
import { CardLoader } from '@/components/ui/universal-loader';

<CardLoader />
```

**Features**:
- Compact size: `sm` (h-20 w-20)
- Built-in messaging: "Loading content..."
- Card-style background

### MinimalLoader
**Use Case**: Inline loading, buttons, small areas

```tsx
import { MinimalLoader } from '@/components/ui/universal-loader';

<MinimalLoader size="sm" />
```

**Features**:
- Transparent background
- Flexible sizing
- Minimal visual footprint

## Implementation Examples

### Dynamic Component Loading

```tsx
import dynamic from 'next/dynamic';
import { GlobeLoader } from '@/components/ui/universal-loader';

const World = dynamic(() => import('./ui/globe'), {
  ssr: false,
  loading: () => <GlobeLoader />
});
```

### Suspense Boundaries

```tsx
import { Suspense } from 'react';
import { ComponentLoader } from '@/components/ui/universal-loader';

<Suspense fallback={<ComponentLoader message="Loading content..." />}>
  <HeavyComponent />
</Suspense>
```

### Form Loading States

```tsx
import { MinimalLoader } from '@/components/ui/universal-loader';

<button disabled={isLoading}>
  {isLoading ? <MinimalLoader size="sm" /> : 'Submit'}
</button>
```

### Data Fetching

```tsx
import { CardLoader } from '@/components/ui/universal-loader';

function DataComponent() {
  if (isLoading) return <CardLoader />;
  if (error) return <ErrorComponent />;
  return <DataDisplay data={data} />;
}
```

## Performance Features

### Bundle Optimization
- Tree-shakable: Only import what you need
- Based on shadcn AI loader (optimized SVG spinner)
- No external dependencies beyond existing UI system

### Animation Performance
- GPU-accelerated CSS animations
- Smooth 60fps animations
- Respects `prefers-reduced-motion`
- Efficient animation cleanup

### Memory Management
- Lightweight component structure
- No persistent timers or event listeners
- Automatic cleanup when components unmount

## Accessibility

### Screen Reader Support
- Proper ARIA labels for loading states
- Descriptive text for different contexts
- Compatible with assistive technologies

### Motion Preferences
- Respects `prefers-reduced-motion` settings
- Alternative static states for motion-sensitive users
- Smooth animations that don't trigger vestibular disorders

### Keyboard Navigation
- Proper focus management during loading states
- No interference with keyboard navigation
- Maintains accessible tabindex behavior

## Size Configuration

| Size | Spinner | Container | Use Case |
|------|---------|-----------|----------|
| `sm` | 16px | h-20 w-20 | Inline, buttons, small components |
| `md` | 24px | h-32 w-32 | Standard components, cards |
| `lg` | 32px | h-48 w-48 | Large components, features |
| `xl` | 40px | h-64 w-64 | Full-screen, major components |

## Best Practices

### When to Use Each Variant

**Globe Loader**:
- ✅ 3D components (globe, charts, visualizations)
- ✅ Heavy WebGL content
- ✅ Components that take > 2 seconds to load

**Component Loader**:
- ✅ Page transitions
- ✅ Route changes  
- ✅ Dashboard loading
- ✅ General purpose loading

**Card Loader**:
- ✅ Content cards
- ✅ Data panels
- ✅ Article/blog loading
- ✅ User-generated content

**Minimal Loader**:
- ✅ Button loading states
- ✅ Inline operations
- ✅ Form submissions
- ✅ Quick operations (< 1 second)

### Performance Guidelines

1. **Size Selection**: Choose the smallest appropriate size
2. **Message Content**: Keep messages concise and informative
3. **Animation Duration**: Use default durations for consistency
4. **Loading Time**: Show loaders for operations > 200ms
5. **Error Handling**: Always provide fallback error states

### Common Patterns

```tsx
// Dynamic import with custom loader
const HeavyComponent = dynamic(() => import('./Heavy'), {
  loading: () => <ComponentLoader message="Loading analytics..." />
});

// Conditional rendering
{isLoading ? (
  <CardLoader />
) : error ? (
  <ErrorState />
) : (
  <Content data={data} />
)}

// Button loading state
<button disabled={isSubmitting}>
  {isSubmitting ? <MinimalLoader size="sm" /> : 'Save Changes'}
</button>
```

## Future Enhancements

### Planned Features
- **Skeleton Variants**: Content-aware skeleton loading
- **Progress Indicators**: Progress bars and percentage displays
- **Custom Animations**: User-defined animation presets
- **Intersection Loading**: Load only when in viewport
- **Error Recovery**: Automatic retry mechanisms

### Extensibility
- Easy to add new variants through the variant system
- Customizable animation durations and easing
- Theme integration for consistent color schemes
- Internationalization support for loading messages

---

**Last Updated**: December 2024
**Compatible With**: Next.js 15, React 18, shadcn/ui
**Bundle Impact**: ~2KB (minimal overhead)
**Performance**: 60fps animations, GPU acceleration