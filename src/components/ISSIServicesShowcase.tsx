"use client";

import { BentoGrid } from '@/components/ui/bento-grid';
import { cn } from '@/lib/utils';
import { Building, ChevronRight, Code, Cpu, Database, GraduationCap, Headset, Search, Server, Shield, Wrench } from 'lucide-react';
import { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

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

  // Define category-specific colors for consistency
  const categoryColors = {
    it: {
      icon: "text-blue-600 dark:text-blue-400",
      border: "border-blue-200 dark:border-blue-800",
      hover: "hover:border-blue-400 dark:hover:border-blue-500"
    },
    gov: {
      icon: "text-green-600 dark:text-green-400", 
      border: "border-green-200 dark:border-green-800",
      hover: "hover:border-green-400 dark:hover:border-green-500"
    },
    cyber: {
      icon: "text-purple-600 dark:text-purple-400",
      border: "border-purple-200 dark:border-purple-800", 
      hover: "hover:border-purple-400 dark:hover:border-purple-500"
    },
    cloud: {
      icon: "text-orange-600 dark:text-orange-400",
      border: "border-orange-200 dark:border-orange-800",
      hover: "hover:border-orange-400 dark:hover:border-orange-500"
    },
    training: {
      icon: "text-red-600 dark:text-red-400",
      border: "border-red-200 dark:border-red-800",
      hover: "hover:border-red-400 dark:hover:border-red-500"
    }
  };

  // Get colors for a specific category
  const getCategoryColors = (categories: string[]) => {
    const primaryCategory = categories[0] || 'it';
    return categoryColors[primaryCategory as keyof typeof categoryColors] || categoryColors.it;
  };

  // WCAG AAA compliant button colors
  const getButtonColors = (category: string, isActive: boolean) => {
    const colors = {
      all: {
        active: "bg-slate-700 text-white border-slate-700 dark:bg-slate-600 dark:border-slate-600",
        inactive: "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-300 dark:border-slate-600",
        hover: "hover:border-slate-600 dark:hover:border-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700"
      },
      it: {
        active: "bg-blue-700 text-white border-blue-700 dark:bg-blue-600 dark:border-blue-600",
        inactive: "bg-blue-50 dark:bg-blue-950/50 text-blue-800 dark:text-blue-200 border-blue-300 dark:border-blue-700",
        hover: "hover:border-blue-600 dark:hover:border-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900/50"
      },
      gov: {
        active: "bg-green-700 text-white border-green-700 dark:bg-green-600 dark:border-green-600",
        inactive: "bg-green-50 dark:bg-green-950/50 text-green-800 dark:text-green-200 border-green-300 dark:border-green-700",
        hover: "hover:border-green-600 dark:hover:border-green-500 hover:bg-green-100 dark:hover:bg-green-900/50"
      },
      cyber: {
        active: "bg-purple-700 text-white border-purple-700 dark:bg-purple-600 dark:border-purple-600",
        inactive: "bg-purple-50 dark:bg-purple-950/50 text-purple-800 dark:text-purple-200 border-purple-300 dark:border-purple-700",
        hover: "hover:border-purple-600 dark:hover:border-purple-500 hover:bg-purple-100 dark:hover:bg-purple-900/50"
      },
      cloud: {
        active: "bg-orange-700 text-white border-orange-700 dark:bg-orange-600 dark:border-orange-600",
        inactive: "bg-orange-50 dark:bg-orange-950/50 text-orange-800 dark:text-orange-200 border-orange-300 dark:border-orange-700",
        hover: "hover:border-orange-600 dark:hover:border-orange-500 hover:bg-orange-100 dark:hover:bg-orange-900/50"
      },
      training: {
        active: "bg-red-700 text-white border-red-700 dark:bg-red-600 dark:border-red-600",
        inactive: "bg-red-50 dark:bg-red-950/50 text-red-800 dark:text-red-200 border-red-300 dark:border-red-700",
        hover: "hover:border-red-600 dark:hover:border-red-500 hover:bg-red-100 dark:hover:bg-red-900/50"
      }
    };

    const categoryColor = colors[category as keyof typeof colors] || colors.all;
    return isActive ? categoryColor.active : `${categoryColor.inactive} ${categoryColor.hover}`;
  };
  // Service items with icons, titles, descriptions, and categories
  const services = [
    {
      id: "cybersecurity",
      title: intl.formatMessage({ id: 'services.items.cybersecurity.title' }),
      description: intl.formatMessage({ id: 'services.items.cybersecurity.description' }),
      icon: Shield,
      href: '/services/cybersecurity',
      className: 'md:col-span-2',
      categories: ['cyber', 'it'],
    },
    {
      id: "cloud-services",
      title: intl.formatMessage({ id: 'services.items.cloudServices.title' }),
      description: intl.formatMessage({ id: 'services.items.cloudServices.description' }),
      icon: Server,
      href: '/services/cloud',
      className: 'md:col-span-1',
      categories: ['cloud', 'it'],
    },
    {
      id: "software-development",
      title: intl.formatMessage({ id: 'services.items.softwareDevelopment.title' }),
      description: intl.formatMessage({ id: 'services.items.softwareDevelopment.description' }),
      icon: Code,
      href: '/services/software-development',
      className: 'md:col-span-1',
      categories: ['it'],
    },
    {
      id: "database-management",
      title: intl.formatMessage({ id: 'services.items.databaseManagement.title' }),
      description: intl.formatMessage({ id: 'services.items.databaseManagement.description' }),
      icon: Database,
      href: '/services/database-management',
      className: 'md:col-span-1',
      categories: ['it'],
    },
    {
      id: "it-consulting",
      title: intl.formatMessage({ id: 'services.items.itConsulting.title' }),
      description: intl.formatMessage({ id: 'services.items.itConsulting.description' }),
      icon: Search,
      href: '/services/it-consulting',
      className: 'md:col-span-1',
      categories: ['it'],
    },
    {
      id: "government-services",
      title: intl.formatMessage({ id: 'services.items.governmentServices.title' }),
      description: intl.formatMessage({ id: 'services.items.governmentServices.description' }),
      icon: Building,
      href: '/services/government',
      className: 'md:col-span-2',
      categories: ['gov'],
    },
    {
      id: "it-support",
      title: intl.formatMessage({ id: 'services.items.itSupport.title' }),
      description: intl.formatMessage({ id: 'services.items.itSupport.description' }),
      icon: Headset,
      href: '/services/it-support',
      className: 'md:col-span-1',
      categories: ['it'],
    },
    {
      id: "system-integration",
      title: intl.formatMessage({ id: 'services.items.systemIntegration.title' }),
      description: intl.formatMessage({ id: 'services.items.systemIntegration.description' }),
      icon: Wrench,
      href: '/services/system-integration',
      className: 'md:col-span-1',
      categories: ['it'],
    },
    {
      id: "it-training",
      title: intl.formatMessage({ id: 'services.items.itTraining.title' }),
      description: intl.formatMessage({ id: 'services.items.itTraining.description' }),
      icon: GraduationCap,
      href: '/services/it-training',
      className: 'md:col-span-1 md:row-span-1',
      categories: ['training'],
    },
    {
      id: "infrastructure-management",
      title: intl.formatMessage({ id: 'services.items.infrastructureManagement.title' }),
      description: intl.formatMessage({ id: 'services.items.infrastructureManagement.description' }),
      icon: Cpu,
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
        <div className="text-left mb-16">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl mb-4">
            <FormattedMessage id="services.showcase.title" />
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mb-8">
            <FormattedMessage id="services.showcase.subtitle" />
          </p>          {/* Category Filter */}
          <div className="flex flex-wrap justify-start gap-2 mb-8" role="tablist" aria-label="Service category filters">
            {CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={cn(
                  "px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",
                  getButtonColors(category.id, selectedCategory === category.id)
                )}
                role="tab"
                aria-selected={selectedCategory === category.id ? "true" : "false"}
                aria-controls={`services-${category.id}`}
                tabIndex={selectedCategory === category.id ? 0 : -1}
                title={intl.formatMessage({ id: category.label })}
              >
                <FormattedMessage id={category.label} />
              </button>
            ))}
          </div>
        </div>        {/* Bento Grid Layout */}
        {isLoaded && (
          <BentoGrid className="mx-auto">
            {filteredServices.map((service, index) => {
              const IconComponent = service.icon;
              const colors = getCategoryColors(service.categories);
              return (
                <div
                  key={service.id}
                  className={cn(
                    "row-span-1 rounded-xl group/bento hover:shadow-xl transition-all duration-300 shadow-input dark:shadow-none p-1 bg-gradient-to-br from-transparent via-transparent to-transparent relative min-h-[200px] cursor-pointer",
                    // Category-specific glow effects
                    "hover:shadow-2xl hover:scale-[1.02]",
                    service.categories.includes("it") && "hover:shadow-blue-500/20 hover:[box-shadow:0_0_30px_-5px_rgb(59_130_246_/_0.5)]",
                    service.categories.includes("gov") && "hover:shadow-green-500/20 hover:[box-shadow:0_0_30px_-5px_rgb(34_197_94_/_0.5)]",
                    service.categories.includes("cyber") && "hover:shadow-purple-500/20 hover:[box-shadow:0_0_30px_-5px_rgb(147_51_234_/_0.5)]",
                    service.categories.includes("cloud") && "hover:shadow-orange-500/20 hover:[box-shadow:0_0_30px_-5px_rgb(234_88_12_/_0.5)]",
                    service.categories.includes("training") && "hover:shadow-red-500/20 hover:[box-shadow:0_0_30px_-5px_rgb(220_38_38_/_0.5)]",
                    service.className
                  )}
                >              
                  {/* Card Content with Coordinated Colors */}
                  <div className={cn(
                    "relative flex h-full flex-col justify-between p-4 rounded-lg border-2 transition-all duration-300 bg-white dark:bg-slate-800/80 backdrop-blur-sm",
                    colors.border,
                    colors.hover,
                    "group-hover/bento:border-opacity-60 group-hover/bento:bg-white/90 dark:group-hover/bento:bg-slate-800/90"
                  )}>
                    {/* Icon with category color */}
                    <div className="flex justify-start">
                      <IconComponent className={cn(
                        "size-8 transition-all duration-300",
                        colors.icon,
                        "group-hover/bento:drop-shadow-lg"
                      )} />
                    </div>

                    {/* Title and description with matching category color */}
                    <div className="mt-auto">
                      <h3 className={cn(
                        "font-semibold tracking-tight text-xl mb-2 transition duration-300",
                        colors.icon, // Use same color as icon
                        "dark:text-slate-100" // Override for dark mode readability
                      )}>
                        {service.title}
                      </h3>
                      <p className="text-slate-600 dark:text-slate-300 text-sm">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </BentoGrid>
        )}        {/* View All Services Link */}
        <div className="text-left mt-12">
          <a 
            href="/services" 
            className="inline-flex items-center text-indigo-600 dark:text-indigo-400 font-medium hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
            title={intl.formatMessage({ id: "services.showcase.viewAll" })}
          >
            <FormattedMessage id="services.showcase.viewAll" />
            <ChevronRight className="ml-1 h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
