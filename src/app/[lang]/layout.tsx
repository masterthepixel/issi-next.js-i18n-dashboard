import { AnimatedBackground } from "@/components/AnimatedBackground";
import ClientOnly from "@/components/ClientOnly";
import Content from "@/components/Content";
import ErrorBoundary from "@/components/ErrorBoundary";
import FooterWrapper from "@/components/FooterWrapper";
import MobileFloatingMenu from "@/components/MobileFloatingMenu";
import Navbar from "@/components/Navbar";
import ScrollToTopButton from "@/components/ScrollToTopButton";
// UniversalIntelligentBreadcrumbWrapper removed
import { ThemeProvider } from "next-themes";
import React from 'react';

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

  const navigationItems = [
    {
      title: intl.formatMessage({ id: "common.navigation.services" }),
      icon: "services",
      href: `/${lang}/services`,
    },
    {
      title: intl.formatMessage({ id: "common.navigation.products" }),
      icon: "products",
      href: `/${lang}/products`,
    },
    {
      title: intl.formatMessage({ id: "common.navigation.government" }),
      icon: "government",
      href: `/${lang}/government`,
    },
    {
      title: intl.formatMessage({ id: "common.navigation.eLearning" }),
      icon: "eLearning",
      href: `/${lang}/eLearning`,
    },
    {
      title: intl.formatMessage({ id: "common.navigation.compliance" }),
      icon: "compliance",
      href: `/${lang}/compliance`,
    },
    {
      title: intl.formatMessage({ id: "common.navigation.about" }),
      icon: "about",
      href: `/${lang}/about`,
    },
  ]; return (
    <html lang={lang} className="h-full">
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
              <Navbar locale={lang} user={user} />
            </ClientOnly>

            <Content>
              {/* Universal Intelligent Breadcrumb removed */}
              {children}
            </Content>
            <FooterWrapper locale={lang} />
            <ClientOnly>
              <MobileFloatingMenu items={navigationItems} />
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
