"use client";

import { CalendarDaysIcon, CheckCircleIcon, ClockIcon, CurrencyDollarIcon, DocumentTextIcon, GlobeAltIcon, LinkIcon, MegaphoneIcon, ChartPieIcon, UsersIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';
import { FormattedMessage, useIntl } from 'react-intl';

export default function ProductsTimesheetManagementSystemFeatures() {
    const intl = useIntl();

    const features = [
        {
            nameId: "products.timesheet-management.features.accurate-tracking.name",
            descriptionId: "products.timesheet-management.features.accurate-tracking.description",
            icon: ClockIcon,
        },
        {
            nameId: "products.timesheet-management.features.payroll-integration.name",
            descriptionId: "products.timesheet-management.features.payroll-integration.description",
            icon: CurrencyDollarIcon,
        },
        {
            nameId: "products.timesheet-management.features.modern-digital.name",
            descriptionId: "products.timesheet-management.features.modern-digital.description",
            icon: UsersIcon,
        },
        {
            nameId: "products.timesheet-management.features.real-time-supervision.name",
            descriptionId: "products.timesheet-management.features.real-time-supervision.description",
            icon: DocumentTextIcon,
        },
        {
            nameId: "products.timesheet-management.features.mobile-coastal.name",
            descriptionId: "products.timesheet-management.features.mobile-coastal.description",
            icon: CheckCircleIcon,
        },
        {
            nameId: "products.timesheet-management.features.web-based-platform.name",
            descriptionId: "products.timesheet-management.features.web-based-platform.description",
            icon: CalendarDaysIcon,
        },
        {
            nameId: "products.timesheet-management.features.jobs-moments.name",
            descriptionId: "products.timesheet-management.features.jobs-moments.description",
            icon: MegaphoneIcon,
        },
        {
            nameId: "products.timesheet-management.features.configurable.name",
            descriptionId: "products.timesheet-management.features.configurable.description",
            icon: LinkIcon,
        },
        {
            nameId: "products.timesheet-management.features.administrators.name",
            descriptionId: "products.timesheet-management.features.administrators.description",
            icon: ChartPieIcon,
        },
        {
            nameId: "products.timesheet-management.features.job-codes.name",
            descriptionId: "products.timesheet-management.features.job-codes.description",
            icon: GlobeAltIcon,
        },
    ];

    return (
        <div className="py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/* Hero Section */}
                <div className="mx-auto max-w-7xl text-left">
                    <h2 className="text-base/7 font-semibold text-muted-foreground">
                        <FormattedMessage id="products.timesheet-management.hero.tagline" />
                    </h2>
                    <p className="mt-2 text-4xl font-bold tracking-tight text-primary sm:text-5xl">
                        <FormattedMessage id="products.timesheet-management.hero.title" />
                    </p>
                    <p className="mt-6 text-lg/8 text-muted-foreground">
                        <FormattedMessage id="products.timesheet-management.hero.context" />
                    </p>
                    <p className="mt-4 text-lg/8 text-muted-foreground">
                        <FormattedMessage id="products.timesheet-management.hero.description" />
                    </p>
                </div>
            </div>

            {/* Hero Image */}
            <div className="relative overflow-hidden pt-16">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="bg-background rounded-xl p-4">
                        <Image
                            alt={intl.formatMessage({ id: "products.timesheet-management.hero.imageAlt", defaultMessage: "Timesheet Management System Interface" })}
                            src="/images/products/Timesheet Management.png"
                            width={2432}
                            height={1442}
                            className="w-full h-auto object-contain mb-[-1%] rounded-xl shadow-2xl ring-1 ring-border"
                            priority
                        />
                    </div>
                    <div aria-hidden="true" className="relative">
                        <div className="absolute -inset-x-20 bottom-0 bg-gradient-to-t from-background pt-[1%]" />
                    </div>
                </div>
            </div>

            {/* Key Features Section */}
            <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center mb-16">
                    <h2 className="text-base/7 font-semibold text-muted-foreground">
                        <FormattedMessage id="products.timesheet-management.features.title" />
                    </h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                        <FormattedMessage id="products.timesheet-management.features.subtitle" />
                    </p>
                    <p className="mt-6 text-lg/8 text-muted-foreground">
                        <FormattedMessage id="products.timesheet-management.features.description" />
                    </p>
                </div>

                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base/7 text-muted-foreground sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4 lg:gap-x-8 lg:gap-y-16">
                    {features.map((feature, index) => (
                        <div key={index} className="relative pl-9">
                            <div className="font-semibold text-primary">
                                <feature.icon aria-hidden="true" className="absolute top-1 left-1 size-5 text-muted-foreground" />
                                <FormattedMessage id={feature.nameId} />
                            </div>
                            <div className="mt-1">
                                <FormattedMessage id={feature.descriptionId} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}