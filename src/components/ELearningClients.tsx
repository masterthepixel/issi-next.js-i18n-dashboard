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
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4">        <div className="text-left mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            <FormattedMessage id="elearning.clients.title" />
          </h2>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            <FormattedMessage id="elearning.clients.subtitle" />
          </p>
        </div><div className="mx-auto mt-8 max-w-7xl">          <div className="flex flex-wrap gap-3 justify-start">
            {clients.map((clientKey, index) => (
              <span 
                key={index} 
                className="inline-flex items-center rounded-full px-3 py-2 text-base font-medium ring-1 ring-inset bg-secondary text-secondary-foreground ring-border"
              >
                <FormattedMessage id={clientKey} />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
