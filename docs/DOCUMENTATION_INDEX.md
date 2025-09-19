# Documentation Index

> **Last Updated**: September 2025  
> **Status**: Post-shadcn/ui Migration — master index with folder sections

## Overview

This index provides a quick reference to documentation created during and after the shadcn/ui migration. It groups docs by functional area and links to high-priority resources and subfolder indexes. Use the subfolder index links for deeper lists of documents.

## Recent Updates (September 2025)

- **Navigation improvements**: Logo sizing, spacing adjustments, and menu consistency
- **Code quality**: DOM attribute cleanup and build process optimization
- **UI/UX enhancements**: Enhanced navigation user experience

## New / High Priority Documentation (August 2025)

- **[COMPONENT_DEVELOPMENT_GUIDE.md](./COMPONENT_DEVELOPMENT_GUIDE.md)** - Enterprise component development standards, shadcn/ui patterns, anti-patterns to avoid, and testing requirements
- **[NEXTJS_15_COMPATIBILITY.md](./NEXTJS_15_COMPATIBILITY.md)** - Next.js 15 migration guide, async params patterns, build system changes, and compatibility requirements
- **[PERFORMANCE_OPTIMIZATION.md](./PERFORMANCE_OPTIMIZATION.md)** - Performance optimization techniques, Core Web Vitals improvements, and bundle splitting strategies
- **[SHADCN_MIGRATION_LESSONS.md](./SHADCN_MIGRATION_LESSONS.md)** - Lessons learned from migrating 100+ components

## Key Insights Summary

- Executive summaries, migration outcomes, and high-level quality gates are in the migration report and lessons docs.
- For component patterns and templates, start with `COMPONENT_DEVELOPMENT_GUIDE.md`.
- If in doubt about framework compatibility, consult `NEXTJS_15_COMPATIBILITY.md`.

## Related Existing Documentation

### Core Development

- **[SHADCN_MIGRATION_REPORT.md](./SHADCN_MIGRATION_REPORT.md)** - Original migration planning and phase documentation
- **[COMPONENT_DEVELOPMENT_GUIDE.md](./COMPONENT_DEVELOPMENT_GUIDE.md)** - Component patterns and templates

### Architecture & Testing

- **[TYPESCRIPT_LIBRARY_DOCUMENTATION.md](./config/TYPESCRIPT_LIBRARY_DOCUMENTATION.md)** - TypeScript patterns and library usage (config folder)
- **[PRODUCTS_SYSTEM_DOCUMENTATION.md](./products/PRODUCTS_SYSTEM_DOCUMENTATION.md)** - Product page architecture and canonical product layout

## Configuration & Setup

Group of config and environment docs for local/dev setup and CI:

- **[VSCODE_MULTI_AGENT_SETUP.md](./config/VSCODE_MULTI_AGENT_SETUP.md)** - VS Code multi-agent setup
- **[TAILWIND_DEBUG_SCREENS.md](./config/TAILWIND_DEBUG_SCREENS.md)** - Tailwind responsive debug screens and helpers
- **[TYPESCRIPT_QUICK_START.md](./config/TYPESCRIPT_QUICK_START.md)** - Quick start for TypeScript in the repo
- **[ESLINT_CONFIGURATION.md](./config/ESLINT_CONFIGURATION.md)** - ESLint configuration and resolution guide

## Products

Product-related documentation and verification:

- **[PRODUCTS_SYSTEM_DOCUMENTATION.md](./products/PRODUCTS_SYSTEM_DOCUMENTATION.md)** - Product system architecture and development guidelines
- **[PRODUCT_URL_TESTING.md](./products/PRODUCT_URL_TESTING.md)** - Scripts and tests for product URL validation
- **[ProductDetailsPage.md](./products/ProductDetailsPage.md)** - Product page implementation notes

## Breadcrumbs & Navigation

Navigation and breadcrumb systems, including i18n integration:

- **[UNIVERSAL_BREADCRUMB_DOCUMENTATION.md](./breadcrumbs/UNIVERSAL_BREADCRUMB_DOCUMENTATION.md)** - Universal breadcrumb system and i18n strategy
- **[BREADCRUMB_TESTING.md](./breadcrumbs/BREADCRUMB_TESTING.md)** - Breadcrumb testing guidance
- **[BREADCRUMB_WITH_GLOBE_DOCUMENTATION.md](./breadcrumbs/BREADCRUMB_WITH_GLOBE_DOCUMENTATION.md)** - Original breadcrumb-with-globe notes

## Globe & Timeline

Globe and timeline feature docs:

- **[INTERACTIVE_TIMELINE_DOCUMENTATION.md](./globe/INTERACTIVE_TIMELINE_DOCUMENTATION.md)** - Interactive timeline feature docs
- **[GLOBE_DATA_STRUCTURE.md](./globe/GLOBE_DATA_STRUCTURE.md)** - Data model for the globe component
- **[MOBILE_FLOATING_MENU_DOCUMENTATION.md](./globe/MOBILE_FLOATING_MENU_DOCUMENTATION.md)** - Mobile floating menu patterns for globe

## Migration Indexes (subfolder indexes)

When a subfolder maintains its own index, link to it here rather than enumerating every file:

- **[shadcn-migration/DOCUMENTATION_INDEX.md](./shadcn-migration/DOCUMENTATION_INDEX.md)** - Shadcn migration quick reference and links
- **[payloadcms-migration/MASTER_INDEX.md](./payloadcms-migration/MASTER_INDEX.md)** - PayloadCMS migration master index (detailed migration docs)

## PayloadCMS Migration (high-value docs)

- **[payloadcms-migration/CLAUDE_MIGRATION_GUIDE.md](./payloadcms-migration/CLAUDE_MIGRATION_GUIDE.md)** - Migration guide for Claude-related tasks
- **[payloadcms-migration/IMPLEMENTATION_PLAN.md](./payloadcms-migration/IMPLEMENTATION_PLAN.md)** - Implementation plan and phases

## Quick Reference Checklist

- Start component work here: **COMPONENT_DEVELOPMENT_GUIDE.md**
- For page-level migration plans, see **SHADCN_MIGRATION_REPORT.md** (Appendix B)
- For i18n rules and breadcrumb patterns, see **UNIVERSAL_BREADCRUMB_DOCUMENTATION.md**

## Finding Information

### Component Development Questions

→ Start with **[COMPONENT_DEVELOPMENT_GUIDE.md](./COMPONENT_DEVELOPMENT_GUIDE.md)**

### Next.js / Build Issues

→ See **[NEXTJS_15_COMPATIBILITY.md](./NEXTJS_15_COMPATIBILITY.md)**

### Migration Context / History

→ Review **[SHADCN_MIGRATION_LESSONS.md](./SHADCN_MIGRATION_LESSONS.md)** and **[SHADCN_MIGRATION_REPORT.md](./SHADCN_MIGRATION_REPORT.md)**

---

## Notes

- This master index uses folder sections and points to subfolder indexes where appropriate. The repo includes an indexing task (`.bmad-core/tasks/index-docs.md`) — follow its rules when adding or removing entries.
- Keep entries concise (one-line descriptions). When adding many files from a folder, either (A) add a subfolder `DOCUMENTATION_INDEX.md` and link to it from here, or (B) add a folder section and list the most important files only.
