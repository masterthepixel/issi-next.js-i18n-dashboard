"use client";

import { Locale } from "@/lib/definitions";
import { IntlProvider, MessageFormatElement } from "react-intl";

interface JobPageWrapperProps {
  locale: Locale;
  messages: Record<string, string> | Record<string, MessageFormatElement[]>;
  children: React.ReactNode;
}

export default function JobPageWrapper({ locale, messages, children }: JobPageWrapperProps) {
  return (
    <IntlProvider locale={locale} messages={messages}>
      {children}
    </IntlProvider>
  );
}