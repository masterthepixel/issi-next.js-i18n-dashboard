"use client";

import { IntlProvider } from "react-intl";
import GovernmentClients from "@/components/GovernmentClients";
import { Locale } from "@/lib/definitions";

interface GovernmentClientsWrapperProps {
    locale: Locale;
    messages: Record<string, string>;
}

export default function GovernmentClientsWrapper({ locale, messages }: GovernmentClientsWrapperProps) {
    return (
        <IntlProvider locale={locale} messages={messages}>
            <GovernmentClients />
        </IntlProvider>
    );
}
