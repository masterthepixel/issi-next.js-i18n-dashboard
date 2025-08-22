# Tailwind CSS Debug Screens Documentation

## Overview

The Tailwind CSS Debug Screens feature provides a real-time breakpoint indicator that helps developers debug responsive designs by showing which Tailwind CSS breakpoint is currently active.

## Features

- 📱 **Real-time Breakpoint Display**: Shows current breakpoint (xs, sm, md, lg, xl, 2xl)
- 🎯 **Unobtrusive Design**: Small indicator in bottom-left corner
- 🔄 **Live Updates**: Changes automatically as you resize the browser window
- 🚀 **Development Only**: Automatically disabled in production builds
- 🎨 **Custom Implementation**: Reliable CSS-based solution

## Installation

The debug screens feature is already installed and configured in this project:

```bash
pnpm add tailwindcss-debug-screens@2.2.1 --save-dev
```

## Configuration

### Tailwind Config (`tailwind.config.ts`)

```typescript
const config: Config = {
  // ... other config
  safelist: [
    "debug-screens", // Prevents class from being purged
  ],
  plugins: [require("tailwindcss-animate"), require("tailwindcss-debug-screens")],
};
```

### Layout Implementation (`src/app/[lang]/layout.tsx`)

```tsx
// Development only (recommended)
<body className={`${otherClasses} ${process.env.NODE_ENV === 'development' ? 'debug-screens' : ''}`}>

// Always enabled (current implementation)
<body className="debug-screens">
```

## Breakpoint Reference

| Breakpoint | Min Width | Display |
| ---------- | --------- | ------- |
| `xs`       | Default   | xs      |
| `sm`       | 640px     | sm      |
| `md`       | 768px     | md      |
| `lg`       | 1024px    | lg      |
| `xl`       | 1280px    | xl      |
| `2xl`      | 1536px    | 2xl     |

## How to Use

1. **Start Development Server**: `pnpm dev`
2. **Open Browser**: Navigate to `http://localhost:3000`
3. **Resize Window**: Watch the indicator change as you resize
4. **Test Responsive Design**: Use the indicator to verify your layouts work at all breakpoints

## Production Deployment

### Method 1: Environment-based (Recommended)

Update `src/app/[lang]/layout.tsx` to conditionally apply the class:

```tsx
<body className={`relative min-h-screen overflow-y-auto grid-background-with-fade flex flex-col ${process.env.NODE_ENV === 'development' ? 'debug-screens' : ''}`}>
```

### Method 2: Manual Removal

Before deploying to production, remove the `debug-screens` class from the body element:

```tsx
// Remove debug-screens from this line
<body className="relative min-h-screen overflow-y-auto grid-background-with-fade flex flex-col">
```

### Method 3: Build-time Removal

Add a build script that automatically removes debug classes:

```json
{
  "scripts": {
    "build:prod": "NODE_ENV=production next build",
    "build:dev": "NODE_ENV=development next build"
  }
}
```

## CSS Implementation

The project includes a custom CSS implementation in `src/app/globals.css`:

```css
/* Debug Screens Manual Implementation */
.debug-screens::before {
  position: fixed;
  bottom: 0.5rem;
  left: 0.5rem;
  z-index: 9999;
  padding: 0.125rem 0.25rem;
  border-radius: 0.125rem;
  background-color: rgba(0, 0, 0, 0.9);
  color: white;
  font-family: ui-monospace, SFMono-Regular, "SF Mono", Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-size: 0.625rem;
  font-weight: 600;
  line-height: 1;
  content: "xs";
  display: inline-block;
  min-width: 1.5rem;
  max-width: 2rem;
  height: 1rem;
  text-align: center;
  pointer-events: none;
  white-space: nowrap;
  overflow: hidden;
}

@media (min-width: 640px) {
  .debug-screens::before {
    content: "sm";
  }
}

@media (min-width: 768px) {
  .debug-screens::before {
    content: "md";
  }
}

@media (min-width: 1024px) {
  .debug-screens::before {
    content: "lg";
  }
}

@media (min-width: 1280px) {
  .debug-screens::before {
    content: "xl";
  }
}

@media (min-width: 1536px) {
  .debug-screens::before {
    content: "2xl";
  }
}
```

## Troubleshooting

### Debug Indicator Not Showing

1. **Check Body Class**: Ensure `debug-screens` class is present on body element
2. **Restart Dev Server**: Run `pnpm dev` to regenerate CSS
3. **Clear Browser Cache**: Hard refresh with Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)
4. **Check Console**: Look for any CSS or JavaScript errors

### Indicator Too Large/Small

Adjust the CSS values in `src/app/globals.css`:

```css
.debug-screens::before {
  /* Adjust size */
  font-size: 0.625rem; /* Make smaller: 0.5rem, larger: 0.75rem */
  min-width: 1.5rem; /* Adjust width */
  height: 1rem; /* Adjust height */

  /* Adjust position */
  bottom: 0.5rem; /* Distance from bottom */
  left: 0.5rem; /* Distance from left */
}
```

### Customization

You can customize the debug indicator by modifying the CSS:

```css
.debug-screens::before {
  /* Position: top-right corner */
  top: 0.5rem;
  right: 0.5rem;
  bottom: auto;
  left: auto;

  /* Color scheme */
  background-color: rgba(59, 130, 246, 0.9); /* Blue background */
  color: white;

  /* Size */
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
}
```

## Best Practices

1. **Development Only**: Always disable in production to avoid confusing users
2. **Team Consistency**: Ensure all team members have the same breakpoint reference
3. **Testing Workflow**: Use the indicator to systematically test each breakpoint
4. **Documentation**: Include breakpoint notes in your component documentation

## Integration with VS Code

For enhanced development experience, consider adding VS Code tasks:

```json
// .vscode/tasks.json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Toggle Debug Screens",
      "type": "shell",
      "command": "echo",
      "args": ["Toggle debug-screens class in layout.tsx"],
      "group": "build"
    }
  ]
}
```

## Related Tools

- **Tailwind CSS IntelliSense**: VS Code extension for Tailwind autocompletion
- **Responsive Design Mode**: Browser dev tools for device simulation
- **Tailwind CSS DevTools**: Browser extension for Tailwind debugging

## Support

For issues related to the debug screens feature:

1. Check this documentation
2. Review the implementation in `src/app/globals.css`
3. Verify Tailwind configuration in `tailwind.config.ts`
4. Test with a minimal reproduction case
