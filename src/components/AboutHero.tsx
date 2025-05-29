'use client';

import { CloudArrowUpIcon, LockClosedIcon, ServerIcon } from '@heroicons/react/20/solid';
import Image from "next/image";
import { FormattedMessage } from "react-intl";

const features = [
  {
    name: <FormattedMessage id="about.hero.company" defaultMessage="About Us" />,
    description: <FormattedMessage id="about.hero.about" defaultMessage="Founded in 1995 and headquartered in Greenbelt, Maryland, International Software Systems, Inc. (ISSI) is a GSA IT MAS Schedule holder providing a wide range of information technology solutions and services. ISSI applies proven industry-standard administrative, program, and project management methodologies to deliver effective IT solutions. These methodologies are regularly reviewed and consistently implemented across projects of varying scopes, ensuring continuous improvement, quality assurance, and successful execution." />,
    icon: CloudArrowUpIcon,
  },
  {
    name: <FormattedMessage id="about.hero.mission.title" defaultMessage="Our Mission" />,
    description: <FormattedMessage id="about.hero.mission" defaultMessage="Our mission is to help clients achieve their business objectives by providing exceptional, client-centric consulting services and solutions. We are committed to fostering a culture of integrity and equity while establishing ISSI as a trusted and valued partner." />,
    icon: LockClosedIcon,
  },
  {
    name: <FormattedMessage id="about.hero.vision.title" defaultMessage="Our Vision" />,
    description: <FormattedMessage id="about.hero.vision" defaultMessage="Our vision is to become a globally recognized IT leader known for innovative solutions, outstanding customer service, and a proven ability to exceed client expectations. We aim to empower our clients by leveraging cutting-edge technology to deliver cost-effective, reliable, and secure solutions. We aim to build long-term partnerships that equip our clients with the tools and expertise needed to thrive in a constantly evolving digital world." />,
    icon: ServerIcon,
  },
];

export default function AboutHero() {  return (
    <section className="overflow-hidden py-24 sm:py-32" aria-labelledby="about-hero-heading">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div className="lg:pt-4 lg:pr-8">
            <div className="lg:max-w-lg">
              <p className="text-base/7 font-semibold text-indigo-600 dark:text-indigo-400">
                <FormattedMessage id="about.hero.title" defaultMessage="Welcome to ISSI" />
              </p>
              <h1 id="about-hero-heading" className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-slate-900 dark:text-slate-100 sm:text-5xl">
                <FormattedMessage id="about.hero.h1" defaultMessage="About International Software Systems, Inc." />
              </h1>
              <p className="mt-6 text-lg/8 text-slate-600 dark:text-slate-300">
                <FormattedMessage id="about.hero.subtitle" defaultMessage="Award-Winning Software Development Since 1995" />
              </p>              <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-slate-600 dark:text-slate-300 lg:max-w-none">
                {features.map((feature, idx) => (
                  <div key={idx}>
                    <dt className="inline font-semibold text-slate-900 dark:text-slate-100 relative pl-9">
                      <feature.icon aria-hidden="true" className="absolute top-1 left-1 size-5 text-indigo-600 dark:text-indigo-400" />
                      {feature.name}
                    </dt>
                    <dd className="inline"> {feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>          
          <div className="flex items-center justify-center lg:justify-end">
            <Image
              alt="ISSI headquarters in Greenbelt, Maryland showcasing our modern office environment and commitment to technology excellence since 1995"
              src="https://tailwindcss.com/plus-assets/img/component-images/dark-project-app-screenshot.png"
              width={2432}
              height={1442}
              priority
              className="w-full max-w-lg h-auto max-h-96 object-cover rounded-xl shadow-xl ring-1 ring-slate-400/10 dark:ring-slate-700/40 lg:max-w-xl lg:max-h-[500px]"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
