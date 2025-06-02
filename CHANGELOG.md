# Changelog

All notable changes to the ISSI Next.js Multilingual Website will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased] - 2025-06-03

### Added

- **ISO 9001:2015 Certification Page Implementation**: Complete transformation from placeholder to comprehensive quality management system page
  - **Translation System Expansion**: Added 80+ comprehensive translation keys across all languages (EN/FR/ES)
    - Hero section with title, subtitle, description, and certification badges
    - Features section covering leadership, customer focus, process approach, performance evaluation, improvement, evidence-based decisions, and relationship management
    - Benefits section for healthcare, manufacturing, technology, finance, and government sectors
    - Process workflow with Plan-Do-Check-Act (PDCA) cycle implementation
    - Standards integration covering ISO 27001, CMMI, SOC 2, GDPR, and GDPR-BCR compliance
    - Certificate details including standard, version, scope, and validity information
    - Performance metrics with satisfaction, efficiency, and reliability statistics
    - Contact section with quality team engagement options
  - **Comprehensive Page Structure**: Implemented 14-section layout following established design patterns
    1. Hero section with certification badges
    2. Features showcase (7 key QMS principles)
    3. Industry benefits (5 sector-specific advantages)
    4. Implementation process (PDCA methodology)
    5. Standards integration matrix
    6. Certificate information display
    7. Performance metrics dashboard
    8. Quality team contact section
  - **UI Component Integration**: Applied consistent styling with glowing stars background, animated elements, and responsive design

- **CMMI Level 3 Certification Page Implementation**: Complete transformation from minimal placeholder (28 lines) to comprehensive full-featured certification page (400+ lines)
  - **Translation System Expansion**: Added 80+ comprehensive CMMI Level 3 translation keys across all languages (EN/FR/ES)
    - Hero section with process maturity badges (`cmmi.hero.*`) - 5 keys for titles, subtitles, and certification badges:
      * `cmmi.hero.title` - "CMMI Level 3 Certification"
      * `cmmi.hero.subtitle` - "Defined Process Maturity Excellence"
      * `cmmi.hero.description` - Comprehensive maturity model description
      * `cmmi.hero.badge.certified` - "CMMI Level 3 Certified"
      * `cmmi.hero.badge.defined` - "Defined Process Maturity" 
      * `cmmi.hero.badge.standardized` - "Standardized Processes"
    - Process areas mastery (`cmmi.features.*`) - 14 keys covering 6 essential CMMI Level 3 domains:
      * Requirements Management (`cmmi.features.requirements.*`) - systematic requirements change management and traceability
      * Project Planning (`cmmi.features.planning.*`) - comprehensive project planning processes with stakeholder involvement
      * Project Monitoring & Control (`cmmi.features.monitoring.*`) - continuous progress monitoring and corrective actions
      * Measurement & Analysis (`cmmi.features.measurement.*`) - systematic metrics collection, analysis, and reporting
      * Process & Product Quality Assurance (`cmmi.features.quality.*`) - objective evaluation of adherence to standards
      * Configuration Management (`cmmi.features.configuration.*`) - systematic control of work product changes and baselines
    - Industry benefits (`cmmi.benefits.*`) - 12 keys for sector-specific advantages:
      * Government sector (`cmmi.benefits.government.*`) - predictability, compliance, and risk management
      * Commercial enterprise (`cmmi.benefits.commercial.*`) - quality delivery, reduced time-to-market, cost optimization
      * Energy & infrastructure (`cmmi.benefits.energy.*`) - safety protocols, reliability standards, regulatory compliance
    - Process maturity framework (`cmmi.process.*`) - 12 keys covering all 5 CMMI maturity levels:
      * Level 1 Initial (`cmmi.process.level1.*`) - unpredictable, reactive, work completed but often delayed
      * Level 2 Managed (`cmmi.process.level2.*`) - managed on project level, often reactive but project delivery predictable
      * Level 3 Defined (`cmmi.process.level3.*`) - proactive, organization-wide standards, process characterized and understood
      * Level 4 Quantitatively Managed (`cmmi.process.level4.*`) - measured and controlled using statistical techniques
      * Level 5 Optimizing (`cmmi.process.level5.*`) - continuous process improvement through quantitative feedback
    - Standards integration (`cmmi.integration.*`) - 8 keys for seamless alignment:
      * ISO 9001:2015 quality management system integration
      * ISO 27001:2022 information security management alignment
      * Agile and DevOps methodology compatibility
      * Regulatory compliance framework support
    - Certificate details (`cmmi.certificate.*`) - 12 keys with comprehensive certification information:
      * Standard: CMMI for Development v2.0 specification
      * Maturity Level: Level 3 - Defined Process Excellence
      * Scope: Software development and systems engineering processes
      * Certification Body: CMMI Institute authorized Lead Appraiser
      * Valid Until: March 2027 with annual surveillance audits
      * Coverage: 6 process areas with organizational standard processes
    - Performance metrics (`cmmi.metrics.*`) - 12 keys demonstrating measurable process effectiveness:
      * On-time delivery rate: 94% project completion within schedule
      * Quality gate success: 98% successful quality milestone achievement
      * Defect density: 0.8 defects per KLOC (thousand lines of code)
      * Productivity improvement: 25% increase in development velocity
    - Process excellence team contact (`cmmi.contact.*`) - 4 keys for stakeholder engagement:
      * Team consultation and process assessment services
      * CMMI implementation roadmap downloads
      * Process improvement workshop scheduling
      * Organizational maturity evaluation requests
  - **Comprehensive Page Structure**: Implemented following proven ISO 9001 pattern with 8 major sections
    1. Hero section with CMMI Level 3 certification badges (Certified, Defined Process Maturity, Standardized Processes)
    2. Process areas mastery showcase (6 key CMMI Level 3 domains with detailed descriptions and benefits)
    3. Industry-specific benefits (Government: predictability & compliance; Commercial: quality & time-to-market; Energy: safety & reliability)
    4. Process maturity framework progression (5-level CMMI model visualization with capability descriptions)
    5. Standards integration matrix (quality management, information security, agile development methodologies)
    6. Certificate information display (CMMI v2.0, Level 3 - Defined, valid until March 2027, authorized appraiser)
    7. Performance metrics dashboard (delivery rates, quality gates, defect density, productivity improvements with trend analysis)
    8. Process team contact section with consultation, guide downloads, and assessment request options
  - **UI Component Integration**: Applied consistent design patterns following established architecture
    * AnimatedBackground component with glowing stars effect for visual appeal
    * Responsive grid layouts for optimal viewing across all device sizes
    * Modern styling with gradient text effects and smooth animations
    * Consistent typography and spacing following design system guidelines
    * Interactive hover effects and smooth scroll navigation
  - **Multilingual Support**: Complete translations in English, French, and Spanish following established i18n patterns
    * English (`en.json`): Native implementation with comprehensive CMMI terminology
    * French (`fr.json`): Professional translation maintaining technical accuracy
    * Spanish (`es.json`): Complete localization with regional compliance considerations
    * Consistent key naming conventions across all language files
    * Cultural adaptation for different market requirements
  - **JSON Syntax Resolution**: Fixed critical parsing errors across all language files preventing successful builds
    * Removed problematic comment lines causing build failures in all translation files
    * Corrected duplicate key conflicts in EN/FR/ES files (removed redundant entries)
    * Fixed language mixing issues (Spanish text in English file, French text in Spanish file)
    * Ensured proper comma placement and JSON object structure throughout all files
    * Validated JSON syntax integrity for successful webpack compilation
  - **Build Validation Success**: Achieved complete compilation without errors
    * TypeScript compilation successful with no type errors
    * Next.js build process completed successfully using `pnpm build`
    * Development server running smoothly on port 3001
    * All language routes accessible and functional (EN/FR/ES)
    * Translation system working correctly across all page sections

### Changed

- **Page Architecture**: Transformed `/src/app/[lang]/compliance/iso9001/page.tsx` from minimal placeholder to full-featured certification page
- **Translation Key Structure**: Standardized naming conventions for ISO 9001 content organization
- **Typography Enhancement**: Added comprehensive font ligature support and optimized text rendering in `globals.css`
  - Enhanced font feature settings with ligatures, kerning, and contextual alternates
  - Improved text rendering with `optimizeLegibility` and proper antialiasing
  - Added font variant ligatures for better typography display

### Fixed

- **Translation Key Mismatches**: Corrected inconsistent key naming throughout the implementation
  - `iso9001.features.customerFocus.*` → `iso9001.features.customer.*`
  - `iso9001.features.processApproach.*` → `iso9001.features.process.*`
  - `iso9001.features.evidenceBased.*` → `iso9001.features.evidence.*`
  - `iso9001.features.relationshipManagement.*` → `iso9001.features.relationship.*`
  - `iso9001.metrics.*.title` → `iso9001.metrics.*.label`
  - `iso9001.hero.badge[1-3]` → `iso9001.hero.badge.[certified|continuous|customer]`
- **JSON Syntax Errors**: Resolved parsing issues in French and Spanish translation files by adding missing commas
- **Framer Motion Dependencies**: Updated imports from deprecated `motion/react` to `framer-motion` in UI components
  - Fixed `glowing-stars-background.tsx` import statements
  - Fixed `glowing-stars.tsx` import statements
- **CSS Smooth Scrolling**: Added `scroll-behavior: smooth` and `scroll-padding-top: 4rem` for enhanced navigation experience

### Technical Details

- **Translation Files Updated**:
  - `/src/lang/en.json` - Added comprehensive ISO 9001 English translations + 80+ CMMI Level 3 translation keys with JSON syntax fixes
  - `/src/lang/fr.json` - Added complete French translations with JSON syntax fixes + 80+ CMMI Level 3 French translations
  - `/src/lang/es.json` - Added complete Spanish translations with JSON syntax fixes + 80+ CMMI Level 3 Spanish translations
- **Component Files Modified**:
  - `/src/app/[lang]/compliance/iso9001/page.tsx` - Complete ISO 9001 page implementation
  - `/src/app/[lang]/compliance/cmmi3/page.tsx` - Complete CMMI Level 3 page transformation (28 lines → 400+ lines)
  - `/src/components/ui/glowing-stars-background.tsx` - Import fixes
  - `/src/components/ui/glowing-stars.tsx` - Import fixes
  - `/src/app/globals.css` - Typography and scroll enhancements

## [Unreleased] - 2025-06-02

### Added

- **ISO 9001:2015 Certification Page Implementation**: Complete transformation from placeholder to comprehensive quality management system page
  - **Translation System Expansion**: Added 80+ comprehensive translation keys across all languages (EN/FR/ES)
    - Hero section with title, subtitle, description, and certification badges
    - Features section covering leadership, customer focus, process approach, performance evaluation, improvement, evidence-based decisions, and relationship management
    - Benefits section for healthcare, manufacturing, technology, finance, and government sectors
    - Process workflow with Plan-Do-Check-Act (PDCA) cycle implementation
    - Standards integration covering ISO 27001, CMMI, SOC 2, GDPR, and GDPR-BCR compliance
    - Certificate details including standard, version, scope, and validity information
    - Performance metrics with satisfaction, efficiency, and reliability statistics
    - Contact section with quality team engagement options
  - **Comprehensive Page Structure**: Implemented 14-section layout following established design patterns
    1. Hero section with certification badges
    2. Features showcase (7 key QMS principles)
    3. Industry benefits (5 sector-specific advantages)
    4. Implementation process (PDCA methodology)
    5. Standards integration matrix
    6. Certificate information display
    7. Performance metrics dashboard
    8. Quality team contact section
  - **UI Component Integration**: Applied consistent styling with glowing stars background, animated elements, and responsive design
  - **Typography Enhancement**: Added comprehensive font ligature support and optimized text rendering in `globals.css`
    - Enhanced font feature settings with ligatures, kerning, and contextual alternates
    - Improved text rendering with `optimizeLegibility` and proper antialiasing
    - Added font variant ligatures for better typography display

- **Complete Compliance Page Restoration**: Restored all missing components and sections to the compliance page
  - **ComplianceHero Component**: Created comprehensive hero section with features array, internationalization support
  - **ComplianceHeroWrapper**: Implemented IntlProvider wrapper for proper i18n context
  - **ComplianceStats Component**: Built statistics section displaying 4 key metrics (certifications, audits, uptime, incidents)
  - **ComplianceStatsWrapper**: Created wrapper component following established patterns
  - **ComplianceIndustryCertifications Component**: Developed industry certifications showcase with 6 certification logos (ISO 27001, CMMI Level 3, ISO 9001, MDOT MBE/DBE/SBE, SOC 2 Type II, GDPR Compliant)
  - **ComplianceIndustryCertificationsWrapper**: Created IntlProvider wrapper for certification component
  - **Logo Clouds Integration**: Restored partner network logos (Microsoft, AWS, Oracle, IBM) to compliance page
  - **Awards Section Integration**: Added industry awards component to compliance page
  - **Translation System Enhancement**: Added 32 comprehensive translation keys across all three languages (EN/FR/ES)
    - 16 keys for hero component (titles, descriptions, features)
    - 12 keys for stats component (metrics labels and values)
    - 4 keys for industry certifications (title, description, CTAs)

- **ISO 9001:2015 Certification Page Implementation**: Complete transformation from placeholder to comprehensive quality management system page
  - **Translation System Expansion**: Added 80+ comprehensive translation keys across all languages (EN/FR/ES)
    - Hero section with title, subtitle, description, and certification badges
    - Features section covering leadership, customer focus, process approach, performance evaluation, improvement, evidence-based decisions, and relationship management
    - Benefits section for healthcare, manufacturing, technology, finance, and government sectors
    - Process workflow with Plan-Do-Check-Act (PDCA) cycle implementation
    - Standards integration covering ISO 27001, CMMI, SOC 2, GDPR, and GDPR-BCR compliance
    - Certificate details including standard, version, scope, and validity information
    - Performance metrics with satisfaction, efficiency, and reliability statistics
    - Contact section with quality team engagement options
  - **Comprehensive Page Structure**: Implemented 14-section layout following established design patterns
    1. Hero section with certification badges
    2. Features showcase (7 key QMS principles)
    3. Industry benefits (5 sector-specific advantages)
    4. Implementation process (PDCA methodology)
    5. Standards integration matrix
    6. Certificate information display
    7. Performance metrics dashboard
    8. Quality team contact section
  - **UI Component Integration**: Applied consistent styling with glowing stars background, animated elements, and responsive design

### Changed

- **Compliance Page Structure**: Updated page layout with proper component flow:
  1. Hero section (activated)
  2. Compliance Certifications (bento grid - existing)
  3. Stats section (restored)
  4. Partner Network (logo clouds - restored)
  5. Industry Certifications (new)
  6. Awards section (added)
- **Image Path Updates**: Updated certification logos to use correct `/images/compliance/IndustryCertifications/` directory
- **Component Integration**: Removed standalone card component displaying "Compliance Solutions" text for cleaner layout
- **Page Architecture**: Transformed `/src/app/[lang]/compliance/iso9001/page.tsx` from minimal placeholder to full-featured certification page
- **Translation Key Structure**: Standardized naming conventions for ISO 9001 content organization
- **Typography Enhancement**: Added comprehensive font ligature support and optimized text rendering in `globals.css`
  - Enhanced font feature settings with ligatures, kerning, and contextual alternates
  - Improved text rendering with `optimizeLegibility` and proper antialiasing
  - Added font variant ligatures for better typography display

### Fixed

- **Missing Components**: Restored previously empty ComplianceHero, ComplianceHeroWrapper, ComplianceStats, and ComplianceStatsWrapper components
- **Logo Display**: Fixed missing logo clouds that were previously displayed on compliance page
- **Component Flow**: Established proper component hierarchy and integration patterns
- **Translation Key Mismatches**: Corrected inconsistent key naming throughout the implementation
  - `iso9001.features.customerFocus.*` → `iso9001.features.customer.*`
  - `iso9001.features.processApproach.*` → `iso9001.features.process.*`
  - `iso9001.features.evidenceBased.*` → `iso9001.features.evidence.*`
  - `iso9001.features.relationshipManagement.*` → `iso9001.features.relationship.*`
  - `iso9001.metrics.*.title` → `iso9001.metrics.*.label`
  - `iso9001.hero.badge[1-3]` → `iso9001.hero.badge.[certified|continuous|customer]`
- **JSON Syntax Errors**: Resolved parsing issues in French and Spanish translation files by adding missing commas
- **Framer Motion Dependencies**: Updated imports from deprecated `motion/react` to `framer-motion` in UI components
  - Fixed `glowing-stars-background.tsx` import statements
  - Fixed `glowing-stars.tsx` import statements
- **CSS Smooth Scrolling**: Added `scroll-behavior: smooth` and `scroll-padding-top: 4rem` for enhanced navigation experience

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
