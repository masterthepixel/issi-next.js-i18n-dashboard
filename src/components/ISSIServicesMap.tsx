"use client";

import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  Cog6ToothIcon,
  FingerPrintIcon,
  LockClosedIcon,
  ServerIcon,
} from '@heroicons/react/20/solid';
import { FormattedMessage } from 'react-intl';
import { ServicesMap } from './ui/services-map';

const features = [
  {
    nameId: 'services.features.cloud.name',
    descriptionId: 'services.features.cloud.description',
    name: 'Cloud Computing & Migration',
    description: 'AWS-based solutions and infrastructure modernization for scalable, reliable cloud environments.',
    icon: CloudArrowUpIcon,
  },
  {
    nameId: 'services.features.security.name',
    descriptionId: 'services.features.security.description',
    name: 'Secure Infrastructure',
    description: 'End-to-end security solutions including penetration testing, compliance auditing, and vulnerability assessment.',
    icon: LockClosedIcon,
  },
  {
    nameId: 'services.features.modernization.name',
    descriptionId: 'services.features.modernization.description',
    name: 'Application Modernization',
    description: 'Upgrade legacy systems with modern technologies and architectural patterns for improved performance.',
    icon: ArrowPathIcon,
  },
  {
    nameId: 'services.features.identity.name',
    descriptionId: 'services.features.identity.description',
    name: 'Identity & Access Management',
    description: 'Comprehensive IAM solutions to secure systems, data, and applications with role-based access control.',
    icon: FingerPrintIcon,
  },
  {
    nameId: 'services.features.api.name',
    descriptionId: 'services.features.api.description',
    name: 'API Development',
    description: 'RESTful and GraphQL API design, development, and integration services for seamless system connectivity.',
    icon: Cog6ToothIcon,
  },
  {
    nameId: 'services.features.software.name',
    descriptionId: 'services.features.software.description',
    name: 'Enterprise Software Engineering',
    description: 'Full-stack development, business analysis, and web/mobile applications using modern methodologies.',
    icon: ServerIcon,
  },
];

export default function ISSIServicesMap() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl sm:text-center">
          <h2 className="text-base/7 font-semibold text-indigo-600 dark:text-indigo-400">
            <FormattedMessage id="services.map.subtitle" defaultMessage="Nationwide Coverage" />
          </h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-slate-900 dark:text-white sm:text-5xl sm:text-balance">
            <FormattedMessage id="services.map.title" defaultMessage="Trusted IT Partner Across America" />
          </p>
          <p className="mt-6 text-lg/8 text-slate-600 dark:text-slate-400">
            <FormattedMessage 
              id="services.map.description" 
              defaultMessage="For over 30 years, ISSI has provided award-winning software development and IT support services to clients across the United States." 
            />
          </p>
        </div>
      </div>
      <div className="relative overflow-hidden pt-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="w-full rounded-xl shadow-2xl ring-1 ring-slate-400/10 dark:ring-slate-100/10 overflow-hidden">
            <ServicesMap />
          </div>
        </div>
      </div>
      <div className="mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base/7 text-slate-600 dark:text-slate-400 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
          {features.map((feature) => (
            <div key={feature.name} className="relative pl-9">
              <p className="inline">
                <feature.icon aria-hidden="true" className="absolute top-1 left-1 size-5 text-indigo-600 dark:text-indigo-400" />
                <span className="inline font-semibold text-slate-900 dark:text-white">
                  <FormattedMessage id={feature.nameId} defaultMessage={feature.name} />
                </span>{' '}
                <FormattedMessage id={feature.descriptionId} defaultMessage={feature.description} />
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
