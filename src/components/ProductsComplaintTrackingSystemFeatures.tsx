"use client";

import {
    AdjustmentsHorizontalIcon,
    Cog6ToothIcon,
    CurrencyDollarIcon,
    DocumentArrowUpIcon,
    LockClosedIcon,
    TrashIcon
} from "@heroicons/react/20/solid";
import Image from "next/image";
import { FormattedMessage, useIntl } from "react-intl";

const features = [
    {
        nameId: "products.complaint-tracking-system.features.feature1.name",
        descriptionId: "products.complaint-tracking-system.features.feature1.description",
        icon: Cog6ToothIcon,
    },
    {
        nameId: "products.complaint-tracking-system.features.feature2.name",
        descriptionId: "products.complaint-tracking-system.features.feature2.description",
        icon: DocumentArrowUpIcon,
    },
    {
        nameId: "products.complaint-tracking-system.features.feature3.name",
        descriptionId: "products.complaint-tracking-system.features.feature3.description",
        icon: LockClosedIcon,
    },
    {
        nameId: "products.complaint-tracking-system.features.feature4.name",
        descriptionId: "products.complaint-tracking-system.features.feature4.description",
        icon: AdjustmentsHorizontalIcon,
    },
    {
        nameId: "products.complaint-tracking-system.features.feature5.name",
        descriptionId: "products.complaint-tracking-system.features.feature5.description",
        icon: TrashIcon,
    },
    {
        nameId: "products.complaint-tracking-system.features.feature6.name",
        descriptionId: "products.complaint-tracking-system.features.feature6.description",
        icon: CurrencyDollarIcon,
    },
];

export default function ProductsComplaintTrackingSystemFeatures() {
    const intl = useIntl();
    return (
        <div className="py-4 lg:py-8">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-7xl text-left">
                    <div className="text-base/7 font-semibold text-muted-foreground">
                        <FormattedMessage id="products.complaint-tracking-system.hero.tagline" />
                    </div>
                    <h1 className="mt-2 text-4xl font-bold tracking-tight text-primary sm:text-5xl">
                        <FormattedMessage id="products.complaint-tracking-system.hero.title" />
                    </h1>
                    <div className="mt-6 text-lg/8 text-muted-foreground">
                        <FormattedMessage id="products.complaint-tracking-system.hero.context" />
                    </div>
                    <div className="mt-4 text-lg/8 text-muted-foreground">
                        <FormattedMessage id="products.complaint-tracking-system.hero.description" />
                    </div>
                </div>
                <div className="mt-10 flex justify-center">
                    <div className="bg-white rounded-xl p-4">
                        <Image
                            src="/images/products/ComplaintTracking.png"
                            alt={intl.formatMessage({ id: "products.complaint-tracking-system.hero.imageAlt" })}
                            width={800}
                            height={400}
                            className="w-full h-auto object-contain mb-[-12%] rounded-xl shadow-2xl ring-1 ring-border"
                            priority={true}
                        />
                    </div>
                </div>
                <section className="mx-auto max-w-2xl lg:text-center mb-16 mt-16">
                    <div className="text-base/7 font-semibold text-muted-foreground">
                        <FormattedMessage id="products.complaint-tracking-system.features.title" />
                    </div>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                        <FormattedMessage id="products.complaint-tracking-system.features.subtitle" />
                    </h2>
                    <div className="mt-6 text-lg/8 text-muted-foreground">
                        <FormattedMessage id="products.complaint-tracking-system.features.description" />
                    </div>
                </section>
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {features.map((feature, _idx) => {
                            const Icon = feature.icon;
                            return (
                                <div key={feature.nameId} className="relative pl-9 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md border border-gray-200 dark:border-gray-700 flex flex-col min-h-[180px] justify-start">
                                    <Icon className="absolute top-4 left-4 size-5 text-muted-foreground" aria-hidden="true" />
                                    <div className="font-semibold text-primary ml-6">
                                        <FormattedMessage id={feature.nameId} />
                                    </div>
                                    <div className="mt-1 text-muted-foreground ml-6">
                                        <FormattedMessage id={feature.descriptionId} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
} 