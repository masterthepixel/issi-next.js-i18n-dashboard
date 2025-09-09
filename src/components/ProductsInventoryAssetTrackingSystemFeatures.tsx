"use client";

import {
    BuildingOffice2Icon,
    CalendarDaysIcon,
    ChartBarIcon,
    ClipboardDocumentCheckIcon,
    DocumentMagnifyingGlassIcon,
    EyeIcon,
    MapPinIcon,
    TagIcon,
    UsersIcon,
    WrenchScrewdriverIcon
} from "@heroicons/react/20/solid";
import Image from "next/image";
import { FormattedMessage, useIntl } from "react-intl";

const features = [
    {
        nameId: "products.inventory-asset-tracking.features.feature1.name",
        descriptionId: "products.inventory-asset-tracking.features.feature1.description",
        icon: BuildingOffice2Icon,
    },
    {
        nameId: "products.inventory-asset-tracking.features.feature2.name",
        descriptionId: "products.inventory-asset-tracking.features.feature2.description",
        icon: ClipboardDocumentCheckIcon,
    },
    {
        nameId: "products.inventory-asset-tracking.features.feature3.name",
        descriptionId: "products.inventory-asset-tracking.features.feature3.description",
        icon: EyeIcon,
    },
    {
        nameId: "products.inventory-asset-tracking.features.feature4.name",
        descriptionId: "products.inventory-asset-tracking.features.feature4.description",
        icon: UsersIcon,
    },
    {
        nameId: "products.inventory-asset-tracking.features.feature5.name",
        descriptionId: "products.inventory-asset-tracking.features.feature5.description",
        icon: DocumentMagnifyingGlassIcon,
    },
    {
        nameId: "products.inventory-asset-tracking.features.feature6.name",
        descriptionId: "products.inventory-asset-tracking.features.feature6.description",
        icon: WrenchScrewdriverIcon,
    },
    {
        nameId: "products.inventory-asset-tracking.features.feature7.name",
        descriptionId: "products.inventory-asset-tracking.features.feature7.description",
        icon: ChartBarIcon,
    },
    {
        nameId: "products.inventory-asset-tracking.features.feature8.name",
        descriptionId: "products.inventory-asset-tracking.features.feature8.description",
        icon: TagIcon,
    },
    {
        nameId: "products.inventory-asset-tracking.features.feature9.name",
        descriptionId: "products.inventory-asset-tracking.features.feature9.description",
        icon: CalendarDaysIcon,
    },
    {
        nameId: "products.inventory-asset-tracking.features.feature10.name",
        descriptionId: "products.inventory-asset-tracking.features.feature10.description",
        icon: MapPinIcon,
    },
];

export default function ProductsInventoryAssetTrackingSystemFeatures() {
    const intl = useIntl();
    return (
        <div className="py-4 lg:py-8">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-7xl text-left">
                    <div className="text-base/7 font-semibold text-muted-foreground">
                        <FormattedMessage id="products.inventory-asset-tracking.hero.tagline" />
                    </div>
                    <h1 className="mt-2 text-primary sm:text-5xl">
                        <FormattedMessage id="products.inventory-asset-tracking.hero.title" />
                    </h1>
                    <div className="mt-6 text-lg/8 text-muted-foreground">
                        <FormattedMessage id="products.inventory-asset-tracking.hero.context" />
                    </div>
                    <div className="mt-4 text-lg/8 text-muted-foreground">
                        <FormattedMessage id="products.inventory-asset-tracking.hero.description" />
                    </div>
                </div>
                <div className="mt-10 flex justify-center">
                    <div className="bg-background rounded-xl p-4">
                        <Image
                            src="/images/products/InventoryAssetTracking.png"
                            alt={intl.formatMessage({ id: "products.inventory-asset-tracking.hero.imageAlt" })}
                            width={800}
                            height={400}
                            className="w-full h-auto object-contain mb-[-12%] rounded-xl shadow-2xl ring-1 ring-border"
                            priority={true}
                        />
                    </div>
                </div>
                <section className="mx-auto max-w-2xl lg:text-center mb-16 mt-16">
                    <div className="text-base/7 font-semibold text-muted-foreground">
                        <FormattedMessage id="products.inventory-asset-tracking.features.title" />
                    </div>
                    <h2 className="mt-2 text-primary sm:text-4xl">
                        <FormattedMessage id="products.inventory-asset-tracking.features.subtitle" />
                    </h2>
                    <div className="mt-6 text-lg/8 text-muted-foreground">
                        <FormattedMessage id="products.inventory-asset-tracking.features.description" />
                    </div>
                </section>
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {features.map((feature, _idx) => {
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
            </div>
        </div>
    );
} 
