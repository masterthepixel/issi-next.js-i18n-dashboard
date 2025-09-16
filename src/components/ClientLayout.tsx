"use client";

import { AnimatedBackground } from "@/components/AnimatedBackground";
import ClientNavigation from "@/components/ClientNavigation";
import ClientOnly from "@/components/ClientOnly";
import Content from "@/components/Content";
import ErrorBoundary from "@/components/ErrorBoundary";
import Footer from "@/components/Footer";
import IntelligentBreadcrumb from "@/components/IntelligentBreadcrumb";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { ThemeProviderWrapper } from "@/components/ThemeProviderWrapper";
import React from 'react';
import { IntlProvider } from 'react-intl';
import { usePathname } from 'next/navigation';

import { Locale } from "@/lib/definitions";
import { MessageFormatElement } from "react-intl";

interface Props {
  lang: Locale;
  messages: Record<string, string>;
  intlMessages: Record<string, string> | Record<string, MessageFormatElement[]>;
  children: React.ReactNode;
}

export default function ClientLayout({ lang, messages, intlMessages, children }: Props) {
  const pathname = usePathname();
  
  // Check if we're on homepage (including /home routes)
  const homepagePaths = ['/', '/en', '/fr', '/es', '/en/home', '/fr/home', '/es/home', '/home'];
  const isHomepage = homepagePaths.includes(pathname);

  return (
    <ErrorBoundary>
      <ThemeProviderWrapper>
        <AnimatedBackground />

        {/* Provide react-intl IntlProvider at app lang layout so both server and client renders have access */}
        <IntlProvider locale={lang} messages={messages}>
          <Content>
            <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-24">
              {!isHomepage && <IntelligentBreadcrumb className="mb-6" />}
            </div>
            {children}
          </Content>
          <Footer locale={lang} messages={messages} />
        </IntlProvider>

        <ClientNavigation locale={lang} messages={intlMessages} />
        <ClientOnly>
          <ScrollToTopButton />
        </ClientOnly>
      </ThemeProviderWrapper>
    </ErrorBoundary>
  );
}
