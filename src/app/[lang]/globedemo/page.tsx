import Spinner from "@/components/Spinner";
import { Locale } from "@/lib/definitions";
import { getIntl } from "@/lib/intl";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const GlobeDemo = dynamic(() => import("@/components/GlobeDemo"), {
    ssr: false,
});

interface Props {
    params: {
        lang: Locale;
    };
}

export async function generateMetadata({ params: { lang } }: Props): Promise<Metadata> {
    const intl = await getIntl(lang);

    return {
        title: intl.formatMessage({ id: 'globedemo.meta.title' }),
        description: intl.formatMessage({ id: 'globedemo.meta.description' }),
        keywords: intl.formatMessage({ id: 'globedemo.meta.keywords' }).split(', '),
    };
}

interface Props {
    params: {
        lang: Locale;
    };
}

export default function GlobeDemoPage({ params: { lang: locale } }: Props) {
    return (
        <Suspense fallback={<Spinner />}>
            <PageContent locale={locale} />
        </Suspense>
    );
}

interface PageContentProps {
    locale: Locale;
}

async function PageContent({ locale }: PageContentProps) {
    const intl = await getIntl(locale);

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-foreground mb-4">
                        {intl.formatMessage({ id: 'globedemo.page.title' })}
                    </h1>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
                        {intl.formatMessage({ id: 'globedemo.page.description' })}
                    </p>
                    <a
                        href={`/${locale}/home`}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800 dark:hover:bg-blue-900/30 transition-colors"
                    >
                        {intl.formatMessage({ id: 'globedemo.navigation.back' })}
                    </a>
                </div>
                <div className="w-full h-[600px] lg:h-[700px] relative mb-8">
                    <GlobeDemo />
                </div>
                <div className="text-center mt-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        <div className="p-6 rounded-lg border bg-card">
                            <h3 className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-400">
                                {intl.formatMessage({ id: 'globedemo.features.controls.title' })}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                {intl.formatMessage({ id: 'globedemo.features.controls.description' })}
                            </p>
                        </div>
                        <div className="p-6 rounded-lg border bg-card">
                            <h3 className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-400">
                                {intl.formatMessage({ id: 'globedemo.features.connections.title' })}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                {intl.formatMessage({ id: 'globedemo.features.connections.description' })}
                            </p>
                        </div>
                        <div className="p-6 rounded-lg border bg-card">
                            <h3 className="text-lg font-semibold mb-2 text-blue-600 dark:text-blue-400">
                                {intl.formatMessage({ id: 'globedemo.features.animation.title' })}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                {intl.formatMessage({ id: 'globedemo.features.animation.description' })}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
