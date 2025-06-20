# New Alternative Hero Component Documentation

## Overview

A new alternative hero component has been created for the ISSI homepage that provides a clean, modern design while maintaining the existing styling conventions and internationalization support.

## Component Files

- `src/components/NewAlternativeHero.tsx` - Main hero component
- `src/components/NewAlternativeHeroWrapper.tsx` - IntlProvider wrapper (no longer needed)

## Current Integration

The new hero is currently integrated in `src/components/Hero.tsx` with the original hero (`HomePageGlobalHero`) hidden:

```tsx
{/* Original Hero (HomePageGlobalHero) - HIDDEN FOR NOW */}
<div className="hidden">
  <HomePageGlobalHero />
</div>

{/* New Alternative Hero Section - CURRENTLY ACTIVE */}
<NewAlternativeHero lang={locale} />
```

**Hidden Component:** `HomePageGlobalHero` - The original homepage hero with interactive globe and flip words animation

## Translation Keys

The following translation keys have been added to all language files:

### English (`src/lang/en.json`)

```json
"newhero.announcement.badge": "What's new",
"newhero.announcement.text": "Just shipped v2.0",
"newhero.title": "Deploy to the cloud with confidence",
"newhero.description": "Leading <innovativeTechnology>government technology solutions</innovativeTechnology> with <enterprise>enterprise-grade security</enterprise>, compliance, and scalability. Trusted by <government>agencies worldwide</government> for mission-critical applications.",
"newhero.cta.get-started": "Get started",
"newhero.cta.learn-more": "Learn more"
```

### French (`src/lang/fr.json`)

```json
"newhero.announcement.badge": "Nouveauté",
"newhero.announcement.text": "Nous venons de livrer la v2.0",
"newhero.title": "Déployez dans le cloud en toute confiance",
"newhero.description": "Solutions <innovativeTechnology>technologiques gouvernementales</innovativeTechnology> de pointe avec sécurité <enterprise>de niveau entreprise</enterprise>, conformité et évolutivité. Approuvé par les <government>agences du monde entier</government> pour les applications critiques.",
"newhero.cta.get-started": "Commencer",
"newhero.cta.learn-more": "En savoir plus"
```

### Spanish (`src/lang/es.json`)

```json
"newhero.announcement.badge": "Novedades",
"newhero.announcement.text": "Acabamos de lanzar v2.0",
"newhero.title": "Implementa en la nube con confianza",
"newhero.description": "Soluciones <innovativeTechnology>tecnológicas gubernamentales</innovativeTechnology> líderes con seguridad <enterprise>de nivel empresarial</enterprise>, cumplimiento y escalabilidad. Confiado por <government>agencias de todo el mundo</government> para aplicaciones críticas.",
"newhero.cta.get-started": "Comenzar",
"newhero.cta.learn-more": "Aprender más"
```

## Design Features

- **SVG Pattern Background**: Subtle geometric pattern with light/dark mode support
- **ISSI Logo**: Uses the official ISSI logo from `/images/issi_logo.png`
- **Announcement Badge**: "What's new" badge with version information
- **Responsive Layout**: Mobile-first design with desktop optimizations
- **Featured Image**: Uses existing ISSI screenshot image
- **Styled Buttons**: Matches current hero button styling
- **Accessibility**: Proper ARIA labels and semantic HTML

## Styling Conventions Maintained

- **Text Sizes**: Matches current hero text sizing (text-3xl sm:text-4xl for h1, text-sm sm:text-base lg:text-lg for description)
- **Font Colors**: Uses slate color palette consistent with current design
- **Button Styles**: Primary button matches current indigo theme with hover effects
- **Dark Mode**: Full dark mode support with proper color variants
- **Spacing**: Consistent with current layout spacing

## Assets Used

- **Logo**: `/images/issi_logo.png` (existing ISSI logo)
- **Featured Image**: `/images/deploy-nextjs-on-vercel.png` (existing screenshot)

## TODO: Hero Toggle Management

Create a simple toggle system to easily switch between heroes:

1. **Add Environment Variable** (optional):

   ```env
   NEXT_PUBLIC_USE_NEW_HERO=true
   ```

2. **Update Hero.tsx with Toggle**:

   ```tsx
   const useNewHero = process.env.NEXT_PUBLIC_USE_NEW_HERO === 'true';
   
   return (
     <>
       {useNewHero ? (
         <NewAlternativeHero lang={locale} />
       ) : (
         <HomePageGlobalHero />
       )}
     </>
   );
   ```

## Revert Instructions

To revert to the original hero:

1. **Update `src/components/Hero.tsx`**:

   ```tsx
   export default function Hero() {
     return (
       <>
         <HomePageGlobalHero />
       </>
     );
   }
   ```

2. **Optional: Remove New Hero Files**:
   - `src/components/NewAlternativeHero.tsx`
   - `src/components/NewAlternativeHeroWrapper.tsx`

3. **Optional: Remove Translation Keys**:
   - Remove all `newhero.*` keys from language files

## Testing Checklist

- [ ] Hero displays correctly on all screen sizes
- [ ] Dark/light mode switching works properly
- [ ] All links navigate to correct pages
- [ ] Internationalization works in all languages (en, fr, es)
- [ ] Logo and featured image load correctly
- [ ] Button hover effects work as expected
- [ ] Accessibility features function properly
- [ ] Performance impact is minimal
