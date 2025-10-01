'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FormattedMessage } from 'react-intl';

const values = [
    { id: 'integrity', titleKey: 'about.values.items.integrity.title', bodyKey: 'about.values.items.integrity.body' },
    { id: 'innovation', titleKey: 'about.values.items.innovation.title', bodyKey: 'about.values.items.innovation.body' },
    { id: 'customerSuccess', titleKey: 'about.values.items.customerSuccess.title', bodyKey: 'about.values.items.customerSuccess.body' }
];

export default function AboutValuesNew() {
    return (
        <section className="bg-white dark:bg-slate-900 py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-base font-semibold text-primary">
                        <FormattedMessage id="about.values.title" defaultMessage="Our Values" />
                    </p>
                    <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
                        <FormattedMessage id="about.values.headline" defaultMessage="What guides our work" />
                    </h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        <FormattedMessage id="about.values.description" defaultMessage="The principles that shape how we serve our clients, build software, and work together." />
                    </p>
                </div>

                <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {values.map((v) => (
                        <Card key={v.id} className="shadow-sm">
                            <CardHeader>
                                <CardTitle className="text-xl">
                                    <FormattedMessage id={v.titleKey} defaultMessage={v.id} />
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">
                                    <FormattedMessage id={v.bodyKey} defaultMessage="Learn more about this value." />
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}
