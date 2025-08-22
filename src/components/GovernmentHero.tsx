"use client";

import ErrorBoundary from "@/components/ErrorBoundary";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from '@/lib/utils';
import { ArrowRight, Award, CheckCircle, Clock, Shield, Star, Users } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react';
import { useIntl } from 'react-intl';

const GovernmentHeroInternal = () => {
  const intl = useIntl();
  const params = useParams();
  const locale = (params?.lang as string) || 'en';

  // Keyboard navigation handler
  const handleKeyPress = (event: React.KeyboardEvent, serviceId: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      // Could add navigation or modal opening logic here if needed
      console.log(`Activated government service: ${serviceId}`);
    }
  };

  // Define category-specific colors using theme tokens
  const categoryColors = {
    security: {
      icon: "text-primary",
      border: "border-primary/20",
      hover: "hover:border-primary/40"
    },
    experience: {
      icon: "text-chart-2",
      border: "border-chart-2/20",
      hover: "hover:border-chart-2/40"
    },
    contracts: {
      icon: "text-secondary",
      border: "border-secondary/20",
      hover: "hover:border-secondary/40"
    },
    clients: {
      icon: "text-chart-3",
      border: "border-chart-3/20",
      hover: "hover:border-chart-3/40"
    },
    core: {
      icon: "text-chart-4",
      border: "border-chart-4/20",
      hover: "hover:border-chart-4/40"
    },
    certifications: {
      icon: "text-chart-5",
      border: "border-chart-5/20",
      hover: "hover:border-chart-5/40"
    }
  };

  // Get colors for a specific category
  const getCategoryColors = (category: string) => {
    return categoryColors[category as keyof typeof categoryColors] || categoryColors.security;
  };  // Government services/features with proper grid layout and categories
  const governmentServices = [
    {
      id: "trusted-partner",
      title: intl.formatMessage({ id: "government.hero.services.partner.title" }),
      description: intl.formatMessage({ id: "government.hero.services.partner.description" }),
      icon: Shield,
      className: 'md:col-span-2 md:row-span-2',
      category: 'security',
    },
    {
      id: "experience",
      title: intl.formatMessage({ id: "government.hero.services.experience.title" }),
      description: intl.formatMessage({ id: "government.hero.services.experience.description" }),
      icon: Clock,
      className: 'md:col-span-1',
      category: 'experience',
    },
    {
      id: "contracts",
      title: intl.formatMessage({ id: "government.hero.services.contracts.title" }),
      description: intl.formatMessage({ id: "government.hero.services.contracts.description" }),
      icon: Star,
      className: 'md:col-span-1',
      category: 'contracts',
    },
    {
      id: "clients",
      title: intl.formatMessage({ id: "government.hero.services.clients.title" }),
      description: intl.formatMessage({ id: "government.hero.services.clients.description" }),
      icon: Users,
      className: 'md:col-span-1',
      category: 'clients',
    },
    {
      id: "core",
      title: intl.formatMessage({ id: "government.hero.services.core.title" }),
      description: intl.formatMessage({ id: "government.hero.services.core.description" }),
      icon: Award,
      className: 'md:col-span-1',
      category: 'core',
    },
    {
      id: "certifications",
      title: intl.formatMessage({ id: "government.hero.services.certifications.title" }),
      description: intl.formatMessage({ id: "government.hero.services.certifications.description" }),
      icon: CheckCircle,
      className: 'md:col-span-1',
      category: 'certifications',
    },
  ];
  return (
    <section className=" px-4">
      <div className="mx-auto max-w-7xl">        <div className="text-left mb-16">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="h-8 w-8 text-primary" />
          <span className="text-primary font-semibold tracking-wide">
            {intl.formatMessage({ id: "government.hero.badge" })}
          </span>
        </div>

        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl mb-4">
          {intl.formatMessage({ id: "government.hero.title" })}
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mb-8">
          {intl.formatMessage({ id: "government.hero.subtitle" })}
        </p>          {/* Action Buttons */}
        <div className="flex gap-4 mb-8">
          <Button asChild size="lg">
            <Link
              href={`/${locale}/services`}
              aria-label={intl.formatMessage({ id: "government.hero.cta.contracts" })}
            >
              {intl.formatMessage({ id: "government.hero.cta.contracts" })}
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link
              href={`/${locale}/contact`}
              aria-label={intl.formatMessage({ id: "government.hero.cta.contact" })}
            >
              {intl.formatMessage({ id: "government.hero.cta.contact" })}
            </Link>
          </Button>
        </div>
      </div>        {/* Enhanced Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto">
          {governmentServices.map((service, _index) => {
            const IconComponent = service.icon;
            const colors = getCategoryColors(service.category);
            return (
              <Card
                key={service.id}
                className={cn(
                  "flex flex-col space-y-2 overflow-hidden cursor-pointer",
                  service.className,
                  "hover:shadow-2xl hover:scale-[1.02] focus:shadow-2xl focus:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2",
                  service.category === "security" && "hover:shadow-blue-500/20 hover:[box-shadow:0_0_30px_-5px_rgb(59_130_246_/_0.5)] focus:ring-blue-500",
                  service.category === "experience" && "hover:shadow-green-500/20 hover:[box-shadow:0_0_30px_-5px_rgb(34_197_94_/_0.5)] focus:ring-green-500",
                  service.category === "contracts" && "hover:shadow-purple-500/20 hover:[box-shadow:0_0_30px_-5px_rgb(147_51_234_/_0.5)] focus:ring-purple-500",
                  service.category === "clients" && "hover:shadow-orange-500/20 hover:[box-shadow:0_0_30px_-5px_rgb(234_88_12_/_0.5)] focus:ring-orange-500",
                  service.category === "core" && "hover:shadow-red-500/20 hover:[box-shadow:0_0_30px_-5px_rgb(220_38_38_/_0.5)] focus:ring-red-500",
                  service.category === "certifications" && "hover:shadow-indigo-500/20 hover:[box-shadow:0_0_30px_-5px_rgb(79_70_229_/_0.5)] focus:ring-indigo-500"
                )}
              >
                <CardHeader>
                  <IconComponent
                    className={cn(
                      "size-8 transition-all duration-300",
                      colors.icon,
                      "group-hover/bento:drop-shadow-lg"
                    )}
                    aria-hidden="true"
                  />
                </CardHeader>
                <CardContent>
                  <CardTitle
                    id={`government-service-${service.id}-title`}
                    className={cn(
                      "font-semibold tracking-tight text-xl mb-2 transition duration-300",
                      colors.icon, // Use same color as icon
                      "dark:text-foreground" // Override for dark mode readability
                    )}
                  >
                    {service.title}
                  </CardTitle>
                  <p
                    id={`government-service-${service.id}-description`}
                    className="text-muted-foreground text-sm"
                  >
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const GovernmentHero = () => (
  <ErrorBoundary>
    <GovernmentHeroInternal />
  </ErrorBoundary>
);

export default GovernmentHero;
