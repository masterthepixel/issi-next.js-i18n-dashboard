"use client";

import { FormattedMessage, useIntl } from 'react-intl';
import { ServicesMap } from './ui/services-map';
import { LiquidGlassBackground } from './ui/liquid-glass-background';
import { Cloud, Database, Server, Shield, Settings, ServerCrash } from 'lucide-react';

export default function ISSIServicesMap() {
  return (
    <section className="relative bg-white dark:bg-slate-900 py-24 sm:py-32 overflow-hidden">
      {/* Liquid Glass Background */}
      <div className="absolute inset-0 overflow-hidden">
        <LiquidGlassBackground />
      </div>
      
      {/* Frosted Glass Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl backdrop-blur-sm backdrop-saturate-150 p-8 rounded-2xl bg-white/40 dark:bg-slate-900/40 border border-white/10 dark:border-slate-700/30 shadow-xl sm:text-center">
          <h2 className="text-base/7 font-semibold text-indigo-600 dark:text-indigo-400">
            <FormattedMessage id="services.map.subtitle" defaultMessage="Nationwide Coverage" />
          </h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-slate-900 dark:text-white sm:text-5xl sm:text-balance">
            <FormattedMessage id="services.map.title" defaultMessage="Trusted IT Partner Across America" />
          </p>
          <p className="mt-6 text-lg/8 text-slate-600 dark:text-slate-400">
            <FormattedMessage 
              id="services.map.description" 
              defaultMessage="For over 30 years, ISSI has provided award-winning software development and IT support services to clients across the United States. Our experienced team delivers high-quality, cost-effective solutions that help organizations achieve their technology goals on time and within budget." 
            />
          </p>
        </div>
      </div>
      
      <div className="relative z-10 overflow-hidden pt-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-[-12%] rounded-xl backdrop-blur-md backdrop-saturate-150 bg-white/70 dark:bg-slate-800/70 shadow-2xl ring-1 ring-slate-900/10 dark:ring-slate-100/10 p-8 border border-white/20 dark:border-slate-700/30">
            <ServicesMap />
          </div>
          <div aria-hidden="true" className="relative">
            <div className="absolute -inset-x-20 bottom-0 bg-gradient-to-t from-white dark:from-slate-900 pt-[7%]"></div>
          </div>
        </div>
      </div>
      
      <div className="relative z-10 mx-auto mt-16 max-w-7xl px-6 sm:mt-20 md:mt-24 lg:px-8">
        <dl className="mx-auto grid max-w-2xl grid-cols-1 gap-x-6 gap-y-10 text-base/7 text-slate-600 dark:text-slate-400 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-16">
          <div className="relative pl-9 backdrop-blur-sm backdrop-saturate-150 p-6 rounded-xl bg-white/50 dark:bg-slate-800/40 border border-white/10 dark:border-slate-700/30 shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-white/70 dark:hover:bg-slate-800/60">
            <dt className="inline font-semibold text-slate-900 dark:text-white">
              <Cloud className="absolute top-6 left-6 size-5 text-indigo-600 dark:text-indigo-400" />
              <FormattedMessage id="services.map.cloud.title" defaultMessage="Cloud Computing & Migration" />
            </dt>
            <dd className="inline">
              <FormattedMessage id="services.map.cloud.description" defaultMessage="AWS-based solutions and infrastructure modernization for scalable, reliable cloud environments." />
            </dd>
          </div>
          
          <div className="relative pl-9 backdrop-blur-sm backdrop-saturate-150 p-6 rounded-xl bg-white/50 dark:bg-slate-800/40 border border-white/10 dark:border-slate-700/30 shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-white/70 dark:hover:bg-slate-800/60">
            <dt className="inline font-semibold text-slate-900 dark:text-white">
              <Shield className="absolute top-6 left-6 size-5 text-indigo-600 dark:text-indigo-400" />
              <FormattedMessage id="services.map.compliance.title" defaultMessage="508 Compliance" />
            </dt>
            <dd className="inline">
              <FormattedMessage id="services.map.compliance.description" defaultMessage="Specialized accessibility consulting, assessment, and testing to ensure federal compliance standards." />
            </dd>
          </div>
          
          <div className="relative pl-9 backdrop-blur-sm backdrop-saturate-150 p-6 rounded-xl bg-white/50 dark:bg-slate-800/40 border border-white/10 dark:border-slate-700/30 shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-white/70 dark:hover:bg-slate-800/60">
            <dt className="inline font-semibold text-slate-900 dark:text-white">
              <Settings className="absolute top-6 left-6 size-5 text-indigo-600 dark:text-indigo-400" />
              <FormattedMessage id="services.map.ivv.title" defaultMessage="IV & V and QA" />
            </dt>
            <dd className="inline">
              <FormattedMessage id="services.map.ivv.description" defaultMessage="Independent verification & validation services using IEEE standards for comprehensive quality assurance." />
            </dd>
          </div>
          
          <div className="relative pl-9 backdrop-blur-sm backdrop-saturate-150 p-6 rounded-xl bg-white/50 dark:bg-slate-800/40 border border-white/10 dark:border-slate-700/30 shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-white/70 dark:hover:bg-slate-800/60">
            <dt className="inline font-semibold text-slate-900 dark:text-white">
              <Server className="absolute top-6 left-6 size-5 text-indigo-600 dark:text-indigo-400" />
              <FormattedMessage id="services.map.software.title" defaultMessage="Enterprise Software Engineering" />
            </dt>
            <dd className="inline">
              <FormattedMessage id="services.map.software.description" defaultMessage="Full-stack development, business analysis, and web/mobile applications using modern methodologies." />
            </dd>
          </div>
          
          <div className="relative pl-9 backdrop-blur-sm backdrop-saturate-150 p-6 rounded-xl bg-white/50 dark:bg-slate-800/40 border border-white/10 dark:border-slate-700/30 shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-white/70 dark:hover:bg-slate-800/60">
            <dt className="inline font-semibold text-slate-900 dark:text-white">
              <Database className="absolute top-6 left-6 size-5 text-indigo-600 dark:text-indigo-400" />
              <FormattedMessage id="services.map.project.title" defaultMessage="Project Management" />
            </dt>
            <dd className="inline">
              <FormattedMessage id="services.map.project.description" defaultMessage="PMBOK standards-driven PMO support delivering structured, integrated, high-quality project deliverables." />
            </dd>
          </div>
          
          <div className="relative pl-9 backdrop-blur-sm backdrop-saturate-150 p-6 rounded-xl bg-white/50 dark:bg-slate-800/40 border border-white/10 dark:border-slate-700/30 shadow-lg transition-all duration-300 hover:shadow-xl hover:bg-white/70 dark:hover:bg-slate-800/60">
            <dt className="inline font-semibold text-slate-900 dark:text-white">
              <ServerCrash className="absolute top-6 left-6 size-5 text-indigo-600 dark:text-indigo-400" />
              <FormattedMessage id="services.map.infrastructure.title" defaultMessage="Infrastructure Maintenance" />
            </dt>
            <dd className="inline">
              <FormattedMessage id="services.map.infrastructure.description" defaultMessage="Comprehensive support for hardware, software, servers, storage, and networks with 24/7 monitoring." />
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}
