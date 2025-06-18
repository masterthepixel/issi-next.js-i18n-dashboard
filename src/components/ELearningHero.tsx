"use client";

import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { FormattedMessage, useIntl } from "react-intl";

export default function ELearningHero() {
  const intl = useIntl();
  const params = useParams();
  const locale = params.lang as string;
  return (
    <div className="relative">
      <div className="mx-auto max-w-7xl lg:flex lg:justify-between lg:px-8 xl:justify-end">        <div className="lg:flex lg:w-1/2 lg:shrink lg:grow-0 xl:absolute xl:inset-y-0 xl:right-1/2 xl:w-1/2">
          <div className="relative h-80 lg:-ml-8 lg:h-auto lg:w-full lg:grow xl:ml-0">
            <Image
              alt="eLearning Solutions - Students using modern educational technology"
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80"
              className="absolute inset-0 size-full bg-gray-50 object-cover"
              fill
              loading="lazy"
              unoptimized
            />
            {/* Dots overlay */}
            <div className="absolute right-0 top-0 w-32 h-32 opacity-30 bg-dots" />
            {/* Experience badge */}
            <div className="absolute bottom-0 right-0 bg-red-700 text-white p-6 m-4">
              <div className="text-center">
                <div className="text-4xl font-bold">30+</div>
                <div className="text-lg">
                  <FormattedMessage id="page.eLearning.hero.years" defaultMessage="Years" />
                </div>
                <div className="text-base font-semibold">
                  <FormattedMessage id="page.eLearning.hero.experience.label" defaultMessage="Experience" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="px-6 lg:contents">
          <div className="mx-auto max-w-2xl pt-16 pb-24 sm:pt-20 sm:pb-32 lg:mr-0 lg:ml-8 lg:w-full lg:max-w-lg lg:flex-none lg:pt-32 xl:w-1/2">
            <p className="text-base/7 font-semibold text-blue-600 dark:text-blue-400">
              <FormattedMessage id="page.eLearning.hero.tagline" defaultMessage="Learning Solutions" />
            </p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-slate-900 dark:text-white sm:text-5xl">
              <FormattedMessage id="page.eLearning.hero.title" defaultMessage="E-Learning" />
            </h1>            <p className="mt-6 text-xl/8 text-slate-700 dark:text-slate-300">
              <FormattedMessage 
                id="page.eLearning.hero.intro" 
                defaultMessage="With strong expertise in managing the Instructional Systems Design (ISD) process - including conceptualization of design, e-Learning development, implementation, and evaluation - ISSI's professionals have successfully implemented user and system documentation/training for our clients."
              />
            </p>

            {/* Action Buttons */}
            <div className="mt-10 flex gap-4">
              <Link
                href={`/${locale}/contact`}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center gap-2 transition-all"
                aria-label={intl.formatMessage({ id: 'elearning.hero.cta.consultation', defaultMessage: 'Get Free Consultation' })}
              >
                Get Free Consultation
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href={`/${locale}/services`}
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-lg font-medium transition-all"
                aria-label={intl.formatMessage({ id: 'elearning.hero.cta.services', defaultMessage: 'View All Services' })}
              >
                View All Services
              </Link>
            </div><div className="mt-10 max-w-xl text-base/7 text-slate-700 dark:text-slate-300 lg:max-w-none">
              <p>
                <FormattedMessage 
                  id="page.eLearning.hero.tools" 
                  defaultMessage="Our e-Learning developers have created interactive courseware using Outstart Trainer, SumTotal LCMS, Adobe Captivate, and other authoring tools. Additionally, our multimedia programmers are experienced in Dreamweaver, Flash, Adobe Premier, Adobe Photoshop, and a variety of digital A/V composition and editing tools, as well as AICC and SCORM 2004 authoring requirements."
                />
              </p>
              <p className="mt-8">
                <FormattedMessage 
                  id="page.eLearning.hero.certification" 
                  defaultMessage="International Software Systems, Inc. is an SBA certified small business that specializes in the learning domain. We have established strong partnerships and reseller agreements with leading vendors to provide comprehensive e-learning solutions through the GSA Schedule and Fastrac programs."
                />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
