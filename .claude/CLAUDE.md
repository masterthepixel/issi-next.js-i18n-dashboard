...existing code...
2. **Plan**: Use `ch ctx for-task "your-task"` to generate focused context, verify with me  
3. **Implement**: Execute with `/start-feature` workflow and validation checkpoints

**Start EVERY session with:** `chp` (project overview) followed by the specific task context.

When asked to implement any feature, you'll first say: "Let me use `chp` and research the codebase before creating a plan."

For complex architectural decisions, use **"ultrathink"** + `/understand-codebase` for maximum insight.

### USE MULTIPLE AGENTS + TOOLS!
*Leverage subagents AND shell tools aggressively* for better results:

* Use `ch m read-many` to batch file reading and reduce token usage
* Spawn agents with specific context: "I'll have an agent use `/explore-module` on the collections while I analyze API structure"
* Use `chs find-code` for parallel pattern discovery across the codebase
* Delegate with tools: "Agent 1: `/gather-tech-docs`, Agent 2: `chg status` + implement feature"
* For complex refactors: One agent uses `/tech-debt-hunt`, another implements fixes

Say: "I'll spawn agents with shell tools to tackle different aspects efficiently" whenever tasks can be parallelized.

### Reality Checkpoints (Enhanced)
**Stop and validate** at these moments:
- After implementing a complete feature
- Before starting a new major component  
- When something feels wrong
- Before declaring "done"
- **WHEN HOOKS FAIL WITH ERRORS** ❌

**Enhanced validation commands:**
```bash
# Standard checks
npm run lint && npm run type-check && npm run test

# Use shell tools for comprehensive validation
ch cq todos          # Check for TODOs and code quality
ch env tools         # Verify environment setup
chg status          # Git status and health
ch ts build         # TypeScript build verification
```

> Why: You can lose track of what's actually working. These checkpoints prevent cascading failures.

### 🚨 CRITICAL: Hook Failures Are BLOCKING
**When hooks report ANY issues (exit code 2), you MUST:**
1. **STOP IMMEDIATELY** - Do not continue with other tasks
2. **FIX ALL ISSUES** - Address every ❌ issue until everything is ✅ GREEN
3. **VERIFY THE FIX** - Re-run the failed command to confirm it's fixed
4. **CONTINUE ORIGINAL TASK** - Return to what you were doing before the interrupt
5. **NEVER IGNORE** - There are NO warnings, only requirements

This includes:
- TypeScript errors (strict mode violations)
- ESLint violations (coding standards)
- Prettier formatting issues
- Forbidden patterns (any types, untyped APIs)
- PayloadCMS collection validation errors
- ALL other checks

Your code must be 100% clean. No exceptions.

**Recovery Protocol:**
- When interrupted by a hook failure, maintain awareness of your original task
- After fixing all issues and verifying the fix, continue where you left off
- Use the todo list to track both the fix and your original task

## Working Memory Management

### When context gets long:
- Re-read this CLAUDE.md file
- Use `chp` for instant project state refresh
- Summarize progress in a PROGRESS.md file using `/dev-diary`
- Document current state before major changes

### Maintain TODO.md (Enhanced):
```bash
# Use shell tools to maintain context
ch cq todos           # Find existing TODOs in codebase
ch ctx for-task       # Generate context for specific tasks

## Current Task
- [ ] What we're doing RIGHT NOW

## Completed  
- [x] What's actually done and tested

## Next Steps
- [ ] What comes next

## Context Commands Used
- chp (project overview)
- chs find-code "pattern" 
- ch ctx for-task "specific-task"
```

## TypeScript + Next.js + PayloadCMS Rules

### FORBIDDEN - NEVER DO THESE:
- **NO `any` types** - use proper TypeScript interfaces!
- **NO untyped API responses** - always define response types!
- **NO client-side data fetching in RSCs** - use server components properly!
- **NO direct database calls from components** - use service layer!
- **NO keeping old and new code together**
- **NO migration functions or compatibility layers**
- **NO versioned function names** (processV2, handleNew)
- **NO custom error hierarchies without proper typing**
- **NO TODOs in final code**
- **NO inline styles** - use Tailwind CSS classes or CSS modules!
- **NO unstructured PayloadCMS collections** - follow schema patterns!

> **AUTOMATED ENFORCEMENT**: The lint hooks will BLOCK commits that violate these rules.  
> When you see `❌ FORBIDDEN PATTERN`, you MUST fix it immediately!

### Required Standards:
- **Delete** old code when replacing it
- **Meaningful names**: `articleId` not `id`, `newsCategory` not `cat`
- **Early returns** to reduce nesting
- **Concrete types** from functions: `async function getArticles(): Promise<Article[]>`
- **Proper error handling**: Use Next.js error boundaries and proper error types
- **Service layer abstraction**: All data access through services
- **PayloadCMS Local API**: Use Local API for server-side operations
- **Block-based content**: Leverage PayloadCMS blocks for flexible content
- **Typed collections**: All PayloadCMS collections must have proper TypeScript types

## Block Development Patterns

### Content Block Architecture:
```typescript
// Block types must be strongly typed
interface HeroBlock {
  blockType: 'hero';
  headline: string;
  subheadline?: string;
  image: Media;
  cta?: {
    label: string;
    url: string;
  };
}

interface ArticleListBlock {
  blockType: 'articleList';
  title: string;
  category?: Category;
  limit: number;
  featured?: boolean;
}

type ContentBlock = HeroBlock | ArticleListBlock | ImageGalleryBlock | QuoteBlock;
```

### Block Component Standards:
- **One component per block type**
- **Consistent naming**: `HeroBlock.tsx`, `ArticleListBlock.tsx`
- **Server-first rendering**: Use RSCs when possible
- **Proper error boundaries**: Handle missing data gracefully
- **Responsive design**: Mobile-first approach

### PayloadCMS Collection Patterns:
```typescript
// Always use proper field validation
export const Articles: CollectionConfig = {
  slug: 'articles',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      maxLength: 100,
    },
    {
      name: 'content',
      type: 'blocks',
      blocks: [HeroBlock, ArticleListBlock, ImageGalleryBlock],
    },
  ],
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Always validate and transform data
        return validateArticleData(data);
      },
    ],
  },
};
```

## News Portal Specific Standards

### Content Management:
- **Categories**: Use hierarchical structure with proper slugs
- **Authors**: Rich author profiles with social links
- **Media**: Optimized images with proper alt text and captions
- **SEO**: Structured data for articles and authors
- **Breaking News**: Real-time updates with proper caching

### API Architecture:
```typescript
// Service layer abstraction
export class NewsService extends BaseService {
  async getArticles(params: GetArticlesParams): Promise<PaginatedArticles> {
    // Use PayloadCMS Local API for server-side calls
    const articles = await payload.find({
      collection: 'articles',
      where: this.buildWhereClause(params),
      limit: params.limit || 10,
      page: params.page || 1,
    });
    
    return this.transformArticleResponse(articles);
  }
}
```

### Migration-Ready Architecture:
- **Environment switching**: `API_MODE=internal|external`
- **Service abstraction**: Clean boundaries between internal/external APIs
- **Docker support**: Multiple deployment configurations
- **Database agnostic**: Neon PostgreSQL with Drizzle ORM fallback

## Implementation Standards

### Our code is complete when:
- ✅ All TypeScript errors resolved (strict mode)
- ✅ All ESLint rules pass
- ✅ All tests pass  
- ✅ Feature works end-to-end
- ✅ Old code is deleted
- ✅ JSDoc on all exported functions
- ✅ PayloadCMS collections validate properly

### Testing Strategy
- Complex business logic → Write tests first
- Simple CRUD operations → Write tests after
- API endpoints → Integration tests required
- PayloadCMS hooks → Unit tests for validation logic
- Block components → Render tests with sample data

### Project Structure
```
src/
├── app/                    # Next.js App Router
│   ├── (app)/             # Main site routes
│   ├── (payload)/         # PayloadCMS admin routes
│   └── api/               # API endpoints
├── collections/           # PayloadCMS collections
├── components/            # React components
│   ├── blocks/           # Content blocks
│   ├── ui/               # Reusable UI components
│   └── forms/            # Form components
├── lib/                  # Utilities and configurations
├── services/             # Data access layer
├── hooks/                # Custom React hooks
└── types/                # TypeScript type definitions
```

## Problem-Solving Together (Enhanced with Tools)

When you're stuck or confused:
1. **Stop** - Don't spiral into complex solutions
2. **Use tools** - `chp` for context, `chs find-code` for patterns, `/debug-issue` for systematic debugging
3. **Delegate** - Consider spawning agents with specific shell commands
4. **Ultrathink** - For complex problems: "I need to ultrathink + `/understand-codebase` for this challenge"
5. **Step back** - Re-read requirements, use `ch ctx for-task` to refocus
6. **Simplify** - The simple solution is usually correct
7. **Ask** - "I see approaches: [A with `chg quick-commit`] vs [B with `/start-feature`]. Which do you prefer?"

**Essential troubleshooting commands:**
```bash
chp                    # Project overview and health
ch env tools          # Environment verification  
ch cq todos           # Code quality check
chg status            # Git status
ch ts build           # Build verification
```

My insights on better approaches are valued - please ask for them!

## Performance & Security

### **Measure First**:
- No premature optimization
- Use Next.js built-in analytics
- Monitor Core Web Vitals
- Profile PayloadCMS query performance

### **Security Always**:
- Validate all inputs (use Zod schemas)
- Use environment variables for secrets
- Implement proper CORS policies
- Sanitize rich text content
- Use PayloadCMS access control

### **Next.js Optimization**:
- Use Server Components by default
- Implement proper caching strategies
- Optimize images with Next.js Image component
- Use dynamic imports for client components
- Implement proper error boundaries

## PayloadCMS Best Practices

### Collection Design:
- **Rich relationships**: Use proper field relationships
- **Hooks for validation**: Implement beforeChange hooks
- **Access control**: Define proper access patterns
- **Upload optimization**: Configure media handling properly

### Content Strategy:
- **Block-based content**: Use blocks for flexible layouts
- **Reusable components**: Create shareable block types
- **SEO optimization**: Include meta fields in collections
- **Localization ready**: Design for future i18n support

### Performance:
- **Local API usage**: Use Local API for server-side operations
- **Proper indexing**: Configure database indexes
- **Caching strategy**: Implement proper cache headers
- **Image optimization**: Use Vercel Blob with optimization

## Communication Protocol

### Progress Updates:
```
✅ Implemented article collection (all validations passing)
✅ Added hero block component with responsive design
❌ Found issue with image optimization - investigating
```

### Suggesting Improvements:
"The current block structure works, but I notice [observation].
Would you like me to [specific improvement]?"

## Working Together (Enhanced Workflow)

- This is always a feature branch - no backwards compatibility needed
- When in doubt, we choose clarity over cleverness
- **Start every session with `chp`** for instant project context
- **Use `/commit-and-push` workflow** for complete git operations
- **Leverage `/tdd` for test-driven development** when needed
- **REMINDER**: If this file + `chp` haven't been referenced in 30+ minutes, RE-READ + RE-RUN!

**Daily workflow enhancement:**
1. `chp` - Get project overview
2. `ch cq todos` - Check code quality 
3. Work with appropriate slash commands (`/start-feature`, `/debug-issue`, etc.)
4. `/pre-review-check` before committing
5. `/commit-and-push` for complete git workflow

Avoid complex abstractions or "clever" code. The simple, obvious solution is probably better, and my guidance + these tools help you stay focused on what matters.

**Remember: 50-80% token savings through batched operations and smart tool usage!**

## News Portal Domain Rules

### Content Types:
- **Articles**: Main news content with blocks
- **Categories**: Hierarchical news categories
- **Authors**: Rich author profiles
- **Media**: Optimized images and videos
- **Tags**: Flexible tagging system

### Business Logic:
- **Publishing workflow**: Draft → Review → Published
- **Breaking news**: Priority flagging system
- **Featured content**: Homepage highlighting
- **Related articles**: Smart content suggestions
- **Search functionality**: Full-text search with filters

### SEO Requirements:
- **Structured data**: Article schema markup
- **Open Graph**: Social media optimization  
- **Sitemaps**: Automatic sitemap generation
- **Meta tags**: Dynamic meta tag management
- **Canonical URLs**: Proper URL canonicalization

Remember: We're building a production news portal that can scale from startup to enterprise. Every decision should consider performance, maintainability, and user experience.

---
description: Ultracite Rules
globs: "**/*.{ts,tsx,js,jsx}"
alwaysApply: true
---

- Don't use `accessKey` attribute on any HTML element.
- Don't set `aria-hidden="true"` on focusable elements.
- Don't add ARIA roles, states, and properties to elements that don't support them.
- Don't use distracting elements like `<marquee>` or `<blink>`.
- Only use the `scope` prop on `<th>` elements.
- Don't assign non-interactive ARIA roles to interactive HTML elements.
- Make sure label elements have text content and are associated with an input.
- Don't assign interactive ARIA roles to non-interactive HTML elements.
- Don't assign `tabIndex` to non-interactive HTML elements.
- Don't use positive integers for `tabIndex` property.
- Don't include "image", "picture", or "photo" in img `alt` prop.
- Don't use explicit role property that's the same as the implicit/default role.
- Make static elements with click handlers use a valid role attribute.
- Always include a `title` element for SVG elements.
- Give all elements requiring alt text meaningful information for screen readers.
- Make sure anchors have content that's accessible to screen readers.
- Assign `tabIndex` to non-interactive HTML elements with `aria-activedescendant`.
- Include all required ARIA attributes for elements with ARIA roles.
- Make sure ARIA properties are valid for the element's supported roles.
- Always include a `type` attribute for button elements.
- Make elements with interactive roles and handlers focusable.
- Give heading elements content that's accessible to screen readers (not hidden with `aria-hidden`).
- Always include a `lang` attribute on the html element.
- Always include a `title` attribute for iframe elements.
- Accompany `onClick` with at least one of: `onKeyUp`, `onKeyDown`, or `onKeyPress`.
- Accompany `onMouseOver`/`onMouseOut` with `onFocus`/`onBlur`.
- Include caption tracks for audio and video elements.
- Use semantic elements instead of role attributes in JSX.
- Make sure all anchors are valid and navigable.
- Ensure all ARIA properties (`aria-*`) are valid.
- Use valid, non-abstract ARIA roles for elements with ARIA roles.
- Use valid ARIA state and property values.
- Use valid values for the `autocomplete` attribute on input elements.
- Use correct ISO language/country codes for the `lang` attribute.
- Don't use consecutive spaces in regular expression literals.
- Don't use the `arguments` object.
- Don't use primitive type aliases or misleading types.
- Don't use the comma operator.
- Don't use empty type parameters in type aliases and interfaces.
- Don't write functions that exceed a given Cognitive Complexity score.
- Don't nest describe() blocks too deeply in test files.
- Don't use unnecessary boolean casts.
- Don't use unnecessary callbacks with flatMap.
- Use for...of statements instead of Array.forEach.
- Don't create classes that only have static members (like a static namespace).
- Don't use this and super in static contexts.
- Don't use unnecessary catch clauses.
- Don't use unnecessary constructors.
- Don't use unnecessary continue statements.
- Don't export empty modules that don't change anything.
- Don't use unnecessary escape sequences in regular expression literals.
- Don't use unnecessary fragments.
- Don't use unnecessary labels.
- Don't use unnecessary nested block statements.
- Don't rename imports, exports, and destructured assignments to the same name.
- Don't use unnecessary string or template literal concatenation.
- Don't use String.raw in template literals when there are no escape sequences.
- Don't use useless case statements in switch statements.
- Don't use ternary operators when simpler alternatives exist.
- Don't use useless `this` aliasing.
- Don't use any or unknown as type constraints.
- Don't initialize variables to undefined.
- Don't use void operators (they're not familiar).
- Use arrow functions instead of function expressions.
- Use Date.now() to get milliseconds since the Unix Epoch.
- Use .flatMap() instead of map().flat() when possible.
- Use literal property access instead of computed property access.
- Don't use parseInt() or Number.parseInt() when binary, octal, or hexadecimal literals work.
- Use concise optional chaining instead of chained logical expressions.
- Use regular expression literals instead of the RegExp constructor when possible.
- Don't use number literal object member names that aren't base 10 or use underscore separators.
- Remove redundant terms from logical expressions.
- Use while loops instead of for loops when you don't need initializer and update expressions.
- Don't pass children as props.
- Don't reassign const variables.
- Don't use constant expressions in conditions.
- Don't use `Math.min` and `Math.max` to clamp values when the result is constant.
- Don't return a value from a constructor.
- Don't use empty character classes in regular expression literals.
- Don't use empty destructuring patterns.
- Don't call global object properties as functions.
- Don't declare functions and vars that are accessible outside their block.
- Make sure builtins are correctly instantiated.
- Don't use super() incorrectly inside classes. Also check that super() is called in classes that extend other constructors.
- Don't use variables and function parameters before they're declared.
- Don't use 8 and 9 escape sequences in string literals.
- Don't use literal numbers that lose precision.
- Don't use the return value of React.render.
- Don't assign a value to itself.
- Don't return a value from a setter.
- Don't compare expressions that modify string case with non-compliant values.
- Don't use lexical declarations in switch clauses.
- Don't use variables that haven't been declared in the document.
- Don't write unreachable code.
- Make sure super() is called exactly once on every code path in a class constructor before this is accessed if the class has a superclass.
- Don't use control flow statements in finally blocks.
- Don't use optional chaining where undefined values aren't allowed.
- Don't have unused function parameters.
- Don't have unused imports.
- Don't have unused labels.
- Don't have unused private class members.
- Don't have unused variables.
- Make sure void (self-closing) elements don't have children.
- Don't return a value from a function that has a 'void' return type.
- Make sure all dependencies are correctly specified in React hooks.
- Make sure all React hooks are called from the top level of component functions.
- Use isNaN() when checking for NaN.
- Don't forget key props in iterators and collection literals.
- Make sure "for" loop update clauses move the counter in the right direction.
- Make sure typeof expressions are compared to valid values.
- Make sure generator functions contain yield.
- Don't use await inside loops.
- Don't use bitwise operators.
- Don't use expressions where the operation doesn't change the value.
- Don't destructure props inside JSX components in Solid projects.
- Make sure Promise-like statements are handled appropriately.
- Don't use __dirname and __filename in the global scope.
- Prevent import cycles.
- Don't define React components inside other components.
- Don't use event handlers on non-interactive elements.
- Don't assign to React component props.
- Don't use configured elements.
- Don't hardcode sensitive data like API keys and tokens.
- Don't let variable declarations shadow variables from outer scopes.
- Don't use the TypeScript directive @ts-ignore.
- Prevent duplicate polyfills from Polyfill.io.
- Don't use useless backreferences in regular expressions that always match empty strings.
- Don't use unnecessary escapes in string literals.
- Don't use useless undefined.
- Make sure getters and setters for the same property are next to each other in class and object definitions.
- Make sure object literals are declared consistently (defaults to explicit definitions).
- Use static Response methods instead of new Response() constructor when possible.
- Make sure switch-case statements are exhaustive.
- Make sure the `preconnect` attribute is used when using Google Fonts.
- Use `Array#{indexOf,lastIndexOf}()` instead of `Array#{findIndex,findLastIndex}()` when looking for the index of an item.
- Make sure iterable callbacks return consistent values.
- Use `with { type: "json" }` for JSON module imports.
- Use numeric separators in numeric literals.
- Use object spread instead of `Object.assign()` when constructing new objects.
- Always use the radix argument when using `parseInt()`.
- Make sure JSDoc comment lines start with a single asterisk, except for the first one.
- Include a description parameter for `Symbol()`.
- Don't use spread (`...`) syntax on accumulators.
- Don't use the `delete` operator.
- Don't access namespace imports dynamically.
- Don't use `<img>` elements in Next.js projects.
- Don't use namespace imports.
- Declare regex literals at the top level.
- Don't use `target="_blank"` without `rel="noopener"`.
- Don't use dangerous JSX props.
- Don't use both `children` and `dangerouslySetInnerHTML` props on the same element.
- Don't use global `eval()`.
- Don't use callbacks in asynchronous tests and hooks.
- Don't use TypeScript enums.
- Don't export imported variables.
- Don't use `<head>` elements in Next.js projects.
- Don't add type annotations to variables, parameters, and class properties that are initialized with literal expressions.
- Don't use TypeScript namespaces.
- Don't use negation in `if` statements that have `else` clauses.
- Don't use nested ternary expressions.
- Don't use non-null assertions with the `!` postfix operator.
- Don't reassign function parameters.
- Don't use parameter properties in class constructors.
- This rule lets you specify global variable names you don't want to use in your application.
- Don't use specified modules when loaded by import or require.
- Don't use user-defined types.
- Don't use constants whose value is the upper-case version of their name.
- Use `String.slice()` instead of `String.substr()` and `String.substring()`.
- Don't use template literals if you don't need interpolation or special-character handling.
- Don't use `else` blocks when the `if` block breaks early.
- Don't use yoda expressions.
- Don't use Array constructors.
- Use `as const` instead of literal types and type annotations.
- Use `at()` instead of integer index access.
- Follow curly brace conventions.
- Use `else if` instead of nested `if` statements in `else` clauses.
- Use single `if` statements instead of nested `if` clauses.
- Use either `T[]` or `Array<T>` consistently.
- Use `new` for all builtins except `String`, `Number`, and `Boolean`.
- Use consistent accessibility modifiers on class properties and methods.
- Use `const` declarations for variables that are only assigned once.
- Put default function parameters and optional function parameters last.
- Include a `default` clause in switch statements.
- Initialize each enum member value explicitly.
- Use the `**` operator instead of `Math.pow`.
- Use `export type` for types.
- Use `for-of` loops when you need the index to extract an item from the iterated array.
- Use `<>...</>` instead of `<Fragment>...</Fragment>`.
- Use `import type` for types.
- Make sure all enum members are literal values.
- Use `node:assert/strict` over `node:assert`.
- Use the `node:` protocol for Node.js builtin modules.
- Use Number properties instead of global ones.
- Don't add extra closing tags for components without children.
- Use assignment operator shorthand where possible.
- Use function types instead of object types with call signatures.
- Use template literals over string concatenation.
- Use `new` when throwing an error.
- Don't throw non-Error values.
- Use `String.trimStart()` and `String.trimEnd()` over `String.trimLeft()` and `String.trimRight()`.
- Use standard constants instead of approximated literals.
- Don't use Array index in keys.
- Don't assign values in expressions.
- Don't use async functions as Promise executors.
- Don't reassign exceptions in catch clauses.
- Don't reassign class members.
- Don't insert comments as text nodes.
- Don't compare against -0.
- Don't use labeled statements that aren't loops.
- Don't use void type outside of generic or return types.
- Don't use console.
- Don't use TypeScript const enum.
- Don't use control characters and escape sequences that match control characters in regular expression literals.
- Don't use debugger.
- Don't assign directly to document.cookie.
- Don't import next/document outside of pages/_document.jsx in Next.js projects.
- Use `===` and `!==`.
- Don't use duplicate case labels.
- Don't use duplicate class members.
- Don't use duplicate conditions in if-else-if chains.
- Don't assign JSX properties multiple times.
- Don't use two keys with the same name inside objects.
- Don't use duplicate function parameter names.
- Don't have duplicate hooks in describe blocks.
- Don't use empty block statements and static blocks.
- Don't declare empty interfaces.
- Don't let variables evolve into any type through reassignments.
- Don't use the any type.
- Don't use export or module.exports in test files.
- Don't misuse the non-null assertion operator (!) in TypeScript files.
- Don't let switch clauses fall through.
- Don't use focused tests.
- Don't reassign function declarations.
- Don't allow assignments to native objects and read-only global variables.
- Use Number.isFinite instead of global isFinite.
- Use Number.isNaN instead of global isNaN.
- Don't use the next/head module in pages/_document.js on Next.js projects.
- Don't use implicit any type on variable declarations.
- Don't assign to imported bindings.
- Don't use irregular whitespace characters.
- Don't use labels that share a name with a variable.
- Don't use characters made with multiple code points in character class syntax.
- Make sure to use new and constructor properly.
- Make sure the assertion function, like expect, is placed inside an it() function call.
- Don't use shorthand assign when the variable appears on both sides.
- Don't use octal escape sequences in string literals.
- Don't use Object.prototype builtins directly.
- Don't redeclare variables, functions, classes, and types in the same scope.
- Don't have redundant "use strict".
- Don't compare things where both sides are exactly the same.
- Don't let identifiers shadow restricted names.
- Don't use disabled tests.
- Don't use sparse arrays (arrays with holes).
- Watch out for possible "wrong" semicolons inside JSX elements.
- Don't use template literal placeholder syntax in regular strings.
- Don't use the then property.
- Don't merge interfaces and classes unsafely.
- Don't use unsafe negation.
- Don't use var.
- Don't use with statements in non-strict contexts.
- Don't use overload signatures that aren't next to each other.
- Make sure async functions actually use await.
- Make sure default clauses in switch statements come last.
- Make sure to pass a message value when creating a built-in error.
- Make sure get methods always return a value.
- Use a recommended display strategy with Google Fonts.
- Make sure for-in loops include an if statement.
- Use Array.isArray() instead of instanceof Array.
- Use the namespace keyword instead of the module keyword to declare TypeScript namespaces.
- Make sure to use the digits argument with Number#toFixed().
- Make sure to use the "use strict" directive in script files.



