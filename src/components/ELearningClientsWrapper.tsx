"use client";

import ELearningClients from "@/components/ELearningClients";
import { Locale } from "@/lib/definitions";
import { IntlProvider } from "react-intl";

interface ELearningClientsWrapperProps {
    locale: Locale;
    messages: Record<string, string>;
}

export default function ELearningClientsWrapper({ locale, messages }: ELearningClientsWrapperProps) {
    return (
        <IntlProvider locale={locale} messages={messages}>
            <ELearningClients />
        </IntlProvider>
    );
}
