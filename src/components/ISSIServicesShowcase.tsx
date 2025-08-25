"use client";

import ErrorBoundary from "@/components/ErrorBoundary";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
      icon: "text-primary",
      border: "border-border",
      hover: "hover:border-primary/50"
    },
    gov: {
      icon: "text-primary",
      border: "border-border",
      hover: "hover:border-primary/50"
    },
    cyber: {
      icon: "text-primary",
      border: "border-border",
      hover: "hover:border-primary/50"
    },
    cloud: {
      icon: "text-primary",
      border: "border-border",
      hover: "hover:border-primary/50"
    },
    training: {
      icon: "text-primary",
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
    if (isActive) {
      return "bg-primary text-primary-foreground border-primary";
    }
    return "bg-card text-card-foreground border-border hover:bg-accent hover:text-accent-foreground";
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

  return (
    <section className="py-16 px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-left mb-16">
          <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl mb-4">
            <FormattedMessage id="services.showcase.title" />
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mb-8">
            <FormattedMessage id="services.showcase.subtitle" />
          </p>          {/* Category Filter */}
          <div className="flex flex-wrap justify-start gap-2 mb-8" role="tablist" aria-label="Service category filters">
            {CATEGORIES.map((category) => (
              <Button
                key={category.id}
                type="button"
                onClick={() => setSelectedCategory(category.id)}
                className={cn(
                  "px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary",
                  getButtonColors(category.id, selectedCategory === category.id)
                )}
                role="tab"
                aria-selected={selectedCategory === category.id ? "true" : "false"}
                aria-controls={`services-${category.id}`}
                tabIndex={selectedCategory === category.id ? 0 : -1}
                title={intl.formatMessage({ id: category.label })}
              >
                <FormattedMessage id={category.label} />
              </Button>
            ))}
          </div>
        </div>        {/* Bento Grid Layout */}
        {isLoaded && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto">
            {filteredServices.map((service, _index) => {
              const IconComponent = service.icon;
              const colors = getCategoryColors(service.categories);
              return (
                <Card
                  key={service.id}
                  className={cn(
                    "flex flex-col space-y-2 overflow-hidden cursor-pointer",
                    service.className,
                    "hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
                  )}
                >
                  <CardHeader>
                    <IconComponent className={cn(
                      "size-8 transition-all duration-300",
                      colors.icon,
                      "group-hover/bento:drop-shadow-lg"
                    )} />
                  </CardHeader>
                  <CardContent>
                    <CardTitle className={cn(
                      "font-semibold tracking-tight text-xl mb-2 transition duration-300",
                      "text-foreground"
                    )}>
                      {service.title}
                    </CardTitle>
                    <p className="text-muted-foreground text-sm">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
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
    </section>
  );
};

export default function ISSIServicesShowcase() {
  return (
    <ErrorBoundary>
      <ISSIServicesShowcaseInternal />
    </ErrorBoundary>
  );
}
