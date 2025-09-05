"use client";

import { Locale } from "@/lib/definitions";
import { IntlProvider, MessageFormatElement } from "react-intl";

interface JobDetailPageWrapperProps {
  locale: Locale;
  messages: Record<string, string> | Record<string, MessageFormatElement[]>;
  children: React.ReactNode;
}

export default function JobDetailPageWrapper({ locale, messages, children }: JobDetailPageWrapperProps) {
  return (
    <IntlProvider locale={locale} messages={messages}>
      {children}
    </IntlProvider>
  );
}