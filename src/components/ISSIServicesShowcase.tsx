"use client";

import ErrorBoundary from "@/components/ErrorBoundary";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from '@/lib/utils';
import { ArrowUpRight, Building, ChevronRight, Code, Cpu, Database, GraduationCap, Headset, Search, Server, Shield, Wrench } from 'lucide-react';
import { motion } from 'motion/react';
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

const ISSIServicesShowcaseInternal = () => {
  const intl = useIntl();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // Define category-specific colors for consistency using semantic theme variables
  const categoryColors = {
    it: {
      icon: "text-blue-500",
      border: "border-border",
      hover: "hover:border-primary/50"
    },
    gov: {
      icon: "text-emerald-500",
      border: "border-border",
      hover: "hover:border-primary/50"
    },
    cyber: {
      icon: "text-red-500",
      border: "border-border",
      hover: "hover:border-primary/50"
    },
    cloud: {
      icon: "text-purple-500",
      border: "border-border",
      hover: "hover:border-primary/50"
    },
    training: {
      icon: "text-orange-500",
      border: "border-border",
      hover: "hover:border-primary/50"
    }
  };

  // Get colors for a specific category
  const getCategoryColors = (categories: string[]) => {
    const primaryCategory = categories[0] || 'it';
    return categoryColors[primaryCategory as keyof typeof categoryColors] || categoryColors.it;
  };

  // WCAG AAA compliant button colors using semantic theme variables
  const getButtonColors = (category: string, isActive: boolean) => {
    const categoryButtonColors = {
      all: {
        active: "bg-slate-600 text-white border-slate-600",
        inactive: "bg-slate-100 text-slate-800 border-slate-300 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:border-slate-600 dark:hover:bg-slate-700"
      },
      it: {
        active: "bg-blue-600 text-white border-blue-600",
        inactive: "bg-blue-100 text-blue-800 border-blue-300 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-700 dark:hover:bg-blue-800"
      },
      gov: {
        active: "bg-emerald-600 text-white border-emerald-600",
        inactive: "bg-emerald-100 text-emerald-800 border-emerald-300 hover:bg-emerald-200 dark:bg-emerald-900 dark:text-emerald-200 dark:border-emerald-700 dark:hover:bg-emerald-800"
      },
      cyber: {
        active: "bg-red-600 text-white border-red-600",
        inactive: "bg-red-100 text-red-800 border-red-300 hover:bg-red-200 dark:bg-red-900 dark:text-red-200 dark:border-red-700 dark:hover:bg-red-800"
      },
      cloud: {
        active: "bg-purple-600 text-white border-purple-600",
        inactive: "bg-purple-100 text-purple-800 border-purple-300 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-200 dark:border-purple-700 dark:hover:bg-purple-800"
      },
      training: {
        active: "bg-orange-600 text-white border-orange-600",
        inactive: "bg-orange-100 text-orange-800 border-orange-300 hover:bg-orange-200 dark:bg-orange-900 dark:text-orange-200 dark:border-orange-700 dark:hover:bg-orange-800"
      }
    };

    const colors = categoryButtonColors[category as keyof typeof categoryButtonColors] || categoryButtonColors.all;
    return isActive ? colors.active : colors.inactive;
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
      backgroundImage: 'https://images.unsplash.com/photo-1722080826167-4ea87368cbc5?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: "cloud-services",
      title: intl.formatMessage({ id: 'services.items.cloudServices.title' }),
      description: intl.formatMessage({ id: 'services.items.cloudServices.description' }),
      icon: Server,
      href: '/services/cloud',
      className: 'md:col-span-1',
      categories: ['cloud', 'it'],
      backgroundImage: 'https://images.unsplash.com/photo-1569428034239-f9565e32e224?q=80&w=1179&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: "software-development",
      title: intl.formatMessage({ id: 'services.items.softwareDevelopment.title' }),
      description: intl.formatMessage({ id: 'services.items.softwareDevelopment.description' }),
      icon: Code,
      href: '/services/software-development',
      className: 'md:col-span-1',
      categories: ['it'],
      backgroundImage: 'https://images.unsplash.com/photo-1579403124614-197f69d8187b?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: "database-management",
      title: intl.formatMessage({ id: 'services.items.databaseManagement.title' }),
      description: intl.formatMessage({ id: 'services.items.databaseManagement.description' }),
      icon: Database,
      href: '/services/database-management',
      className: 'md:col-span-1',
      categories: ['it'],
      backgroundImage: 'https://images.unsplash.com/photo-1483736762161-1d107f3c78e1?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: "it-consulting",
      title: intl.formatMessage({ id: 'services.items.itConsulting.title' }),
      description: intl.formatMessage({ id: 'services.items.itConsulting.description' }),
      icon: Search,
      href: '/services/it-consulting',
      className: 'md:col-span-1',
      categories: ['it'],
      backgroundImage: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: "government-services",
      title: intl.formatMessage({ id: 'services.items.governmentServices.title' }),
      description: intl.formatMessage({ id: 'services.items.governmentServices.description' }),
      icon: Building,
      href: '/services/government',
      className: 'md:col-span-2',
      categories: ['gov'],
      backgroundImage: 'https://images.unsplash.com/photo-1618656172765-26774a4a38d2?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: "it-support",
      title: intl.formatMessage({ id: 'services.items.itSupport.title' }),
      description: intl.formatMessage({ id: 'services.items.itSupport.description' }),
      icon: Headset,
      href: '/services/it-support',
      className: 'md:col-span-1',
      categories: ['it'],
      backgroundImage: 'https://images.unsplash.com/photo-1722080826167-4ea87368cbc5?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: "system-integration",
      title: intl.formatMessage({ id: 'services.items.systemIntegration.title' }),
      description: intl.formatMessage({ id: 'services.items.systemIntegration.description' }),
      icon: Wrench,
      href: '/services/system-integration',
      className: 'md:col-span-1',
      categories: ['it'],
      backgroundImage: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: "it-training",
      title: intl.formatMessage({ id: 'services.items.itTraining.title' }),
      description: intl.formatMessage({ id: 'services.items.itTraining.description' }),
      icon: GraduationCap,
      href: '/services/it-training',
      className: 'md:col-span-1 md:row-span-1',
      categories: ['training'],
      backgroundImage: 'https://images.unsplash.com/photo-1722080826167-4ea87368cbc5?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
      id: "infrastructure-management",
      title: intl.formatMessage({ id: 'services.items.infrastructureManagement.title' }),
      description: intl.formatMessage({ id: 'services.items.infrastructureManagement.description' }),
      icon: Cpu,
      href: '/services/infrastructure-management',
      className: 'md:col-span-2',
      categories: ['it', 'cloud'],
      backgroundImage: 'https://images.unsplash.com/photo-1722080826167-4ea87368cbc5?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  ];

  // Filter services by selected category
  const filteredServices = selectedCategory === 'all'
    ? services
    : services.filter(service => service.categories.includes(selectedCategory));

  return (
    <motion.section
      className="py-16 px-6 lg:px-8"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="text-left mb-16">
          <motion.h2
            className="relative z-10 max-w-4xl text-left text-2xl font-normal text-foreground md:text-4xl lg:text-7xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {"Our Services"
              .split(" ")
              .map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                  whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.1,
                    ease: "easeInOut",
                  }}
                  className="mr-2 inline-block"
                >
                  {word}
                </motion.span>
              ))}
          </motion.h2>
          <motion.p
            className="text-lg text-muted-foreground max-w-3xl mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <FormattedMessage id="services.showcase.subtitle" />
          </motion.p>          {/* Category Filter */}
          <div className="flex flex-wrap justify-start gap-2 mb-8" role="tablist" aria-label="Service category filters">
            {CATEGORIES.map((category) => {
              const isSelected = selectedCategory === category.id;
              return (
                <Button
                  key={category.id}
                  type="button"
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    "px-6 py-3 rounded-lg font-medium text-base transition-all duration-300 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary",
                    getButtonColors(category.id, isSelected)
                  )}
                  role="tab"
                  {...(isSelected ? { 'aria-selected': true } : { 'aria-selected': false })}
                  aria-controls={`services-${category.id}`}
                  tabIndex={isSelected ? 0 : -1}
                  title={intl.formatMessage({ id: category.label })}
                >
                  <FormattedMessage id={category.label} />
                </Button>
              );
            })}
          </div>
        </div>        {/* Bento Grid Layout */}
        {isLoaded && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {filteredServices.map((service, _index) => {
              const IconComponent = service.icon;
              const colors = getCategoryColors(service.categories);
              return (
                <Card
                  key={service.id}
                  className={cn(
                    "flex flex-col justify-between overflow-hidden cursor-pointer h-full bg-card relative group",
                    service.className,
                    "hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
                  )}
                >
                  {/* Avatar with ring and arrow in top right corner - HIDDEN */}
                  <div className="absolute top-4 right-4 z-20 hidden">
                    <div className="relative">
                      {/* Ring around image - appears only on hover with smooth animation */}
                      <div className="absolute inset-0 w-6 h-6 rounded-[7px] border border-primary/30 scale-125 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></div>
                      {/* Avatar image - using nested radius calculation (8px card - 2px spacing = 6px) */}
                      <div
                        className="w-6 h-6 rounded-[6px] bg-cover bg-center bg-no-repeat shadow-lg"
                        style={{
                          backgroundImage: `url(${service.backgroundImage})`
                        }}
                      />
                      {/* Arrow pointing to top right - centered in image */}
                      <div className="absolute inset-0 w-6 h-6 rounded-[6px] flex items-center justify-center">
                        <ArrowUpRight className="w-3 h-3 text-white drop-shadow-md" />
                      </div>
                    </div>
                  </div>

                  {/* Content container */}
                  <div className="relative z-10 flex flex-col justify-between h-full">
                    <CardHeader className="flex flex-row items-center space-y-0 space-x-2">
                      <IconComponent className={cn(
                        "size-6 transition-all duration-300",
                        colors.icon,
                        "group-hover/bento:drop-shadow-lg"
                      )} />
                      <CardTitle className={cn(
                        "font-serif font-[400] tracking-tight text-2xl transition duration-300",
                        "text-foreground"
                      )}>
                        {service.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="mt-auto">
                      <p className="text-muted-foreground text-sm">
                        {service.description}
                      </p>
                    </CardContent>
                  </div>
                </Card>
              );
            })}
          </motion.div>
        )}        {/* View All Services Link */}
        <div className="text-left mt-12">
          <a
            href="/services"
            className="inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors"
            title={intl.formatMessage({ id: "services.showcase.viewAll" })}
          >
            <FormattedMessage id="services.showcase.viewAll" />
            <ChevronRight className="ml-1 h-4 w-4" />
          </a>
        </div>
      </div>
    </motion.section>
  );
};

export default function ISSIServicesShowcase() {
  return (
    <ErrorBoundary>
      <ISSIServicesShowcaseInternal />
    </ErrorBoundary>
  );
}

