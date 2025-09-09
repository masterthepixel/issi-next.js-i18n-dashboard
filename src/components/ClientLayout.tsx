"use client";

import { AnimatedBackground } from "@/components/AnimatedBackground";
import ClientNavigation from "@/components/ClientNavigation";
import ClientOnly from "@/components/ClientOnly";
import Content from "@/components/Content";
import ErrorBoundary from "@/components/ErrorBoundary";
import FooterWrapper from "@/components/FooterWrapper";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import { ThemeProviderWrapper } from "@/components/ThemeProviderWrapper";
import React from 'react';
import { IntlProvider } from 'react-intl';

import { Locale } from "@/lib/definitions";
import { MessageFormatElement } from "react-intl";

interface Props {
  lang: Locale;
  messages: Record<string, string>;
  intlMessages: Record<string, string> | Record<string, MessageFormatElement[]>;
  children: React.ReactNode;
}

export default function ClientLayout({ lang, messages, intlMessages, children }: Props) {
  return (
    <ErrorBoundary>
      <ThemeProviderWrapper>
        <AnimatedBackground />

        {/* Provide react-intl IntlProvider at app lang layout so both server and client renders have access */}
        <IntlProvider locale={lang} messages={messages}>
          <Content>
            {/* Universal Intelligent Breadcrumb removed */}
            {children}
          </Content>
          <FooterWrapper locale={lang} />
        </IntlProvider>

        <ClientOnly>
          <ClientNavigation locale={lang} messages={intlMessages} />
          <ScrollToTopButton />
        </ClientOnly>
      </ThemeProviderWrapper>
    </ErrorBoundary>
  );
}
