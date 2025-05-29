"use client";

import { useIntl } from "react-intl";
import Image from "next/image";

export default function AboutPartnerNetwork() {
  const intl = useIntl();

  return (
    <div className="bg-white dark:bg-slate-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-x-8 gap-y-16 lg:grid-cols-2">          <div className="mx-auto w-full max-w-xl lg:mx-0">
            <h2 className="text-4xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white sm:text-5xl">
              {intl.formatMessage({ id: "about.partnerNetwork.title" })}
            </h2>
            <p className="mt-6 text-lg/8 text-gray-600 dark:text-slate-300">
              {intl.formatMessage({ id: "about.partnerNetwork.description" })}
            </p>
          </div>          <div className="mx-auto grid w-full max-w-xl grid-cols-2 items-center gap-y-12 sm:gap-y-14 lg:mx-0 lg:max-w-none lg:pl-8">
            <Image
              alt="Partner Network 1"
              src="/images/partnernetwork/pn1.jpg"
              width={200}
              height={100}
              className="max-h-12 w-full object-contain object-left"
            />
            <Image
              alt="Partner Network 2"
              src="/images/partnernetwork/pn2.jpg"
              width={200}
              height={100}
              className="max-h-12 w-full object-contain object-left"
            />
            <Image
              alt="Partner Network 3"
              src="/images/partnernetwork/pn3_1.jpg"
              width={200}
              height={100}
              className="max-h-12 w-full object-contain object-left"
            />
            <Image
              alt="Partner Network 4"
              src="/images/partnernetwork/pn4_1.jpg"
              width={200}
              height={100}
              className="max-h-12 w-full object-contain object-left"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
