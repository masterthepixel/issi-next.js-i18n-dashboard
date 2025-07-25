"use client"

import {
    ArrowPathIcon,
    CloudArrowUpIcon,
    Cog6ToothIcon,
    FingerPrintIcon,
    LockClosedIcon,
    ServerIcon
} from '@heroicons/react/20/solid'
import { FormattedMessage, useIntl } from 'react-intl'

export default function ProductsElectronicCorrespondenceTrackingSystemFeatures() {
    const intl = useIntl()

    const features = [
        {
            nameId: "products.ects.features.feature1.name",
            descriptionId: "products.ects.features.feature1.description",
            icon: CloudArrowUpIcon,
        },
        {
            nameId: "products.ects.features.feature2.name",
            descriptionId: "products.ects.features.feature2.description",
            icon: LockClosedIcon,
        },
        {
            nameId: "products.ects.features.feature3.name",
            descriptionId: "products.ects.features.feature3.description",
            icon: ArrowPathIcon,
        },
        {
            nameId: "products.ects.features.feature4.name",
            descriptionId: "products.ects.features.feature4.description",
            icon: FingerPrintIcon,
        },
        {
            nameId: "products.ects.features.feature5.name",
            descriptionId: "products.ects.features.feature5.description",
            icon: Cog6ToothIcon,
        },
        {
            nameId: "products.ects.features.feature6.name",
            descriptionId: "products.ects.features.feature6.description",
            icon: ServerIcon,
        },
    ]

    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl sm:text-center">
                    <h2 className="text-base/7 font-semibold text-indigo-600">
                        <FormattedMessage id="products.ects.hero.tagline" />
                    </h2>
                    <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl sm:text-balance">
                        <FormattedMessage id="products.ects.hero.title" />
                    </p>
                    <p className="mt-6 text-lg/8 text-gray-600">
                        <FormattedMessage id="products.ects.hero.description" />
                    </p>
                </div>
            </div>
            <div className="relative overflow-hidden pt-16">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <img
                        alt={intl.formatMessage({ id: "products.ects.hero.imageAlt" })}
                        src="/images/products/ectsproduct.png"
                        width={2432}
                        height={1442}
                        className="mb-[-12%] rounded-xl shadow-2xl ring-1 ring-gray-900/10"
                    />
                    <div aria-hidden="true" className="relative">
                        <div className="absolute -inset-x-20 bottom-0 bg-gradient-to-t from-white pt-[7%]" />
                    </div>
                </div>
            </div>
            <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
                <dl className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base/7 text-gray-600 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
                    {features.map((feature, _index) => [
                        <dt key={feature.nameId + '-dt'} className="relative pl-9 inline font-semibold text-gray-900">
                            <feature.icon aria-hidden="true" className="absolute top-1 left-1 size-5 text-indigo-600" />
                            <FormattedMessage id={feature.nameId} />
                        </dt>,
                        <dd key={feature.nameId + '-dd'} className="inline">
                            <FormattedMessage id={feature.descriptionId} />
                        </dd>
                    ])}
                </dl>
            </div>
        </div>
    )
}
