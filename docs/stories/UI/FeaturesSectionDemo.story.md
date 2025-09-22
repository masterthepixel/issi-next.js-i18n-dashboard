# Story UI-FE-001: Home Features Section (FeaturesSectionDemo)

## Story Overview

As a prospective customer visiting the marketing site, I want to quickly scan a concise, visually engaging features section so that I can understand the product's value and decide whether to explore further.

## Story Details

- Story Points: 5
- Priority: Medium
- Epic: Marketing Site → Homepage Experience
- Depends On: Global layout/theme, i18n setup, icon library availability

## Acceptance Criteria

- [ ] A features section renders on supported pages showing 4 feature tiles/cards with: title, short description, and an accompanying visual/skeleton.
- [ ] Section heading and copy are localized; no hard-coded English strings in the component.
- [ ] Layout is responsive:
  - Mobile: single column stack
  - Desktop (lg+): 6-column grid with tile spans matching the current design (4/2, 3/3, etc.).
- [ ] All images use Next.js Image component; no native <img> elements are used anywhere in this section.
- [ ] All images have meaningful alt text that does not contain the words "image", "picture", or "photo".
- [ ] External links (e.g., YouTube) open in a new tab and include rel="noopener noreferrer" when target="\_blank" is used; no non-standard target values.
- [ ] Interactive elements are keyboard accessible and have a visible focus style; static elements do not use interactive roles/handlers.
- [ ] Motion/animation respects prefers-reduced-motion; on reduce, transitions are minimized or disabled.
- [ ] No invalid ARIA attributes; only use ARIA when necessary and supported by the element.
- [ ] No usage of disallowed props or patterns per Ultracite Rules (e.g., no accessKey, no positive tabIndex, no onClick on non-interactive elements, etc.).
- [ ] No remote image hotlinking from unapproved domains; use local assets or domains configured in next.config images.
- [ ] LCP for the section's hero/primary imagery is optimized (local images, optimized sizes, priority only when appropriate).

## Technical Requirements

- Component: `src/components/features-section-demo-3.tsx`
  - Replace any native `<img>` usage with `next/image`.
  - Ensure optional animations from `motion/react` follow prefers-reduced-motion.
  - Ensure external link uses `target="_blank"` and `rel="noopener noreferrer"`.
  - Ensure YouTube icon and visuals are accessible (descriptive link text or aria-label).
- Assets:
  - Place section images under `public/images/features/` with optimized sizes/format (webp/avif preferred).
  - Provide descriptive alt text for each asset.
- i18n:
  - Pull all text (section header, paragraph, card titles/descriptions) from translation files.
- Accessibility:
  - No roles added where semantic elements suffice.
  - Heading hierarchy remains logical (no skipped levels).

## Internationalization

- Supported locales: en, es, fr (extend as project supports)
- Translation keys (example):
  - `home.features.title`
  - `home.features.subtitle`
  - `home.features.cards.trackIssues.title`
  - `home.features.cards.trackIssues.description`
  - `home.features.cards.captureAI.title`
  - `home.features.cards.captureAI.description`
  - `home.features.cards.youtube.title`
  - `home.features.cards.youtube.description`
  - `home.features.cards.deploy.title`
  - `home.features.cards.deploy.description`

## File Structure

```
src/
└── components/
    └── features-section-demo-3.tsx      # Features section component
public/
└── images/
    └── features/                        # Local assets for this section
```

## Testing Requirements

### Unit Tests

- Renders section title and four features using localized strings.
- Uses `next/image` and no `<img>` elements are present.
- External link(s) have `target="_blank"` and `rel="noopener noreferrer"`.
- Honors prefers-reduced-motion by reducing animation duration or disabling motion.

### Integration Tests

- Responsive behavior: verify single column on small screens and expected grid spans on lg+.
- Localized content switches when changing locale (e.g., en → es).
- Alt text is present and meaningful for all images.

### E2E Tests

- Navigate to the homepage and validate the features section is visible and readable.
- Keyboard navigation traverses any interactive elements with visible focus.
- External link opens in a new tab without taking focus from the origin tab unexpectedly.

## Dependencies

- Tailwind CSS for layout and styling.
- `@tabler/icons-react` for icons.
- `motion/react` for optional animation.
- Next.js Image component.
- i18n library/config present in the app (existing project setup).

## Definition of Done

- [ ] All acceptance criteria satisfied.
- [ ] Section content is localized for supported locales with fallbacks.
- [ ] Accessibility checks (WCAG 2.1 AA) pass; no violations from automated tooling for this section.
- [ ] Performance: local assets optimized; no hotlinked unapproved domains.
- [ ] Unit, integration, and E2E tests added and passing (≥80% coverage for this component).
- [ ] PR reviewed and approved; documentation updated where relevant.

---

### Notes

- Follow the Ultracite Rules defined in `AGENTS.md` (notably: avoid native `<img>` in Next.js, ensure proper link security, avoid invalid ARIA) when implementing or refactoring this component.
