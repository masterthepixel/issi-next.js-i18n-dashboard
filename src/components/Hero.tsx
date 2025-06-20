"use client";

import { useIntl } from 'react-intl';
import HomePageGlobalHero from './HomePageGlobalHero';
import NewAlternativeHero from './NewAlternativeHero';

export default function Hero() {
  const intl = useIntl();
  const locale = intl.locale || 'en';

  return (
    <>
      {/* Original Hero - HIDDEN FOR NOW */}
      <div className="hidden">
        <HomePageGlobalHero />
      </div>
      
      {/* New Alternative Hero Section */}
      <NewAlternativeHero lang={locale} />
    </>
  );
}
