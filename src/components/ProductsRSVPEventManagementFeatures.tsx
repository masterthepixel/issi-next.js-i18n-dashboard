"use client";

import {
    ClipboardDocumentCheckIcon,
    DocumentDuplicateIcon,
    LinkIcon,
    SparklesIcon,
    UsersIcon
} from '@heroicons/react/20/solid';
import Image from 'next/image';
import { FormattedMessage, useIntl } from 'react-intl';
import ProductTemplate from './products/ProductTemplate';

export default function ProductsRSVPEventManagementFeatures() {
    const intl = useIntl();

    const features = [
        {
            nameId: "products.rsvp.features.feature1.name",
            descriptionId: "products.rsvp.features.feature1.description",
            icon: SparklesIcon, // Custom Events
        },
        {
            nameId: "products.rsvp.features.feature2.name",
            descriptionId: "products.rsvp.features.feature2.description",
            icon: LinkIcon, // Invite URL
        },
        {
            nameId: "products.rsvp.features.feature3.name",
            descriptionId: "products.rsvp.features.feature3.description",
            icon: UsersIcon, // Manage Invitees
        },
        {
            nameId: "products.rsvp.features.feature4.name",
            descriptionId: "products.rsvp.features.feature4.description",
            icon: DocumentDuplicateIcon, // Custom Invitation Templates
        },
        {
            nameId: "products.rsvp.features.feature5.name",
            descriptionId: "products.rsvp.features.feature5.description",
            icon: ClipboardDocumentCheckIcon, // Attendance Tracking
        },
    ];

    return (
        <ProductTemplate
            title={<FormattedMessage id="products.rsvp.hero.title" />}
            description={<FormattedMessage id="products.rsvp.hero.description" />}
            actions={null}
        >
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-7xl text-left">
                    <h2 className="text-base/7 text-muted-foreground">
                        <FormattedMessage id="products.rsvp.hero.tagline" />
                    </h2>
                    <p className="mt-6 text-lg/8 text-muted-foreground">
                        <FormattedMessage id="products.rsvp.hero.context" />
                    </p>
                </div>
            </div>
            {/* Hero Image */}
            <div className="relative overflow-hidden pt-16">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="bg-background rounded-xl p-4">
                        <Image
                            alt={intl.formatMessage({ id: "products.rsvp.hero.imageAlt", defaultMessage: "RSVP Event Management dashboard interface" })}
                            src="/images/products/RSVP.png"
                            width={800}
                            height={400}
                        />
                    </div>
                </div>
            </div>
            <section className="mt-12">
                <div className="mb-6 text-lg font-semibold text-foreground">
                    <FormattedMessage id="products.rsvp.features.description" />
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