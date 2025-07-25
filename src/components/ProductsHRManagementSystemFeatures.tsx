'use client'

import {
  UsersIcon,
  CurrencyDollarIcon,
  AcademicCapIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  ChartBarIcon,
  CalendarDaysIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  Cog6ToothIcon,
  ClockIcon,
  BellIcon,
} from '@heroicons/react/20/solid'
import Image from 'next/image'
import { FormattedMessage, useIntl } from 'react-intl'

export default function ProductsHRManagementSystemFeatures() {
  const intl = useIntl()

  const features = [
    {
      nameId: "products.hr-management.features.feature1.name",
      descriptionId: "products.hr-management.features.feature1.description",
      icon: UsersIcon,
    },
    {
      nameId: "products.hr-management.features.feature2.name",
      descriptionId: "products.hr-management.features.feature2.description",
      icon: CurrencyDollarIcon,
    },
    {
      nameId: "products.hr-management.features.feature3.name",
      descriptionId: "products.hr-management.features.feature3.description",
      icon: AcademicCapIcon,
    },
    {
      nameId: "products.hr-management.features.feature4.name",
      descriptionId: "products.hr-management.features.feature4.description",
      icon: ClipboardDocumentListIcon,
    },
    {
      nameId: "products.hr-management.features.feature5.name",
      descriptionId: "products.hr-management.features.feature5.description",
      icon: UserGroupIcon,
    },
    {
      nameId: "products.hr-management.features.feature6.name",
      descriptionId: "products.hr-management.features.feature6.description",
      icon: ChartBarIcon,
    },
    {
      nameId: "products.hr-management.features.feature7.name",
      descriptionId: "products.hr-management.features.feature7.description",
      icon: CalendarDaysIcon,
    },
    {
      nameId: "products.hr-management.features.feature8.name",
      descriptionId: "products.hr-management.features.feature8.description",
      icon: DocumentTextIcon,
    },
    {
      nameId: "products.hr-management.features.feature9.name",
      descriptionId: "products.hr-management.features.feature9.description",
      icon: ShieldCheckIcon,
    },
    {
      nameId: "products.hr-management.features.feature10.name",
      descriptionId: "products.hr-management.features.feature10.description",
      icon: Cog6ToothIcon,
    },
    {
      nameId: "products.hr-management.features.feature11.name",
      descriptionId: "products.hr-management.features.feature11.description",
      icon: ClockIcon,
    },
    {
      nameId: "products.hr-management.features.feature12.name",
      descriptionId: "products.hr-management.features.feature12.description",
      icon: BellIcon,
    },
  ]

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mx-auto max-w-7xl text-left">
          <h2 className="text-base/7 font-semibold text-slate-600 dark:text-slate-400">
            <FormattedMessage id="products.hr-management.hero.tagline" />
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-blue-600 dark:text-blue-400 sm:text-5xl">
            <FormattedMessage id="products.hr-management.hero.title" />
          </p>

          {/* Context Description */}
          <p className="mt-6 text-lg/8 text-slate-600 dark:text-slate-300">
            <FormattedMessage id="products.hr-management.hero.context" />
          </p>

          {/* Main Description */}
          <p className="mt-4 text-lg/8 text-slate-600 dark:text-slate-300">
            <FormattedMessage id="products.hr-management.hero.description" />
          </p>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative overflow-hidden pt-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="bg-white rounded-xl p-4">
            <Image
              alt={intl.formatMessage({ id: "products.hr-management.hero.imageAlt", defaultMessage: "HR Management System Dashboard" })}
              src="/images/products/Human Resource Manager.png"
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
            <FormattedMessage id="products.hr-management.features.title" />
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-blue-600 dark:text-blue-400 sm:text-4xl">
            <FormattedMessage id="products.hr-management.features.subtitle" />
          </p>
          <p className="mt-6 text-lg/8 text-slate-600 dark:text-slate-300">
            <FormattedMessage id="products.hr-management.features.description" />
          </p>
        </div>

        {/* Features Grid - All 12 Features */}
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base/7 text-slate-600 dark:text-slate-300 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4 lg:gap-x-8 lg:gap-y-16">
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
