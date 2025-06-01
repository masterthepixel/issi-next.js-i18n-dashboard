# Changelog

All notable changes to the ISSI Next.js Multilingual Website will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased] - 2025-05-29

### Added

- **Animated Meteor Background Effect**: Implemented dynamic meteor animation for dark mode

  - **Meteors Component**: Created `/src/components/ui/meteors.tsx` with customizable meteor animations using framer-motion
  - **AnimatedBackground Component**: Built `/src/components/AnimatedBackground.tsx` for dark mode detection and conditional meteor rendering
  - **Tailwind Animation**: Added `meteor-effect` keyframes to `tailwind.config.ts` for smooth meteor movement across the screen
  - **Theme Integration**: Updated `ThemeProvider` integration in main layout for site-wide theme context
  - **Full Viewport Coverage**: Meteors now cover the entire document height and width for immersive effect
  - **Dark Mode Only**: Grid background removed in dark mode, meteors only appear when dark theme is active
  - **Performance Optimized**: Uses CSS transforms and GPU acceleration for smooth animations
  - **Dependencies**: Added framer-motion, clsx, and tailwind-merge for animation and utility functions

- **Vercel Deployment Fix**: Resolved Husky installation issues in production environments

  - **Environment Detection**: Updated `prepare` script to skip Husky installation in production, CI, and Vercel environments
  - **DevDependencies**: Moved Husky to devDependencies for proper development-only installation
  - **Vercel Ignore**: Updated `.vercelignore` to exclude only development files while keeping build-required scripts
  - **Build Script Resilience**: Added conditional JSON validation that gracefully handles missing scripts in production
  - **Graceful Handling**: Added error handling for missing Husky in production environments

- **JSON Validation and Linting System**: Implemented comprehensive validation system to prevent JSON syntax errors

  - **Custom JSON Validation Script**: Created `scripts/validate-json.js` with comprehensive validation for JSON files, structured data schemas, and TypeScript files with JSON operations
  - **Enhanced ESLint Configuration**: Added specialized rules for JSON safety, string handling, and object property validation
  - **Pre-commit Hooks**: Integrated Husky for automatic validation before code commits
  - **VS Code Integration**: Added settings for real-time JSON validation, formatting, and error highlighting
  - **Structured Data Validation**: Validates Schema.org JSON-LD schemas for required properties (@context, @type)
  - **Character Safety Checks**: Detects problematic characters in JSON strings (unescaped quotes, special characters, whitespace)
  - **Build Integration**: Added JSON validation to build process to catch errors before deployment
  - **Documentation**: Created comprehensive JSON_VALIDATION_GUIDE.md with troubleshooting and best practices

- **Comprehensive About Page SEO Enhancement**: Implemented complete SEO optimization for all About Us page components
  - **SEO Metadata & Structured Data**: Added comprehensive generateMetadata function with OpenGraph, Twitter cards, canonical URLs, and language alternates
  - **JSON-LD Schemas**: Implemented Organization, Local Business, and Breadcrumb schemas with real ISSI business information (domain issi-software.com, address 7337 Hanover Pkwy Suite A Greenbelt MD 20770, phone 301-982-9700)
  - **Semantic HTML Structure**: Converted all About components (Hero, Stats, Certifications, Awards, PartnerNetwork) to use proper semantic HTML with `<section>`, `<h1>`, `<h2>` heading hierarchy
  - **ARIA Accessibility**: Added comprehensive ARIA labels, roles, and labelledby attributes for screen reader support
  - **Image Optimization**: Enhanced all images with descriptive alt texts, loading="lazy", priority flags, and proper sizes attributes
  - **Translation Keys**: Added SEO-focused translation keys (about.meta.title, about.meta.description, about.meta.keywords, about.hero.h1, about.hero.subtitle, about.stats.section.title, about.certifications.section.title, about.awards.section.title, about.partnerNetwork.section.title) for all three languages
- **AboutPartnerNetwork Component**: Created new partner network section showcasing industry partnerships with two-column responsive layout
- **Partner Network Images**: Added original color partner network images (pn1.jpg, pn2.jpg, pn3_1.jpg, pn4_1.jpg) without filters
- **Complete Internationalization**: Added partner network translation keys for English, French, and Spanish languages
- **AboutPartnerNetworkWrapper**: Created IntlProvider wrapper component for proper i18n context
- **Awards Translation Completion**: Added missing French and Spanish translation keys for awards section
- Implemented comprehensive Privacy Policy page with the same layout and functionality as the License - Terms of Use page, including profile-style header and advanced Table of Contents.
- Added intersection observer functionality and smooth scrolling navigation for Privacy Policy sections.
- Created full internationalization for Privacy Policy content (all translation keys in English, French, and Spanish).
- Updated translation files with 50+ privacy-related keys per language.
- Ensured all section IDs, TOC items, and translation keys are consistent and correct for the privacy page.- Transformed license page into comprehensive Terms of Use page with professional legal content
- Implemented advanced Table of Contents component with desktop sidebar and mobile overlay variants
- Added intersection observer functionality to track active sections in Terms of Use
- Created comprehensive internationalization for Terms of Use content (100+ translation keys per language)
- Added smooth scrolling navigation between Terms sections
- Added ESC key support and click-outside functionality for mobile TOC overlay
- Integrated ISSI company logo in navbar and footer branding
- Added useIntersectionObserver custom hook for tracking visible sections
- Created LicenseContentWrapper for client-side intersection observer functionality
- Created TermsContent component with comprehensive legal sections structure
- **JSON Validation and Linting System**: Implemented comprehensive validation system to prevent JSON syntax errors

  - **Custom JSON Validation Script**: Created `scripts/validate-json.js` with comprehensive validation for JSON files, structured data schemas, and TypeScript files with JSON operations
  - **Enhanced ESLint Configuration**: Added specialized rules for JSON safety, string handling, and object property validation
  - **Pre-commit Hooks**: Integrated Husky for automatic validation before code commits
  - **VS Code Integration**: Added settings for real-time JSON validation, formatting, and error highlighting
  - **Structured Data Validation**: Validates Schema.org JSON-LD schemas for required properties (@context, @type)
  - **Character Safety Checks**: Detects problematic characters in JSON strings (unescaped quotes, special characters, whitespace)
  - **Build Integration**: Added JSON validation to build process to catch errors before deployment
  - **Documentation**: Created comprehensive JSON_VALIDATION_GUIDE.md with troubleshooting and best practices

- Integrated `ComplianceCarouselWrapper` (Apple Cards Carousel) into the compliance page after the stats section.
- Cleaned up `ComplianceCarouselWrapper` for production (removed debug output and wrapper div).
- Internationalized ComplianceCarousel: All card titles, headlines, and body text now use translation keys and are present in English, French, and Spanish language files.
- Fixed type safety for carousel card data and ensured Card component renders translated titles using FormattedMessage.
- Carousel UI/UX: Ensured correct sizing, overflow handling, and added autoplay/looping functionality.

- **Compliance Subpages**: Added blank subpages for each compliance area in the carousel:
  - ISO 9001:2015 Certification
  - ISO 27001:2013 Certification
  - Maryland DOT MBE/DBE/SBE Certification
  - CMMI Level 3 Certification
  - Each page includes SEO metadata and placeholder content.
  - All pages use the theme-driven h1 gradient and p text styles.
  - No unique content yet; ready for future expansion.

- Added a dark-mode compatible, non-transparent Compliance submenu to the main navigation, following the Apple Cards Carousel pattern and including a CTA area at the bottom.
- The Compliance submenu now includes a direct link to the main Compliance & Certifications page, as well as links to all four compliance subpages (ISO 9001, ISO 27001, MDOT, CMMI Level 3).
- All submenu items use theme-driven colors, icons, and are accessible in both light and dark mode.
- Created blank subpages for each compliance area with SEO metadata and placeholder content.
- Updated navigation logic so the main Compliance link opens the submenu, and the submenu provides access to all compliance-related pages.
- Refined styling and layout for consistency with the rest of the application.

### Changed

- **AboutPartnerNetwork Integration**: Added partner network section to About page between awards and team sections
- **Image Display**: Removed all color filters from partner network images to display in original colors
- **UI Improvements**: Removed action buttons from partner network component for cleaner layout
- **Font Sizing**: Updated AboutAwards component to use consistent typography matching design system
- **Performance Optimization**: Converted img elements to Next.js Image components in license page for better LCP and bandwidth optimization
- Updated license page to display comprehensive Terms of Use while preserving profile-style header
- Replaced text "ISSI" with actual logo image in navbar branding
- Enhanced footer to include both ISSI logo and full company name "International Software Systems, Inc."
- Fixed background grid pattern bleeding issue by adjusting fade start position to 400px
- Updated grid background z-index to -1 for proper content layering
- Improved visual hierarchy in footer with logo, company name, and description
- TeamGrid: Avatar images now use both `object-cover` and `rounded-full` to ensure all team member portraits are perfectly circular and visually consistent across browsers.
- Team member cards are now wider and have improved spacing for better visual balance.
- Card layout updated: photo, name, and title are in a single row, with the name stacked above the title, and the bio text in its own row below.
- All card content is left-aligned within the card for improved readability.
- Updated the grid layout to use a masonry layout for a more dynamic and visually appealing presentation.
- Increased card padding for better content separation from card edges.

### Fixed

- Resolved background grid pattern visibility issues in profile header areas
- Fixed grid background fade positioning to prevent interference with page headers
- Corrected z-index layering to ensure content appears properly above background patterns

## [0.4.0] - 2025-05-28

### Added

- Implemented beautiful grid background pattern for the entire application
- Added `cn` utility function in `src/lib/utils.ts` for class name concatenation using clsx
- Created grid background CSS classes with light and dark mode variants
- Added radial gradient fade effect for enhanced visual appeal
- Created 15 new application pages with proper SEO metadata and internationalization:
  - About, Services, Products, Contact, Government, eLearning, Compliance
  - Careers, Support, Documentation, Guides, News, Privacy, Terms, License
- Added comprehensive page translation keys for all three languages (en, fr, es)
- Implemented consistent page structure based on discover page pattern
- Implemented scroll-responsive navbar that reduces height from 64px to 48px when scrolling down
- Added smooth transitions for navbar height changes with 300ms duration

### Changed

- Replaced solid background color (`bg-slate-50`) with animated grid pattern background
- Enhanced visual design with subtle grid lines and center fade effect
- Updated layout to use new grid background class
- Replaced emoji social media icons with Lucide React icons in Footer component
- Reduced social media icon size from h-5 w-5 to h-4 w-4 in Footer for better visual balance
- Reduced navbar icon sizes from size-6 to size-5 for contact and language switcher icons
- Updated Footer social links to use Facebook, Youtube, and Linkedin components from lucide-react package

### Fixed

- Resolved 500 errors from empty page files by implementing proper React components
- Fixed missing page routes that were previously causing navigation failures

## [0.3.0] - 2025-05-28

### Added

- Implemented comprehensive footer component with glass effect styling
- Added four-column footer layout (Services, Support, Company, Legal sections)
- Added social media integration with real ISSI links (Facebook, YouTube, LinkedIn)
- Added Heroicons throughout footer for consistent iconography
- Added footer translations to all language files with proper internationalization
- Added dynamic copyright year display (showing 2025)

### Changed

- Updated footer company name to display full "International Software Systems, Inc. (ISSI)"
- Updated footer company description to award-winning text in all three languages
- Updated FooterWrapper to follow server component pattern like Navbar
- Optimized footer grid layout (1/4 brand, 3/4 navigation) with reduced gaps for multilingual support

## [0.2.0] - 2025-05-28

### Added

- Added new menu items: Services, Products, Government, eLearning, Compliance, About
- Added contact icon to the navbar for quick access to contact page

### Changed

- Centered navigation menu items in desktop view for better visual balance
- Reduced desktop navigation menu font size to `text-sm` for better multilingual support
- Reduced desktop navigation menu icon size from `size-5` to `size-4` for improved proportions
- Removed Reports link from main menu navigation
- Removed Discover link from main menu navigation
- Removed Home link from main menu, using ISSI logo/text as home link instead

## [0.1.1] - 2025-05-28

### Added

- Implemented dark mode toggle functionality throughout the application
- Added ThemeContext to manage dark/light mode state
- Added ThemeToggle component with Heroicons for toggling themes
- Added ThemeToggleWrapper to provide proper IntlProvider context
- Added smooth theme transitions for better user experience
- Added darkModeScript for preserving user theme preference
- Added theme-related translations to all language files (en, fr, es)
- Added glass effect styling to navigation elements with custom backdrop-saturate values

### Changed

- Updated Tailwind configuration to use 'class' for dark mode strategy
- Enhanced NavbarContent component with theme toggle integration
- Fixed CSS syntax formatting in globals.css for glass effect classes
- Changed backdrop-saturate-150 to backdrop-saturate-180 for improved glass appearance
- Updated component styling to support dark mode variants including:
  - Hero component
  - TopNav component
  - Card and CardHeader components
  - Content component
  - Menu and MenuItem components

### Fixed

## [0.1.0] - 2025-05-27

### Added

- Created comprehensive README.md with project documentation
- Added Spanish language support (replacing German)
- Created TopNav component for horizontal navigation on desktop

### Changed

- Restructured navigation to follow conventional top navigation pattern
- Updated language order in selector to: English, French, Spanish
- Removed sidebar navigation in favor of top navigation
- Updated i18n configuration to use "es" locale instead of "de"
- Modified Content component to use full width of the page
- Updated Localizely configuration to reflect language changes

### Removed

- Removed German language support (replaced with Spanish)
- Disabled sidebar component to prevent display on all screen sizes
- Removed demo-specific content from README

### Fixed

- Fixed pnpm build script approval instructions in README
- Updated metadata and contact information
