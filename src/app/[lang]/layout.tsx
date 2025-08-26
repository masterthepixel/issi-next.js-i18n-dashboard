import { AnimatedBackground } from "@/components/AnimatedBackground";
import ClientOnly from "@/components/ClientOnly";
import Content from "@/components/Content";
import ErrorBoundary from "@/components/ErrorBoundary";
import FooterWrapper from "@/components/FooterWrapper";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import HoverGradientNavBar from "@/components/ui/hover-gradient-nav-bar";
// UniversalIntelligentBreadcrumbWrapper removed
import { ThemeProvider } from "next-themes";
import React from 'react';
import { IntlProvider } from "react-intl";

import { fontClassNames } from "@/app/fonts";
import { getUser } from "@/lib/data";
import { Locale } from "@/lib/definitions";
import { getIntl } from "@/lib/intl";
import { defaultMetadata } from "@/lib/metadata";

import { i18n } from "../../../i18n-config";

import "@/styles/globals.css";

export const metadata = defaultMetadata;

interface Props {
  params: { lang: Locale };
  children: React.ReactNode;
}

export default async function Root({ params, children }: Props) {
  const { lang } = await params;
  const user = await getUser();
  const intl = await getIntl(lang);
  const messages = (await import(`../../lang/${lang}.json`)).default;

 return (
    <html lang={lang} className={`h-full ${fontClassNames}`}>
      <head />
      <body className="relative min-h-screen overflow-y-auto overflow-x-visible grid-background-with-fade flex flex-col debug-screens">
        <ErrorBoundary>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <AnimatedBackground />
            
            <Content>
              {/* Universal Intelligent Breadcrumb removed */}
              {children}
            </Content>
            <FooterWrapper locale={lang} />
            <ClientOnly>
              <IntlProvider locale={lang} messages={intl.messages}>
                <HoverGradientNavBar locale={lang} />
              </IntlProvider>
              <ScrollToTopButton />
            </ClientOnly>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}
