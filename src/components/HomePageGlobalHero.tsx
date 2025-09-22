"use client";
import { FlipWords } from '@/components/ui/flip-words';
import { motion } from "motion/react";
import { FormattedMessage, useIntl } from "react-intl";

export default function HomePageGlobalHero() {
  const intl = useIntl();  // Get translated words for FlipWords animation
  const flipWords = [
    intl.formatMessage({ id: "hero.flipwords.words.secure" }),
    intl.formatMessage({ id: "hero.flipwords.words.innovative" }),
    intl.formatMessage({ id: "hero.flipwords.words.scalable" }),
    intl.formatMessage({ id: "hero.flipwords.words.exceptional" }),
  ];

  return (
    <div className="relative isolate px-2">
      {/* Main Hero Content */}
      <div className="mx-auto max-w-7xl pb-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center relative">
          {/* Content Section - Left */}
          <motion.div
            className="space-y-8 z-10 order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >            <div className="space-y-6">
              <h1 className="text-balance dark:text-slate-100 sm:text-4xl">
                <div className="flex flex-col">
                  <span><FormattedMessage id="hero.flipwords.prefix" /></span>
                  <span>
                    <FlipWords
                      words={flipWords}
                      duration={2500}
                      className="bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent font-semibold"
                    />
                    {" "}<FormattedMessage id="hero.flipwords.suffix" />
                  </span>
                </div>
              </h1>
              <p className="">
                <FormattedMessage
                  id="hero.description" values={{
                    innovativeTechnology: (chunks) => (
                      <a
                        href="/services"
                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline decoration-blue-200 hover:decoration-blue-400 transition-colors"
                        title="Explore our innovative technology services"
                      >
                        {chunks}
                      </a>
                    ),
                    government: (chunks) => (
                      <a
                        href="/government"
                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline decoration-blue-200 hover:decoration-blue-400 transition-colors"
                        title="Government solutions and services"
                      >
                        {chunks}
                      </a>
                    ),
                    enterprise: (chunks) => (
                      <a
                        href="/products"
                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline decoration-blue-200 hover:decoration-blue-400 transition-colors"
                        title="Enterprise products and solutions"
                      >
                        {chunks}
                      </a>
                    ),
                    eLearning: (chunks) => (
                      <a
                        href="/services/e-learning"
                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline decoration-blue-200 hover:decoration-blue-400 transition-colors"
                        title="E-learning platform solutions"
                      >
                        {chunks}
                      </a>
                    ),
                    compliance: (chunks) => (
                      <a
                        href="/compliance"
                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline decoration-blue-200 hover:decoration-blue-400 transition-colors"
                        title="Compliance management solutions"
                      >
                        {chunks}
                      </a>
                    ),
                  }}
                />
              </p>
            </div>            {/* CTA Buttons */}
            <div className="flex flex-row gap-3 sm:gap-4">
              <a
                href="/contact"
                title="Contact ISSI to get started with our solutions"
                className="bg-blue-600 text-white px-3 py-2 sm:px-6 sm:py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg text-center  "
              >
                <FormattedMessage id="hero.cta.get-started" />
              </a>
              <a
                href="/services"
                title="Explore ISSI's software solutions and services"
                className="border-2 border-slate-300 dark:border-slate-600  "
              >
                <FormattedMessage id="hero.cta.learn-more" />
              </a>
            </div>
          </motion.div>          {/* Globe Section - Right */}
          <motion.div
            className="relative w-full h-[50vh] min-h-[40vh] max-h-[600px] lg:w-[780px] lg:h-[520px] overflow-visible order-2 flex items-center justify-center"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Simple static globe */}
            <div className="w-full h-full relative">
              <div
                className="rounded-full bg-gradient-to-br from-blue-400 via-blue-500 to-blue-700 shadow-2xl mx-auto"
                style={{
                  width: '100%',
                  height: '100%',
                  maxWidth: 600,
                  maxHeight: 600,
                  aspectRatio: 1,
                  background: 'radial-gradient(circle at 30% 30%, #60a5fa, #3b82f6, #1d4ed8, #1e40af)'
                }}
              >
                {/* Globe surface details */}
                <div className="w-full h-full rounded-full relative overflow-hidden">
                  {/* Continents outline */}
                  <div className="absolute inset-0 opacity-20">
                    <svg viewBox="0 0 100 100" className="w-full h-full">
                      <path d="M20,30 Q25,25 30,30 Q35,35 40,30 Q45,25 50,30 Q55,35 60,30 Q65,25 70,30 Q75,35 80,30"
                        stroke="white" strokeWidth="0.5" fill="none" />
                      <path d="M15,45 Q20,40 25,45 Q30,50 35,45 Q40,40 45,45 Q50,50 55,45 Q60,40 65,45 Q70,50 75,45"
                        stroke="white" strokeWidth="0.5" fill="none" />
                    </svg>
                  </div>

                  {/* Data center markers */}
                  <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-red-400 rounded-full animate-pulse shadow-lg"></div>
                  <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 bg-orange-400 rounded-full animate-pulse shadow-lg" style={{ animationDelay: '0.5s' }}></div>
                  <div className="absolute bottom-1/3 left-1/4 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse shadow-lg" style={{ animationDelay: '1s' }}></div>
                  <div className="absolute bottom-1/4 right-1/3 w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse shadow-lg" style={{ animationDelay: '1.5s' }}></div>
                  <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-yellow-400 rounded-full animate-pulse shadow-lg" style={{ animationDelay: '2s' }}></div>

                  {/* Atmospheric glow */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/5 to-transparent transform rotate-12"></div>
                </div>
              </div>
            </div>

            {/* Small Legend for Globe */}
            <div className="absolute bottom-4 right-4 sm:bottom-4 sm:right-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-lg p-2 text-xs">
              {/* Mobile: Horizontal layout */}
              <div className="flex sm:hidden gap-3">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <span>HQ</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  <span>AWS</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span>Azure</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>GCP</span>
                </div>
              </div>
              {/* Desktop: Vertical layout */}
              <div className="hidden sm:flex flex-col gap-1">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <span>HQ</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                  <span>AWS</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  <span>Azure</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span>GCP</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

