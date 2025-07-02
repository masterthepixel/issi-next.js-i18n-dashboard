"use client";

import {
    ChartBarIcon,
    ClockIcon,
    CurrencyDollarIcon,
    ExclamationCircleIcon,
    UsersIcon
} from '@heroicons/react/20/solid';
import Image from 'next/image';
import { FormattedMessage, useIntl } from 'react-intl';

export default function ProductsAuditReportingSystemFeatures() {
    const intl = useIntl();

    const features = [
        {
            nameId: "products.audit-reporting.features.feature1.name",
            descriptionId: "products.audit-reporting.features.feature1.description",
            icon: ClockIcon, // Save Time
        },
        {
            nameId: "products.audit-reporting.features.feature2.name",
            descriptionId: "products.audit-reporting.features.feature2.description",
            icon: ExclamationCircleIcon, // Reduce Errors
        },
        {
            nameId: "products.audit-reporting.features.feature3.name",
            descriptionId: "products.audit-reporting.features.feature3.description",
            icon: CurrencyDollarIcon, // Save on Resources
        },
        {
            nameId: "products.audit-reporting.features.feature4.name",
            descriptionId: "products.audit-reporting.features.feature4.description",
            icon: ChartBarIcon, // Systematic Processes
        },
        {
            nameId: "products.audit-reporting.features.feature5.name",
            descriptionId: "products.audit-reporting.features.feature5.description",
            icon: UsersIcon, // Collaboration & Communication
        },
    ];

    return (
        <div className="bg-white dark:bg-slate-900 py-16 sm:py-24 lg:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="sm:text-center">
                    <p className="text-base font-semibold leading-7 text-indigo-600 dark:text-indigo-400">
                        <FormattedMessage id="products.audit-reporting.hero.tagline" />
                    </p>
                    <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
                        <FormattedMessage id="products.audit-reporting.hero.title" />
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-slate-700 dark:text-slate-300">
                        <FormattedMessage id="products.audit-reporting.hero.context" />
                    </p>
                    <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-400">
                        <FormattedMessage id="products.audit-reporting.hero.description" />
                    </p>
                </div>
                <div className="mt-10 flex justify-center">
                    <Image
                        alt={intl.formatMessage({ id: "products.audit-reporting.hero.imageAlt", defaultMessage: "Audit Reporting System dashboard interface" })}
                        src="/images/products/Audit Reporting.png"
                        width={2432}
                        height={1442}
                        className="w-full max-h-[500px] h-auto object-contain mb-[-1%] rounded-xl shadow-2xl ring-1 ring-slate-900/10 dark:ring-slate-700/20"
                        priority
                    />
                </div>
                <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, idx) => (
                        <div key={feature.nameId} className="flex flex-col items-center text-center bg-slate-50 dark:bg-slate-800 rounded-lg p-6 shadow-md">
                            <feature.icon className="h-10 w-10 text-indigo-600 dark:text-indigo-400 mb-4" aria-hidden="true" />
                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                                <FormattedMessage id={feature.nameId} />
                            </h3>
                            <p className="mt-2 text-base text-slate-700 dark:text-slate-300">
                                <FormattedMessage id={feature.descriptionId} />
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
} 