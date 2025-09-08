'use client'

import {
    ChartBarIcon,
    CircleStackIcon,
    DocumentIcon,
    DocumentTextIcon,
    LightBulbIcon,
    UsersIcon,
} from '@heroicons/react/20/solid';
import Image from 'next/image';
import { FormattedMessage, useIntl } from 'react-intl';

import ProductTemplate from './products/ProductTemplate';

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
        <ProductTemplate
            title={<FormattedMessage id="products.prudentAgileMethodology.hero.title" />}
            description={<FormattedMessage id="products.prudentAgileMethodology.hero.description" />}
            actions={null}
        >
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-7xl text-left">
                    <h2 className="text-base/7 text-muted-foreground">
                        <FormattedMessage id="products.prudentAgileMethodology.hero.subtitle" />
                    </h2>
                </div>
            </div>
            {/* Hero Image */}
            <div className="relative overflow-hidden pt-16">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="bg-background rounded-xl p-4">
                        <Image
                            alt={intl.formatMessage({ id: "products.prudentAgileMethodology.hero.imageAlt", defaultMessage: "Prudent Agile Methodology Dashboard" })}
                            src="/images/products/Prudent Agile.png"
                            width={1200}
                            height={600}
                            className="w-full h-auto object-contain rounded-xl shadow-2xl ring-1 ring-border"
                            priority
                        />
                    </div>
                </div>
            </div>
            <section className="mt-12">
                <div className="mb-6 text-lg font-semibold text-foreground">
                    <FormattedMessage id="products.prudentAgileMethodology.features.title" />
                </div>
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                        {features.map((feature) => {
                            const Icon = feature.icon;
                            return (
                                <div key={feature.nameId} className="relative pl-9">
                                    <Icon className="absolute top-1 left-1 size-5 text-muted-foreground" aria-hidden="true" />
                                    <div className="font-semibold text-primary">
                                        <FormattedMessage id={feature.nameId} />
                                    </div>
                                    <div className="mt-1 text-muted-foreground">
                                        <FormattedMessage id={feature.descriptionId} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>
        </ProductTemplate>
    );
}
