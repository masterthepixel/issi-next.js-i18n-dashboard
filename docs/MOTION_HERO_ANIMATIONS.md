# Motion Hero Animations Guide

This document outlines how to implement smooth, engaging animations for hero components using the Motion library (motion/react). These patterns create professional entrance animations that enhance user experience without being distracting.

## Table of Contents

- [Overview](#overview)
- [Installation & Setup](#installation--setup)
- [Hero Title Animation](#hero-title-animation)
- [Hero Subtitle Animation](#hero-subtitle-animation)
- [Hero Image Animation](#hero-image-animation)
- [Button Animations](#button-animations)
- [Animation Timing & Choreography](#animation-timing--choreography)
- [Best Practices](#best-practices)
- [Accessibility Considerations](#accessibility-considerations)

## Overview

Motion animations in hero sections should follow these principles:

- **Progressive disclosure**: Elements appear in logical order (title → subtitle → image → actions)
- **Subtle movement**: Animations enhance rather than distract
- **Performance**: Use transform properties that don't trigger layout recalculations
- **Accessibility**: Respect user motion preferences

## Installation & Setup

```bash
npm install motion
# or
pnpm add motion
```

```typescript
import { motion } from "motion/react";
```

## Hero Title Animation

### Word-by-Word Animation Pattern

Creates a typewriter-like effect where each word appears sequentially with a blur-to-focus transition:

```typescript
<h1 className="text-4xl font-bold text-foreground">
  {"Your Hero Title Goes Here".split(" ").map((word, index) => (
    <motion.span
      key={index}
      initial={{
        opacity: 0,
        filter: "blur(4px)",
        y: 10,
      }}
      animate={{
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
      }}
      transition={{
        duration: 0.3,
        delay: index * 0.1, // Stagger each word
        ease: "easeInOut",
      }}
      className="mr-2 inline-block"
    >
      {word}
    </motion.span>
  ))}
</h1>
```

### Alternative: Simple Fade-In Title

For a more subtle approach:

```typescript
<motion.h1
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, ease: "easeOut" }}
  className="text-4xl font-bold text-foreground"
>
  Your Hero Title
</motion.h1>
```

## Hero Subtitle Animation

Subtitles should appear after the title completes, creating a natural reading flow:

```typescript
<motion.p
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{
    duration: 0.3,
    delay: 0.8, // After title animation completes
  }}
  className="text-lg text-muted-foreground"
>
  Your compelling subtitle or description text
</motion.p>
```

### With Slide-Up Effect

```typescript
<motion.p
  initial={{ opacity: 0, y: 15 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{
    duration: 0.4,
    delay: 0.8,
    ease: "easeOut",
  }}
  className="text-lg text-muted-foreground"
>
  Your subtitle with slide-up animation
</motion.p>
```

## Hero Image Animation

Images should animate in last to avoid layout shifts and create anticipation:

```typescript
<motion.div
  initial={{
    opacity: 0,
    y: 10,
  }}
  animate={{
    opacity: 1,
    y: 0,
  }}
  transition={{
    duration: 0.3,
    delay: 1.2, // After text content
  }}
  className="relative mt-8"
>
  <Image
    src="/your-hero-image.jpg"
    alt="Descriptive alt text"
    className="rounded-lg shadow-lg"
    width={800}
    height={600}
  />
</motion.div>
```

### With Scale Animation

```typescript
<motion.div
  initial={{
    opacity: 0,
    scale: 0.95,
  }}
  animate={{
    opacity: 1,
    scale: 1,
  }}
  transition={{
    duration: 0.5,
    delay: 1.2,
    ease: "easeOut",
  }}
  className="relative mt-8"
>
  <Image src="/hero-image.jpg" alt="Hero" />
</motion.div>
```

## Button Animations

Action buttons should appear after the main content to guide user flow:

```typescript
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{
    duration: 0.3,
    delay: 1.0, // After subtitle
  }}
  className="mt-8 flex gap-4"
>
  <button className="bg-primary text-primary-foreground px-6 py-2 rounded-lg">Primary Action</button>
  <button className="border border-border bg-background px-6 py-2 rounded-lg">Secondary Action</button>
</motion.div>
```

### With Hover Animations

Add interactive feedback to buttons:

```typescript
<motion.button
  whileHover={{
    y: -2,
    transition: { duration: 0.2 },
  }}
  whileTap={{
    scale: 0.98,
  }}
  className="bg-primary text-primary-foreground px-6 py-2 rounded-lg"
>
  Get Started
</motion.button>
```

## Animation Timing & Choreography

### Recommended Timing Sequence

```typescript
// Title: 0ms - 800ms (word-by-word with 100ms stagger)
// Subtitle: 800ms - 1100ms (300ms duration)
// Buttons: 1000ms - 1300ms (300ms duration)
// Image: 1200ms - 1500ms (300ms duration)
// Stats/Additional: 1400ms+ (300ms duration)
```

### Timing Constants

```typescript
const ANIMATION_TIMING = {
  TITLE_WORD_STAGGER: 0.1,
  TITLE_DURATION: 0.3,
  SUBTITLE_DELAY: 0.8,
  BUTTON_DELAY: 1.0,
  IMAGE_DELAY: 1.2,
  STATS_DELAY: 1.4,
  DEFAULT_DURATION: 0.3,
  DEFAULT_EASE: "easeInOut",
} as const;
```

## Best Practices

### Performance

- Use `transform` properties (opacity, scale, translate) instead of changing layout properties
- Avoid animating `width`, `height`, `top`, `left` which trigger reflows
- Use `will-change: transform` for complex animations

### UX Guidelines

- Keep animations under 500ms for UI elements
- Use easing functions that feel natural (`easeOut`, `easeInOut`)
- Ensure animations don't delay critical content too long
- Provide immediate feedback for user interactions

### Code Organization

```typescript
// Extract animation variants for reusability
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3, ease: "easeOut" },
};

const staggeredText = (text: string, baseDelay = 0) => ({
  children: text.split(" ").map((word, index) => (
    <motion.span
      key={index}
      initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
      animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      transition={{
        duration: 0.3,
        delay: baseDelay + index * 0.1,
        ease: "easeInOut",
      }}
      className="mr-2 inline-block"
    >
      {word}
    </motion.span>
  )),
});
```

## Accessibility Considerations

### Respect Motion Preferences

```typescript
import { useReducedMotion } from "motion/react";

function HeroComponent() {
  const shouldReduceMotion = useReducedMotion();

  const titleVariants = shouldReduceMotion
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.1 },
      }
    : {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.5 },
      };

  return <motion.h1 {...titleVariants}>Your Title</motion.h1>;
}
```

### CSS Fallback

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

## Complete Example

Here's a complete hero component implementing all patterns:

```typescript
"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";

export default function AnimatedHero() {
  const shouldReduceMotion = useReducedMotion();

  const getAnimation = (baseDelay: number, type: "fade" | "slide" = "fade") => {
    if (shouldReduceMotion) {
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.1, delay: baseDelay * 0.1 },
      };
    }

    return type === "slide"
      ? {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.3, delay: baseDelay, ease: "easeOut" },
        }
      : {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.3, delay: baseDelay },
        };
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center">
      {/* Animated Title */}
      <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
        {"Transform Learning Experiences".split(" ").map((word, index) => (
          <motion.span
            key={index}
            {...(shouldReduceMotion
              ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { delay: index * 0.01 } }
              : {
                  initial: { opacity: 0, filter: "blur(4px)", y: 10 },
                  animate: { opacity: 1, filter: "blur(0px)", y: 0 },
                  transition: { duration: 0.3, delay: index * 0.1, ease: "easeInOut" },
                })}
            className="mr-2 inline-block"
          >
            {word}
          </motion.span>
        ))}
      </h1>

      {/* Animated Subtitle */}
      <motion.p {...getAnimation(0.8)} className="text-lg text-muted-foreground mb-8">
        Advanced e-learning solutions for modern organizations
      </motion.p>

      {/* Animated Buttons */}
      <motion.div {...getAnimation(1.0)} className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
        <motion.button
          whileHover={!shouldReduceMotion ? { y: -2 } : {}}
          whileTap={!shouldReduceMotion ? { scale: 0.98 } : {}}
          className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium"
        >
          Get Started
        </motion.button>
        <motion.button
          whileHover={!shouldReduceMotion ? { y: -2 } : {}}
          whileTap={!shouldReduceMotion ? { scale: 0.98 } : {}}
          className="border border-border bg-background px-8 py-3 rounded-lg font-medium"
        >
          Learn More
        </motion.button>
      </motion.div>

      {/* Animated Image */}
      <motion.div {...getAnimation(1.2, "slide")} className="relative">
        <Image
          src="/hero-image.jpg"
          alt="E-learning platform interface"
          className="rounded-lg shadow-xl"
          width={800}
          height={500}
        />
      </motion.div>
    </div>
  );
}
```

## Troubleshooting

### Common Issues

1. **Layout shift**: Images animating before loading
   - Solution: Use Next.js Image with proper dimensions
2. **Performance**: Too many simultaneous animations
   - Solution: Stagger animations and use transform properties
3. **Accessibility**: Animations too fast/slow for some users
   - Solution: Implement `useReducedMotion` hook

### Testing Animations

```typescript
// Test reduced motion
// Chrome DevTools > Rendering > Emulate CSS media feature prefers-reduced-motion

// Test performance
// React DevTools Profiler to monitor component renders
```

This guide provides a comprehensive foundation for implementing smooth, professional hero animations that enhance user experience while maintaining accessibility and performance standards.
