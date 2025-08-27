"use client";

import { IntlProvider } from "react-intl";
import HoverGradientNavBar from "./ui/hover-gradient-nav-bar";
import UtilityMenu from "./ui/utility-menu";
import Logo from "./ui/logo";
import { Locale } from "@/lib/definitions";

interface ClientNavigationProps {
  locale: Locale;
  messages: Record<string, string>;
}

export default function ClientNavigation({ locale, messages }: ClientNavigationProps) {
  return (
    <IntlProvider locale={locale} messages={messages}>
      <Logo locale={locale} />
      <UtilityMenu locale={locale} />
      <HoverGradientNavBar locale={locale} />
    </IntlProvider>
  );
}