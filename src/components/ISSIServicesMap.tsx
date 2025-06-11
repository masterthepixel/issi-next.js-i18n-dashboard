"use client";

import { Cloud, Server, Shield } from 'lucide-react';
import { FormattedMessage } from 'react-intl';
import { LiquidGlassBackground } from './ui/liquid-glass-background';
import { ServicesMap } from './ui/services-map';

const services = [
  {
    name: 'Cloud Computing & Migration.',
    description: 'AWS-based solutions and infrastructure modernization for scalable, reliable cloud environments.',
    icon: Cloud,
  },
  {
    name: '508 Compliance.',
    description: 'Specialized accessibility consulting, assessment, and testing to ensure federal compliance standards.',
    icon: Shield,
  },
  {
    name: 'Enterprise Software Engineering.',
    description: 'Full-stack development, business analysis, and web/mobile applications using modern methodologies.',
    icon: Server,
  },
];

export default function ISSIServicesMap() {
  return (
    <div className="overflow-hidden bg-white dark:bg-slate-900 py-24 sm:py-32">
      {/* Liquid Glass Background */}
      <div className="absolute inset-0 overflow-hidden">
        <LiquidGlassBackground />
      </div>
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pt-4 lg:pr-8">
            <div className="lg:max-w-lg">
              <h2 className="text-base/7 font-semibold text-indigo-600 dark:text-indigo-400">
                <FormattedMessage id="services.map.subtitle" defaultMessage="Nationwide Coverage" />
              </h2>
              <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-slate-900 dark:text-white sm:text-5xl">
                <FormattedMessage id="services.map.title" defaultMessage="Trusted IT Partner Across America" />
              </p>
              <p className="mt-6 text-lg/8 text-slate-600 dark:text-slate-400">
                <FormattedMessage 
                  id="services.map.description" 
                  defaultMessage="For over 30 years, ISSI has provided award-winning software development and IT support services to clients across the United States." 
                />
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-slate-600 dark:text-slate-400 lg:max-w-none">
                {services.map((service) => (
                  <div key={service.name} className="relative pl-9">
                    <dt className="inline font-semibold text-slate-900 dark:text-white">
                      <service.icon aria-hidden="true" className="absolute top-1 left-1 size-5 text-indigo-600 dark:text-indigo-400" />
                      {service.name}
                    </dt>{' '}
                    <dd className="inline">{service.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>          <div className="w-full max-w-none rounded-xl shadow-xl ring-1 ring-slate-400/10 dark:ring-slate-100/10 overflow-hidden">
            <ServicesMap />
          </div>
        </div>
      </div>
    </div>
  );
}
