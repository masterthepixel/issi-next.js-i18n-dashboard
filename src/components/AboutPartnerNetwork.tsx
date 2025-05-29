"use client";

import Image from "next/image";
import { useIntl } from "react-intl";

const partners = [
  {
    id: 1,
    name: "Microsoft Technology Partner",
    src: "/images/partnernetwork/pn1.jpg",
    alt: "Microsoft technology partnership enabling ISSI to deliver cutting-edge cloud solutions and enterprise software development"
  },
  {
    id: 2,
    name: "Amazon Web Services Partner",
    src: "/images/partnernetwork/pn2.jpg",
    alt: "Amazon Web Services partnership providing ISSI clients with scalable cloud infrastructure and advanced AWS services"
  },
  {
    id: 3,
    name: "Oracle Technology Alliance",
    src: "/images/partnernetwork/pn3_1.jpg",
    alt: "Oracle technology alliance supporting ISSI's database solutions and enterprise application development capabilities"
  },
  {
    id: 4,
    name: "IBM Business Partner",
    src: "/images/partnernetwork/pn4_1.jpg",
    alt: "IBM business partnership enhancing ISSI's AI and analytics solutions for government and enterprise clients"
  },
];

export default function AboutPartnerNetwork() {
  const intl = useIntl();
  return (
    <section 
      className="py-24 sm:py-32"
      aria-labelledby="partners-heading"
      role="region"
      aria-label="Strategic technology partnerships"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-x-8 gap-y-16 lg:grid-cols-2">          
          <div className="mx-auto w-full max-w-xl lg:mx-0">
            <h2 id="partners-heading" className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white sm:text-5xl">
              {intl.formatMessage({ id: "about.partnerNetwork.title" })}
            </h2>
            <p className="mt-6 text-lg/8 text-gray-600 dark:text-slate-300">
              {intl.formatMessage({ id: "about.partnerNetwork.description" })}
            </p>
          </div>          
          <div className="mx-auto grid w-full max-w-xl grid-cols-2 items-center gap-y-12 sm:gap-y-14 lg:mx-0 lg:max-w-none lg:pl-8" role="list">
            {partners.map((partner) => (
              <div key={partner.id} className="flex justify-center lg:justify-start" role="listitem">
                <Image
                  alt={partner.alt}
                  src={partner.src}
                  width={200}
                  height={100}
                  className="max-h-12 w-full object-contain object-left"
                  loading="lazy"
                  sizes="(max-width: 768px) 50vw, 200px"
                  title={partner.name}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
