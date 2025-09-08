'use client'

import {
  ArrowPathIcon,
  BoltIcon,
  ChartBarIcon,
  CheckCircleIcon,
  ClipboardDocumentListIcon,
  ClockIcon,
  Cog6ToothIcon,
  DocumentTextIcon,
  EyeIcon,
  LinkIcon,
  ShieldCheckIcon,
  UsersIcon,
} from '@heroicons/react/20/solid';
import Image from 'next/image';
import { FormattedMessage, useIntl } from 'react-intl';

import ProductTemplate from './products/ProductTemplate';

export default function ProductsRequirementsManagementSystemFeatures() {
  const intl = useIntl()

  const features = [
    {
      nameId: "products.requirements-management.features.feature1.name",
      descriptionId: "products.requirements-management.features.feature1.description",
      icon: DocumentTextIcon,
    },
    {
      nameId: "products.requirements-management.features.feature2.name",
      descriptionId: "products.requirements-management.features.feature2.description",
      icon: LinkIcon,
    },
    {
      nameId: "products.requirements-management.features.feature3.name",
      descriptionId: "products.requirements-management.features.feature3.description",
      icon: ClipboardDocumentListIcon,
    },
    {
      nameId: "products.requirements-management.features.feature4.name",
      descriptionId: "products.requirements-management.features.feature4.description",
      icon: ArrowPathIcon,
    },
    {
      nameId: "products.requirements-management.features.feature5.name",
      descriptionId: "products.requirements-management.features.feature5.description",
      icon: CheckCircleIcon,
    },
    {
      nameId: "products.requirements-management.features.feature6.name",
      descriptionId: "products.requirements-management.features.feature6.description",
      icon: ChartBarIcon,
    },
    {
      nameId: "products.requirements-management.features.feature7.name",
      descriptionId: "products.requirements-management.features.feature7.description",
      icon: UsersIcon,
    },
    {
      nameId: "products.requirements-management.features.feature8.name",
      descriptionId: "products.requirements-management.features.feature8.description",
      icon: ShieldCheckIcon,
    },
    {
      nameId: "products.requirements-management.features.feature9.name",
      descriptionId: "products.requirements-management.features.feature9.description",
      icon: ClockIcon,
    },
    {
      nameId: "products.requirements-management.features.feature10.name",
      descriptionId: "products.requirements-management.features.feature10.description",
      icon: BoltIcon,
    },
    {
      nameId: "products.requirements-management.features.feature11.name",
      descriptionId: "products.requirements-management.features.feature11.description",
      icon: Cog6ToothIcon,
    },
    {
      nameId: "products.requirements-management.features.feature12.name",
      descriptionId: "products.requirements-management.features.feature12.description",
      icon: EyeIcon,
    },
  ]

  return (
    <ProductTemplate
      title={<FormattedMessage id="products.requirements-management.hero.title" />}
      description={<FormattedMessage id="products.requirements-management.hero.description" />}
      actions={null}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-7xl text-left">
          <h2 className="text-base/7 text-muted-foreground">
            <FormattedMessage id="products.requirements-management.hero.tagline" />
          </h2>
          <p className="mt-6 text-lg/8 text-muted-foreground">
            <FormattedMessage id="products.requirements-management.hero.context" />
          </p>
        </div>
      </div>
      {/* Hero Image */}
      <div className="relative overflow-hidden pt-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="bg-background rounded-xl p-4">
            <Image
              alt={intl.formatMessage({ id: "products.requirements-management.hero.imageAlt", defaultMessage: "Requirements Management System Dashboard" })}
              src="/images/products/RequirementsManagement.png"
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
          <FormattedMessage id="products.requirements-management.features.description" />
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
