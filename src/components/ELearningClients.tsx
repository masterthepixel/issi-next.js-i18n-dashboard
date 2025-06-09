"use client";

import { FormattedMessage } from "react-intl";

const clients = [
  "elearning.clients.cityofgoodyear",
  "elearning.clients.cms", 
  "elearning.clients.dpw",
  "elearning.clients.dojfdss",
  "elearning.clients.dss",
  "elearning.clients.dhs",
  "elearning.clients.dataprep",
  "elearning.clients.dart",
  "elearning.clients.fleetaviation",
  "elearning.clients.flrevenue",
  "elearning.clients.fda",
  "elearning.clients.loc",
  "elearning.clients.mdshighway",
  "elearning.clients.nas",
  "elearning.clients.nawc",
  "elearning.clients.nmhealth",
  "elearning.clients.norfolknavy",
  "elearning.clients.nps",
  "elearning.clients.nuwc",
  "elearning.clients.peacecorps",
  "elearning.clients.sublearning",
  "elearning.clients.usaftravis",
  "elearning.clients.armysamcalm",
  "elearning.clients.uscis",
  "elearning.clients.usda",
  "elearning.clients.commerce",
  "elearning.clients.usmc",
  "elearning.clients.ssa",
  "elearning.clients.sublearningcenter",
  "elearning.clients.umd"
];

export default function ELearningClients() {
  return (
    <section className="py-24 sm:py-32 bg-slate-50 dark:bg-slate-800/30">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="max-w-2xl mb-6 md:mb-0">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              <FormattedMessage id="elearning.clients.title" />
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-300">
              <FormattedMessage id="elearning.clients.subtitle" />
            </p>
          </div>
          <div className="bg-white dark:bg-slate-700 rounded-xl shadow-md p-6 text-center">
            <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">{clients.length}+</div>
            <div className="text-sm text-slate-600 dark:text-slate-300">Client Organizations</div>
          </div>
        </div>
        
        <div className="mx-auto mt-8 grid max-w-7xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {clients.map((clientKey, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-slate-700 p-4 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 text-center border border-slate-200 dark:border-slate-600"
            >
              <div className="text-sm font-medium text-slate-700 dark:text-slate-200">
                <FormattedMessage id={clientKey} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
