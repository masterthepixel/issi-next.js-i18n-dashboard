'use client';

import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/20/solid';
import Image from "next/image";
import { FormattedMessage } from "react-intl";

export default function ELearningHeader() {
  const profile = {
    backgroundImage:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
    avatar:
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
  };

  return (
    <div className="relative">
      {/* Profile Header */}
      <div className="relative z-10 bg-white dark:bg-black pb-8">
        <div>
          <Image 
            alt="eLearning Platform Header - Digital education and training solutions" 
            src={profile.backgroundImage} 
            width={1950} 
            height={400} 
            className="h-32 w-full object-cover lg:h-48" 
            priority
          />
        </div>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
            <div className="flex">
              <Image 
                alt="eLearning Platform Avatar" 
                src={profile.avatar} 
                width={128} 
                height={128} 
                className="size-24 rounded-full ring-4 ring-white sm:size-32" 
                priority
              />
            </div>
            <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
              <div className="mt-6 min-w-0 flex-1 sm:hidden md:block">
                <h1 className="truncate text-2xl font-bold text-slate-900 dark:text-slate-100">
                  <FormattedMessage id="page.eLearning.title" defaultMessage="eLearning Platform" />
                </h1>
              </div>              <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                <button
                  type="button"
                  aria-label="Send a message"
                  className="inline-flex justify-center rounded-md bg-white dark:bg-slate-800 px-3 py-2 text-sm font-semibold text-slate-900 dark:text-slate-100 shadow-xs ring-1 ring-slate-300 dark:ring-slate-600 ring-inset hover:bg-slate-50 dark:hover:bg-slate-700"
                >
                  <EnvelopeIcon aria-hidden="true" className="mr-1.5 -ml-0.5 size-5 text-slate-400" />
                  <span><FormattedMessage id="common.action.message" defaultMessage="Message" /></span>
                </button>
                <button
                  type="button"
                  aria-label="Make a phone call"
                  className="inline-flex justify-center rounded-md bg-white dark:bg-slate-800 px-3 py-2 text-sm font-semibold text-slate-900 dark:text-slate-100 shadow-xs ring-1 ring-slate-300 dark:ring-slate-600 ring-inset hover:bg-slate-50 dark:hover:bg-slate-700"
                >
                  <PhoneIcon aria-hidden="true" className="mr-1.5 -ml-0.5 size-5 text-slate-400" />
                  <span><FormattedMessage id="common.action.call" defaultMessage="Call" /></span>
                </button>
              </div>
            </div>
          </div>
          <div className="mt-6 hidden min-w-0 flex-1 sm:block md:hidden">
            <h1 className="truncate text-2xl font-bold text-slate-900 dark:text-slate-100">
              <FormattedMessage id="page.eLearning.title" defaultMessage="eLearning Platform" />
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
