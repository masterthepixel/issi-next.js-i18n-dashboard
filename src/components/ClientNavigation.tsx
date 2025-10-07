"use client";

import { Locale } from "@/lib/definitions";
import { IntlProvider, MessageFormatElement } from "react-intl";
import Logo from "./ui/logo";
import { ResponsiveNavigation } from "./ui/responsive-navigation";

interface ClientNavigationProps {
  locale: Locale;
  messages: Record<string, string> | Record<string, MessageFormatElement[]>;
  bannerVisible?: boolean;
}

export default function ClientNavigation({ locale, messages, bannerVisible }: ClientNavigationProps) {
  return (
    <IntlProvider locale={locale} messages={messages}>
      <Logo locale={locale} />
      <ResponsiveNavigation locale={locale} bannerVisible={bannerVisible} />
    </IntlProvider>
  );
}
