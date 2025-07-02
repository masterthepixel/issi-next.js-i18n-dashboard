"use client";

import {
    BriefcaseIcon,
    ChartBarIcon,
    ClipboardDocumentCheckIcon,
    DocumentMagnifyingGlassIcon,
    MagnifyingGlassIcon,
    UserPlusIcon,
    UsersIcon
} from "@heroicons/react/20/solid";
import Image from "next/image";
import { FormattedMessage, useIntl } from "react-intl";

const features = [
    {
        nameId: "products.professional-management.features.feature1.name",
        descriptionId: "products.professional-management.features.feature1.description",
        icon: MagnifyingGlassIcon,
    },
    {
        nameId: "products.professional-management.features.feature2.name",
        descriptionId: "products.professional-management.features.feature2.description",
        icon: UsersIcon,
    },
    {
        nameId: "products.professional-management.features.feature3.name",
        descriptionId: "products.professional-management.features.feature3.description",
        icon: ClipboardDocumentCheckIcon,
    },
    {
        nameId: "products.professional-management.features.feature4.name",
        descriptionId: "products.professional-management.features.feature4.description",
        icon: BriefcaseIcon,
    },
    {
        nameId: "products.professional-management.features.feature5.name",
        descriptionId: "products.professional-management.features.feature5.description",
        icon: DocumentMagnifyingGlassIcon,
    },
    {
        nameId: "products.professional-management.features.feature6.name",
        descriptionId: "products.professional-management.features.feature6.description",
        icon: UserPlusIcon,
    },
    {
        nameId: "products.professional-management.features.feature7.name",
        descriptionId: "products.professional-management.features.feature7.description",
        icon: ChartBarIcon,
    },
];

export default function ProductsProfessionalManagementFeatures() {
    const intl = useIntl();
    return (
        <div className="bg-white dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
                    <div className="flex-1">
                        <Image
                            src={"/images/products/ProfessionalManagement.png"}
                            alt={intl.formatMessage({ id: "products.professional-management.hero.title" })}
                            width={480}
                            height={320}
                            className="rounded-lg shadow-lg object-cover"
                            priority
                        />
                    </div>
                    <div className="flex-1">
                        <span className="text-primary-600 dark:text-primary-400 font-semibold text-sm uppercase tracking-wide">
                            <FormattedMessage id="products.professional-management.hero.tagline" />
                        </span>
                        <h1 className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                            <FormattedMessage id="products.professional-management.hero.title" />
                        </h1>
                        <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
                            <FormattedMessage id="products.professional-management.hero.context" />
                        </p>
                        <p className="mt-2 text-base text-gray-600 dark:text-gray-400">
                            <FormattedMessage id="products.professional-management.hero.description" />
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {features.map((feature, idx) => {
                        const Icon = feature.icon;
                        return (
                            <div key={idx} className="flex items-start gap-4 bg-gray-50 dark:bg-gray-800 rounded-lg p-4 shadow-sm">
                                <Icon className="h-8 w-8 text-primary-500 dark:text-primary-400 flex-shrink-0" />
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        <FormattedMessage id={feature.nameId} />
                                    </h3>
                                    <p className="text-gray-700 dark:text-gray-300">
                                        <FormattedMessage id={feature.descriptionId} />
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
} 