"use client";

import { FormattedMessage, useIntl } from 'react-intl';

export default function GovernmentNAICSTable() {
  const intl = useIntl();

  const naicsData = [
    {
      sic: '7371',
      naics: '541511',
      descriptionKey: 'government.naics.541511.description',
      capabilitiesKey: 'government.naics.541511.capabilities',
      certificationsKey: 'government.naics.541511.certifications'
    },
    {
      sic: '7373',
      naics: '541512',
      descriptionKey: 'government.naics.541512.description',
      capabilitiesKey: 'government.naics.541512.capabilities',
      certificationsKey: 'government.naics.541512.certifications'
    },
    {
      sic: '7379',
      naics: '541519',
      descriptionKey: 'government.naics.541519.description',
      capabilitiesKey: 'government.naics.541519.capabilities',
      certificationsKey: 'government.naics.541519.certifications'
    },
    {
      sic: '----',
      naics: '541611',
      descriptionKey: 'government.naics.541611.description',
      capabilitiesKey: 'government.naics.541611.capabilities',
      certificationsKey: 'government.naics.541611.certifications'
    },
    {
      sic: '----',
      naics: '541612',
      descriptionKey: 'government.naics.541612.description',
      capabilitiesKey: 'government.naics.541612.capabilities',
      certificationsKey: 'government.naics.541612.certifications'
    },
    {
      sic: '----',
      naics: '541618',
      descriptionKey: 'government.naics.541618.description',
      capabilitiesKey: 'government.naics.541618.capabilities',
      certificationsKey: 'government.naics.541618.certifications'
    },
    {
      sic: '----',
      naics: '511210',
      descriptionKey: 'government.naics.511210.description',
      capabilitiesKey: 'government.naics.511210.capabilities',
      certificationsKey: 'government.naics.511210.certifications'
    },
    {
      sic: '----',
      naics: '611430',
      descriptionKey: 'government.naics.611430.description',
      capabilitiesKey: 'government.naics.611430.capabilities',
      certificationsKey: 'government.naics.611430.certifications'
    },
    {
      sic: '----',
      naics: '611170',
      descriptionKey: 'government.naics.611170.description',
      capabilitiesKey: 'government.naics.611170.capabilities',
      certificationsKey: 'government.naics.611170.certifications'
    },
    {
      sic: '----',
      naics: '611519',
      descriptionKey: 'government.naics.611519.description',
      capabilitiesKey: 'government.naics.611519.capabilities',
      certificationsKey: 'government.naics.611519.certifications'
    },
    {
      sic: '----',
      naics: '611790',
      descriptionKey: 'government.naics.611790.description',
      capabilitiesKey: 'government.naics.611790.capabilities',
      certificationsKey: 'government.naics.611790.certifications'
    },
    {
      sic: '----',
      naics: '923130',
      descriptionKey: 'government.naics.923130.description',
      capabilitiesKey: 'government.naics.923130.capabilities',
      certificationsKey: 'government.naics.923130.certifications'
    }
  ];

  return (
    <section className="py-16 sm:py-24">
      <div className="px-4 sm:px-6 lg:px-8">        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              <FormattedMessage id="government.naics.title" />
            </h2>
            <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-300">
              <FormattedMessage id="government.naics.subtitle" />
            </p>
          </div>
          
          <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-600">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 dark:text-gray-100 sm:pl-6"
                        >
                          <FormattedMessage id="government.naics.table.sic" />
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100"
                        >
                          <FormattedMessage id="government.naics.table.naics" />
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100"
                        >
                          <FormattedMessage id="government.naics.table.description" />
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100"
                        >
                          <FormattedMessage id="government.naics.table.capabilities" />
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100"
                        >
                          <FormattedMessage id="government.naics.table.certifications" />
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-600 bg-white dark:bg-gray-900">
                      {naicsData.map((item, index) => (
                        <tr key={item.naics} className={index % 2 === 0 ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800'}>
                          <td className="py-4 pr-3 pl-4 text-sm font-medium text-gray-900 dark:text-gray-100 sm:pl-6">
                            {item.sic}
                          </td>
                          <td className="px-3 py-4 text-sm font-semibold text-blue-600 dark:text-blue-400">
                            {item.naics}
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-900 dark:text-gray-100 max-w-xs">
                            <FormattedMessage id={item.descriptionKey} />
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-700 dark:text-gray-300 max-w-md">
                            <FormattedMessage id={item.capabilitiesKey} />
                          </td>
                          <td className="px-3 py-4 text-sm text-gray-600 dark:text-gray-400 max-w-md">
                            <FormattedMessage id={item.certificationsKey} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          
          {/* Additional Information Section */}
          <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-medium text-blue-900 dark:text-blue-100">
                  <FormattedMessage id="government.naics.info.title" />
                </h3>
                <div className="mt-2 text-sm text-blue-700 dark:text-blue-200">
                  <p>
                    <FormattedMessage id="government.naics.info.description" />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
