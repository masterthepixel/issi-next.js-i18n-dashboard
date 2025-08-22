# ISSI Next.js Multilingual Website

![Localizely progress](https://img.shields.io/localizely/progress/314cdb30-1e80-4acf-afbf-6195d164ca77?token=9b2c2727a3334e25952ea204a6cc8708c8465e4ae300425caff926fbc627ada7&languageCode=en) ![Localizely progress](https://img.shields.io/localizely/progress/314cdb30-1e80-4acf-afbf-6195d164ca77?token=9b2c2727a3334e25952ea204a6cc8708c8465e4ae300425caff926fbc627ada7&languageCode=es) ![Localizely progress](https://img.shields.io/localizely/progress/314cdb30-1e80-4acf-afbf-6195d164ca77?token=9b2c2727a3334e25952ea204a6cc8708c8465e4ae300425caff926fbc627ada7&languageCode=fr)

This repository contains the codebase for the International Software Systems International (ISSI) website. The website is built using Next.js with internationalization (i18n) capabilities, allowing for a multilingual user experience.

![demo](/public/demo.png)

## About ISSI

International Software Systems International (ISSI) is a company specializing in software solutions. Located in Greenbelt, Maryland, ISSI provides innovative software services to meet various business needs.

## Project Overview

This Next.js application features:

- **Multilingual Support**: Website content is available in multiple languages including English, Spanish, and French
- **Modern UI**: Responsive design with shadcn/ui components and BentoGrid layouts
- **Expandable Team Cards**: Advanced cult-ui based expandable card system with smooth animations
- **App Router**: Utilizes Next.js App Router for efficient routing and navigation
- **Universal Breadcrumb System**: Automatic navigation with 3D globe integration
- **AI-Powered Development**: Autonomous tmux orchestrator with 8-agent development team
- **Enterprise SEO**: Comprehensive structured data and metadata optimization
- **Product Showcase**: Dedicated ProductDetailsPage component with i18n support
- **Type Safety**: Full TypeScript integration with comprehensive type definitions
- **Accessibility**: WCAG-compliant components with ARIA labels and screen reader support

## ✨ Featured: Advanced Team Card System

Our **sophisticated expandable card system** provides professional team member showcase:

### � **Design Excellence**

- **🎭 Cult-UI Architecture**: Context-based expandable cards with React Context state management
- **⚙️ Smooth Animations**: Framer Motion integration with spring physics (200 stiffness, 20 damping)
- **� Perfect Rounded Corners**: Mathematical nested corner formula (Inner = Outer - Thickness/2)
- **� Complete Dark Mode**: Comprehensive theme support with proper contrast ratios
- **📱 Responsive Grid**: CSS Grid layout (1→2→3 columns) with optimal breakpoints
- **♿ WCAG Compliant**: Full accessibility with keyboard navigation and screen reader support

### � **Interactive Features**

```typescript
// Collapsed State: Clean 140px cards showing essentials
<ExpandableTrigger>
  {/* Avatar (64x64px) + Name + Position + Expand Icon */}
</ExpandableTrigger>

// Expanded State: Full biographical information
<ExpandableContent preset="slide-up">
  {/* Complete bio with smooth 0.4s spring animations */}
</ExpandableContent>
```

### 🌍 **Internationalization Ready**

- **Translation Keys**: `team.member.{id}.name`, `team.member.{id}.role`, `team.member.{id}.bio`
- **Multi-language**: Complete support for English, French, Spanish
- **Dynamic Content**: Scalable team member management system

👉 **[Read Full Documentation](./docs/UNIVERSAL_BREADCRUMB_DOCUMENTATION.md)**

## 🤖 Featured: AI-Powered Tmux Orchestrator

Experience **autonomous development** with our **Claude AI team orchestration system** that enables 24/7 continuous development:

### 🎯 **Key Features**

- **🚀 Autonomous Team**: 8-agent development team working around the clock
- **👥 Specialized Roles**: Frontend, Backend, QA, DevOps, and Project Management agents
- **📊 Quality Gates**: Mandatory 90-URL testing and git discipline protocols
- **🔄 Self-Scheduling**: Agents coordinate their own check-ins and task management
- **📱 ISSI-Optimized**: Tailored workflows for i18n, translation, and product testing
- **⚡ Zero Downtime**: Continuous development progress without human supervision

### 🛠 **Team Structure**

```bash
# 8-Window Development Team
Window 0: Orchestrator (coordination hub)
Window 1: Frontend Agent (React, i18n, UI/UX)
Window 2: Backend Agent (APIs, data management)
Window 3: QA Agent (testing, validation, accessibility)
Window 4: Dev Server (development environment)
Window 5: Build Agent (CI/CD, deployments)
Window 6: Project Manager (quality oversight)
Window 7: Documentation Agent (docs, knowledge management)
```

### 🚀 **Quick Start**

```bash
# Launch autonomous development team
./tmux-orchestrator/scripts/start-issi-project.sh

# Deploy Claude agents to their specialized roles
./tmux-orchestrator/scripts/deploy-issi-team.sh

# Result: 24/7 development with:
# ✅ Automated translation management
# ✅ Continuous product URL validation
# ✅ Real-time quality assurance
# ✅ Self-coordinating team workflows
```

👉 **[Read Full Documentation](./ISSI_TMUX_ORCHESTRATOR_README.md)**

## 🌍 Global Infrastructure Network Visualization

Experience ISSI's worldwide cloud infrastructure through our **interactive 3D globe** powered by Aceternity UI:

### **Live Demo**

- **Production**: `https://your-domain.com/en/globedemo`
- **Development**: `http://localhost:3001/en/globedemo`

### **🎯 Key Features**

- **📍 123 Global Datacenters**: Complete coverage across AWS, Google Cloud, and Azure
- **🏢 ISSI HQ Hub**: Greenbelt, Maryland as central command center
- **🔗 Real-time Network Topology**: Dynamic arcs showing multi-cloud connectivity
- **🎨 Provider Color Coding**: AWS (Orange), GCP (Blue), Azure (Cyan), HQ (Gold)
- **⚡ Interactive Controls**: Zoom, pan, rotate with smooth auto-rotation
- **📱 Responsive Design**: Optimized for mobile and desktop experiences

### **🏗️ Technical Implementation**

```typescript
// Datacenter Coverage
🏢 ISSI HQ: 1 headquarters
🟠 AWS Regions: 29 global regions
🔵 Google Cloud: 40 worldwide regions
🔷 Azure Regions: 51 global regions
📊 Total Infrastructure: 123 datacenters
```

### **🎪 Interactive Experience**

- **Hub-and-Spoke Topology**: All connections route through ISSI headquarters
- **Distance-Based Visualization**: Arc altitude calculated from geographic distance
- **Motion-Enhanced Content**: Smooth animations with professional messaging
- **Enterprise Branding**: ISSI's multi-cloud strategy demonstration

## Technology Stack

- **Framework**: Next.js 14.2+ with App Router
- **Language**: TypeScript with strict type checking
- **Styling**: Tailwind CSS with custom design system
- **Development Tools**:
  - **Debug Screens**: Real-time responsive breakpoint indicator
  - **Hot Reload**: Instant development feedback
  - **Type Safety**: Comprehensive TypeScript coverage
  - **AI Orchestration**: Tmux-based autonomous development team
- **UI Components**:
  - Custom BentoGrid layouts
  - 3D Globe integration with Three.js
  - Headless UI for accessible interactions
- **Internationalization**:
  - @formatjs/intl for message formatting
  - react-intl for React integration
  - Custom automatic translation system
- **3D Graphics**:
  - Three.js and React Three Fiber
  - Cobe for interactive globe rendering
- **State Management**: React context and hooks
- **Testing**: Vitest with Testing Library
- **Package Manager**: pnpm
- **Code Quality**: ESLint with custom rules and JSON validation
- **AI Development**: Claude agents with tmux orchestration

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

## 🛠️ Development Tools

### Tailwind CSS Debug Screens

This project includes a **responsive breakpoint indicator** that shows the current Tailwind CSS breakpoint in the bottom-left corner during development.

#### Features

- 📱 **Real-time indicator**: Shows current breakpoint (xs, sm, md, lg, xl, 2xl)
- 🎯 **Unobtrusive**: Small indicator that doesn't interfere with your layout
- 🔄 **Live updates**: Changes automatically when you resize the browser window

#### Production Deployment

**⚠️ Important**: The debug indicator is currently always enabled. To disable it in production:

**Option 1: Environment-based (Recommended)**

```tsx
// In src/app/[lang]/layout.tsx
<body className={`relative min-h-screen overflow-y-auto grid-background-with-fade flex flex-col ${process.env.NODE_ENV === 'development' ? 'debug-screens' : ''}`}>
```

**Option 2: Manual removal**

```tsx
// Remove 'debug-screens' from the className
<body className="relative min-h-screen overflow-y-auto grid-background-with-fade flex flex-col">
```

📖 **[Full Debug Screens Documentation](./docs/TAILWIND_DEBUG_SCREENS.md)**

## Testing

### Product URL Testing

The project includes automated testing scripts to verify that all product pages in the BentoGrid are accessible and return proper responses:

#### Quick Test Commands

```bash
# Test all English product URLs only (30 URLs)
npm run test:products

# Test all product URLs across all locales (90 URLs)
npm run test:products:all

# Test actual URLs generated by BentoGrid cards (recommended for debugging)
node test-actual-product-urls.js
```

#### What Gets Tested

- **All 30 product pages** from the BentoGrid component
- **Multiple locales**: English (`/en/`), Spanish (`/es/`), French (`/fr/`)
- **HTTP response validation**: Ensures each URL returns 200 OK status
- **Comprehensive coverage**: Every product card in the grid has a working dedicated page
- **SEO-friendly URLs**: All products use proper slugs (e.g., `/en/products/grant-management-system`)

#### Test Results

✅ **100% Success Rate** - All 30 products × 3 locales = 90 working URLs

#### Example Output

```console
🚀 Testing all product URLs...

[1/30] Testing: gms -> grant-management-system
   ✅ SUCCESS
[2/30] Testing: ects -> electronic-correspondence-tracking-system
   ✅ SUCCESS
...

📊 SUMMARY:
✅ Successful: 30/30 (100%)
🎯 Perfect accessibility for all products!
```

👉 **[Full Testing Documentation](./docs/PRODUCT_URL_TESTING.md)**

## Internationalization

The website supports multiple languages through a custom i18n implementation:

- Language files are stored in `src/lang` directory
- Language switching is available in the UI
- Default language detection is handled via browser preferences

To add or modify translations, edit the JSON files in the language directories.

## Project Structure

```text
issi-next.js-i18n-dashboard/
├── public/                    # Static assets and images
├── src/
│   ├── app/                   # App Router pages and layouts
│   │   └── [lang]/           # Language-specific routes
│   ├── components/           # Reusable UI components
│   │   ├── products/         # Product-specific components
│   │   │   └── ProductDetailsPage.tsx
│   │   ├── BreadcrumbWithGlobe.tsx
│   │   └── ...               # Other components
│   ├── lang/                 # Translation files (JSON)
│   ├── lib/                  # Utility functions and helpers
│   ├── types/                # TypeScript type definitions
│   ├── utils/                # Utility functions
│   └── middleware.ts         # Language detection middleware
├── docs/                     # Documentation files
├── scripts/                  # Build and validation scripts
├── i18n-config.ts           # Internationalization configuration
├── next.config.mjs          # Next.js configuration
├── tailwind.config.ts       # Tailwind CSS configuration
└── package.json             # Dependencies and scripts
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

### AI Development

- **ISSI_TMUX_ORCHESTRATOR_README.md** – Complete tmux orchestrator setup and autonomous development team management

### Development Tools

- **docs/TAILWIND_DEBUG_SCREENS.md** – Responsive breakpoint debugging, production deployment, and customization guide
- **docs/COMPONENT_DEVELOPMENT_GUIDE.md** – Enterprise component development standards, shadcn/ui patterns, and anti-patterns to avoid
- **docs/NEXTJS_15_COMPATIBILITY.md** – Next.js 15 migration guide, async params, and compatibility requirements
- **TROUBLESHOOTING.md** – Solutions for common i18n issues and error resolution
- **JSON_VALIDATION_GUIDE.md** – JSON validation, linting, and best practices
- **FUTURE_FEATURES.md** – Roadmap of planned enhancements and future features

### UI Components

- **MOBILE_FLOATING_MENU_DOCUMENTATION.md** – Implementation details for the mobile bottom navigation dock
- **UNIVERSAL_BREADCRUMB_DOCUMENTATION.md** – Documentation for the automatic breadcrumb system

### Design & Theming

- **COLOR_PALETTE_INSTRUCTIONS.md** – Text and background color usage for light/dark mode, Tailwind and CSS variable usage
- **BACKGROUND_STYLES_REFERENCE.md** – Reference for all background patterns, gradients, and glassmorphism effects

### Migration & Architecture

- **docs/SHADCN_MIGRATION_LESSONS.md** – Comprehensive lessons learned from migrating 100+ components to shadcn/ui, anti-patterns eliminated, and performance improvements achieved

### Changelog

- **CHANGELOG.md** – All major UI, UX, compliance, and navigation changes, with dates and details

### Quick Start

- See `INSTRUCTIONS.md` for setup and workflow
- Always update the changelog and translation files when adding new features
- Follow theming and i18n patterns in all new components/pages

---

_Last updated: June 9, 2025_
