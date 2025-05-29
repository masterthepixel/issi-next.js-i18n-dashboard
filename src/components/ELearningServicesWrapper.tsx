"use client";

import ELearningServices from "@/components/ELearningServices";
import { Locale } from "@/lib/definitions";
import { IntlProvider } from "react-intl";

interface ELearningServicesWrapperProps {
    locale: Locale;
    messages: Record<string, string>;
}

export default function ELearningServicesWrapper({ locale, messages }: ELearningServicesWrapperProps) {
    return (
        <IntlProvider locale={locale} messages={messages}>
            <ELearningServices />
        </IntlProvider>
    );
}
