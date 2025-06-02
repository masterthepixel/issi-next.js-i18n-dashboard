'use client';

import Image from "next/image";
import { FormattedMessage } from "react-intl";

const industryCertifications = [
  {
    name: "Certification 1",
    src: "/images/compliance/IndustryCertifications/1.png",
    width: 105,
    height: 48,
    alt: "Industry certification 1"
  },
  {
    name: "Certification 2",
    src: "/images/compliance/IndustryCertifications/2.png",
    width: 104,
    height: 48,
    alt: "Industry certification 2"
  },
  {
    name: "Certification 3",
    src: "/images/compliance/IndustryCertifications/3.png",
    width: 140,
    height: 48,
    alt: "Industry certification 3"
  },
  {
    name: "Certification 5",
    src: "/images/compliance/IndustryCertifications/5.png",
    width: 136,
    height: 48,
    alt: "Industry certification 5"
  },
  {
    name: "Certification 6",
    src: "/images/compliance/IndustryCertifications/6.png",
    width: 158,
    height: 48,
    alt: "Industry certification 6"
  },
  {
    name: "Adobe Partner",
    src: "/images/compliance/IndustryCertifications/Adobe-Logo.png",
    width: 147,
    height: 48,
    alt: "Adobe certified partner"
  },
];

export default function ComplianceIndustryCertifications() {
  return (
    <div className="bg-white dark:bg-slate-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-x-8 gap-y-16 lg:grid-cols-2">
          <div className="mx-auto w-full max-w-xl lg:mx-0">
            <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white sm:text-5xl">
              <FormattedMessage 
                id="compliance.industry.title" 
                defaultMessage="Industry-Leading Compliance Standards" 
              />
            </h2>
            <p className="mt-6 text-lg/8 text-gray-600 dark:text-slate-300">
              <FormattedMessage 
                id="compliance.industry.description" 
                defaultMessage="Our comprehensive certifications and compliance standards demonstrate our commitment to security, quality, and operational excellence across all service areas." 
              />
            </p>
            <div className="mt-8 flex items-center gap-x-6">
              <a
                href="/contact"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <FormattedMessage 
                  id="compliance.industry.cta.primary" 
                  defaultMessage="Learn More" 
                />
              </a>
              <a href="/compliance/iso27001" className="text-sm font-semibold text-gray-900 dark:text-white">
                <FormattedMessage 
                  id="compliance.industry.cta.secondary" 
                  defaultMessage="View Certifications" 
                />
                <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          <div className="mx-auto grid w-full max-w-xl grid-cols-2 items-center gap-y-12 sm:gap-y-14 lg:mx-0 lg:max-w-none lg:pl-8">
            {industryCertifications.map((cert, index) => (
              <div key={index} className="flex justify-center lg:justify-start">
                <Image
                  alt={cert.alt}
                  src={cert.src}
                  width={cert.width}
                  height={cert.height}
                  className="max-h-12 w-full object-contain object-left filter dark:brightness-0 dark:invert"
                  loading="lazy"
                  sizes="(max-width: 768px) 50vw, 200px"
                  title={cert.name}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
