"use client";

import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';
import { ArrowRight, Award, CheckCircle, Clock, Shield, Star, Users } from 'lucide-react';
import { useIntl } from 'react-intl';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const GovernmentHero = () => {
  const intl = useIntl();
  const params = useParams();
  const locale = params.lang as string;// Government services/features with proper grid layout
  const governmentServices = [
    {
      title: intl.formatMessage({ id: "government.hero.services.partner.title" }),
      description: intl.formatMessage({ id: "government.hero.services.partner.description" }),
      icon: <Shield className="size-8 text-blue-500" />,
      className: 'md:col-span-2 md:row-span-2',
    },
    {
      title: intl.formatMessage({ id: "government.hero.services.experience.title" }),
      description: intl.formatMessage({ id: "government.hero.services.experience.description" }),
      icon: <Clock className="size-8 text-blue-600" />,
      className: 'md:col-span-1',
    },
    {
      title: intl.formatMessage({ id: "government.hero.services.contracts.title" }),
      description: intl.formatMessage({ id: "government.hero.services.contracts.description" }),
      icon: <Star className="size-8 text-green-600" />,
      className: 'md:col-span-1',
    },
    {
      title: intl.formatMessage({ id: "government.hero.services.clients.title" }),
      description: intl.formatMessage({ id: "government.hero.services.clients.description" }),
      icon: <Users className="size-8 text-blue-600" />,
      className: 'md:col-span-1',
    },
    {
      title: intl.formatMessage({ id: "government.hero.services.core.title" }),
      description: intl.formatMessage({ id: "government.hero.services.core.description" }),
      icon: <Award className="size-8 text-blue-600" />,
      className: 'md:col-span-1',
    },
    {
      title: intl.formatMessage({ id: "government.hero.services.certifications.title" }),
      description: intl.formatMessage({ id: "government.hero.services.certifications.description" }),
      icon: <CheckCircle className="size-8 text-green-600" />,
      className: 'md:col-span-1',
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
        </div>        {/* Bento Grid Layout */}
        <BentoGrid className="mx-auto">
          {governmentServices.map((service, i) => (
            <BentoGridItem
              key={i}
              title={service.title}
              description={service.description}
              icon={service.icon}
              className={service.className}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
};

export default GovernmentHero;
