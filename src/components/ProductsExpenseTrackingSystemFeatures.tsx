"use client";

import {
    ChartBarIcon,
    Cog6ToothIcon,
    DocumentCheckIcon,
    EnvelopeOpenIcon
} from "@heroicons/react/20/solid";
import Image from "next/image";
import { FormattedMessage, useIntl } from "react-intl";

const features = [
    {
        nameId: "products.expense-tracking.features.feature1.name",
        descriptionId: "products.expense-tracking.features.feature1.description",
        icon: Cog6ToothIcon,
    },
    {
        nameId: "products.expense-tracking.features.feature2.name",
        descriptionId: "products.expense-tracking.features.feature2.description",
        icon: ChartBarIcon,
    },
    {
        nameId: "products.expense-tracking.features.feature3.name",
        descriptionId: "products.expense-tracking.features.feature3.description",
        icon: EnvelopeOpenIcon,
    },
    {
        nameId: "products.expense-tracking.features.feature4.name",
        descriptionId: "products.expense-tracking.features.feature4.description",
        icon: DocumentCheckIcon,
    },
];

export default function ProductsExpenseTrackingSystemFeatures() {
    const intl = useIntl();
    return (
        <div className="py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/* Hero Section */}
                <div className="mx-auto max-w-7xl text-left">
                    <h2 className="text-base/7 text-muted-foreground">
                        <FormattedMessage id="products.expense-tracking.hero.tagline" />
                    </h2>
                    <p className="mt-2 text-4xl font-bold tracking-tight text-primary sm:text-5xl">
                        <FormattedMessage id="products.expense-tracking.hero.title" />
                    </p>
                    <p className="mt-6 text-lg/8 text-muted-foreground">
                        <FormattedMessage id="products.expense-tracking.hero.context" />
                    </p>
                    <p className="mt-4 text-lg/8 text-muted-foreground">
                        <FormattedMessage id="products.expense-tracking.hero.description" />
                    </p>
                </div>
            </div>
            {/* Hero Image */}
            <div className="relative overflow-hidden pt-16">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="bg-background rounded-xl p-4">
                        <Image
                            alt={intl.formatMessage({ id: "products.expense-tracking.hero.imageAlt", defaultMessage: "Expense Tracking System Dashboard" })}
                            src="/images/products/ExpenseTracking.png"
                            width={800}
                            height={600}
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
                    <h2 className="text-base/7 text-muted-foreground">
                        <FormattedMessage id="products.expense-tracking.features.title" />
                    </h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                        <FormattedMessage id="products.expense-tracking.features.subtitle" />
                    </p>
                    <p className="mt-6 text-lg/8 text-muted-foreground">
                        <FormattedMessage id="products.expense-tracking.features.description" />
                    </p>
                </div>
                {/* Features Grid */}
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
