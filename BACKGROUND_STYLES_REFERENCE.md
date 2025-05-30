# Background Styles Reference

This document contains reference implementations for various background styles used in the application.

## Grid Background Pattern (Original Light Mode)

The following CSS classes were used for the original light mode grid background pattern:

### Grid Background (Simple)

```css
.grid-background {
  position: relative;
  background-color: white;
  background-size: 40px 40px;
  background-image: linear-gradient(to right, #e4e4e7 1px, transparent 1px),
    linear-gradient(to bottom, #e4e4e7 1px, transparent 1px);
}

.dark .grid-background {
  background-color: black;
  background-image: none;
  /* Remove grid pattern in dark mode */
}
```

### Grid Background with Fade (Advanced)

```css
.grid-background-with-fade {
  position: relative;
  background-color: white;
  background-size: 40px 40px;
  background-image: linear-gradient(to right, #e4e4e7 1px, transparent 1px),
    linear-gradient(to bottom, #e4e4e7 1px, transparent 1px);
}

.dark .grid-background-with-fade {
  background-color: black;
  background-image: none;
  /* Remove grid pattern in dark mode */
}

.grid-background-with-fade::before {
  content: "";
  position: absolute;
  top: 400px;
  /* Start the fade well after profile header area (increased for safety) */
  left: 0;
  right: 0;
  bottom: 0;
  background: white;
  -webkit-mask-image: radial-gradient(ellipse at center top, transparent 0%, black 70%);
  mask-image: radial-gradient(ellipse at center top, transparent 0%, black 70%);
  pointer-events: none;
  z-index: -1;
  /* Put it behind content */
}

.dark .grid-background-with-fade::before {
  background: black;
}
```

## Current Background Styles (Marble White Implementation)

The current background implementation uses elegant marble-like gradient designs:

### Grid Background (Marble White)

```css
.grid-background {
  position: relative;
  background: linear-gradient(135deg, 
    #ffffff 0%, 
    #f8fafc 15%, 
    #ffffff 30%, 
    #f1f5f9 45%, 
    #ffffff 60%, 
    #f8fafc 75%, 
    #ffffff 90%, 
    #f1f5f9 100%
  );
  background-attachment: fixed;
}

.dark .grid-background {
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  background-attachment: fixed;
}
```

### Grid Background with Fade (Marble White with Fade)

```css
.grid-background-with-fade {
  position: relative;
  background: linear-gradient(135deg, 
    #ffffff 0%, 
    #f8fafc 15%, 
    #ffffff 30%, 
    #f1f5f9 45%, 
    #ffffff 60%, 
    #f8fafc 75%, 
    #ffffff 90%, 
    #f1f5f9 100%
  );
  background-attachment: fixed;
}
```

## Usage Notes

- **Light Mode**: Elegant marble white gradient with subtle variations
- **Dark Mode**: Dark slate gradient for contrast
- **Background Attachment**: Fixed to create parallax-like effect
- **Color Transitions**: Smooth transitions between white and light slate tones

## Implementation Details

The marble white background provides:

- Professional and clean appearance
- Subtle texture without being distracting
- Excellent readability for content
- Consistent theming across light and dark modes

## Alternative Background Styles

For reference, the application also includes:

- `.glass-effect` - Translucent glass-like backgrounds
- `.glass-effect-strong` - More opaque glass effects
- `.frosted-glass` - Frosted glass with background image
- Animated backgrounds (StarryBackground, AnimatedBackground components for dark mode)

## Color Palette Reference

The marble white pattern uses colors from the established palette:

- **Light mode**: White (`#ffffff`), Slate-50 (`#f8fafc`), Slate-100 (`#f1f5f9`)
- **Dark mode**: Slate-900 (`#0f172a`), Slate-800 (`#1e293b`)

---

*Last updated: May 30, 2025*
*Preserved from: src/app/globals.css*
