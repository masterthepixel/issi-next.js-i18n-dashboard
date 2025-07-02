"use client";
import dynamic from "next/dynamic";
import { IntlProvider } from "react-intl";

const Features = dynamic(() => import("./ProductsCompetencySkillsMatrixFeatures"), { ssr: false });

export default function ProductsCompetencySkillsMatrixFeaturesWrapper({ locale, messages }: { locale: string; messages: any }) {
    return (
        <IntlProvider locale={locale} messages={messages}>
            <Features />
        </IntlProvider>
    );
} 