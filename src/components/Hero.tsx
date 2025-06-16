"use client";

import dynamic from 'next/dynamic';
import { FormattedMessage, useIntl } from "react-intl";
import { FlipWords } from '@/components/ui/flip-words';

// Dynamically import components to avoid SSR issues
const GlobeDemo = dynamic(() => import('./GlobeDemo'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 animate-pulse" />
  ),
});

const Globe = dynamic(() => import('./Globe'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 animate-pulse rounded-lg" />
  ),
});

export default function Hero() {
  const intl = useIntl();
  
  // Get translated words for FlipWords animation
  const flipWords = [
    intl.formatMessage({ id: "hero.flipwords.words.exceptional" }),
    intl.formatMessage({ id: "hero.flipwords.words.scalable" }),
    intl.formatMessage({ id: "hero.flipwords.words.secure" }),
    intl.formatMessage({ id: "hero.flipwords.words.innovative" }),
  ];

  return (
    <>
      {/* New Interactive Globe Demo Section */}
      <GlobeDemo />
      
      {/* Original Hero Content Below */}
      <div className="relative isolate px-6 lg:px-8 -mt-20">
        {/* Background decoration */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
          />
        </div>
          {/* Main Hero Content */}
        <div className="mx-auto max-w-7xl py-16 sm:py-18 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content Section */}
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-3xl font-semibold tracking-tight text-balance text-slate-900 dark:text-slate-100 sm:text-5xl">
                  <FormattedMessage id="hero.flipwords.prefix" />{" "}
                  <FlipWords 
                    words={flipWords}
                    duration={2500}
                    className="bg-gradient-to-r from-indigo-600 to-blue-400 bg-clip-text text-transparent font-semibold"
                  />
                  {" "}<FormattedMessage id="hero.flipwords.suffix" />
                </h1>
                
                <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
                  <FormattedMessage id="hero.description" />
                </p>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/contact"
                  className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-indigo-700 transition-all transform hover:scale-105 shadow-lg text-center"
                >
                  <FormattedMessage id="hero.cta.get-started" />
                </a>
                <a 
                  href="/services" 
                  className="border-2 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 px-8 py-4 rounded-xl font-semibold hover:border-indigo-600 hover:text-indigo-600 dark:hover:border-indigo-400 dark:hover:text-indigo-400 transition-all text-center"
                >
                  <FormattedMessage id="hero.cta.learn-more" />
                </a>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-200 dark:border-slate-700">
                <div className="text-center group">
                  <div className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-slate-100 transition-transform duration-200 group-hover:scale-110">
                    <FormattedMessage id="hero.stats.years" />
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    <FormattedMessage id="hero.stats.years.label" />
                  </div>
                </div>
                <div className="text-center group">
                  <div className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-slate-100 transition-transform duration-200 group-hover:scale-110">
                    <FormattedMessage id="hero.stats.clients" />
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    <FormattedMessage id="hero.stats.clients.label" />
                  </div>
                </div>
                <div className="text-center group">
                  <div className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-slate-100 transition-transform duration-200 group-hover:scale-110">
                    <FormattedMessage id="hero.stats.projects" />
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    <FormattedMessage id="hero.stats.projects.label" />
                  </div>
                </div>
              </div>
            </div>            {/* Globe Section */}
            <div className="relative">
              <div className="relative border-0 rounded-3xl overflow-hidden">
                
                {/* Globe Header for entire card */}
                <div className="p-6 pb-0">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">
                    <FormattedMessage id="hero.globe.title" />
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">
                    <FormattedMessage id="hero.globe.subtitle" />
                  </p>
                </div>
                <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden m-6 mt-4">
                  <Globe />
                  
                  {/* Legend */}
                  <div className="absolute bottom-4 right-6 backdrop-blur-sm rounded-xl p-3 z-10 shadow-lg">
                    <div className="space-y-2 text-xs">
                      <div className="flex items-center">
                        <span className="w-3 h-3 rounded-full bg-red-500 mr-2"></span>
                        <span className="text-slate-700 dark:text-slate-300 font-medium">
                          <FormattedMessage id="hero.globe.headquarters" />
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-3 h-3 rounded-full bg-indigo-600 mr-2"></span>
                        <span className="text-slate-700 dark:text-slate-300 font-medium">
                          <FormattedMessage id="hero.globe.development" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Globe Footer Information */}
                <div className="p-6 pt-0 pb-6">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                        <FormattedMessage id="hero.globe.location.headquarters" />
                      </p>
                      <p className="text-slate-500 dark:text-slate-400 text-xs">
                        <FormattedMessage id="hero.globe.location.headquarters.subtitle" />
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                        <FormattedMessage id="hero.globe.location.global" />
                      </p>
                      <p className="text-slate-500 dark:text-slate-400 text-xs">
                        <FormattedMessage id="hero.globe.location.global.subtitle" />
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-600">
                    <div className="flex flex-wrap gap-2 pt-2 justify-center">
                      <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200 ring-1 ring-yellow-600/20 dark:ring-yellow-400/30 transition-transform duration-200 hover:scale-105">
                        <FormattedMessage id="hero.features.gsa" />
                      </span>
                      <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-200 ring-1 ring-green-600/20 dark:ring-green-400/30 transition-transform duration-200 hover:scale-105">
                        <FormattedMessage id="hero.features.iso" />
                      </span>
                      <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 ring-1 ring-blue-600/20 dark:ring-blue-400/30 transition-transform duration-200 hover:scale-105">
                        <FormattedMessage id="hero.features.experience" />
                      </span>
                      <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-purple-50 dark:bg-purple-900/20 text-purple-800 dark:text-purple-200 ring-1 ring-purple-600/20 dark:ring-purple-400/30 transition-transform duration-200 hover:scale-105">
                        <FormattedMessage id="hero.features.sba" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating certification badges */}
              <div className="absolute -top-6 -right-6 rounded-2xl p-4 shadow-xl z-10">
                <div className="text-center">
                  <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-1">
                    <FormattedMessage id="hero.certifications.title" />
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                    <div><FormattedMessage id="hero.certifications.cmmi" /></div>
                    <div><FormattedMessage id="hero.certifications.iso9001" /></div>
                    <div><FormattedMessage id="hero.certifications.iso27001" /></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Background decoration */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-60"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-100 dark:bg-purple-900/20 rounded-full blur-3xl opacity-60"></div>
        </div>
        
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="relative left-[calc(50%+3rem)] aspect-1155/678 w-144.5 -translate-x-1/2 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-288.75"
          />
        </div>
      </div>
    </>
  );
}