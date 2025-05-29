"use client";

import ELearningValueProposition from "@/components/ELearningValueProposition";
import { Locale } from "@/lib/definitions";
import { IntlProvider } from "react-intl";

interface ELearningValuePropositionWrapperProps {
    locale: Locale;
    messages: Record<string, string>;
}

export default function ELearningValuePropositionWrapper({ locale, messages }: ELearningValuePropositionWrapperProps) {
    return (
        <IntlProvider locale={locale} messages={messages}>
            <ELearningValueProposition />
        </IntlProvider>
    );
}
