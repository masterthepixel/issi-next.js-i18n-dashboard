'use client';

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "motion/react";
import Image from "next/image";
import { FormattedMessage } from "react-intl";

const awards = [
  {
    id: 1,
    imageUrl: "/images/awards/1.png",
    alt: "ISSI award for excellence in software development and innovation in government technology solutions",
    name: "Excellence in Software Development Award",
  },
  {
    id: 2,
    imageUrl: "/images/awards/2.png",
    alt: "ISSI recognition for outstanding IT support services and customer satisfaction in federal contracts",
    name: "Outstanding IT Support Services Recognition",
  },
  {
    id: 3,
    imageUrl: "/images/awards/3.png",
    alt: "ISSI industry leadership award for innovative technology solutions and proven track record since 1995",
    name: "Industry Leadership Award",
  },
];

export default function AboutAwards() {
  return (
    <motion.section
      className="relative isolate overflow-hidden bg-background py-24 sm:py-32"
      aria-labelledby="awards-heading"
      role="region"
      aria-label="Industry awards and recognition"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-left">
          <motion.h2
            id="awards-heading"
            className="text-balance text-foreground sm:text-5xl font-serif font-[400]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <FormattedMessage
              id="about.awards.title"
              defaultMessage="Our Awards"
            />
          </motion.h2>
          <motion.p
            className="mt-6 max-w-2xl text-lg/8 text-muted-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <FormattedMessage
              id="about.awards.description"
              defaultMessage="ISSI has received a number of awards from trade and government agencies. We adopt new technologies and methods so that we can continue to grow and earn trust and recognition of our clients"
            />
          </motion.p>
        </div>
        <motion.div
          className="mx-auto mt-16 grid max-w-lg grid-cols-1 gap-6 sm:max-w-xl sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
          role="list"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {awards.map((award) => (
            <Card
              key={award.id}
              className="group hover:shadow-lg transition-all duration-300 border-0"
              role="listitem"
            >
              <CardContent className="flex items-center justify-center p-8">
                <Image
                  alt={award.alt}
                  src={award.imageUrl}
                  width={200}
                  height={48}
                  className="max-h-12 w-full object-contain transition-transform duration-300 group-hover:scale-105 dark:brightness-0 dark:invert"
                  loading="lazy"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 200px"
                  title={award.name}
                />
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
