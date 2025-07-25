'use client'

import {
    ChartBarIcon,
    CircleStackIcon,
    DocumentIcon,
    DocumentTextIcon,
    LightBulbIcon,
    UsersIcon,
} from '@heroicons/react/20/solid'
import Image from 'next/image'
import { FormattedMessage, useIntl } from 'react-intl'

export default function ProductsPrudentAgileMethodologyFeatures() {
    const intl = useIntl()

    const features = [
        {
            nameId: "products.prudentAgileMethodology.features.centralizedData.title",
            descriptionId: "products.prudentAgileMethodology.features.centralizedData.description",
            icon: CircleStackIcon,
        },
        {
            nameId: "products.prudentAgileMethodology.features.detailedProfiles.title",
            descriptionId: "products.prudentAgileMethodology.features.detailedProfiles.description",
            icon: DocumentTextIcon,
        },
        {
            nameId: "products.prudentAgileMethodology.features.teamVisibility.title",
            descriptionId: "products.prudentAgileMethodology.features.teamVisibility.description",
            icon: UsersIcon,
        },
        {
            nameId: "products.prudentAgileMethodology.features.clientAssociation.title",
            descriptionId: "products.prudentAgileMethodology.features.clientAssociation.description",
            icon: DocumentIcon,
        },
        {
            nameId: "products.prudentAgileMethodology.features.resourceManagement.title",
            descriptionId: "products.prudentAgileMethodology.features.resourceManagement.description",
            icon: ChartBarIcon,
        },
        {
            nameId: "products.prudentAgileMethodology.features.productivityIncrease.title",
            descriptionId: "products.prudentAgileMethodology.features.productivityIncrease.description",
            icon: LightBulbIcon,
        },
    ]

    return (
        <div className="py-4 lg:py-8">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/* Hero Section */}
                <div className="mx-auto max-w-7xl text-left">
                    <h2 className="text-base/7 font-semibold text-slate-600 dark:text-slate-400">
                        <FormattedMessage id="products.prudentAgileMethodology.hero.subtitle" />
                    </h2>
                    <p className="mt-2 text-4xl font-bold tracking-tight text-blue-600 dark:text-blue-400 sm:text-5xl">
                        <FormattedMessage id="products.prudentAgileMethodology.hero.title" />
                    </p>

                    {/* Main Description */}
                    <p className="mt-6 text-lg/8 text-slate-600 dark:text-slate-300">
                        <FormattedMessage id="products.prudentAgileMethodology.hero.description" />
                    </p>
                </div>
            </div>

            {/* Hero Image */}
            <div className="relative overflow-hidden pt-16">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="bg-white rounded-xl p-4">
                        <Image
                            alt={intl.formatMessage({ id: "products.prudentAgileMethodology.hero.imageAlt", defaultMessage: "Prudent Agile Methodology Dashboard" })}
                            src="/images/products/Prudent Agile.png"
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
                        <FormattedMessage id="products.prudentAgileMethodology.features.title" />
                    </h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-blue-600 dark:text-blue-400 sm:text-4xl">
                        <FormattedMessage id="products.prudentAgileMethodology.features.subtitle" />
                    </p>
                </div>

                {/* Features Grid - Core Features from Source Website */}
                <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base/7 text-slate-600 dark:text-slate-300 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
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
    )
}
