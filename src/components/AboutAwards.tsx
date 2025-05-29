'use client';

import React from "react";
import { FormattedMessage } from "react-intl";
import Image from "next/image";

const awards = [
  { 
    id: 1, 
    imageUrl: "/images/awards/1.png", 
    alt: "ISSI award for excellence in software development and innovation in government technology solutions",
    name: "Excellence in Software Development Award"
  },
  { 
    id: 2, 
    imageUrl: "/images/awards/2.png", 
    alt: "ISSI recognition for outstanding IT support services and customer satisfaction in federal contracts",
    name: "Outstanding IT Support Services Recognition"
  },
  { 
    id: 3, 
    imageUrl: "/images/awards/3.png", 
    alt: "ISSI industry leadership award for innovative technology solutions and proven track record since 1995",
    name: "Industry Leadership Award"
  },
];

export default function AboutAwards() {
  return (
    <section 
      className="bg-white dark:bg-slate-900 py-24 sm:py-32"
      aria-labelledby="awards-heading"
      role="region"
      aria-label="Industry awards and recognition"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">        
        <div className="text-center">
          <h2 id="awards-heading" className="text-4xl font-semibold tracking-tight text-pretty text-slate-900 dark:text-slate-100 sm:text-5xl">
            <FormattedMessage id="about.awards.title" defaultMessage="Our Awards" />
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg/8 text-slate-600 dark:text-slate-300">
            <FormattedMessage 
              id="about.awards.description" 
              defaultMessage="ISSI has received a number of awards from trade and government agencies. We adopt new technologies and methods so that we can continue to grow and earn trust and recognition of our clients" 
            />
          </p>
        </div>
        <div className="mx-auto mt-10 grid max-w-lg grid-cols-3 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-3" role="list">
          {awards.map((award) => (
            <div key={award.id} className="flex justify-center" role="listitem">
              <Image
                alt={award.alt}
                src={award.imageUrl}
                width={158}
                height={48}
                className="max-h-12 w-full object-contain filter dark:brightness-0 dark:invert"
                loading="lazy"
                sizes="(max-width: 640px) 33vw, 158px"
                title={award.name}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
