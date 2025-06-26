"use client";

import { FormattedMessage } from "react-intl";
import ScrollTextMarquee from "./ui/scroll-text-marquee";

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

// Split clients into 5 rows
function splitIntoRows(items: string[], rowCount: number) {
  const result: string[][] = [];
  const itemsPerRow = Math.ceil(items.length / rowCount);

  for (let i = 0; i < rowCount; i++) {
    const startIdx = i * itemsPerRow;
    const endIdx = Math.min(startIdx + itemsPerRow, items.length);
    result.push(items.slice(startIdx, endIdx));
  }

  return result;
}

/**
 * Government Clients component displays a list of government clients in an 
 * animated marquee format with alternating scroll directions.
 * 
 * Negative velocity = left-to-right scrolling
 * Positive velocity = right-to-left scrolling
 */

export default function GovernmentClients() {
  const clientRows = splitIntoRows(clients, 5);

  // Animation parameters for each row - alternating directions
  const rowParams = [
    { velocity: -3, delay: 0 },     // First row: left-to-right
    { velocity: 2.5, delay: 100 },  // Second row: right-to-left
    { velocity: -4, delay: 200 },   // Third row: left-to-right
    { velocity: 3, delay: 300 },    // Fourth row: right-to-left
    { velocity: -2.5, delay: 400 }, // Fifth row: left-to-right
  ];

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
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 italic">
            <FormattedMessage id="common.scroll.hint" defaultMessage="Hover over a row to see controls. Click the pause button to stop animation." />
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-7xl">
          <div className="space-y-0.5 py-2">
            {clientRows.map((row, rowIndex) => (
              <ScrollTextMarquee
                key={rowIndex}
                baseVelocity={rowParams[rowIndex].velocity}
                delay={rowParams[rowIndex].delay}
                className="gap-4"
                showPauseControl={true}
              >
                {row.map((client, index) => (
                  <span
                    key={`${rowIndex}-${index}`}
                    className={`inline-flex items-center rounded-full px-2 py-0.5 sm:px-3 sm:py-1.5 text-sm sm:text-base font-medium ring-1 ring-inset ${index % 3 === 0
                        ? 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 ring-red-600/20 dark:ring-red-400/30'
                        : index % 3 === 1
                          ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-200 ring-blue-700/10 dark:ring-blue-400/30'
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 ring-slate-500/10 dark:ring-slate-400/20'
                      }`}
                  >
                    {client}
                  </span>
                ))}
              </ScrollTextMarquee>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
