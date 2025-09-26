"use client";

import { AnimatedBackground } from "@/components/AnimatedBackground";
import ClientNavigation from "@/components/ClientNavigation";
import ClientOnly from "@/components/ClientOnly";
import Content from "@/components/Content";
import ErrorBoundary from "@/components/ErrorBoundary";
import Footer from "@/components/Footer";
import IntelligentBreadcrumb from "@/components/IntelligentBreadcrumb";
import NewBottomActionBar from "@/components/NewBottomActionBar";
import { ThemeProviderWrapper } from "@/components/ThemeProviderWrapper";
import dynamic from "next/dynamic";
import { usePathname } from 'next/navigation';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import { IntlProvider } from 'react-intl';
const FooterContactCTA = dynamic(() => import("@/components/FooterContactCTA"), { ssr: false });

// Dynamic imports for non-critical components
const JobBannerWrapper = lazy(() => import("@/components/careers/JobBannerWrapper").then(mod => ({ default: mod.JobBannerWrapper })));
const ScrollToTopButton = lazy(() => import("@/components/ScrollToTopButton"));

import { Locale } from "@/lib/definitions";
import { performanceMonitor } from "@/lib/performance-monitor";
import { swManager } from "@/lib/service-worker";
import { MessageFormatElement } from "react-intl";

interface Props {
  lang: Locale;
  messages: Record<string, string>;
  intlMessages: Record<string, string> | Record<string, MessageFormatElement[]>;
  children: React.ReactNode;
}

export default function ClientLayout({ lang, messages, intlMessages, children }: Props) {
  const pathname = usePathname();
  const [isBannerVisible, setIsBannerVisible] = useState(false);

  // Register service worker for caching
  useEffect(() => {
    // Service worker is automatically registered by swManager on import
    // Listen for updates if needed in the future
    const unsubscribe = swManager.onUpdate((_registration) => {
      console.log('[SW] Update available');
      // Could show a toast notification here
    });

    // Performance monitoring is automatically initialized
    // Track page view
    performanceMonitor.trackEvent('Page View', 0);

    return () => {
      unsubscribe();
    };
  }, []);

  // Check if we're on homepage (including /home routes)
  const homepagePaths = ['/', '/en', '/fr', '/es', '/en/home', '/fr/home', '/es/home', '/home'];
  const isHomepage = homepagePaths.includes(pathname);

  return (
    <ErrorBoundary>
      <ThemeProviderWrapper>
        <AnimatedBackground />

        {/* Provide react-intl IntlProvider at app lang layout so both server and client renders have access */}
        <IntlProvider locale={lang} messages={messages}>
          <Suspense fallback={<div style={{ height: '60px' }} />}>
            <JobBannerWrapper locale={lang} onVisibilityChange={setIsBannerVisible} />
          </Suspense>

          <ClientNavigation locale={lang} messages={intlMessages} bannerVisible={isBannerVisible} />
          <Content>
            <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-24">
              {!isHomepage && <IntelligentBreadcrumb className="mb-6" />}
            </div>
            {children}
          </Content>
          <FooterContactCTA locale={lang} messages={messages} />
          <Footer locale={lang} messages={messages} />
          <NewBottomActionBar />
        </IntlProvider>

        <ClientOnly skipHydration={true}>
          <Suspense fallback={null}>
            <ScrollToTopButton />
          </Suspense>
        </ClientOnly>
      </ThemeProviderWrapper>
    </ErrorBoundary>
  );
}
