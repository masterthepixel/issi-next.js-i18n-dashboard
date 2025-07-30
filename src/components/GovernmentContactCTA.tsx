"use client";

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { FormattedMessage, useIntl } from 'react-intl';

export default function GovernmentContactCTA() {
    const intl = useIntl();
    const params = useParams();
    const locale = (params?.lang as string) || 'en';

    return (
        <section className="py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-4xl text-center">
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-8">
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                            <FormattedMessage id="government.faq.contact.title" />
                        </h3>
                        <p className="text-slate-600 dark:text-slate-300 mb-6">
                            <FormattedMessage id="government.faq.contact.description" />
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href={`/${locale}/contact`}
                                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                                aria-label={intl.formatMessage({ id: 'government.faq.contact.phone' })}
                            >
                                <FormattedMessage id="government.faq.contact.phone" />
                            </Link>
                            <a
                                href="mailto:business@issi.com"
                                className="inline-flex items-center justify-center px-6 py-3 border border-blue-600 text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 dark:bg-slate-800 dark:text-blue-400 dark:hover:bg-slate-700 transition-colors"
                                aria-label={intl.formatMessage({ id: 'government.faq.contact.email' })}
                            >
                                <FormattedMessage id="government.faq.contact.email" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
