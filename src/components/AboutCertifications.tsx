'use client';

import Image from "next/image";
import { FormattedMessage } from "react-intl";

const certifications = [
  {
    name: "ISO 27001",
    src: "/images/certification/1.png",
    width: 120,
    height: 48,
    description: "ISO 27001 Information Security Management certification demonstrating ISSI's commitment to data security and privacy protection"
  },
  {
    name: "CMMI Level 3",
    src: "/images/certification/2.png",
    width: 120,
    height: 48,
    description: "CMMI Level 3 certification showcasing ISSI's mature software development processes and quality standards"
  },
  {
    name: "ISO 9001",
    src: "/images/certification/3.png",
    width: 120,
    height: 48,
    description: "ISO 9001 Quality Management System certification ensuring consistent delivery of high-quality services and solutions"
  },
  {
    name: "MDOT MBE/DBE/SBE Certified",
    src: "/images/certification/4.jpg",
    width: 120,
    height: 48,
    description: "Maryland Department of Transportation Minority/Disadvantaged/Small Business Enterprise certification"
  },
];

export default function AboutCertifications() {
  return (
    <section 
      className="py-24 sm:py-32"
      aria-labelledby="certifications-heading"
      role="region"
      aria-label="Professional certifications and compliance standards"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-x-8 gap-y-16 lg:grid-cols-2">
          <div className="mx-auto w-full max-w-xl lg:mx-0">
            <h2 id="certifications-heading" className="text-4xl font-semibold tracking-tight text-pretty text-slate-900 dark:text-slate-100 sm:text-5xl">
              <FormattedMessage id="about.certifications.title" defaultMessage="Certified Excellence" />
            </h2>
            <p className="mt-6 text-lg/8 text-slate-600 dark:text-slate-300">
              <FormattedMessage 
                id="about.certifications.description" 
                defaultMessage="ISSI maintains the highest standards of quality, security, and process excellence through our comprehensive certifications. These certifications demonstrate our commitment to delivering reliable, secure, and compliant solutions that meet the most stringent industry requirements." 
              />
            </p>
          </div>
          <div className="mx-auto grid w-full max-w-xl grid-cols-2 items-center gap-y-12 sm:gap-y-14 lg:mx-0 lg:max-w-none lg:pl-8">
            {certifications.map((cert, index) => (
              <div key={index} className="flex justify-center lg:justify-start">
                <Image
                  alt={cert.description}
                  src={cert.src}
                  width={cert.width}
                  height={cert.height}
                  className="max-h-12 w-full object-contain object-center lg:object-left filter dark:brightness-0 dark:invert"
                  loading="lazy"
                  sizes="(max-width: 768px) 50vw, 120px"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
