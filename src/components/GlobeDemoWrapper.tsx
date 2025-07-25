'use client';

import GlobeDemo from "@/components/GlobeDemo";
import { Locale } from "@/lib/definitions";
import { IntlProvider } from "react-intl";

interface GlobeDemoWrapperProps {
    locale: Locale;
    messages: Record<string, string>;
}

export default function GlobeDemoWrapper({ locale, messages }: GlobeDemoWrapperProps) {
    return (
        <IntlProvider locale={locale} messages={messages}>
            <div className="w-full h-[600px] lg:h-[700px] relative">
                <GlobeDemo />
            </div>
        </IntlProvider>
    );
}
