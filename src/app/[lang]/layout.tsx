import { AnimatedBackground } from "@/components/AnimatedBackground";
import ClientOnly from "@/components/ClientOnly";
import Content from "@/components/Content";
import ErrorBoundary from "@/components/ErrorBoundary";
import FeatureFlagManager from "@/components/FeatureFlagManager";
import FooterWrapper from "@/components/FooterWrapper";
import MobileFloatingMenu from "@/components/MobileFloatingMenu";
import Navbar from "@/components/Navbar";
import ScrollToTopButton from "@/components/ScrollToTopButton";
import UniversalIntelligentBreadcrumbWrapper from '@/components/UniversalIntelligentBreadcrumbWrapper';
import { ThemeProvider } from "next-themes";
import React from 'react';

import { getUser } from "@/lib/data";
import { Locale } from "@/lib/definitions";
import { getIntl } from "@/lib/intl";
import { defaultMetadata } from "@/lib/metadata";

import { i18n } from "../../../i18n-config";

import "@/app/globals.css";

export const metadata = defaultMetadata;

interface Props {
  params: { lang: Locale };
  children: React.ReactNode;
}

export default async function Root({ params, children }: Props) {
  const user = await getUser();
  const intl = await getIntl(params.lang);
  const messages = (await import(`../../lang/${params.lang}.json`)).default;

  const navigationItems = [
    {
      title: intl.formatMessage({ id: "common.navigation.services" }),
      icon: "services",
      href: `/${params.lang}/services`,
    },
    {
      title: intl.formatMessage({ id: "common.navigation.products" }),
      icon: "products",
      href: `/${params.lang}/products`,
    },
    {
      title: intl.formatMessage({ id: "common.navigation.government" }),
      icon: "government",
      href: `/${params.lang}/government`,
    },
    {
      title: intl.formatMessage({ id: "common.navigation.eLearning" }),
      icon: "eLearning",
      href: `/${params.lang}/eLearning`,
    },
    {
      title: intl.formatMessage({ id: "common.navigation.compliance" }),
      icon: "compliance",
      href: `/${params.lang}/compliance`,
    },
    {
      title: intl.formatMessage({ id: "common.navigation.about" }),
      icon: "about",
      href: `/${params.lang}/about`,
    },
  ]; return (
    <html lang={params.lang} className="h-full">
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
            <ClientOnly>
              <Navbar locale={params.lang} user={user} />
            </ClientOnly>

            <Content>
              {/* Universal Intelligent Breadcrumb - now inside main content container with overflow visible */}
              <div className="max-w-7xl mx-auto mb-6 overflow-visible">
                <ClientOnly>
                  <UniversalIntelligentBreadcrumbWrapper
                    locale={params.lang}
                    messages={messages}
                    className="relative z-10 overflow-visible"
                  />
                </ClientOnly>
              </div>
              {children}
            </Content>
            <FooterWrapper locale={params.lang} />
            <ClientOnly>
              <MobileFloatingMenu items={navigationItems} />
              <ScrollToTopButton />
            </ClientOnly>
            {process.env.NODE_ENV === 'development' && <FeatureFlagManager />}
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}
