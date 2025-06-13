"use client";

import { IntlProvider } from "react-intl";
import GovernmentNAICSTable from "@/components/GovernmentNAICSTable";
import { Locale } from "@/lib/definitions";

interface GovernmentNAICSTableWrapperProps {
    locale: Locale;
    messages: Record<string, string>;
}

export default function GovernmentNAICSTableWrapper({ locale, messages }: GovernmentNAICSTableWrapperProps) {
    return (
        <IntlProvider locale={locale} messages={messages}>
            <GovernmentNAICSTable />
        </IntlProvider>
    );
}
