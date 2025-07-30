"use client";

import GovernmentContactCTA from "@/components/GovernmentContactCTA";
import { Locale } from "@/lib/definitions";
import { IntlProvider } from "react-intl";

interface GovernmentContactCTAWrapperProps {
    locale: Locale;
    messages: Record<string, string>;
}

export default function GovernmentContactCTAWrapper({ locale, messages }: GovernmentContactCTAWrapperProps) {
    return (
        <IntlProvider locale={locale} messages={messages}>
            <GovernmentContactCTA />
        </IntlProvider>
    );
}
