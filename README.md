# ISSI Next.js Multilingual Website

![Localizely progress](https://img.shields.io/localizely/progress/314cdb30-1e80-4acf-afbf-6195d164ca77?token=9b2c2727a3334e25952ea204a6cc8708c8465e4ae300425caff926fbc627ada7&languageCode=en) ![Localizely progress](https://img.shields.io/localizely/progress/314cdb30-1e80-4acf-afbf-6195d164ca77?token=9b2c2727a3334e25952ea204a6cc8708c8465e4ae300425caff926fbc627ada7&languageCode=es) ![Localizely progress](https://img.shields.io/localizely/progress/314cdb30-1e80-4acf-afbf-6195d164ca77?token=9b2c2727a3334e25952ea204a6cc8708c8465e4ae300425caff926fbc627ada7&languageCode=fr)

This repository contains the codebase for the International Software Systems International (ISSI) website. The website is built using Next.js with internationalization (i18n) capabilities, allowing for a multilingual user experience.

![demo](/public/demo.png)

## About ISSI

International Software Systems International (ISSI) is a company specializing in software solutions. Located in Greenbelt, Maryland, ISSI provides innovative software services to meet various business needs.

## Project Overview

This Next.js application features:

- **Multilingual Support**: Website content is available in multiple languages including English, Spanish, and French
- **Modern UI**: Responsive design with interactive components
- **Dashboard Interface**: Organized presentation of company information and services
- **App Router**: Utilizes Next.js App Router for efficient routing and navigation
- **Universal Breadcrumb System**: Automatic navigation with 3D globe integration
- **Enterprise SEO**: Comprehensive structured data and metadata optimization

## ✨ Featured: Universal Breadcrumb System

Our **zero-configuration breadcrumb system** automatically provides professional navigation across all pages:

### 🎯 **Key Features**

- **🚀 Zero Setup**: Works automatically for any new page - no manual configuration required
- **🌍 3D Globe Integration**: Stunning Inspira UI-style globe on every breadcrumb
- **🔍 Enterprise SEO**: Automatic JSON-LD structured data for rich search results
- **🌐 Smart i18n**: Intelligent translation fallbacks in English, French, Spanish
- **📱 Fully Responsive**: Perfect positioning on mobile and desktop
- **⚡ Performance Optimized**: SSR-safe with efficient Three.js rendering

### 🛠 **Developer Experience**

```bash
# Create any new page
touch src/app/[lang]/my-feature/page.tsx

# Result: Automatic breadcrumb appears with:
# ✅ 3D globe background
# ✅ Multi-language navigation
# ✅ SEO structured data
# ✅ Zero configuration needed
```

👉 **[Read Full Documentation](./docs/UNIVERSAL_BREADCRUMB_DOCUMENTATION.md)**

## Technology Stack

- **Framework**: Next.js 14.2+
- **Styling**: Tailwind CSS
- **Internationalization**:
  - @formatjs/intl
  - react-intl
- **State Management**: React context and hooks
- **Package Manager**: pnpm

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- pnpm 8.x or higher

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/issi-next.js-i18n-dashboard.git
   cd issi-next.js-i18n-dashboard
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Approve necessary build scripts:

   ```bash
   # When prompted about "unrs-resolver", you should approve it
   # This is a dependency related to Next.js URL resolution
   pnpm approve unrs-resolver
   ```

   > Note: pnpm's security feature requires explicit approval to run scripts from dependencies. The `unrs-resolver` is safe to approve as it's related to Next.js functionality.

4. Start the development server:

   ```bash
   pnpm dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to view the website.

## Internationalization

The website supports multiple languages through a custom i18n implementation:

- Language files are stored in `src/lang` directory
- Language switching is available in the UI
- Default language detection is handled via browser preferences

To add or modify translations, edit the JSON files in the language directories.

## Project Structure

```
issi-next.js-i18n-dashboard/
├── public/           # Static assets
├── src/
│   ├── app/          # App Router pages
│   ├── components/   # Reusable UI components
│   ├── lang/         # Language/translation files
│   ├── lib/          # Utility functions
│   └── middleware.ts # Language detection middleware
├── i18n-config.ts    # i18n configuration
├── next.config.js    # Next.js configuration
└── tailwind.config.js # Tailwind CSS configuration
```

## Deployment

The website is configured for deployment on Vercel or similar platforms.

## Contact Information

**International Software Systems International (ISSI)**

- **Address**: 7337 Hanover Pkwy, Suite# A, Greenbelt, MD 20770
- **Phone**: 301-982-9700
- **Business Development**: 301-982-9700
- **Products Contact**: 301-982-9700
- **Fax**: 301-982-0500
- **Toll Free**: 1-888-810-3661

## Useful links

- [Next.js documentation](https://nextjs.org/docs)
- [Next.js deployment documentation](https://nextjs.org/docs/deployment)
- [Next.js internationalization (i18n) tutorial](https://localizely.com/blog/nextjs-i18n-tutorial/?tab=app-router)
- [React Intl documentation](https://formatjs.io/docs/react-intl/)

---

## 📚 Documentation Index

This project includes comprehensive instructions and guides for all major development and design areas. Use this section as a quick reference to all available documentation:

### Core Guides

- **INSTRUCTIONS.md** – General developer setup, workflow, project structure, and advanced UI/theming/compliance notes
- **INTERNATIONALIZATION.md** – Deep-dive into i18n architecture, language files, and data flow
- **I18N_ARCHITECTURE.md** – Architecture diagrams and detailed internationalization implementation
- **COMPONENT_INTEGRATION_GUIDE.md** – How to build, wrap, and integrate i18n-ready client/server components
- **BENTOGRID_CREATION_GUIDE.md** – Complete guide for creating and localizing BentoGrid components
- **TROUBLESHOOTING.md** – Solutions for common i18n issues and error resolution
- **JSON_VALIDATION_GUIDE.md** – JSON validation, linting, and best practices

### Design & Theming

- **COLOR_PALETTE_INSTRUCTIONS.md** – Text and background color usage for light/dark mode, Tailwind and CSS variable usage
- **BACKGROUND_STYLES_REFERENCE.md** – Reference for all background patterns, gradients, and glassmorphism effects

### Changelog

- **CHANGELOG.md** – All major UI, UX, compliance, and navigation changes, with dates and details

### Quick Start

- See `INSTRUCTIONS.md` for setup and workflow
- Always update the changelog and translation files when adding new features
- Follow theming and i18n patterns in all new components/pages

---

_Last updated: June 9, 2025_
