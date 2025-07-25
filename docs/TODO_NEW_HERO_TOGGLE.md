# TODO: New Alternative Hero Management

## Current Status

✅ **COMPLETED**: New alternative hero has been created and is currently active on the homepage.

## Active Components

- ✅ `NewAlternativeHero.tsx` - Main new hero component (CURRENTLY ACTIVE)
- ✅ `HomePageGlobalHero.tsx` - Original hero component with interactive globe (HIDDEN)
- ✅ Translation keys added to all language files (en, fr, es)

**Note:** The hidden component is `HomePageGlobalHero` which contains the original homepage hero with the interactive globe and flip words animation.

## Quick Toggle Instructions

### To Switch Back to Original Hero

Edit `src/components/Hero.tsx`:

```tsx
export default function Hero() {
  return (
    <>
      {/* Original Hero (HomePageGlobalHero) - NOW ACTIVE */}
      <HomePageGlobalHero />
      
      {/* New Alternative Hero - NOW HIDDEN */}
      <div className="hidden">
        <NewAlternativeHero lang={locale} />
      </div>
    </>
  );
}
```

### To Switch to New Hero (Current State)

Edit `src/components/Hero.tsx`:

```tsx
export default function Hero() {
  return (
    <>
      {/* Original Hero (HomePageGlobalHero) - HIDDEN */}
      <div className="hidden">
        <HomePageGlobalHero />
      </div>
      
      {/* New Alternative Hero - ACTIVE */}
      <NewAlternativeHero lang={locale} />
    </>
  );
}
```

## Testing Checklist

### After Any Hero Switch

- [ ] Homepage loads without errors
- [ ] Hero displays correctly on desktop and mobile
- [ ] Dark/light mode toggle works
- [ ] Language switching works (en/fr/es)
- [ ] All buttons and links work correctly
- [ ] Images load properly (logo and featured image)

## Related Documentation

- `docs/NEW_HERO_DOCUMENTATION.md` - Complete documentation for the new hero
- `docs/INTELLIGENT_BREADCRUMB_SYSTEM.md` - Documentation for the breadcrumb system
- `docs/TODO_INTELLIGENT_BREADCRUMB.md` - Breadcrumb reactivation instructions

## Cleanup Options (If Removing New Hero Permanently)

1. Delete `src/components/NewAlternativeHero.tsx`
2. Delete `src/components/NewAlternativeHeroWrapper.tsx` (if not needed)
3. Remove `newhero.*` keys from all language files:
   - `src/lang/en.json`
   - `src/lang/fr.json`
   - `src/lang/es.json`
