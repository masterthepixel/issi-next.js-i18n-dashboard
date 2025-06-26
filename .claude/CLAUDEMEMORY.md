# Claude Memory - ISSI Next.js Multilingual Website

This document captures important context and decisions for this project, allowing Claude and developers to maintain continuity across sessions.

## Table of Contents

- [ESLint Configuration](#eslint-configuration)
- [Documentation Index](#documentation-index)
- [Recent Technical Changes](#recent-technical-changes)
- [Implementation Notes](#implementation-notes)
- [Related Files](#related-files)
- [Project Architecture Notes](#project-architecture-notes)

## ESLint Configuration

The project contains numerous ESLint warnings that were suppressed through a custom `.eslintrc.js` configuration to prevent build failures. These warnings primarily fall into four categories:

1. **Unused Variables**: Many variables and function parameters are defined but never used in the code.
   - **Solution**: Prefix all unused variables with an underscore (e.g., `_varName`) to indicate they're intentionally unused.
   - **Files Affected**: Multiple files across `/src/types/`, `/src/components/`, and application pages.

2. **Let vs Const Declarations**: Many variables are declared with `let` but never reassigned.
   - **Solution**: Convert all non-reassigned variables from `let` to `const` for better code quality and to prevent accidental mutations.
   - **Files Affected**: Primarily UI components like `bento-grid.tsx`, `evervault-card.tsx`, `floating-dock.tsx`, and various globe components.

3. **React Hooks Dependency Arrays**: Several `useEffect` and `useCallback` hooks have incomplete dependency arrays.
   - **Solution**: Properly populate dependency arrays to prevent stale closures and ensure components update correctly.
   - **Files Affected**: Complex components like `GeoGlobe.tsx`, `HomePageGlobalHero.tsx`, and animation-heavy components.

4. **Missing React Imports**: Many TypeScript files use React types or JSX without importing React.
   - **Solution**: Add `import React from 'react';` to all files using React types or JSX syntax.
   - **Files Affected**: Type definition files like `ui.ts`, `breadcrumb.ts`, `globe.ts`, and various component files.

A detailed guide for addressing these issues is available in `docs/ESLINT_WARNINGS_RESOLUTION_GUIDE.md`.

## Documentation Index

### Root Documentation

- **[README.md](../README.md)** - Primary project documentation and setup guide
- **[CHANGELOG.md](../CHANGELOG.md)** - History of project changes and updates
- **[FUTURE_FEATURES.md](../FUTURE_FEATURES.md)** - Planned enhancements and features for future releases
- **[INSTRUCTIONS.md](../INSTRUCTIONS.md)** - General developer instructions for the project
- **[INTERNATIONALIZATION.md](../INTERNATIONALIZATION.md)** - Comprehensive guide to i18n implementation
- **[I18N_ARCHITECTURE.md](../I18N_ARCHITECTURE.md)** - Technical architecture of the internationalization system
- **[GIT_COMMIT_MESSAGE.md](../GIT_COMMIT_MESSAGE.md)** - Guidelines for writing commit messages
- **[COMPONENT_INTEGRATION_GUIDE.md](../COMPONENT_INTEGRATION_GUIDE.md)** - How to integrate new components
- **[TROUBLESHOOTING.md](../TROUBLESHOOTING.md)** - Solutions for common development issues
- **[JSON_VALIDATION_GUIDE.md](../JSON_VALIDATION_GUIDE.md)** - Guidelines for JSON validation
- **[SEO_INSTRUCTIONS.md](../SEO_INSTRUCTIONS.md)** - SEO best practices for the project
- **[GLOBE_IMPLEMENTATION_GUIDE.md](../GLOBE_IMPLEMENTATION_GUIDE.md)** - Guide for implementing globe visualizations
- **[BENTOGRID_CREATION_GUIDE.md](../BENTOGRID_CREATION_GUIDE.md)** - Guide for creating BentoGrid layouts
- **[COLOR_PALETTE_INSTRUCTIONS.md](../COLOR_PALETTE_INSTRUCTIONS.md)** - Color palette guidelines
- **[BACKGROUND_STYLES_REFERENCE.md](../BACKGROUND_STYLES_REFERENCE.md)** - Reference for background styles
- **[AGENTS.md](../AGENTS.md)** - Documentation related to AI agents integration

### `/docs/` Documentation

- **[BREADCRUMB_TESTING.md](../docs/BREADCRUMB_TESTING.md)** - Testing guidelines for breadcrumb components
- **[BREADCRUMB_WITH_GLOBE_DOCUMENTATION.md](../docs/BREADCRUMB_WITH_GLOBE_DOCUMENTATION.md)** - Documentation for the BreadcrumbWithGlobe component
- **[ESLINT_CONFIGURATION.md](../docs/ESLINT_CONFIGURATION.md)** - ESLint configuration documentation
- **[ESLINT_WARNINGS_RESOLUTION_GUIDE.md](../docs/ESLINT_WARNINGS_RESOLUTION_GUIDE.md)** - Detailed guide for resolving ESLint warnings
- **[INTELLIGENT_BREADCRUMB_SYSTEM.md](../docs/INTELLIGENT_BREADCRUMB_SYSTEM.md)** - Documentation for the intelligent breadcrumb system
- **[MOBILE_FLOATING_MENU_DOCUMENTATION.md](../docs/MOBILE_FLOATING_MENU_DOCUMENTATION.md)** - Documentation for the mobile floating menu
- **[NEW_HERO_DOCUMENTATION.md](../docs/NEW_HERO_DOCUMENTATION.md)** - Documentation for the new hero component
- **[TODO_INTELLIGENT_BREADCRUMB.md](../docs/TODO_INTELLIGENT_BREADCRUMB.md)** - Todo list for intelligent breadcrumb implementation
- **[TODO_NEW_HERO_TOGGLE.md](../docs/TODO_NEW_HERO_TOGGLE.md)** - Todo list for new hero toggle features
- **[TYPESCRIPT_LIBRARY_DOCUMENTATION.md](../docs/TYPESCRIPT_LIBRARY_DOCUMENTATION.md)** - Documentation for TypeScript libraries
- **[TYPESCRIPT_QUICK_START.md](../docs/TYPESCRIPT_QUICK_START.md)** - Quick start guide for TypeScript
- **[UNIVERSAL_BREADCRUMB_DOCUMENTATION.md](../docs/UNIVERSAL_BREADCRUMB_DOCUMENTATION.md)** - Documentation for universal breadcrumb system

### GitHub & Claude Documentation

- **[.github/copilot-instructions.md](../.github/copilot-instructions.md)** - Instructions for using GitHub Copilot
- **[.claude/CLAUDE.md](../CLAUDE.md)** - Documentation for Claude AI integrations

## Recent Technical Changes

### ESLint Configuration Update (June 26, 2025)

- Created a comprehensive ESLint configuration to address warnings without failing builds
- Added detailed documentation on resolving ESLint warnings in `docs/ESLINT_WARNINGS_RESOLUTION_GUIDE.md`
- Provided four key action items for systematically improving code quality

### Marquee Animation Enhancement (June 26, 2025)

- Completely reimplemented the marquee animation using Aceternity UI's InfiniteMovingCards approach
- Created a new `InfiniteMovingBadges` component based on modern CSS animation techniques
- Implemented a cleaner, more reliable infinite scrolling mechanism with pure CSS animations
- Added alternating directions (left/right) for each row with proper animation direction control
- Set animation durations with fast speed (20s) for smooth continuous motion
- Added pause-on-hover functionality for better accessibility and user control
- Simplified the component structure by eliminating dependency on motion/react library
- Used CSS custom properties for animation direction and duration control
- Ensured proper looping by duplicating items and using transform animations
- Added linear gradient masks at the edges for a more polished fade effect
- Maintained consistent badge styling with color variations based on index position
- Fixed compilation errors by removing leftover code fragments from the previous implementation
- Optimized vertical spacing between rows (reduced from space-y-8 to space-y-3)
- Reduced badge padding and made them more compact (px-3 py-1.5 instead of px-4 py-2)
- Decreased container padding from py-4 to py-2 for tighter row arrangement
- Changed ring styling from ring-2 to ring-1 for more subtle borders
- Removed "Hover over a row to pause animation" text (June 29, 2025)

### Ultracite Removal (Earlier June 2025)

- Determined Ultracite (Biome-based linter/formatter) was unsuitable for the project
- Removed all traces (scripts, dependencies, configuration files)
- Added to FUTURE_FEATURES.md as a consideration for future projects

## Implementation Notes

The following changes were made as temporary fixes:

1. Created a custom `.eslintrc.js` to suppress warnings without failing builds
2. Added React imports to key TypeScript definition files
3. Documented the issues in `docs/ESLINT_CONFIGURATION.md` and `docs/ESLINT_WARNINGS_RESOLUTION_GUIDE.md`

A proper long-term solution would be to systematically address all warnings according to the four categories detailed above, following the approach outlined in the ESLINT_WARNINGS_RESOLUTION_GUIDE.md.

## Related Files

- `.eslintrc.js` - Custom ESLint configuration
- `docs/ESLINT_CONFIGURATION.md` - Documentation of ESLint issues and solutions
- `docs/ESLINT_WARNINGS_RESOLUTION_GUIDE.md` - Detailed step-by-step guide for fixing ESLint warnings
- `src/components/GovernmentClients.tsx` - Updated with Aceternity-style infinite marquee animation
- `src/components/ui/infinite-moving-badges.tsx` - New component for badge marquee effect with CSS animations
- `src/components/ui/scroll-base-animation.tsx` - Previous animation component (deprecated)
- `src/components/ui/scroll-text-marquee.tsx` - Original component name (deprecated)
- `src/app/globals.css` - Contains the CSS animation keyframes for the marquee effect
- Multiple type definition files in `/src/types/`
- Component files across the codebase

## Project Architecture Notes

The project follows Next.js App Router architecture with internationalization support:

- Root layout manages global styles and metadata
- Pages are organized under `src/app/[lang]/` for multilingual support
- Components are separated into logical categories in `src/components/`
- Type definitions are centralized in `src/types/`
- Shared utilities in `src/utils/`
- Configuration settings in `src/config/`

The internationalization system uses:

- Language files in `src/lang/`
- Dictionary loading in `i18n-config.ts`
- Middleware for language detection and routing
