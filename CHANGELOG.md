# Changelog

All notable changes to the ISSI Next.js Multilingual Website will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Transformed license page into comprehensive Terms of Use page with professional legal content
- Implemented advanced Table of Contents component with desktop sidebar and mobile overlay variants
- Added intersection observer functionality to track active sections in Terms of Use
- Created comprehensive internationalization for Terms of Use content (100+ translation keys per language)
- Added smooth scrolling navigation between Terms sections
- Added ESC key support and click-outside functionality for mobile TOC overlay
- Integrated ISSI company logo in navbar and footer branding
- Added useIntersectionObserver custom hook for tracking visible sections
- Created LicenseContentWrapper for client-side intersection observer functionality
- Created TermsContent component with comprehensive legal sections structure

### Changed

- Updated license page to display comprehensive Terms of Use while preserving profile-style header
- Replaced text "ISSI" with actual logo image in navbar branding
- Enhanced footer to include both ISSI logo and full company name "International Software Systems, Inc."
- Fixed background grid pattern bleeding issue by adjusting fade start position to 400px
- Updated grid background z-index to -1 for proper content layering
- Improved visual hierarchy in footer with logo, company name, and description

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
