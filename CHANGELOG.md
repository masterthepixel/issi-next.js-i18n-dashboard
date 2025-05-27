# Changelog

All notable changes to the ISSI Next.js Multilingual Website will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Fixed
- Fixed build error by adding missing `@formatjs/intl` dependency
- Successfully configured production build process with static page generation
- Fixed IntlProvider error in Hero component with proper component wrapping

### Added
- Created and integrated Hero component with multilingual support
- Added HeroWrapper component to provide IntlProvider context
- Validated production build with Next.js static site generation
- Confirmed multilingual route generation for all supported languages
- Updated package.json with required dependencies
- Created comprehensive INSTRUCTIONS.md for developer guidance
- Added detailed INTERNATIONALIZATION.md technical documentation

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
