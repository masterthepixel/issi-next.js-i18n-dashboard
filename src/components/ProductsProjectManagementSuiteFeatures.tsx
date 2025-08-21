'use client'

import {
    AdjustmentsHorizontalIcon,
    ChartBarIcon,
    ClockIcon,
    CloudArrowUpIcon,
    Cog6ToothIcon,
    CurrencyDollarIcon,
    DocumentCheckIcon,
    EyeIcon,
    FolderIcon,
    LockClosedIcon,
    ServerIcon,
    UserGroupIcon,
} from '@heroicons/react/20/solid';
import { FormattedMessage, useIntl } from 'react-intl';

import Image from 'next/image';
import ProductTemplate from './products/ProductTemplate';

export default function ProductsProjectManagementSuiteFeatures() {
    const intl = useIntl()

    const features = [
        {
            nameId: "products.project-management.features.feature1.name",
            descriptionId: "products.project-management.features.feature1.description",
            icon: ServerIcon,
        },
        {
            nameId: "products.project-management.features.feature2.name",
            descriptionId: "products.project-management.features.feature2.description",
            icon: DocumentCheckIcon,
        },
        {
            nameId: "products.project-management.features.feature3.name",
            descriptionId: "products.project-management.features.feature3.description",
            icon: Cog6ToothIcon,
        },
        {
            nameId: "products.project-management.features.feature4.name",
            descriptionId: "products.project-management.features.feature4.description",
            icon: UserGroupIcon,
        },
        {
            nameId: "products.project-management.features.feature5.name",
            descriptionId: "products.project-management.features.feature5.description",
            icon: AdjustmentsHorizontalIcon,
        },
        {
            nameId: "products.project-management.features.feature6.name",
            descriptionId: "products.project-management.features.feature6.description",
            icon: EyeIcon,
        },
        {
            nameId: "products.project-management.features.feature7.name",
            descriptionId: "products.project-management.features.feature7.description",
            icon: ChartBarIcon,
        },
        {
            nameId: "products.project-management.features.feature8.name",
            descriptionId: "products.project-management.features.feature8.description",
            icon: ClockIcon,
        },
        {
            nameId: "products.project-management.features.feature9.name",
            descriptionId: "products.project-management.features.feature9.description",
            icon: FolderIcon,
        },
        {
            nameId: "products.project-management.features.feature10.name",
            descriptionId: "products.project-management.features.feature10.description",
            icon: CurrencyDollarIcon,
        },
        {
            nameId: "products.project-management.features.feature11.name",
            descriptionId: "products.project-management.features.feature11.description",
            icon: LockClosedIcon,
        },
        {
            nameId: "products.project-management.features.feature12.name",
            descriptionId: "products.project-management.features.feature12.description",
            icon: CloudArrowUpIcon,
        },
    ]

    return (
        <ProductTemplate
            title={<FormattedMessage id="products.project-management.hero.title" />}
            description={<FormattedMessage id="products.project-management.hero.description" />}
            actions={null}
        >
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-7xl text-left">
                    <h2 className="text-base/7 font-semibold text-muted-foreground">
                        <FormattedMessage id="products.project-management.hero.tagline" />
                    </h2>
                    <p className="mt-6 text-lg/8 text-muted-foreground">
                        <FormattedMessage id="products.project-management.hero.context" />
                    </p>
                </div>
            </div>
            {/* Hero Image */}
            <div className="relative overflow-hidden pt-16">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="bg-white rounded-xl p-4">
                        <Image
                            alt={intl.formatMessage({ id: "products.project-management.hero.imageAlt", defaultMessage: "Project Management Suite Dashboard" })}
                            src="/images/products/Project Management.png"
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
                    <FormattedMessage id="products.project-management.features.title" />
                </div>
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
