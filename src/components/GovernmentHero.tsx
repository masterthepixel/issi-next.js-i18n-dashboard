"use client";

import ErrorBoundary from "@/components/ErrorBoundary";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from '@/lib/utils';
import { ArrowRight, Award, CheckCircle, Clock, Shield, Star, Users } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { useIntl } from 'react-intl';

const GovernmentHeroInternal = () => {
  const intl = useIntl();
  const params = useParams();
  const router = useRouter();
  const locale = (params?.lang as string) || 'en';

  // Keyboard navigation handler
  const _handleKeyPress = (event: React.KeyboardEvent, serviceId: string) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      // Could add navigation or modal opening logic here if needed
      console.log(`Activated government service: ${serviceId}`);
    }
  };

  // Define category-specific colors using patriotic red, white, and blue theme
  const categoryColors = {
    security: {
      icon: "text-blue-600",
      border: "border-blue-600/20",
      hover: "hover:border-blue-600/40"
    },
    experience: {
      icon: "text-red-600",
      border: "border-red-600/20",
      hover: "hover:border-red-600/40"
    },
    contracts: {
      icon: "text-blue-700",
      border: "border-blue-700/20",
      hover: "hover:border-blue-700/40"
    },
    clients: {
      icon: "text-red-700",
      border: "border-red-700/20",
      hover: "hover:border-red-700/40"
    },
    core: {
      icon: "text-blue-800",
      border: "border-blue-800/20",
      hover: "hover:border-blue-800/40"
    },
    certifications: {
      icon: "text-red-800",
      border: "border-red-800/20",
      hover: "hover:border-red-800/40"
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

        <h1 className="text-foreground sm:text-6xl mb-4 font-serif font-[400] text-4xl tracking-tight">
          {intl.formatMessage({ id: "government.hero.title" })}
        </h1>
        <p className="text-lg text-muted-foreground max-w-3xl mb-8">
          {intl.formatMessage({ id: "government.hero.subtitle" })}
        </p>          {/* Action Buttons */}
        <div className="flex gap-4 mb-8">
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white border-blue-600 hover:border-blue-700"
            rightIcon={<ArrowRight className="h-5 w-5 ml-2" />}
            onClick={() => router.push(`/${locale}/services`)}
            aria-label={intl.formatMessage({ id: "government.hero.cta.contracts" })}
          >
            {intl.formatMessage({ id: "government.hero.cta.contracts" })}
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => router.push(`/${locale}/contact`)}
            aria-label={intl.formatMessage({ id: "government.hero.cta.contact" })}
          >
            {intl.formatMessage({ id: "government.hero.cta.contact" })}
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
                  "hover:shadow-2xl hover:scale-[1.02] focus:shadow-2xl focus:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300"
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
                      "font-serif font-[400] tracking-tight text-2xl mb-2 transition duration-300",
                      colors.icon, // Use same color as icon
                      "text-foreground"
                    )}
                  >
                    {service.title}
                  </CardTitle>
                  <p
                    id={`government-service-${service.id}-description`}
                    className="text-muted-foreground  "
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

