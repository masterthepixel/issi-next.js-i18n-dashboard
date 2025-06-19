"use client";

import { BentoGrid } from '@/components/ui/bento-grid';
import { cn } from '@/lib/utils';
import { ArrowRight, Award, CheckCircle, Clock, Shield, Star, Users } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useIntl } from 'react-intl';

const GovernmentHero = () => {  const intl = useIntl();
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

  // Define category-specific colors for government services
  const categoryColors = {
    security: {
      icon: "text-blue-600 dark:text-blue-400",
      border: "border-blue-200 dark:border-blue-800",
      hover: "hover:border-blue-400 dark:hover:border-blue-500"
    },
    experience: {
      icon: "text-green-600 dark:text-green-400", 
      border: "border-green-200 dark:border-green-800",
      hover: "hover:border-green-400 dark:hover:border-green-500"
    },
    contracts: {
      icon: "text-purple-600 dark:text-purple-400",
      border: "border-purple-200 dark:border-purple-800", 
      hover: "hover:border-purple-400 dark:hover:border-purple-500"
    },
    clients: {
      icon: "text-orange-600 dark:text-orange-400",
      border: "border-orange-200 dark:border-orange-800",
      hover: "hover:border-orange-400 dark:hover:border-orange-500"
    },
    core: {
      icon: "text-red-600 dark:text-red-400",
      border: "border-red-200 dark:border-red-800",
      hover: "hover:border-red-400 dark:hover:border-red-500"
    },
    certifications: {
      icon: "text-indigo-600 dark:text-indigo-400",
      border: "border-indigo-200 dark:border-indigo-800", 
      hover: "hover:border-indigo-400 dark:hover:border-indigo-500"
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
            <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            <span className="text-blue-600 dark:text-blue-400 font-semibold tracking-wide">
              {intl.formatMessage({ id: "government.hero.badge" })}
            </span>
          </div>
          
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl mb-4">
            {intl.formatMessage({ id: "government.hero.title" })}
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mb-8">
            {intl.formatMessage({ id: "government.hero.subtitle" })}
          </p>          {/* Action Buttons */}
          <div className="flex gap-4 mb-8">
            <Link 
              href={`/${locale}/services`}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-all"
              aria-label={intl.formatMessage({ id: "government.hero.cta.contracts" })}
            >
              {intl.formatMessage({ id: "government.hero.cta.contracts" })}
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link 
              href={`/${locale}/contact`}
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-lg font-medium transition-all"
              aria-label={intl.formatMessage({ id: "government.hero.cta.contact" })}
            >
              {intl.formatMessage({ id: "government.hero.cta.contact" })}
            </Link>
          </div>
        </div>        {/* Enhanced Bento Grid Layout */}
        <BentoGrid className="mx-auto">
          {governmentServices.map((service, index) => {
            const IconComponent = service.icon;
            const colors = getCategoryColors(service.category);
            return (              <div
                key={service.id}
                role="article"
                aria-labelledby={`government-service-${service.id}-title`}
                aria-describedby={`government-service-${service.id}-description`}
                tabIndex={0}
                onKeyDown={(e) => handleKeyPress(e, service.id)}
                className={cn(
                  "row-span-1 rounded-xl group/bento hover:shadow-xl transition-all duration-300 shadow-input dark:shadow-none p-1 bg-gradient-to-br from-transparent via-transparent to-transparent relative min-h-[200px] cursor-pointer",
                  // Category-specific glow effects
                  "hover:shadow-2xl hover:scale-[1.02] focus:shadow-2xl focus:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2",
                  service.category === "security" && "hover:shadow-blue-500/20 hover:[box-shadow:0_0_30px_-5px_rgb(59_130_246_/_0.5)] focus:ring-blue-500",
                  service.category === "experience" && "hover:shadow-green-500/20 hover:[box-shadow:0_0_30px_-5px_rgb(34_197_94_/_0.5)] focus:ring-green-500",
                  service.category === "contracts" && "hover:shadow-purple-500/20 hover:[box-shadow:0_0_30px_-5px_rgb(147_51_234_/_0.5)] focus:ring-purple-500",
                  service.category === "clients" && "hover:shadow-orange-500/20 hover:[box-shadow:0_0_30px_-5px_rgb(234_88_12_/_0.5)] focus:ring-orange-500",
                  service.category === "core" && "hover:shadow-red-500/20 hover:[box-shadow:0_0_30px_-5px_rgb(220_38_38_/_0.5)] focus:ring-red-500",
                  service.category === "certifications" && "hover:shadow-indigo-500/20 hover:[box-shadow:0_0_30px_-5px_rgb(79_70_229_/_0.5)] focus:ring-indigo-500",
                  service.className
                )}
              >              
                {/* Card Content with Coordinated Colors */}
                <div className={cn(
                  "relative flex h-full flex-col justify-between p-4 rounded-lg border-2 transition-all duration-300 bg-white dark:bg-slate-800/80 backdrop-blur-sm",
                  colors.border,
                  colors.hover,
                  "group-hover/bento:border-opacity-60 group-hover/bento:bg-white/90 dark:group-hover/bento:bg-slate-800/90",
                  "group-focus:border-opacity-60 group-focus:bg-white/90 dark:group-focus:bg-slate-800/90"
                )}>
                  {/* Icon with category color */}
                  <div className="flex justify-start">
                    <IconComponent 
                      className={cn(
                        "size-8 transition-all duration-300",
                        colors.icon,
                        "group-hover/bento:drop-shadow-lg"
                      )}
                      aria-hidden="true"
                    />
                  </div>

                  {/* Title and description with matching category color */}
                  <div className="mt-auto">
                    <h3 
                      id={`government-service-${service.id}-title`}
                      className={cn(
                        "font-semibold tracking-tight text-xl mb-2 transition duration-300",
                        colors.icon, // Use same color as icon
                        "dark:text-slate-100" // Override for dark mode readability
                      )}
                    >
                      {service.title}
                    </h3>
                    <p 
                      id={`government-service-${service.id}-description`}
                      className="text-slate-600 dark:text-slate-300 text-sm"
                    >
                      {service.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </BentoGrid>
      </div>
    </section>
  );
};

export default GovernmentHero;
