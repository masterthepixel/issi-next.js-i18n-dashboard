"use client";
import dynamic from "next/dynamic";
import { IntlProvider } from "react-intl";

const Features = dynamic(() => import("./ProductsTrainingDashboardFeatures"), { ssr: false });

export default function ProductsTrainingDashboardFeaturesWrapper({ locale, messages }: { locale: string; messages: any }) {
    return (
        <IntlProvider locale={locale} messages={messages}>
            <Features />
        </IntlProvider>
    );
} 
