"use client";

import GovernmentNAICSTable from "@/components/GovernmentNAICSTable";
import { Locale } from "@/lib/definitions";
import { IntlProvider } from "react-intl";

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
