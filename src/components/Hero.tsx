"use client";

import { useIntl } from 'react-intl';
import NewAlternativeHero from './NewAlternativeHero';

export default function Hero() {
  const intl = useIntl();
  const locale = intl.locale || 'en';

  return (
    <>
      {/* New Alternative Hero Section */}
      <NewAlternativeHero lang={locale} />
    </>
  );
}
