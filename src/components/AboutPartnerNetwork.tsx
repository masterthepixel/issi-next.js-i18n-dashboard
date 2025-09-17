"use client";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useEffect, useState } from "react";
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
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setTimeout(() => {
      if (api.selectedScrollSnap() + 1 === api.scrollSnapList().length) {
        setCurrent(0);
        api.scrollTo(0);
      } else {
        api.scrollNext();
        setCurrent(current + 1);
      }
    }, 3000); // Slower transition for better UX
  }, [api, current]);

  return (
    <section
      className="py-8 sm:py-10"
      aria-labelledby="partners-heading"
      role="region"
      aria-label="Strategic technology partnerships"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col gap-3">
          <div className="mx-auto w-full max-w-xl lg:mx-0">
            <h2 id="partners-heading" className="text-xl md:text-3xl lg:text-5xl tracking-tighter lg:max-w-xl font-normal text-left text-foreground">
              {intl.formatMessage({ id: "about.partnerNetwork.title" })}
            </h2>
            <p className="mt-6 text-lg/8 text-muted-foreground">
              {intl.formatMessage({ id: "about.partnerNetwork.description" })}
            </p>
          </div>
          <Carousel setApi={setApi} className="w-full">
            <CarouselContent>
              {partners.map((partner) => (
                <CarouselItem className="basis-1/2 lg:basis-1/4" key={partner.id}>
                  <div className="flex rounded-md aspect-square bg-card items-center justify-center p-3">
                    <Image
                      alt={partner.alt}
                      src={partner.src}
                      width={200}
                      height={100}
                      className="max-h-16 w-full object-contain"
                      loading="lazy"
                      sizes="(max-width: 768px) 50vw, 200px"
                      title={partner.name}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
