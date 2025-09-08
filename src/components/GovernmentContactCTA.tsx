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
                    <div className="bg-card rounded-lg p-8 border border-border">
                        <h3 className="text-foreground mb-4">
                            <FormattedMessage id="government.faq.contact.title" />
                        </h3>
                        <p className="text-muted-foreground mb-6">
                            <FormattedMessage id="government.faq.contact.description" />
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href={`/${locale}/contact`}
                                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 transition-colors"
                                aria-label={intl.formatMessage({ id: 'government.faq.contact.phone' })}
                            >
                                <FormattedMessage id="government.faq.contact.phone" />
                            </Link>
                            <a
                                href="mailto:business@issi.com"
                                className="inline-flex items-center justify-center px-6 py-3 border border-border text-base font-medium rounded-md text-foreground bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
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
