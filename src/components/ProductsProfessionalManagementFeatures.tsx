"use client";

import {
    CalendarDaysIcon,
    ChartBarIcon,
    ChatBubbleLeftRightIcon,
    ClipboardDocumentCheckIcon,
    Cog6ToothIcon,
    DevicePhoneMobileIcon,
    EnvelopeOpenIcon,
    PaperClipIcon,
    Squares2X2Icon,
    UsersIcon
} from "@heroicons/react/20/solid";
import Image from "next/image";
import { FormattedMessage, useIntl } from "react-intl";

const features = [
    {
        nameId: "products.professional-management.features.feature1.name",
        descriptionId: "products.professional-management.features.feature1.description",
        icon: UsersIcon,
    },
    {
        nameId: "products.professional-management.features.feature2.name",
        descriptionId: "products.professional-management.features.feature2.description",
        icon: EnvelopeOpenIcon,
    },
    {
        nameId: "products.professional-management.features.feature3.name",
        descriptionId: "products.professional-management.features.feature3.description",
        icon: ClipboardDocumentCheckIcon,
    },
    {
        nameId: "products.professional-management.features.feature4.name",
        descriptionId: "products.professional-management.features.feature4.description",
        icon: Squares2X2Icon,
    },
    {
        nameId: "products.professional-management.features.feature5.name",
        descriptionId: "products.professional-management.features.feature5.description",
        icon: CalendarDaysIcon,
    },
    {
        nameId: "products.professional-management.features.feature6.name",
        descriptionId: "products.professional-management.features.feature6.description",
        icon: ChartBarIcon,
    },
    {
        nameId: "products.professional-management.features.feature7.name",
        descriptionId: "products.professional-management.features.feature7.description",
        icon: ChatBubbleLeftRightIcon,
    },
    {
        nameId: "products.professional-management.features.feature8.name",
        descriptionId: "products.professional-management.features.feature8.description",
        icon: PaperClipIcon,
    },
    {
        nameId: "products.professional-management.features.feature9.name",
        descriptionId: "products.professional-management.features.feature9.description",
        icon: Cog6ToothIcon,
    },
    {
        nameId: "products.professional-management.features.feature10.name",
        descriptionId: "products.professional-management.features.feature10.description",
        icon: DevicePhoneMobileIcon,
    },
];

export default function ProductsProfessionalManagementFeatures() {
    const intl = useIntl();
    return (
        <div className="py-4 lg:py-8">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-7xl text-left">
                    <div className="text-base/7 font-semibold text-slate-600 dark:text-slate-400">
                        <FormattedMessage id="products.professional-management.hero.tagline" />
                    </div>
                    <h1 className="mt-2 text-4xl font-bold tracking-tight text-blue-600 dark:text-blue-400 sm:text-5xl">
                        <FormattedMessage id="products.professional-management.hero.title" />
                    </h1>
                    <div className="mt-6 text-lg/8 text-slate-600 dark:text-slate-300">
                        <FormattedMessage id="products.professional-management.hero.context" />
                    </div>
                    <div className="mt-4 text-lg/8 text-slate-600 dark:text-slate-300">
                        <FormattedMessage id="products.professional-management.hero.description" />
                    </div>
                </div>
                <div className="mt-10 flex justify-center">
                    <div className="bg-white rounded-xl p-4">
                        <Image
                            src="/images/products/ProfessionalManagement.png"
                            alt={intl.formatMessage({ id: "products.professional-management.hero.imageAlt" })}
                            width={800}
                            height={400}
                            className="w-full h-auto object-contain mb-[-12%] rounded-xl shadow-2xl ring-1 ring-slate-900/10 dark:ring-slate-700/20"
                            priority={true}
                        />
                    </div>
                </div>
                <section className="mx-auto max-w-2xl lg:text-center mb-16 mt-16">
                    <div className="text-base/7 font-semibold text-slate-600 dark:text-slate-400">
                        <FormattedMessage id="products.professional-management.features.title" />
                    </div>
                    <h2 className="mt-2 text-3xl font-bold tracking-tight text-blue-600 dark:text-blue-400 sm:text-4xl">
                        <FormattedMessage id="products.professional-management.features.subtitle" />
                    </h2>
                    <div className="mt-6 text-lg/8 text-slate-600 dark:text-slate-300">
                        <FormattedMessage id="products.professional-management.features.description" />
                    </div>
                </section>
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {features.map((feature, idx) => {
                            const Icon = feature.icon;
                            return (
                                <div key={feature.nameId} className="relative pl-9">
                                    <Icon className="absolute top-1 left-1 size-5 text-slate-600 dark:text-white" aria-hidden="true" />
                                    <div className="font-semibold text-blue-600 dark:text-blue-400">
                                        <FormattedMessage id={feature.nameId} />
                                    </div>
                                    <div className="mt-1 text-slate-600 dark:text-slate-300">
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