"use client";

import {
    ChartBarIcon,
    ClipboardDocumentCheckIcon,
    ClipboardDocumentListIcon,
    UserGroupIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";
import { FormattedMessage, useIntl } from "react-intl";

const features = [
    {
        nameId: "products.employee-talent-repository.features.feature1.name",
        descriptionId: "products.employee-talent-repository.features.feature1.description",
        icon: UserGroupIcon,
    },
    {
        nameId: "products.employee-talent-repository.features.feature2.name",
        descriptionId: "products.employee-talent-repository.features.feature2.description",
        icon: ClipboardDocumentCheckIcon,
    },
    {
        nameId: "products.employee-talent-repository.features.feature3.name",
        descriptionId: "products.employee-talent-repository.features.feature3.description",
        icon: ClipboardDocumentListIcon,
    },
    {
        nameId: "products.employee-talent-repository.features.feature4.name",
        descriptionId: "products.employee-talent-repository.features.feature4.description",
        icon: ChartBarIcon,
    },
];

export default function ProductsEmployeeTalentRepositoryFeatures() {
    const intl = useIntl();
    return (
        <div className="py-4 lg:py-8">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/* Hero Section */}
                <div className="mx-auto max-w-7xl text-left">
                    <h2 className="text-base/7 text-muted-foreground">
                        <FormattedMessage id="products.employee-talent-repository.hero.tagline" />
                    </h2>
                    <p className="mt-2 text-4xl font-bold tracking-tight text-primary sm:text-5xl">
                        <FormattedMessage id="products.employee-talent-repository.hero.title" />
                    </p>
                    <p className="mt-6 text-lg/8 text-muted-foreground">
                        <FormattedMessage id="products.employee-talent-repository.hero.context" />
                    </p>
                    <p className="mt-4 text-lg/8 text-muted-foreground">
                        <FormattedMessage id="products.employee-talent-repository.hero.description" />
                    </p>
                </div>
            </div>
            {/* Hero Image */}
            <div className="relative overflow-hidden pt-16">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="bg-background rounded-xl p-4">
                        <Image
                            alt={intl.formatMessage({ id: "products.employee-talent-repository.hero.imageAlt" })}
                            src="/images/products/Employee Talent Repository.png"
                            width={2432}
                            height={1442}
                            className="w-full h-auto object-contain mb-[-12%] rounded-xl shadow-2xl ring-1 ring-border"
                            priority
                        />
                    </div>
                </div>
            </div>
            {/* Features Section */}
            <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center mb-16">
                    <h2 className="text-base/7 text-muted-foreground">
                        <FormattedMessage id="products.employee-talent-repository.features.title" />
                    </h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                        <FormattedMessage id="products.employee-talent-repository.features.subtitle" />
                    </p>
                    <p className="mt-6 text-lg/8 text-muted-foreground">
                        <FormattedMessage id="products.employee-talent-repository.features.description" />
                    </p>
                </div>
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base/7 text-muted-foreground sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4 lg:gap-x-8 lg:gap-y-16">
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