'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { FormattedMessage } from "react-intl";

const certifications = [
  {
    name: "ISO 27001",
    src: "/images/certification/1.png",
    width: 120,
    height: 48,
    description: "ISO 27001 Information Security Management certification demonstrating ISSI's commitment to data security and privacy protection",
    category: "Security"
  },
  {
    name: "CMMI Level 3",
    src: "/images/certification/2.png",
    width: 120,
    height: 48,
    description: "CMMI Level 3 certification showcasing ISSI's mature software development processes and quality standards",
    category: "Process"
  },
  {
    name: "ISO 9001",
    src: "/images/certification/3.png",
    width: 120,
    height: 48,
    description: "ISO 9001 Quality Management System certification ensuring consistent delivery of high-quality services and solutions",
    category: "Quality"
  },
  {
    name: "MDOT MBE/DBE/SBE Certified",
    src: "/images/certification/4.jpg",
    width: 120,
    height: 48,
    description: "Maryland Department of Transportation Minority/Disadvantaged/Small Business Enterprise certification",
    category: "Certification"
  },
];

export default function AboutCertifications() {
  return (
    <section 
      className="relative isolate overflow-hidden bg-background py-24 sm:py-32"
      aria-labelledby="certifications-heading"
      role="region"
      aria-label="Professional certifications and compliance standards"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-x-8 gap-y-16 lg:grid-cols-2">
          <div className="mx-auto w-full max-w-xl lg:mx-0">
            <h2 id="certifications-heading" className="text-balance text-foreground sm:text-5xl">
              <FormattedMessage id="about.certifications.title" defaultMessage="Certified Excellence" />
            </h2>
            <p className="mt-6 text-lg/8 text-muted-foreground">
              <FormattedMessage 
                id="about.certifications.description" 
                defaultMessage="ISSI maintains the highest standards of quality, security, and process excellence through our comprehensive certifications. These certifications demonstrate our commitment to delivering reliable, secure, and compliant solutions that meet the most stringent industry requirements." 
              />
            </p>
          </div>
          <div className="mx-auto grid w-full max-w-xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:pl-8">
            {certifications.map((cert, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="" text-caption3042>{cert.name}</CardTitle>
                    <Badge variant="secondary" className="text-xs">
                      {cert.category}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="flex justify-center pt-0">
                  <Image
                    alt={cert.description}
                    src={cert.src}
                    width={cert.width}
                    height={cert.height}
                    className="max-h-12 w-full object-contain transition-transform duration-300 group-hover:scale-105 dark:brightness-0 dark:invert"
                    loading="lazy"
                    sizes="(max-width: 768px) 50vw, 120px"
                    title={cert.description}
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
