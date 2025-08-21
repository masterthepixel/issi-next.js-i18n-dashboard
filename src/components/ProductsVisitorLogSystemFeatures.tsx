"use client";

import {
    ArrowRightOnRectangleIcon,
    ChartBarIcon,
    ClipboardDocumentCheckIcon,
    Cog6ToothIcon,
    DevicePhoneMobileIcon,
    IdentificationIcon,
    UsersIcon
} from "@heroicons/react/20/solid";
import Image from "next/image";
import { FormattedMessage, useIntl } from "react-intl";
import ProductTemplate from './products/ProductTemplate';

const features = [
    {
        nameId: "products.visitor-log-system.features.feature1.name",
        descriptionId: "products.visitor-log-system.features.feature1.description",
        icon: Cog6ToothIcon,
    },
    {
        nameId: "products.visitor-log-system.features.feature2.name",
        descriptionId: "products.visitor-log-system.features.feature2.description",
        icon: ClipboardDocumentCheckIcon,
    },
    {
        nameId: "products.visitor-log-system.features.feature3.name",
        descriptionId: "products.visitor-log-system.features.feature3.description",
        icon: IdentificationIcon,
    },
    {
        nameId: "products.visitor-log-system.features.feature4.name",
        descriptionId: "products.visitor-log-system.features.feature4.description",
        icon: DevicePhoneMobileIcon,
    },
    {
        nameId: "products.visitor-log-system.features.feature5.name",
        descriptionId: "products.visitor-log-system.features.feature5.description",
        icon: UsersIcon,
    },
    {
        nameId: "products.visitor-log-system.features.feature6.name",
        descriptionId: "products.visitor-log-system.features.feature6.description",
        icon: ArrowRightOnRectangleIcon,
    },
    {
        nameId: "products.visitor-log-system.features.feature7.name",
        descriptionId: "products.visitor-log-system.features.feature7.description",
        icon: ChartBarIcon,
    },
];

export default function ProductsVisitorLogSystemFeatures() {
    const intl = useIntl();
    return (
        <ProductTemplate
            title={<FormattedMessage id="products.visitor-log-system.hero.title" />}
            description={<FormattedMessage id="products.visitor-log-system.hero.description" />}
            actions={null}
        >
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-7xl text-left">
                    <h2 className="text-base/7 font-semibold text-muted-foreground">
                        <FormattedMessage id="products.visitor-log-system.hero.tagline" />
                    </h2>
                    <p className="mt-6 text-lg/8 text-muted-foreground">
                        <FormattedMessage id="products.visitor-log-system.hero.context" />
                    </p>
                </div>
            </div>
            {/* Hero Image */}
            <div className="relative overflow-hidden pt-16">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="bg-white rounded-xl p-4">
                        <Image
                            alt={intl.formatMessage({ id: "products.visitor-log-system.hero.imageAlt", defaultMessage: "Visitor Log System Dashboard" })}
                            src="/images/products/VisitorLog.png"
                            width={2432}
                            height={1442}
                            className="w-full h-auto object-contain mb-[-1%] rounded-xl shadow-2xl ring-1 ring-border"
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
                    <h2 className="text-base/7 font-semibold text-muted-foreground">
                        <FormattedMessage id="products.visitor-log-system.features.title" />
                    </h2>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
                        <FormattedMessage id="products.visitor-log-system.features.subtitle" />
                    </p>
                    <p className="mt-6 text-lg/8 text-muted-foreground">
                        <FormattedMessage id="products.visitor-log-system.features.description" />
                    </p>
                </div>
                {/* Features Grid */}
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
        </ProductTemplate>
    );
}