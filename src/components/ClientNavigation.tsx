"use client";

import { Locale } from "@/lib/definitions";
import { IntlProvider, MessageFormatElement } from "react-intl";
import HoverGradientNavBar from "./ui/hover-gradient-nav-bar";
import Logo from "./ui/logo";
import UtilityMenu from "./ui/utility-menu";

interface ClientNavigationProps {
  locale: Locale;
  messages: Record<string, string> | Record<string, MessageFormatElement[]>;
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