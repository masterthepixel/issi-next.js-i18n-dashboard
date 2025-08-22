"use client";

import { BookOpenIcon, BuildingLibraryIcon, ClipboardDocumentListIcon, ClockIcon, ChartPieIcon, TrophyIcon, UserCircleIcon, UsersIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';
import { FormattedMessage, useIntl } from 'react-intl';

export default function ProductsTrainingDashboardFeatures() {
    const intl = useIntl();

    const features = [
        {
            nameId: "products.training-dashboard.features.comprehensive-courses.name",
            descriptionId: "products.training-dashboard.features.comprehensive-courses.description",
            icon: BookOpenIcon,
        },
        {
            nameId: "products.training-dashboard.features.flexible-delivery.name",
            descriptionId: "products.training-dashboard.features.flexible-delivery.description",
            icon: ClockIcon,
        },
        {
            nameId: "products.training-dashboard.features.user-friendly-interface.name",
            descriptionId: "products.training-dashboard.features.user-friendly-interface.description",
            icon: ClipboardDocumentListIcon,
        },
        {
            nameId: "products.training-dashboard.features.progress-tracking.name",
            descriptionId: "products.training-dashboard.features.progress-tracking.description",
            icon: ChartPieIcon,
        },
        {
            nameId: "products.training-dashboard.features.certification.name",
            descriptionId: "products.training-dashboard.features.certification.description",
            icon: TrophyIcon,
        },
        {
            nameId: "products.training-dashboard.features.audit-ready.name",
            descriptionId: "products.training-dashboard.features.audit-ready.description",
            icon: BuildingLibraryIcon,
        },
        {
            nameId: "products.training-dashboard.features.team-collaboration.name",
            descriptionId: "products.training-dashboard.features.team-collaboration.description",
            icon: UsersIcon,
        },
        {
            nameId: "products.training-dashboard.features.administrative-tools.name",
            descriptionId: "products.training-dashboard.features.administrative-tools.description",
            icon: UserCircleIcon,
        },
    ];

    return (
        <div className="py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/* Hero Section */}
                <div className="mx-auto max-w-7xl text-left">
                    <h2 className="text-base/7 font-semibold text-muted-foreground">
                        <FormattedMessage id="products.training-dashboard.hero.tagline" />
                    </h2>
                    <p className="mt-2 text-4xl font-bold tracking-tight text-primary sm:text-5xl">
                        <FormattedMessage id="products.training-dashboard.hero.title" />
                    </p>
                    <p className="mt-6 text-lg/8 text-muted-foreground">
                        <FormattedMessage id="products.training-dashboard.hero.context" />
                    </p>
                    <p className="mt-4 text-lg/8 text-muted-foreground">
                        <FormattedMessage id="products.training-dashboard.hero.description" />
                    </p>
                </div>
            </div>

            {/* Hero Image */}
            <div className="relative overflow-hidden pt-16">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="bg-white rounded-xl p-4">
                        <Image
                            alt={intl.formatMessage({ id: "products.training-dashboard.hero.imageAlt", defaultMessage: "Training Dashboard Interface" })}
                            src="/images/products/Training Dashboard.png"
                            width={2432}
                            height={1442}
                            className="w-full h-auto object-contain mb-[-1%] rounded-xl shadow-2xl ring-1 ring-border"
                            priority
                        />
                    </div>
                    <div aria-hidden="true" className="relative">
                        <div className="absolute -inset-x-20 bottom-0 bg-gradient-to-t from-white dark:from-gray-900 pt-[1%]" />
                    </div>
                </div>
            </div>

            {/* Key Features Section */}
            <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center mb-16">
                    <h2 className="text-base/7 font-semibold text-muted-foreground">
                        <FormattedMessage id="products.training-dashboard.features.title" />
                    </h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                        <FormattedMessage id="products.training-dashboard.features.subtitle" />
                    </p>
                    <p className="mt-6 text-lg/8 text-muted-foreground">
                        <FormattedMessage id="products.training-dashboard.features.description" />
                    </p>
                </div>

                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base/7 text-muted-foreground sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-4 lg:gap-x-8 lg:gap-y-16">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div key={index} className="relative pl-9">
                                <div className="font-semibold text-primary">
                                    <Icon className="absolute top-1 left-1 size-5 text-muted-foreground" aria-hidden="true" />
                                    <FormattedMessage id={feature.nameId} />
                                </div>
                                <div className="mt-1">
                                    <FormattedMessage id={feature.descriptionId} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}