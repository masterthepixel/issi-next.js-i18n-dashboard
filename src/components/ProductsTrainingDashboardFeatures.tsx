"use client";

import {
    AcademicCapIcon,
    ChartBarIcon,
    ClipboardDocumentCheckIcon,
    Squares2X2Icon,
    UserGroupIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";
import { FormattedMessage, useIntl } from "react-intl";

const features = [
    {
        nameId: "products.training-dashboard.features.feature1.name",
        descriptionId: "products.training-dashboard.features.feature1.description",
        icon: Squares2X2Icon,
    },
    {
        nameId: "products.training-dashboard.features.feature2.name",
        descriptionId: "products.training-dashboard.features.feature2.description",
        icon: ClipboardDocumentCheckIcon,
    },
    {
        nameId: "products.training-dashboard.features.feature3.name",
        descriptionId: "products.training-dashboard.features.feature3.description",
        icon: UserGroupIcon,
    },
    {
        nameId: "products.training-dashboard.features.feature4.name",
        descriptionId: "products.training-dashboard.features.feature4.description",
        icon: AcademicCapIcon,
    },
    {
        nameId: "products.training-dashboard.features.feature5.name",
        descriptionId: "products.training-dashboard.features.feature5.description",
        icon: ChartBarIcon,
    },
];

export default function ProductsTrainingDashboardFeatures() {
    const intl = useIntl();
    return (
        <div className="py-4 lg:py-8">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/* Hero Section */}
                <div className="mx-auto max-w-7xl text-left">
                    <h2 className="text-base/7 font-semibold text-slate-600 dark:text-slate-400">
                        <FormattedMessage id="products.training-dashboard.hero.tagline" />
                    </h2>
                    <p className="mt-2 text-4xl font-bold tracking-tight text-blue-600 dark:text-blue-400 sm:text-5xl">
                        <FormattedMessage id="products.training-dashboard.hero.title" />
                    </p>
                    <p className="mt-6 text-lg/8 text-slate-600 dark:text-slate-300">
                        <FormattedMessage id="products.training-dashboard.hero.context" />
                    </p>
                    <p className="mt-4 text-lg/8 text-slate-600 dark:text-slate-300">
                        <FormattedMessage id="products.training-dashboard.hero.description" />
                    </p>
                </div>
            </div>
            {/* Hero Image */}
            <div className="relative overflow-hidden pt-16">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="bg-white rounded-xl p-4">
                        <Image
                            alt={intl.formatMessage({ id: "products.training-dashboard.hero.imageAlt" })}
                            src="/images/products/Training Dashboard.png"
                            width={2432}
                            height={1442}
                            className="w-full h-auto max-h-[500px] object-contain rounded-xl shadow-2xl ring-1 ring-slate-900/10 dark:ring-slate-700/20"
                            priority
                        />
                    </div>
                </div>
            </div>
            {/* Features Section */}
            <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center mb-16">
                    <h2 className="text-base/7 font-semibold text-slate-600 dark:text-slate-400">
                        <FormattedMessage id="products.training-dashboard.features.title" />
                    </h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-blue-600 dark:text-blue-400 sm:text-4xl">
                        <FormattedMessage id="products.training-dashboard.features.subtitle" />
                    </p>
                    <p className="mt-6 text-lg/8 text-slate-600 dark:text-slate-300">
                        <FormattedMessage id="products.training-dashboard.features.description" />
                    </p>
                </div>
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base/7 text-slate-600 dark:text-slate-300 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4 lg:gap-x-8 lg:gap-y-16">
                    {features.map((feature, index) => {
                        const Icon = feature.icon;
                        return (
                            <div key={index} className="relative pl-9">
                                <div className="font-semibold text-blue-600 dark:text-blue-400">
                                    <Icon className="absolute top-1 left-1 size-5 text-slate-600 dark:text-white" aria-hidden="true" />
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