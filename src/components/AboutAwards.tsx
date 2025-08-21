'use client';

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { FormattedMessage } from "react-intl";

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
      className="relative isolate overflow-hidden bg-background py-24 sm:py-32"
      aria-labelledby="awards-heading"
      role="region"
      aria-label="Industry awards and recognition"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">        
        <div className="text-center">
          <h2 id="awards-heading" className="text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl">
            <FormattedMessage id="about.awards.title" defaultMessage="Our Awards" />
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg/8 text-muted-foreground">
            <FormattedMessage 
              id="about.awards.description" 
              defaultMessage="ISSI has received a number of awards from trade and government agencies. We adopt new technologies and methods so that we can continue to grow and earn trust and recognition of our clients" 
            />
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-6 sm:max-w-xl sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3" role="list">
          {awards.map((award) => (
            <Card key={award.id} className="group hover:shadow-lg transition-all duration-300" role="listitem">
              <CardContent className="flex items-center justify-center p-8">
                <Image
                  alt={award.alt}
                  src={award.imageUrl}
                  width={158}
                  height={48}
                  className="max-h-12 w-full object-contain transition-transform duration-300 group-hover:scale-105 dark:brightness-0 dark:invert"
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  title={award.name}
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
