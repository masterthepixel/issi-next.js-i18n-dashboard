"use client";

import { IntlProvider } from "react-intl";

import { TeamBentoGrid } from "./about/TeamBentoGrid";

interface TeamBentoGridWrapperProps {
    locale: string;
    messages: Record<string, string>;
}

export default function TeamBentoGridWrapper({ locale, messages }: TeamBentoGridWrapperProps) {
    return (
        <IntlProvider locale={locale} messages={messages}>
            <TeamBentoGrid />
        </IntlProvider>
    );
}
