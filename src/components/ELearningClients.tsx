"use client";

import { FormattedMessage } from "react-intl";

const clients = [
  "elearning.clients.dhs",
  "elearning.clients.dss", 
  "elearning.clients.ssa",
  "elearning.clients.fda",
  "elearning.clients.loc",
  "elearning.clients.peacecorps",
  "elearning.clients.nawc",
  "elearning.clients.umd",
  "elearning.clients.dart",
  "elearning.clients.cms",
  "elearning.clients.marines",
  "elearning.clients.nps"
];

export default function ELearningClients() {
  return (
    <section className="py-24 sm:py-32 bg-slate-50 dark:bg-slate-800">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
          <FormattedMessage id="elearning.clients.title" />
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-slate-600 dark:text-slate-300">
          <FormattedMessage id="elearning.clients.subtitle" />
        </p>
        
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4">
          {clients.map((clientKey, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-slate-700 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 text-center border border-slate-200 dark:border-slate-600"
            >
              <div className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                <FormattedMessage id={clientKey} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
