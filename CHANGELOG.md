# Changelog

All notable changes to the ISSI Next.js Multilingual Website will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Implemented dark mode toggle functionality throughout the application
- Added ThemeContext to manage dark/light mode state
- Added ThemeToggle component with Heroicons for toggling themes
- Added ThemeToggleWrapper to provide proper IntlProvider context
- Added smooth theme transitions for better user experience
- Added darkModeScript for preserving user theme preference
- Added theme-related translations to all language files (en, fr, es)
- Added glass effect styling to navigation elements with custom backdrop-saturate values
- Added new menu items: Services, Products, Government, eLearning, Compliance, About
- Added contact icon to the navbar for quick access to contact page

### Changed
- Updated Tailwind configuration to use 'class' for dark mode strategy
- Enhanced NavbarContent component with theme toggle integration
- Fixed CSS syntax formatting in globals.css for glass effect classes
- Changed backdrop-saturate-150 to backdrop-saturate-180 for improved glass appearance
- Removed Reports link from main menu navigation
- Removed Discover link from main menu navigation
- Removed Home link from main menu, using ISSI logo/text as home link instead
- Centered navigation menu items in desktop view for better visual balance
- Reduced desktop navigation menu font size to `text-sm` for better multilingual support
- Reduced desktop navigation menu icon size from `size-5` to `size-4` for improved proportions
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
