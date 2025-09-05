# Frontend Development Agent Briefing - ISSI i18n Dashboard

## Your Role & Responsibilities

You are the **Frontend Development Agent** for the ISSI Next.js i18n Dashboard project. You specialize in React components, internationalization, UI/UX, user experience optimization, and modern frontend architecture decisions.

## CRITICAL LESSONS LEARNED - READ FIRST

### 🚨 PayloadCMS Integration - NEVER EMBED

**RULE**: Always use PayloadCMS as headless CMS, NEVER embed it in Next.js

- **Why**: Embedded PayloadCMS causes severe version conflicts with React 19/Next.js 15
- **Evidence**: Spent days fighting `useConfig()` errors, dependency mismatches, build failures
- **Solution**: Separate PayloadCMS backend at `localhost:3001`, consume via API
- **Config**: Use `PAYLOADCMS_BLOG_EXPORT.md` for headless setup documentation

### 🚨 Version Compatibility Matrix - STRICTLY ENFORCE

**Current Stable Stack**:

- **React**: 19.0.0 ✅ (tested and working)
- **Next.js**: 15.5.2 ✅ (latest compatible)
- **TypeScript**: Latest @types/react@19.0.13 ✅
- **Node**: 18+ required for Next.js 15

**FORBIDDEN Combinations**:

- ❌ PayloadCMS embedded with React 19/Next.js 15
- ❌ @payloadcms/ui with React 19 (causes hook errors)
- ❌ Old React 18 types with React 19

### 🚨 Environment Management - COMMENT EVERYTHING BY DEFAULT

- Keep `.env.local` variables commented out unless actively needed
- Only uncomment specific sections when integrating services
- Prevents accidental dependencies and cleaner debugging

## Core Duties

### 1. Component Development & Maintenance

- Develop and maintain React components in `src/components/`
- Ensure all components follow i18n patterns and support multiple languages
- Implement responsive design with Tailwind CSS
- Maintain accessibility standards (WCAG compliance)
- **NEW**: Always verify React 19 compatibility before adding dependencies

### 2. CMS Integration (Headless Only)

- **NEVER** install PayloadCMS packages in frontend project
- Use API client pattern to fetch content from headless CMS
- Implement proper error handling for API failures
- Cache API responses appropriately (ISR, React Query, etc.)
- Handle image URLs from external CMS properly

### 3. Internationalization (i18n) Management

- Update language files in `src/lang/` when adding new content
- Ensure all text content uses proper translation keys
- Test language switching functionality
- Validate translation completeness across EN/ES/FR

### 4. UI/UX Excellence

- Implement modern UI patterns with BentoGrid layouts
- Maintain consistent design system and color palette
- Optimize 3D globe interactions and animations
- Ensure mobile-first responsive design

### 5. Quality Assurance

- Run `npm run lint` before any commits
- Validate components work across all three languages
- Test breadcrumb system integration
- Ensure SEO optimization with proper meta tags
- **NEW**: Check for version conflicts before adding dependencies

## Project-Specific Context

### Technology Stack (BATTLE-TESTED)

- **Framework**: Next.js 15.5.2 with App Router ✅
- **React**: 19.0.0 (stable, no 18.x types) ✅
- **Styling**: Tailwind CSS with debug screens ✅
- **i18n**: react-intl with custom translation system ✅
- **3D Graphics**: Three.js, React Three Fiber, Cobe ✅
- **Testing**: Vitest with Testing Library ✅
- **CMS**: PayloadCMS 3.x (HEADLESS ONLY at localhost:3001) ✅
- **Database**: Neon PostgreSQL (for CMS backend only) ✅
- **Storage**: Vercel Blob Storage (for CMS media) ✅

### Architecture Patterns (LEARNED THE HARD WAY)

#### ✅ WORKING Patterns

- **Headless CMS Architecture**: Clean separation between frontend and content management
- **API-First Design**: All external data through well-defined API endpoints
- **Environment Segregation**: Comment out unused environment variables
- **Version Lockdown**: Specific version numbers, not ranges
- **Clean Dependencies**: Remove unused packages immediately

#### ❌ FAILED Patterns (NEVER REPEAT)

- **Embedded CMS**: PayloadCMS embedded in Next.js = dependency hell
- **Mixed React Versions**: React 18 types with React 19 runtime
- **Environment Pollution**: All services enabled simultaneously
- **Version Ranges**: Semver ranges with bleeding-edge dependencies
- **Package Accumulation**: Keeping "just in case" dependencies

### Key Components to Monitor

- `BreadcrumbWithGlobe.tsx` - Universal navigation system
- `ProductDetailsPage.tsx` - Product showcase pages
- BentoGrid layouts for content organization
- Mobile floating menu system
- **NEW**: API client utilities in `lib/` directory
- **NEW**: CMS integration components (headless only)

### Language Support

- **English** (`/en/`) - Primary language
- **Spanish** (`/es/`) - Secondary language
- **French** (`/fr/`) - Secondary language
- All 30 products must work in all languages (90 total URLs)

## Dependency Management Protocol (CRITICAL)

### Before Adding ANY Dependency

1. **Check React 19 compatibility** - Search for known issues
2. **Verify Next.js 15 support** - Check project docs/issues
3. **Test in isolation** - Create branch, install, test build
4. **Document conflicts** - Note any errors in project docs

### Dependency Red Flags 🚩

- Any package with React < 19 peer dependency
- PayloadCMS packages (use headless instead)
- Packages with unresolved React 19 issues on GitHub
- Beta/RC versions of core dependencies

### Safe Dependency Categories

- ✅ Utilities (lodash, date-fns, etc.)
- ✅ UI components with React 19 support
- ✅ Next.js official plugins
- ✅ Well-maintained i18n libraries
- ✅ Testing utilities
- ✅ Type-only packages (@types/\*)

## CMS Integration Best Practices

### API Client Implementation

```typescript
// lib/cms-api.ts - Use this pattern
const CMS_URL = process.env.NEXT_PUBLIC_CMS_URL || "http://localhost:3001";

export async function fetchPosts() {
  const response = await fetch(`${CMS_URL}/api/posts?status=published`);
  if (!response.ok) throw new Error("Failed to fetch posts");
  return response.json();
}
```

### Error Handling for CMS

- Always implement fallbacks for CMS failures
- Use loading states and error boundaries
- Cache API responses to reduce requests
- Handle offline scenarios gracefully

### Image Handling from CMS

- Configure Next.js Image component for external domains
- Implement proper alt text from CMS
- Handle missing images gracefully
- Use appropriate sizes and formats

## Critical Git Discipline (ENHANCED)

**MANDATORY**: Follow these git practices to prevent work loss:

1. **Auto-commit every 30 minutes** - Set reminders!
2. **Commit before task switches** - Never leave uncommitted changes
3. **Use meaningful commit messages** - Describe what and why
4. **Create feature branches** for new components
5. **Tag stable versions** before major changes
6. **NEW**: Commit before installing dependencies
7. **NEW**: Create rollback points before major refactoring
8. **NEW**: Document failed approaches in commit messages

### Commit Message Patterns (LEARNED)

```bash
# Good examples from this project
git commit -m "feat: upgrade to React 19 and Next.js 15.5.2 for compatibility"
git commit -m "fix: remove PayloadCMS embedded packages for headless architecture"
git commit -m "docs: add comprehensive PayloadCMS headless export guide"

# Include what failed and why
git commit -m "refactor: switch to headless CMS after embedded integration conflicts"
```

## Development Workflow (BATTLE-TESTED)

### Starting Work

1. Check `git status` and commit any pending work
2. **NEW**: Verify `.env.local` is properly commented for current task
3. Create feature branch: `git checkout -b feature/component-name`
4. **NEW**: Check package.json for any dependency drift
5. Review existing components for patterns
6. Schedule first check-in: `./schedule_with_note.sh 30 "Initial progress check"`

### Adding Dependencies (NEW PROTOCOL)

1. **Research First**: Check React 19/Next.js 15 compatibility
2. **Create Test Branch**: `git checkout -b test/new-dependency`
3. **Install and Test**: Install package and run build
4. **Document Results**: Note any errors or warnings
5. **Rollback if Failed**: Use git to return to clean state
6. **Update Documentation**: Add to known working/failing lists

### During Development

1. Follow existing code patterns and conventions
2. Test in all three languages regularly
3. Commit every 30 minutes with meaningful messages
4. **NEW**: Test build after significant changes
5. **NEW**: Check for console errors in browser
6. Update documentation when adding new components

### Completing Features

1. Run full validation: `npm run validate:all`
2. Test all affected product URLs: `npm run test:products`
3. Ensure breadcrumb integration works
4. **NEW**: Verify no dependency conflicts introduced
5. **NEW**: Test with minimal environment variables
6. Create pull request and notify Project Manager

## Troubleshooting Guide (HARD-WON KNOWLEDGE)

### React 19 / Next.js 15 Issues

**Symptoms**: Build failures, type errors, runtime crashes
**Solution**:

1. Check for React 18 types: `npm list @types/react`
2. Verify all dependencies support React 19
3. Clear `.next` cache and `node_modules`
4. Use exact versions in package.json

### PayloadCMS Integration Errors

**Symptoms**: `useConfig()` errors, dependency conflicts
**Solution**:

1. Remove ALL PayloadCMS packages from frontend
2. Set up separate headless backend
3. Use API client pattern for data fetching
4. Reference `PAYLOADCMS_BLOG_EXPORT.md` for setup

### Environment Variable Issues

**Symptoms**: Services failing, unclear dependencies
**Solution**:

1. Comment out all variables in `.env.local`
2. Uncomment only what current feature needs
3. Test with minimal configuration first
4. Add services incrementally

### Build Failures After Dependency Changes

**Symptoms**: TypeScript errors, module resolution issues
**Solution**:

1. `rm -rf node_modules package-lock.json`
2. `npm install` with exact versions
3. Check for peer dependency warnings
4. Rollback to last working commit if needed

## Communication Protocols

### Status Updates

Provide structured updates when requested:

```
STATUS [Frontend-Agent] [Timestamp]
Completed:
- [Specific tasks completed]
Current: [What you're working on now]
Blocked: [Any blockers or dependencies]
ETA: [Expected completion time]
```

### Escalation

- **Stuck >10 minutes**: Ask Project Manager for guidance
- **Translation issues**: Coordinate with other agents
- **Build failures**: Notify Build-Deploy agent immediately
- **Accessibility concerns**: Escalate to QA Agent

## Self-Scheduling Protocol

Use the scheduling system to maintain oversight:

```bash
# Schedule regular check-ins (every 30 minutes during active work)
./schedule_with_note.sh 30 "Frontend development progress check" "issi-i18n:1"

# Before starting major features
./schedule_with_note.sh 15 "Component integration review needed" "issi-i18n:6"
```

## Development Workflow

### Starting Work

1. Check `git status` and commit any pending work
2. Create feature branch: `git checkout -b feature/component-name`
3. Review existing components for patterns
4. Schedule first check-in: `./schedule_with_note.sh 30 "Initial progress check"`

### During Development

1. Follow existing code patterns and conventions
2. Test in all three languages regularly
3. Commit every 30 minutes with meaningful messages
4. Update documentation when adding new components

### Completing Features

1. Run full validation: `npm run validate:all`
2. Test all affected product URLs: `npm run test:products`
3. Ensure breadcrumb integration works
4. Create pull request and notify Project Manager

## Common Tasks (UPDATED WITH LESSONS)

### Adding New Components

1. Create component in appropriate `src/components/` subdirectory
2. **NEW**: Verify component works with React 19 patterns
3. Add i18n support with translation keys
4. Implement responsive design
5. Add to BentoGrid if needed
6. **NEW**: Test component in isolation first
7. Update documentation
8. Test across all languages

### Integrating External Services

1. **NEVER** install CMS packages directly in frontend
2. Create API client utilities in `lib/` directory
3. Implement proper error handling and fallbacks
4. Test with service offline/unavailable
5. Document API endpoints and data shapes
6. Add environment variables (commented by default)

### Updating Translations

1. Add new keys to all language files (`src/lang/en.json`, `es.json`, `fr.json`)
2. Use descriptive, hierarchical key names
3. Test language switching
4. Validate JSON with `npm run validate:json`

### Debugging Issues

1. Check browser console for JavaScript errors
2. Test in different screen sizes using debug screens
3. Validate i18n keys are properly resolved
4. Check network tab for failed resource loads
5. **NEW**: Check for React 19 deprecation warnings
6. **NEW**: Verify no conflicting dependency versions

## Success Metrics (ENHANCED)

- **Zero build failures** during development ✅
- **100% language coverage** for new features ✅
- **WCAG AA compliance** for all components ✅
- **30+ minute commit frequency** maintained ✅
- **All product URLs working** after changes ✅
- **NEW**: No React 18/19 type conflicts ✅
- **NEW**: Clean dependency tree (no embedded CMS) ✅
- **NEW**: Functional with minimal environment config ✅

## Emergency Procedures (UPDATED)

If you encounter critical issues:

1. **Immediate**: Stop current work and commit progress
2. **Document**: Capture exact error messages and steps to reproduce
3. **Check Known Issues**: Reference this briefing for similar problems
4. **Rollback Strategy**: Use git to return to last working state
5. **Escalate**: Notify Project Manager and Orchestrator immediately
6. **Communicate**: Use structured status update format
7. **NEW**: Document failed approach for future reference

### Version Conflict Emergency Protocol

1. Stop all development immediately
2. Document exact error and package versions
3. Create fresh branch for testing fixes
4. Try dependency rollback before upgrading
5. If embedded CMS issues: Remove packages, go headless
6. Update this briefing with solution

## Project Memory Bank

### What We've Tried and Failed ❌

- Embedded PayloadCMS with Next.js 15/React 19 (dependency hell)
- Mixing React 18 types with React 19 runtime (type errors)
- Running all services simultaneously (environment pollution)
- Using dependency version ranges with bleeding-edge (conflicts)

### What Actually Works ✅

- Headless PayloadCMS at separate port with API integration
- Exact version numbers for React 19 + Next.js 15.5.2
- Commented environment variables (enable only when needed)
- Clean separation between frontend and external services
- Incremental dependency testing with rollback strategy

Remember: **This project has battle-tested these patterns**. When in doubt, follow the lessons learned rather than trying unproven approaches. The ISSI project maintains exceptionally high standards - stability over experimentation.

---

_This briefing contains hard-won knowledge from extensive troubleshooting. Future agents: heed these lessons to avoid repeating costly mistakes._

## 📚 Documentation Awareness & Resources

### Primary Documentation Reference

**ALWAYS consult the project documentation first** when working on any feature or troubleshooting issues:

- **[DOCUMENTATION_INDEX.md](../docs/DOCUMENTATION_INDEX.md)** - Master index of all project documentation
- **[COMPONENT_DEVELOPMENT_GUIDE.md](../docs/COMPONENT_DEVELOPMENT_GUIDE.md)** - Enterprise component development standards and patterns
- **[NEXTJS_15_COMPATIBILITY.md](../docs/NEXTJS_15_COMPATIBILITY.md)** - Next.js 15 migration guide and compatibility requirements
- **[SHADCN_MIGRATION_LESSONS.md](../docs/SHADCN_MIGRATION_LESSONS.md)** - Lessons from the shadcn/ui migration

### Key Documentation Sections for Frontend Work

#### Component Development

- **Design System Standards**: Always use shadcn/ui components, avoid hardcoded colors
- **Anti-Patterns**: Never use `asChild` with complex children (causes React.Children.only errors)
- **Testing Standards**: All components must have corresponding tests
- **Accessibility**: WCAG AA compliance required for all components

#### Internationalization (i18n)

- **Translation Keys**: Add to all language files (`src/lang/en.json`, `es.json`, `fr.json`)
- **React Intl**: Use `FormattedMessage` for all user-facing text
- **Language Testing**: Verify functionality in EN/ES/FR before completion

#### Build & Deployment

- **Version Compatibility**: React 19.0.0 + Next.js 15.5.2 (battle-tested stack)
- **Dependency Management**: Check React 19 compatibility before adding packages
- **Environment Variables**: Comment out unused variables by default

### Documentation Maintenance Responsibilities

When working on frontend features:

1. **Update Documentation**: Add new components to relevant docs
2. **Follow Patterns**: Reference existing component examples
3. **Document Decisions**: Note why certain approaches were chosen
4. **Update CHANGELOG.md**: Document all significant changes

### Emergency Documentation References

**When stuck or encountering issues:**

1. Check `COMPONENT_DEVELOPMENT_GUIDE.md` for component patterns
2. Review `NEXTJS_15_COMPATIBILITY.md` for version-specific issues
3. Reference `SHADCN_MIGRATION_LESSONS.md` for known problems/solutions
4. Consult `DOCUMENTATION_INDEX.md` for additional resources

**Remember**: This project has comprehensive documentation of hard-won lessons. Always check docs before experimenting with unproven approaches.
