# Local Development Setup 🛠️

This guide provides complete instructions for setting up the ISSI Next.js i18n Dashboard project on your local development environment.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

### Required Software

- **Node.js**: Version 18.0.0 or higher (recommended: 20.x LTS)
- **npm** or **yarn** or **pnpm**: Package manager
- **Git**: Version control system

### Recommended Tools

- **VS Code**: Recommended editor with extensions
- **Git Bash** or **Terminal**: Command line interface
- **Postman** or **Insomnia**: API testing (optional)

### System Requirements

- **RAM**: Minimum 8GB, recommended 16GB+
- **Storage**: 2GB free space for project and dependencies
- **OS**: Windows 10+, macOS 10.15+, or Linux

## 🚀 Quick Setup (5 minutes)

For experienced developers who want to get started quickly:

```bash
# 1. Clone the repository
git clone https://github.com/masterthepixel/issi-next.js-i18n-dashboard.git
cd issi-next.js-i18n-dashboard

# 2. Install dependencies
pnpm install

# 3. Set up environment variables
cp .env.example .env.local

# 4. Start development server
pnpm dev
```

Visit `http://localhost:3000` to see the application running!

## 📝 Detailed Setup Instructions

### Step 1: Clone the Repository

```bash
# Clone the main repository
git clone https://github.com/masterthepixel/issi-next.js-i18n-dashboard.git

# Navigate to the project directory
cd issi-next.js-i18n-dashboard

# Verify you're on the correct branch
git branch -a
git checkout feat/shadcn-initial
```

### Step 2: Install Dependencies

The project uses **pnpm** as the package manager. If you don't have pnpm installed:

```bash
# Install pnpm globally (if not already installed)
npm install -g pnpm

# Install project dependencies
pnpm install
```

> **Note**: The project is configured to work with React 19.0.0 and Next.js 15.5.2. Dependencies are locked to ensure compatibility.

### Step 3: Environment Configuration

```bash
# Copy the environment template
cp .env.example .env.local

# Edit the environment file
code .env.local  # or use your preferred editor
```

#### Required Environment Variables

```env
# Next.js Configuration
NEXT_PUBLIC_BASE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NODE_ENV=development

# PayloadCMS Headless Backend (when using CMS)
NEXT_PUBLIC_CMS_URL=http://localhost:3001
CMS_API_URL=http://localhost:3001/api
CMS_GRAPHQL_URL=http://localhost:3001/api/graphql

# Vercel Blob Storage (optional)
BLOB_READ_WRITE_TOKEN=your_token_here

# Neon Database (for CMS backend)
DATABASE_URL=postgresql://your_connection_string
```

> **Important**: Most environment variables are commented out by default. Only uncomment what you need for your current development tasks.

### Step 4: Start Development Server

```bash
# Start the Next.js development server
pnpm dev

# The application will be available at:
# http://localhost:3000 (main application)
# http://localhost:3001 (PayloadCMS admin, if running)
```

### Step 5: Verify Installation

1. **Check the browser**: Visit `http://localhost:3000`
2. **Test language switching**: Try EN/ES/FR routes
3. **Check console**: No critical errors should appear
4. **Test navigation**: Globe and breadcrumb systems should work

## 🔧 Development Workflow

### Available Scripts

```bash
# Development
pnpm dev              # Start development server
pnpm build           # Build for production
pnpm start           # Start production server
pnpm preview         # Preview production build

# Code Quality
pnpm lint            # Run ESLint
pnpm lint:fix        # Fix ESLint issues
pnpm format          # Format code with Prettier

# Testing
pnpm test            # Run tests
pnpm test:watch      # Run tests in watch mode
pnpm test:coverage   # Generate test coverage

# Database (if using PayloadCMS)
pnpm db:generate     # Generate database types
pnpm db:migrate      # Run database migrations
pnpm db:seed         # Seed database with sample data
```

### Recommended Development Setup

1. **VS Code Extensions**:

   - ES7+ React/Redux/React-Native snippets
   - Tailwind CSS IntelliSense
   - TypeScript Importer
   - Auto Rename Tag
   - Bracket Pair Colorizer

2. **Browser Extensions**:
   - React Developer Tools
   - Redux DevTools (if applicable)

## 🐛 Troubleshooting Common Issues

### Build Errors

**Issue**: `Module not found` or dependency conflicts

```bash
# Clear cache and reinstall
rm -rf node_modules .next
pnpm install
```

**Issue**: React version conflicts

```bash
# Check React versions
pnpm list react react-dom @types/react

# Ensure all React-related packages are version 19.x
pnpm add react@19.0.0 react-dom@19.0.0 @types/react@19.0.13 @types/react-dom@19.0.2
```

### Environment Issues

**Issue**: Environment variables not loading

```bash
# Restart the development server
pnpm dev

# Check if .env.local exists and has correct syntax
cat .env.local
```

### Port Conflicts

**Issue**: Port 3000 already in use

```bash
# Kill process using port 3000
npx kill-port 3000

# Or use a different port
pnpm dev --port 3001
```

### CMS Integration Issues

**Issue**: PayloadCMS not connecting

```bash
# Ensure PayloadCMS backend is running on port 3001
# Check environment variables are uncommented
# Verify CORS settings in PayloadCMS config
```

## 🔗 Related Resources

- **[Quick Start Guide](./quick-start.md)** - Faster setup for experienced developers
- **[Troubleshooting Guide](../guides/troubleshooting.md)** - Solutions to common problems
- **[Environment Variables](../reference/environment-variables.md)** - Complete environment configuration
- **[API Documentation](../reference/api-documentation.md)** - API integration details

## 📞 Getting Help

If you encounter issues:

1. Check the **[Troubleshooting Guide](../guides/troubleshooting.md)**
2. Review the **[FAQ](../guides/faq.md)**
3. Check existing **[Issues](../project/bugs-and-issues.md)**
4. Create a new issue with detailed error information

## ✅ Success Checklist

- [ ] Repository cloned successfully
- [ ] Dependencies installed without errors
- [ ] Environment variables configured
- [ ] Development server starts without errors
- [ ] Application loads in browser at `http://localhost:3000`
- [ ] Language switching works (EN/ES/FR)
- [ ] No console errors in browser developer tools

---

**Last Updated**: September 2, 2025
**Tested With**: Node.js 20.x, pnpm 8.x, React 19.0.0, Next.js 15.5.2
