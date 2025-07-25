'use client'

import {
  ClockIcon,
  UserGroupIcon,
  ChartBarIcon,
  ClipboardDocumentCheckIcon as _ClipboardDocumentCheckIcon,
  DocumentTextIcon as _DocumentTextIcon,
  CurrencyDollarIcon,
  Cog6ToothIcon,
  CalendarDaysIcon as _CalendarDaysIcon,
  ArrowPathIcon as _ArrowPathIcon,
  CheckCircleIcon as _CheckCircleIcon,
  EyeIcon as _EyeIcon,
  BellAlertIcon as _BellAlertIcon,
} from '@heroicons/react/20/solid'
import Image from 'next/image'
import { FormattedMessage, useIntl } from 'react-intl'

export default function ProductsTimesheetManagementSystemFeatures() {
  const intl = useIntl()

  const features = [
    {
      nameId: "products.timesheet-management.features.feature1.name",
      descriptionId: "products.timesheet-management.features.feature1.description",
      icon: CurrencyDollarIcon,
    },
    {
      nameId: "products.timesheet-management.features.feature2.name",
      descriptionId: "products.timesheet-management.features.feature2.description",
      icon: UserGroupIcon,
    },
    {
      nameId: "products.timesheet-management.features.feature3.name",
      descriptionId: "products.timesheet-management.features.feature3.description",
      icon: Cog6ToothIcon,
    },
    {
      nameId: "products.timesheet-management.features.feature4.name",
      descriptionId: "products.timesheet-management.features.feature4.description",
      icon: ClockIcon,
    },
    {
      nameId: "products.timesheet-management.features.feature5.name",
      descriptionId: "products.timesheet-management.features.feature5.description",
      icon: ChartBarIcon,
    },
  ]

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Hero Section */}
        <div className="mx-auto max-w-7xl text-left">
          <h2 className="text-base/7 font-semibold text-slate-600 dark:text-slate-400">
            <FormattedMessage id="products.timesheet-management.hero.tagline" />
          </h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-blue-600 dark:text-blue-400 sm:text-5xl">
            <FormattedMessage id="products.timesheet-management.hero.title" />
          </p>

          {/* Context Description */}
          <p className="mt-6 text-lg/8 text-slate-600 dark:text-slate-300">
            <FormattedMessage id="products.timesheet-management.hero.context" />
          </p>

          {/* Main Description */}
          <p className="mt-4 text-lg/8 text-slate-600 dark:text-slate-300">
            <FormattedMessage id="products.timesheet-management.hero.description" />
          </p>
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative overflow-hidden pt-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="bg-white rounded-xl p-4">
            <Image
              alt={intl.formatMessage({ id: "products.timesheet-management.hero.imageAlt", defaultMessage: "Timesheet Management System Dashboard" })}
              src="/images/products/Timesheet Management.png"
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
            <FormattedMessage id="products.timesheet-management.features.title" />
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-blue-600 dark:text-blue-400 sm:text-4xl">
            <FormattedMessage id="products.timesheet-management.features.subtitle" />
          </p>
          <p className="mt-6 text-lg/8 text-slate-600 dark:text-slate-300">
            <FormattedMessage id="products.timesheet-management.features.description" />
          </p>
        </div>

        {/* Features Grid */}
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
