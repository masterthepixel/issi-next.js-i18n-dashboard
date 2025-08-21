"use client";

import ErrorBoundary from "@/components/ErrorBoundary";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { FormattedMessage, useIntl } from "react-intl";

const complianceData = [
  {
    category: "Certifications",
    title: "compliance.carousel.iso9001.title",
    src: "/images/compliance/iso-9001.jpg",
    headline: "compliance.carousel.iso9001.headline",
    body: "compliance.carousel.iso9001.body",
    imgAlt: "ISO 9001:2015 Certificate",
  },
  {
    category: "Certifications",
    title: "compliance.carousel.iso27001.title",
    src: "/images/compliance/iso-27001.jpg",
    headline: "compliance.carousel.iso27001.headline",
    body: "compliance.carousel.iso27001.body",
    imgAlt: "ISO 27001:2013 Certificate",
  },
  {
    category: "Certifications",
    title: "compliance.carousel.mdot.title",
    src: "/images/compliance/mdot.jpg",
    headline: "compliance.carousel.mdot.headline",
    body: "compliance.carousel.mdot.body",
    imgAlt: "Maryland Department of Transportation MBE/DBE/SBE Certificate",
  },
  {
    category: "Certifications",
    title: "compliance.carousel.cmmi3.title",
    src: "/images/compliance/cmmi3.jpg",
    headline: "compliance.carousel.cmmi3.headline",
    body: "compliance.carousel.cmmi3.body",
    imgAlt: "CMMI Level 3 Certificate",
  },
];

const ComplianceCarousel = () => {
  const intl = useIntl();
  return (
    <div className="w-full max-w-7xl mx-auto py-12 px-4 md:py-16 md:px-8">
      <h1 className="text-5xl font-semibold tracking-tight text-balance bg-clip-text text-transparent text-center bg-gradient-to-b from-[var(--h1-gradient-from)] to-[var(--h1-gradient-to)] mb-6">
        <FormattedMessage id="compliance.carousel.heading" defaultMessage="Our Compliance & Certifications" />
      </h1>
      <p className="mt-8 text-lg font-medium text-pretty text-muted-foreground sm:text-xl/8 text-center">
        <FormattedMessage
          id="compliance.carousel.subtitle"
          defaultMessage="Certified. Secure. Trusted by industry leaders and government agencies."
        />
      </p>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full mt-12"
      >
        <CarouselContent>
          {complianceData.map((item, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <Dialog>
                <DialogTrigger asChild>
                  <button type="button" className="p-1 text-left w-full">
                    <div className="relative aspect-video overflow-hidden rounded-lg">
                      <Image
                        src={item.src}
                        alt={item.imgAlt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-sm font-medium text-muted-foreground">
                        {item.category}
                      </p>
                      <p className="text-lg font-semibold">
                        <FormattedMessage id={item.title} />
                      </p>
                    </div>
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle>
                      <FormattedMessage id={item.title} />
                    </DialogTitle>
                    <DialogDescription>
                      <FormattedMessage id={item.headline} />
                    </DialogDescription>
                  </DialogHeader>
                  <div className="py-4">
                    <div className="relative aspect-video overflow-hidden rounded-lg mb-4">
                      <Image
                        src={item.src}
                        alt={item.imgAlt}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                    <p className="text-lg">
                      <span className="font-bold">
                        <FormattedMessage id={item.headline} />
                      </span>{" "}
                      <FormattedMessage id={item.body} />
                    </p>
                  </div>
                </DialogContent>
              </Dialog>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default function ComplianceCarouselWithErrorBoundary() {
  return (
    <ErrorBoundary>
      <ComplianceCarousel />
    </ErrorBoundary>
  );
}
