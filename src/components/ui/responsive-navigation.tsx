'use client';

import { DesktopNavigation } from '@/components/ui/desktop-navigation';
import { MobileCardNavigation } from '@/components/ui/mobile-card-navigation';

interface ResponsiveNavigationProps {
  locale: string;
  bannerVisible?: boolean;
  additionalMenuItems?: Array<{
    label: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
  }>;
}

export function ResponsiveNavigation({ 
  locale, 
  bannerVisible = false, 
  additionalMenuItems = [] 
}: ResponsiveNavigationProps) {
  return (
    <>
      {/* Desktop Navigation (md+) */}
      <DesktopNavigation 
        locale={locale} 
        bannerVisible={bannerVisible}
        additionalMenuItems={additionalMenuItems}
      />
      
      {/* Mobile Navigation (<md) */}
      <MobileCardNavigation 
        locale={locale} 
        bannerVisible={bannerVisible}
      />
    </>
  );
}