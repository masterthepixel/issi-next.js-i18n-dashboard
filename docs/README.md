# ISSI Next.js i18n Dashboard - Documentation 📚

Welcome to the comprehensive documentation for the ISSI Next.js i18n Dashboard project. This modern web application showcases internationalized product pages with advanced 3D globe navigation and responsive design.

## 🚀 Quick Start

**New to the project?** Start here:

- **[Local Development Setup](./getting-started/local-development.md)** - Get the project running in under 10 minutes
- **[Quick Start Guide](./getting-started/quick-start.md)** - Fastest way to get started
- **[First Time Setup](./getting-started/first-time-setup.md)** - Detailed setup for new developers

## 📁 Documentation Structure

### 🏁 Getting Started

Essential guides for developers joining the project:

- **[Local Development](./getting-started/local-development.md)** - Complete setup instructions
- **[Quick Start](./getting-started/quick-start.md)** - Fast track for experienced developers
- **[First Time Setup](./getting-started/first-time-setup.md)** - Step-by-step onboarding

### 📖 Guides

Practical guides for common tasks and workflows:

- **[Deployment Guide](./guides/deployment-guide.md)** - Production deployment procedures
- **[Content Management](./guides/content-management.md)** - Using the headless CMS
- **[Collection Management](./guides/collection-management.md)** - Working with PayloadCMS collections
- **[Troubleshooting](./guides/troubleshooting.md)** - Common issues and solutions
- **[FAQ](./guides/faq.md)** - Frequently asked questions

### 🔧 Reference

Technical reference documentation:

- **[API Documentation](./reference/api-documentation.md)** - Complete API reference
- **[Database Schema](./reference/database-schema.md)** - Collections and relationships
- **[Configuration](./reference/configuration.md)** - PayloadCMS configuration details
- **[Environment Variables](./reference/environment-variables.md)** - All environment settings

### 🏗️ Project

Project-level documentation and architecture:

- **[Project Summary](./project/project-summary.md)** - Architecture and technical decisions
- **[Expert Knowledge](./project/expert-knowledge.md)** - Domain expertise and best practices
- **[Change Log](./project/change-log.md)** - Version history and updates
- **[Bugs and Issues](./project/bugs-and-issues.md)** - Known issues and workarounds

### 🔄 Maintenance

Documentation about maintaining the project:

- **[Documentation Maintenance](./maintenance/doc-maintenance-guide.md)** - How to update documentation
- **[Change Log](./maintenance/change-log.md)** - Recent changes and updates
- **[Bugs and Issues](./maintenance/bugs-and-issues.md)** - Known issues tracking

### 💡 Examples

Code examples and implementation patterns:

- **[API Examples](./examples/api-examples.md)** - API usage examples
- **[Seeding Patterns](./examples/seeding-patterns.md)** - Database seeding patterns
- **[Custom Collections](./examples/custom-collections.md)** - Creating new collections
- **[i18n Patterns](./examples/i18n-patterns.md)** - Internationalization implementation

## 🏛️ Architecture Overview

### Technology Stack

- **Frontend**: Next.js 15.5.2 with App Router
- **React**: 19.0.0 (latest stable)
- **Styling**: Tailwind CSS with shadcn/ui components
- **Internationalization**: Custom i18n system supporting EN/ES/FR
- **3D Graphics**: Three.js, React Three Fiber, Cobe
- **CMS**: PayloadCMS (headless architecture)
- **Database**: Neon PostgreSQL
- **Deployment**: Vercel with Blob Storage

### Key Features

- 🌐 **Multi-language Support**: English, Spanish, French
- 🗺️ **Interactive 3D Globe**: Advanced navigation system
- 📱 **Responsive Design**: Mobile-first approach
- 🎨 **Modern UI**: BentoGrid layouts with shadcn/ui
- 📝 **Headless CMS**: PayloadCMS for content management
- 🔍 **SEO Optimized**: Proper meta tags and structured data

### Project Structure

```
├── src/                    # Main application code
│   ├── app/               # Next.js App Router pages
│   ├── components/        # Reusable React components
│   ├── lib/              # Utility functions and configurations
│   └── lang/             # Internationalization files
├── docs/                  # Documentation (this directory)
├── public/               # Static assets
├── tmux-orchestrator/    # Development orchestration tools
└── PayloadCMS/          # Headless CMS backend (separate repo)
```

## 👥 User Types & Quick Paths

### For New Developers

1. Read **[Local Development Setup](./getting-started/local-development.md)**
2. Follow the setup instructions
3. Check **[Troubleshooting](./guides/troubleshooting.md)** if you encounter issues

### For Content Managers

1. Review **[Content Management](./guides/content-management.md)**
2. Learn about **[Collection Management](./guides/collection-management.md)**
3. See **[API Examples](./examples/api-examples.md)** for integration

### For DevOps/Deployment

1. Study **[Deployment Guide](./guides/deployment-guide.md)**
2. Review **[Environment Variables](./reference/environment-variables.md)**
3. Check **[Configuration](./reference/configuration.md)**

### For Maintainers

1. Read **[Documentation Maintenance](./maintenance/doc-maintenance-guide.md)**
2. Review **[Project Summary](./project/project-summary.md)**
3. Monitor **[Change Log](./maintenance/change-log.md)**

## 🔗 Related Resources

### External Documentation

- [Next.js 15 Documentation](https://nextjs.org/docs)
- [React 19 Release Notes](https://react.dev/blog/2024/04/25/react-19)
- [PayloadCMS Documentation](https://payloadcms.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)

### Internal Tools

- **AI Agent Briefings**: `tmux-orchestrator/templates/` - Role-specific instructions
- **Development Scripts**: `package.json` - Available npm scripts
- **Environment Config**: `.env.local` - Local configuration template

## 📞 Support & Communication

### Getting Help

- **Documentation Issues**: Update via **[Maintenance Guide](./maintenance/doc-maintenance-guide.md)**
- **Code Issues**: Check **[Bugs and Issues](./project/bugs-and-issues.md)**
- **Setup Problems**: See **[Troubleshooting](./guides/troubleshooting.md)**

### Development Workflow

- Use feature branches for new work
- Follow the established commit message conventions
- Update documentation when making architectural changes
- Test all language variants (EN/ES/FR) for UI changes

## 🎯 Success Metrics

The documentation is successful when:

- ✅ New developers can set up the project in under 30 minutes
- ✅ All deployment procedures are documented and tested
- ✅ Common questions are answered in the FAQ
- ✅ Technical architecture is clearly explained
- ✅ Maintenance procedures are followed consistently

---

**Last Updated**: September 2, 2025
**Version**: 1.0.0
**Status**: Active Development
