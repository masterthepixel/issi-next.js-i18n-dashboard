"use client";

import { FormattedMessage } from "react-intl";

export default function ELearningHero() {
  return (
    <section className="relative bg-gradient-to-br from-slate-800 via-slate-700 to-slate-600 dark:from-slate-900 dark:via-slate-800 dark:to-slate-700 text-white py-20 sm:py-32 overflow-hidden">
      {/* Background Pattern - Simple dots instead of SVG */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent"></div>
      </div>
      
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
          <FormattedMessage id="page.eLearning.hero.title" />
        </h1>
        
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-200">
          <FormattedMessage id="page.eLearning.hero.subtitle" />
        </p>
        
        <div className="mt-8 inline-block bg-white/20 backdrop-blur-sm px-8 py-4 rounded-full border border-white/30">
          <span className="text-lg font-semibold">
            <FormattedMessage id="page.eLearning.hero.experience" />
          </span>
        </div>
      </div>
    </section>
  );
}
