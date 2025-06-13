"use client";

import { FormattedMessage } from "react-intl";

const clients = [
  "Savannah River Nuclear Solutions",
  "Professional Services Contract",
  "Library of Congress",
  "Leidos ITSSC II Contract",
  "Food and Drug APES Contract",
  "Anne Arundel County BPA Contract",
  "EPTS Modernization",
  "National LMS BPA",
  "ECTS Implementation",
  "DoDEA Contract",
  "Leidos ITSSC Subcontract",
  "NRECA Contract",
  "CMS Contract",
  "IBTS Contract",
  "U.S. EPAAS Contract",
  "SC Inc. Subcontract for CMS",
  "SC Inc. Subcontract for DoDEA",
  "Library of Congress LMS Contract",
  "LMS and Maintenance Contract",
  "NORAD/NORTHCOM",
  "National Security Agency",
  "S4 Inc. Subcontract for NORAD",
  "USNORTHCOM (N2ITSM) Contract",
  "Tarrant County Probation Office",
  "University of Maryland Baltimore",
  "Food and Drug Administration",
  "U.S. Army Sam/Calm Division",
  "U.S. Dept. of Veterans Affairs",
  "ITS NEDC",
  "USDA ITS/ARS PWA PBRAU",
  "Naval Air Warfare Center",
  "CNCS and Maintenance Contract",
  "USDA - National IT Center",
  "USAAC LMS Contract",
  "U.S. Government Publishing Office",
  "City of Goodyear Contract",
  "Federal Communications Commission",
  "National Security Agency Contract",
  "Library of Congress Percipio",
  "Florida Department of Revenue",
  "Fairstead IT Managed Services",
  "U.S. Army ITES-2S"
];

export default function GovernmentClients() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-left mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
            <FormattedMessage id="government.clients.title" defaultMessage="Our Government Clients & Partners" />
          </h2>
          <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-300">
            <FormattedMessage id="government.clients.subtitle" defaultMessage="Trusted by federal, state, and local government agencies for mission-critical technology solutions." />
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-7xl">
          <div className="flex flex-wrap gap-3 justify-start">
            {clients.map((client, index) => (              <span 
                key={index} 
                className={`inline-flex items-center rounded-full px-2 py-1 sm:px-3 sm:py-2 text-sm sm:text-base font-medium ring-1 ring-inset ${
                  index % 3 === 0 
                    ? 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 ring-red-600/20 dark:ring-red-400/30'
                    : index % 3 === 1
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-200 ring-blue-700/10 dark:ring-blue-400/30'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 ring-slate-500/10 dark:ring-slate-400/20'
                }`}
              >
                {client}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
