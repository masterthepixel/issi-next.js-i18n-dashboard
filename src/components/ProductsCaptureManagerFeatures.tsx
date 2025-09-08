'use client'

import {
    AdjustmentsHorizontalIcon,
    ChartBarIcon,
    ClockIcon,
    Cog6ToothIcon,
    FunnelIcon,
    LightBulbIcon,
    PresentationChartLineIcon,
    RocketLaunchIcon,
} from '@heroicons/react/20/solid'
import Image from 'next/image'
import { FormattedMessage, useIntl } from 'react-intl'

export default function ProductsCaptureManagerFeatures() {
    const intl = useIntl()

    const features = [
        {
            nameId: "products.cm.features.feature1.name",
            descriptionId: "products.cm.features.feature1.description",
            icon: ClockIcon,
        },
        {
            nameId: "products.cm.features.feature2.name",
            descriptionId: "products.cm.features.feature2.description",
            icon: AdjustmentsHorizontalIcon,
        },
        {
            nameId: "products.cm.features.feature3.name",
            descriptionId: "products.cm.features.feature3.description",
            icon: FunnelIcon,
        },
        {
            nameId: "products.cm.features.feature4.name",
            descriptionId: "products.cm.features.feature4.description",
            icon: ChartBarIcon,
        },
        {
            nameId: "products.cm.features.feature5.name",
            descriptionId: "products.cm.features.feature5.description",
            icon: PresentationChartLineIcon,
        },
        {
            nameId: "products.cm.features.feature6.name",
            descriptionId: "products.cm.features.feature6.description",
            icon: LightBulbIcon,
        },
        {
            nameId: "products.cm.features.feature7.name",
            descriptionId: "products.cm.features.feature7.description",
            icon: RocketLaunchIcon,
        },
        {
            nameId: "products.cm.features.feature8.name",
            descriptionId: "products.cm.features.feature8.description",
            icon: Cog6ToothIcon,
        },
    ]

    return (
        <div className="py-4 lg:py-8">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/* Hero Section */}
                <div className="mx-auto max-w-7xl text-left">
                    <h2 className="text-base/7 text-muted-foreground">
                        <FormattedMessage id="products.cm.hero.tagline" />
                    </h2>
                    <p className="mt-2 text-4xl font-bold tracking-tight text-primary sm:text-5xl">
                        <FormattedMessage id="products.cm.hero.title" />
                    </p>

                    {/* Context Description */}
                    <p className="mt-6 text-lg/8 text-muted-foreground">
                        <FormattedMessage id="products.cm.hero.context" />
                    </p>

                    {/* Main Description */}
                    <p className="mt-4 text-lg/8 text-muted-foreground">
                        <FormattedMessage id="products.cm.hero.description" />
                    </p>
                </div>
            </div>

            {/* Hero Image */}
            <div className="relative overflow-hidden pt-16">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="bg-background rounded-xl p-4">
                        <Image
                            alt={intl.formatMessage({ id: "products.cm.hero.imageAlt", defaultMessage: "Capture Manager Dashboard" })}
                            src="/images/products/Capture Manager.png"
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
                    <h2 className="text-base/7 text-muted-foreground">
                        <FormattedMessage id="products.cm.features.title" />
                    </h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                        <FormattedMessage id="products.cm.features.subtitle" />
                    </p>
                    <p className="mt-6 text-lg/8 text-muted-foreground">
                        <FormattedMessage id="products.cm.features.description" />
                    </p>
                </div>

                {/* Features Grid - Core Features from Source Website */}
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
    )
}
