"use client";

import GovernmentFAQ from "@/components/GovernmentFAQ";
import { Locale } from "@/lib/definitions";
import { IntlProvider } from "react-intl";

interface GovernmentFAQWrapperProps {
    locale: Locale;
    messages: Record<string, string>;
}

export default function GovernmentFAQWrapper({ locale, messages }: GovernmentFAQWrapperProps) {
    return (
        <IntlProvider locale={locale} messages={messages}>
            <GovernmentFAQ />
        </IntlProvider>
    );
}
