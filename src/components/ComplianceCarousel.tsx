"use client";

import { Card, Carousel } from "@/components/ui/apple-cards-carousel";
import { FormattedMessage } from "react-intl";

// Placeholder compliance carousel data
const complianceData = [
  {
    category: "Certifications",
    title: "compliance.carousel.iso9001.title",
    src: "/images/compliance/iso-9001.jpg",
    headline: "compliance.carousel.iso9001.headline",
    body: "compliance.carousel.iso9001.body",
    imgAlt: "ISO 9001:2015 Certificate",
    content: (
      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700 dark:text-neutral-200">
            <FormattedMessage
              id="compliance.carousel.iso9001.headline"
              defaultMessage="Internationally recognized for quality management systems."
            />
          </span>{" "}
          <FormattedMessage
            id="compliance.carousel.iso9001.body"
            defaultMessage="Our ISO 9001:2015 certification demonstrates our commitment to delivering consistent, high-quality solutions that meet regulatory and customer requirements."
          />
        </p>
        <img
          src="/images/compliance/iso-9001.jpg"
          alt="ISO 9001:2015 Certificate"
          height="300"
          width="300"
          className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
        />
      </div>
    ),
  },
  {
    category: "Certifications",
    title: "compliance.carousel.iso27001.title",
    src: "/images/compliance/iso-27001.jpg",
    headline: "compliance.carousel.iso27001.headline",
    body: "compliance.carousel.iso27001.body",
    imgAlt: "ISO 27001:2013 Certificate",
    content: (
      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700 dark:text-neutral-200">
            <FormattedMessage
              id="compliance.carousel.iso27001.headline"
              defaultMessage="Information Security Management."
            />
          </span>{" "}
          <FormattedMessage
            id="compliance.carousel.iso27001.body"
            defaultMessage="Our ISO 27001:2013 certification demonstrates our commitment to the highest standards of information security and risk management."
          />
        </p>
        <img
          src="/images/compliance/iso-27001.jpg"
          alt="ISO 27001:2013 Certificate"
          height="300"
          width="300"
          className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
        />
      </div>
    ),
  },
  {
    category: "Certifications",
    title: "compliance.carousel.mdot.title",
    src: "/images/compliance/mdot.jpg",
    headline: "compliance.carousel.mdot.headline",
    body: "compliance.carousel.mdot.body",
    imgAlt: "Maryland Department of Transportation MBE/DBE/SBE Certificate",
    content: (
      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700 dark:text-neutral-200">
            <FormattedMessage
              id="compliance.carousel.mdot.headline"
              defaultMessage="State of Maryland MBE/DBE/SBE Certification."
            />
          </span>{" "}
          <FormattedMessage
            id="compliance.carousel.mdot.body"
            defaultMessage="Certified by the Maryland Department of Transportation as a Minority Business Enterprise (MBE), Disadvantaged Business Enterprise (DBE), and Small Business Enterprise (SBE)."
          />
        </p>
        <img
          src="/images/compliance/mdot.jpg"
          alt="Maryland Department of Transportation MBE/DBE/SBE Certificate"
          height="300"
          width="300"
          className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
        />
      </div>
    ),
  },
  {
    category: "Certifications",
    title: "compliance.carousel.cmmi3.title",
    src: "/images/compliance/cmmi3.jpg",
    headline: "compliance.carousel.cmmi3.headline",
    body: "compliance.carousel.cmmi3.body",
    imgAlt: "CMMI Level 3 Certificate",
    content: (
      <div className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4">
        <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
          <span className="font-bold text-neutral-700 dark:text-neutral-200">
            <FormattedMessage
              id="compliance.carousel.cmmi3.headline"
              defaultMessage="Capability Maturity Model Integration (CMMI) Level 3."
            />
          </span>{" "}
          <FormattedMessage
            id="compliance.carousel.cmmi3.body"
            defaultMessage="Demonstrates our organization’s defined processes and continuous improvement in project delivery and quality management."
          />
        </p>
        <img
          src="/images/compliance/cmmi3.jpg"
          alt="CMMI Level 3 Certificate"
          height="300"
          width="300"
          className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
        />
      </div>
    ),
  },
];

export default function ComplianceCarousel() {
  const cards = complianceData.map((card, index) => <Card key={card.src} card={card} index={index} />);

  return (
    <div className="w-full max-w-7xl mx-auto py-12 px-4 md:py-16 md:px-8 overflow-hidden">
      <h1 className="text-5xl font-semibold tracking-tight text-balance bg-clip-text text-transparent text-center bg-gradient-to-b from-[var(--h1-gradient-from)] to-[var(--h1-gradient-to)] mb-6">
        <FormattedMessage id="compliance.carousel.heading" defaultMessage="Our Compliance & Certifications" />
      </h1>
      <p className="mt-8 text-lg font-medium text-pretty text-slate-500 dark:text-slate-400 sm:text-xl/8 text-center">
        <FormattedMessage
          id="compliance.carousel.subtitle"
          defaultMessage="Certified. Secure. Trusted by industry leaders and government agencies."
        />
      </p>
      <Carousel items={cards} autoplay loop />
    </div>
  );
}
