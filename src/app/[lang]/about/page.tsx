import React, { Suspense } from "react";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/20/solid";
import Image from "next/image";

import Spinner from "@/components/Spinner";
import TeamGridWrapper from "@/components/TeamGridWrapper";
import AboutHeroWrapper from "@/components/AboutHeroWrapper";
import AboutStatsWrapper from "@/components/AboutStatsWrapper";
import AboutCertificationsWrapper from "@/components/AboutCertificationsWrapper";
import AboutAwardsWrapper from "@/components/AboutAwardsWrapper";
import AboutPartnerNetworkWrapper from "@/components/AboutPartnerNetworkWrapper";

import { getIntl } from "@/lib/intl";
import { Locale } from "@/lib/definitions";

export const metadata = {
  title: "About - ISSI - International Software Systems International",
  description:
    "Learn about International Software Systems International (ISSI), our mission, values, and commitment to delivering award-winning software solutions.",
};

interface Props {
  params: {
    lang: Locale;
  };
}

export default function Page({ params: { lang: locale } }: Props) {
  return (
    <Suspense fallback={<Spinner />}>
      <PageContent locale={locale} />
    </Suspense>
  );
}

interface PageContentProps {
  locale: Locale;
}

async function PageContent({ locale }: PageContentProps) {
  const intl = await getIntl(locale);
  const messages = (await import(`../../../lang/${locale}.json`)).default;
  const profile = {
    name: intl.formatMessage({ id: "page.about.title" }),
    subtitle: intl.formatMessage({ id: "page.about.description" }),
    avatar:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
    backgroundImage:
      "https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
  };
  return (
    <div>
      <div>
        <Image
          alt="About Us Header"
          src={profile.backgroundImage}
          width={1950}
          height={400}
          className="h-32 w-full object-cover lg:h-48"
        />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
          <div className="flex">
            <Image
              alt="About Us Avatar"
              src={profile.avatar}
              width={128}
              height={128}
              className="size-24 rounded-full ring-4 ring-white sm:size-32"
            />
          </div>
          <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
            <div className="mt-6 min-w-0 flex-1 sm:hidden md:block">
              <h1 className="truncate text-2xl font-bold text-slate-900 dark:text-slate-100">
                {profile.name}
              </h1>
              <p className="text-lg text-slate-600 dark:text-slate-300">
                {profile.subtitle}
              </p>
            </div>
            <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
              <button
                type="button"
                className="inline-flex justify-center rounded-md bg-white dark:bg-slate-800 px-3 py-2 text-sm font-semibold text-slate-900 dark:text-slate-100 shadow-xs ring-1 ring-slate-300 dark:ring-slate-600 ring-inset hover:bg-slate-50 dark:hover:bg-slate-700"
              >
                <EnvelopeIcon
                  aria-hidden="true"
                  className="mr-1.5 -ml-0.5 size-5 text-slate-400"
                />
                <span>Message</span>
              </button>
              <button
                type="button"
                className="inline-flex justify-center rounded-md bg-white dark:bg-slate-800 px-3 py-2 text-sm font-semibold text-slate-900 dark:text-slate-100 shadow-xs ring-1 ring-slate-300 dark:ring-slate-600 ring-inset hover:bg-slate-50 dark:hover:bg-slate-700"
              >
                <PhoneIcon
                  aria-hidden="true"
                  className="mr-1.5 -ml-0.5 size-5 text-slate-400"
                />
                <span>Call</span>
              </button>
            </div>
          </div>
        </div>
        <div className="mt-6 hidden min-w-0 flex-1 sm:block md:hidden">
          <h1 className="truncate text-2xl font-bold text-slate-900 dark:text-slate-100">
            {profile.name}
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            {profile.subtitle}
          </p>
        </div>      </div>      <AboutHeroWrapper locale={locale} messages={messages} />
      {/* Stats section */}
      <AboutStatsWrapper locale={locale} messages={messages} />
      {/* Certifications section */}
      <AboutCertificationsWrapper locale={locale} messages={messages} />
      {/* Awards section */}
      <AboutAwardsWrapper locale={locale} messages={messages} />
      {/* Partner Network section */}
      <AboutPartnerNetworkWrapper locale={locale} messages={messages} />
      {/* Team section */}
      <TeamGridWrapper locale={locale} messages={messages} />
    </div>
  );
}