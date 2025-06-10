"use client";

import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';
import { cn } from '@/lib/utils';
import { clsx } from 'clsx';
import { Building, ChevronRight, Code, Cpu, Database, GraduationCap, Headset, Search, Server, Shield, Wrench } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

// Utility function for class names
const cn2 = (...inputs: any) => clsx(inputs);

// Define service categories
const CATEGORIES = [
  { id: 'all', label: 'services.categories.all' },
  { id: 'it', label: 'services.categories.it' },
  { id: 'gov', label: 'services.categories.government' },
  { id: 'cyber', label: 'services.categories.cybersecurity' },
  { id: 'cloud', label: 'services.categories.cloud' },
  { id: 'training', label: 'services.categories.training' }
];

export default function ISSIServicesShowcase() {
  const intl = useIntl();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Service items with icons, titles, descriptions, and categories
  const services = [
    {
      title: intl.formatMessage({ id: 'services.items.cybersecurity.title' }),
      description: intl.formatMessage({ id: 'services.items.cybersecurity.description' }),
      icon: <Shield className="size-8 text-blue-500" />,
      href: '/services/cybersecurity',
      className: 'md:col-span-2',
      categories: ['cyber', 'it'],
    },
    {
      title: intl.formatMessage({ id: 'services.items.cloudServices.title' }),
      description: intl.formatMessage({ id: 'services.items.cloudServices.description' }),
      icon: <Server className="size-8 text-indigo-500" />,
      href: '/services/cloud',
      className: 'md:col-span-1',
      categories: ['cloud', 'it'],
    },
    {
      title: intl.formatMessage({ id: 'services.items.softwareDevelopment.title' }),
      description: intl.formatMessage({ id: 'services.items.softwareDevelopment.description' }),
      icon: <Code className="size-8 text-purple-500" />,
      href: '/services/software-development',
      className: 'md:col-span-1',
      categories: ['it'],
    },
    {
      title: intl.formatMessage({ id: 'services.items.databaseManagement.title' }),
      description: intl.formatMessage({ id: 'services.items.databaseManagement.description' }),
      icon: <Database className="size-8 text-green-500" />,
      href: '/services/database-management',
      className: 'md:col-span-1',
      categories: ['it'],
    },
    {
      title: intl.formatMessage({ id: 'services.items.itConsulting.title' }),
      description: intl.formatMessage({ id: 'services.items.itConsulting.description' }),
      icon: <Search className="size-8 text-yellow-500" />,
      href: '/services/it-consulting',
      className: 'md:col-span-1',
      categories: ['it'],
    },
    {
      title: intl.formatMessage({ id: 'services.items.governmentServices.title' }),
      description: intl.formatMessage({ id: 'services.items.governmentServices.description' }),
      icon: <Building className="size-8 text-blue-600" />,
      href: '/services/government',
      className: 'md:col-span-2',
      categories: ['gov'],
    },
    {
      title: intl.formatMessage({ id: 'services.items.itSupport.title' }),
      description: intl.formatMessage({ id: 'services.items.itSupport.description' }),
      icon: <Headset className="size-8 text-red-500" />,
      href: '/services/it-support',
      className: 'md:col-span-1',
      categories: ['it'],
    },
    {
      title: intl.formatMessage({ id: 'services.items.systemIntegration.title' }),
      description: intl.formatMessage({ id: 'services.items.systemIntegration.description' }),
      icon: <Wrench className="size-8 text-teal-500" />,
      href: '/services/system-integration',
      className: 'md:col-span-1',
      categories: ['it'],
    },
    {
      title: intl.formatMessage({ id: 'services.items.itTraining.title' }),
      description: intl.formatMessage({ id: 'services.items.itTraining.description' }),
      icon: <GraduationCap className="size-8 text-orange-500" />,
      href: '/services/it-training',
      className: 'md:col-span-1 md:row-span-1',
      categories: ['training'],
    },
    {
      title: intl.formatMessage({ id: 'services.items.infrastructureManagement.title' }),
      description: intl.formatMessage({ id: 'services.items.infrastructureManagement.description' }),
      icon: <Cpu className="size-8 text-slate-500" />,
      href: '/services/infrastructure-management',
      className: 'md:col-span-2',
      categories: ['it', 'cloud'],
    },
  ];

  // Filter services by selected category
  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.categories.includes(selectedCategory));

  // Generate an animated background gradient class
  const backgroundGradientClass = 'bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20';

  return (
    <section className="py-16 px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl mb-4">
            <FormattedMessage id="services.showcase.title" />
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-8">
            <FormattedMessage id="services.showcase.subtitle" />
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all",
                  selectedCategory === category.id
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
                )}
              >
                <FormattedMessage id={category.label} />
              </button>
            ))}
          </div>
        </div>

        {/* Bento Grid Layout */}
        {isLoaded && (
          <BentoGrid className="mx-auto">
            {filteredServices.map((service, i) => (
              <BentoGridItem
                key={i}
                title={service.title}
                description={service.description}
                icon={service.icon}
                className={cn2(service.className)}
                href={service.href}
              />
            ))}
          </BentoGrid>
        )}

        {/* View All Services Link */}
        <div className="text-center mt-12">
          <a 
            href="/services" 
            className="inline-flex items-center text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
          >
            <FormattedMessage id="services.showcase.viewAll" />
            <ChevronRight className="ml-1 h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
