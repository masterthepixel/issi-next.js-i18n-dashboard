"use client";

import { FormattedMessage } from "react-intl";

const services = [
  {
    icon: "⚙️",
    titleKey: "elearning.services.lms.title",
    descriptionKey: "elearning.services.lms.description",
    features: [
      "elearning.services.lms.feature1",
      "elearning.services.lms.feature2", 
      "elearning.services.lms.feature3",
      "elearning.services.lms.feature4"
    ]
  },
  {
    icon: "🎨",
    titleKey: "elearning.services.course.title",
    descriptionKey: "elearning.services.course.description",
    features: [
      "elearning.services.course.feature1",
      "elearning.services.course.feature2",
      "elearning.services.course.feature3",
      "elearning.services.course.feature4"
    ]
  },
  {
    icon: "☁️",
    titleKey: "elearning.services.hosting.title",
    descriptionKey: "elearning.services.hosting.description",
    features: [
      "elearning.services.hosting.feature1",
      "elearning.services.hosting.feature2",
      "elearning.services.hosting.feature3",
      "elearning.services.hosting.feature4"
    ]
  },
  {
    icon: "🔧",
    titleKey: "elearning.services.professional.title",
    descriptionKey: "elearning.services.professional.description",
    features: [
      "elearning.services.professional.feature1",
      "elearning.services.professional.feature2",
      "elearning.services.professional.feature3",
      "elearning.services.professional.feature4"
    ]
  },
  {
    icon: "🎯",
    titleKey: "elearning.services.instructional.title",
    descriptionKey: "elearning.services.instructional.description",
    features: [
      "elearning.services.instructional.feature1",
      "elearning.services.instructional.feature2",
      "elearning.services.instructional.feature3",
      "elearning.services.instructional.feature4"
    ]
  },
  {
    icon: "🛠️",
    titleKey: "elearning.services.support.title",
    descriptionKey: "elearning.services.support.description",
    features: [
      "elearning.services.support.feature1",
      "elearning.services.support.feature2",
      "elearning.services.support.feature3",
      "elearning.services.support.feature4"
    ]
  }
];

export default function ELearningServices() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          <FormattedMessage id="elearning.services.title" />
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-slate-600 dark:text-slate-300">
          <FormattedMessage id="elearning.services.subtitle" />
        </p>
        
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {services.map((service, index) => (
            <div key={index} className="rounded-2xl border-2 border-slate-200 dark:border-slate-600 p-8 transition-all duration-300 hover:border-slate-600 dark:hover:border-slate-400 hover:shadow-xl hover:-translate-y-1 bg-white dark:bg-slate-800">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-slate-600 to-slate-800 text-white text-xl">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                  <FormattedMessage id={service.titleKey} />
                </h3>
              </div>
              
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                <FormattedMessage id={service.descriptionKey} />
              </p>
              
              <ul className="space-y-2">
                {service.features.map((featureKey, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                    <span className="text-slate-400 mt-1">•</span>
                    <FormattedMessage id={featureKey} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
