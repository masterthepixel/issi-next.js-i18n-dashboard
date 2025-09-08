"use client";

import {
    AcademicCapIcon,
    ChartBarIcon,
    Cog6ToothIcon,
    DocumentTextIcon,
    PlayIcon,
    UsersIcon,
} from '@heroicons/react/20/solid';
import { FormattedMessage } from "react-intl";

const features = [
  {
    nameKey: "page.eLearning.features.lms.title",
    descriptionKey: "page.eLearning.features.lms.desc",
    icon: AcademicCapIcon,
  },
  {
    nameKey: "page.eLearning.features.custom.title",
    descriptionKey: "page.eLearning.features.custom.desc",
    icon: Cog6ToothIcon,
  },
  {
    nameKey: "page.eLearning.features.partners.title",
    descriptionKey: "page.eLearning.features.partners.desc",
    icon: UsersIcon,
  },
  {
    nameKey: "page.eLearning.features.multimedia.title",
    descriptionKey: "page.eLearning.features.multimedia.desc",
    icon: PlayIcon,
  },
  {
    nameKey: "page.eLearning.features.scorm.title",
    descriptionKey: "page.eLearning.features.scorm.desc",
    icon: DocumentTextIcon,
  },
  {
    nameKey: "page.eLearning.features.talent.title",
    descriptionKey: "page.eLearning.features.talent.desc",
    icon: ChartBarIcon,
  },
];

export default function ELearningFeatures() {
  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-base/7 text-primary">
            <FormattedMessage id="page.eLearning.features.tagline" defaultMessage="Complete Solutions" />
          </h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-foreground sm:text-5xl">
            <FormattedMessage id="page.eLearning.features.title" defaultMessage="E-Learning Expertise & Capabilities" />
          </p>
          <p className="mt-6 text-lg/8 text-muted-foreground">
            <FormattedMessage 
              id="page.eLearning.features.intro" 
              defaultMessage="Our comprehensive e-learning services combine technical expertise with industry partnerships to deliver scalable learning solutions that meet the highest standards of accessibility and compliance."
            />
          </p>
        </div>
        <dl className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-base/7 text-muted-foreground sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-16">
          {features.map((feature) => (
            <div key={feature.nameKey} className="relative pl-9">
              <dt className="inline font-semibold text-foreground">
                <feature.icon aria-hidden="true" className="absolute top-1 left-1 size-5 text-primary" />
                <FormattedMessage id={feature.nameKey} />
              </dt>{' '}
              <dd className="inline">
                <FormattedMessage id={feature.descriptionKey} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
