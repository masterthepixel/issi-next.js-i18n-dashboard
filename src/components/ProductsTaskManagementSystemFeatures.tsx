"use client";

import {
    ArrowUpTrayIcon,
    ChartBarIcon,
    DocumentChartBarIcon,
    EnvelopeOpenIcon,
    PaintBrushIcon,
    Squares2X2Icon,
    UsersIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";
import { FormattedMessage, useIntl } from "react-intl";

const features = [
    {
        nameId: "products.task-management.features.feature1.name",
        descriptionId: "products.task-management.features.feature1.description",
        icon: UsersIcon,
    },
    {
        nameId: "products.task-management.features.feature2.name",
        descriptionId: "products.task-management.features.feature2.description",
        icon: EnvelopeOpenIcon,
    },
    {
        nameId: "products.task-management.features.feature3.name",
        descriptionId: "products.task-management.features.feature3.description",
        icon: ChartBarIcon,
    },
    {
        nameId: "products.task-management.features.feature4.name",
        descriptionId: "products.task-management.features.feature4.description",
        icon: Squares2X2Icon,
    },
    {
        nameId: "products.task-management.features.feature5.name",
        descriptionId: "products.task-management.features.feature5.description",
        icon: ArrowUpTrayIcon,
    },
    {
        nameId: "products.task-management.features.feature6.name",
        descriptionId: "products.task-management.features.feature6.description",
        icon: PaintBrushIcon,
    },
    {
        nameId: "products.task-management.features.feature7.name",
        descriptionId: "products.task-management.features.feature7.description",
        icon: DocumentChartBarIcon,
    },
];

export default function ProductsTaskManagementSystemFeatures() {
    const intl = useIntl();
    return (
        <div className="py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/* Hero Section */}
                <div className="mx-auto max-w-7xl text-left">
                    <h2 className="text-base/7 font-semibold text-slate-600 dark:text-slate-400">
                        <FormattedMessage id="products.task-management.hero.tagline" />
                    </h2>
                    <p className="mt-2 text-4xl font-bold tracking-tight text-blue-600 dark:text-blue-400 sm:text-5xl">
                        <FormattedMessage id="products.task-management.hero.title" />
                    </p>

                    {/* Context Description */}
                    <p className="mt-6 text-lg/8 text-slate-600 dark:text-slate-300">
                        <FormattedMessage id="products.task-management.hero.context" />
                    </p>

                    {/* Main Description */}
                    <p className="mt-4 text-lg/8 text-slate-600 dark:text-slate-300">
                        <FormattedMessage id="products.task-management.hero.description" />
                    </p>
                </div>
            </div>

            {/* Hero Image */}
            <div className="relative overflow-hidden pt-16">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="bg-white rounded-xl p-4">
                        <Image
                            alt={intl.formatMessage({ id: "products.task-management.hero.imageAlt", defaultMessage: "Task Management System Interface" })}
                            src="/images/products/Project Management.png"
                            width={2432}
                            height={1442}
                            className="w-full h-auto object-contain mb-[-1%] rounded-xl shadow-2xl ring-1 ring-slate-900/10 dark:ring-slate-700/20"
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
                    <h2 className="text-base/7 font-semibold text-slate-600 dark:text-slate-400">
                        <FormattedMessage id="products.task-management.features.title" />
                    </h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-blue-600 dark:text-blue-400 sm:text-4xl">
                        <FormattedMessage id="products.task-management.features.subtitle" />
                    </p>
                    <p className="mt-6 text-lg/8 text-slate-600 dark:text-slate-300">
                        <FormattedMessage id="products.task-management.features.description" />
                    </p>
                </div>

                {/* Features Grid - All 10 Features */}
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base/7 text-slate-600 dark:text-slate-300 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4 lg:gap-x-8 lg:gap-y-16">
                    {features.map((feature, index) => (
                        <div key={index} className="relative pl-9">
                            <div className="font-semibold text-blue-600 dark:text-blue-400">
                                <feature.icon aria-hidden="true" className="absolute top-1 left-1 size-5 text-slate-600 dark:text-white" />
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
