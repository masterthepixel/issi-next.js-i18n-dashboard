"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";
import { GovernmentClientsSkeleton } from "./ui/skeleton-components";
import { SkeletonWrapper } from "./ui/skeleton-wrapper";

// Updated to include icons - transformed for InfiniteMovingCards format
const clients = [
  {
    quote: "Professional IT Services",
    name: "Savannah River Nuclear Solutions",
    title: "Nuclear Solutions Contract",
  },
  {
    quote: "Comprehensive IT Support",
    name: "Professional Services Contract",
    title: "Government Services",
  },
  {
    quote: "Digital Library Solutions",
    name: "Library of Congress",
    title: "Federal Library Services",
  },
  {
    quote: "IT Systems & Support",
    name: "Leidos ITSSC II Contract",
    title: "Defense Contractor",
  },
  {
    quote: "Regulatory Compliance Systems",
    name: "Food and Drug APES Contract",
    title: "FDA Partnership",
  },
  {
    quote: "County IT Solutions",
    name: "Anne Arundel County BPA Contract",
    title: "Local Government",
  },
  {
    quote: "System Modernization",
    name: "EPTS Modernization",
    title: "Legacy System Upgrade",
  },
  {
    quote: "Learning Management Systems",
    name: "National LMS BPA",
    title: "Educational Technology",
  },
  {
    quote: "Correspondence Tracking",
    name: "ECTS Implementation",
    title: "Document Management",
  },
  {
    quote: "Defense Education Support",
    name: "DoDEA Contract",
    title: "Military Education",
  },
  {
    quote: "IT Infrastructure Support",
    name: "Leidos ITSSC Subcontract",
    title: "Defense Systems",
  },
  {
    quote: "Energy Sector IT",
    name: "NRECA Contract",
    title: "Rural Electric Co-op",
  },
  {
    quote: "Healthcare IT Systems",
    name: "CMS Contract",
    title: "Medicare Services",
  },
  {
    quote: "Business Technology Solutions",
    name: "IBTS Contract",
    title: "IT Business Systems",
  },
  {
    quote: "Environmental IT Systems",
    name: "U.S. EPAAS Contract",
    title: "Environmental Protection",
  },
  {
    quote: "Healthcare Systems Support",
    name: "SC Inc. Subcontract for CMS",
    title: "Medicare Technology",
  },
  {
    quote: "Educational IT Support",
    name: "SC Inc. Subcontract for DoDEA",
    title: "Defense Education",
  },
  {
    quote: "Library Management Systems",
    name: "Library of Congress LMS Contract",
    title: "Federal Library Tech",
  },
  {
    quote: "Learning Platform Maintenance",
    name: "LMS and Maintenance Contract",
    title: "Educational Support",
  },
  {
    quote: "Defense Command Systems",
    name: "NORAD/NORTHCOM",
    title: "Aerospace Defense",
  },
  {
    quote: "National Security IT",
    name: "National Security Agency",
    title: "Cybersecurity Solutions",
  },
  {
    quote: "Defense Subcontracting",
    name: "S4 Inc. Subcontract for NORAD",
    title: "Aerospace Defense Support",
  },
  {
    quote: "Military IT Support",
    name: "USNORTHCOM (N2ITSM) Contract",
    title: "Defense Communications",
  },
  {
    quote: "Probation Management Systems",
    name: "Tarrant County Probation Office",
    title: "Criminal Justice IT",
  },
  {
    quote: "Academic IT Solutions",
    name: "University of Maryland Baltimore",
    title: "Higher Education",
  },
  {
    quote: "Regulatory IT Systems",
    name: "Food and Drug Administration",
    title: "Federal Regulatory",
  },
  {
    quote: "Military Systems Support",
    name: "U.S. Army Sam/Calm Division",
    title: "Defense Technology",
  },
  {
    quote: "Veterans Services IT",
    name: "U.S. Dept. of Veterans Affairs",
    title: "Veteran Support Systems",
  },
  {
    quote: "IT Network Solutions",
    name: "ITS NEDC",
    title: "Network Infrastructure",
  },
  {
    quote: "Agricultural IT Systems",
    name: "USDA ITS/ARS PWA PBRAU",
    title: "Agriculture Technology",
  },
  {
    quote: "Naval Aviation IT",
    name: "Naval Air Warfare Center",
    title: "Defense Aviation",
  },
  {
    quote: "Maintenance Support Systems",
    name: "CNCS and Maintenance Contract",
    title: "Technical Maintenance",
  },
  {
    quote: "Agricultural IT Center",
    name: "USDA - National IT Center",
    title: "Federal Agriculture",
  },
  {
    quote: "Army Learning Systems",
    name: "USAAC LMS Contract",
    title: "Military Education",
  },
  {
    quote: "Government Publishing IT",
    name: "U.S. Government Publishing Office",
    title: "Federal Publishing",
  },
  {
    quote: "Municipal IT Services",
    name: "City of Goodyear Contract",
    title: "Local Government",
  },
  {
    quote: "Communications IT",
    name: "Federal Communications Commission",
    title: "Telecommunications",
  },
  {
    quote: "Security Agency IT",
    name: "National Security Agency Contract",
    title: "National Security",
  },
  {
    quote: "Learning Platform Services",
    name: "Library of Congress Percipio",
    title: "Federal Learning",
  },
  {
    quote: "State Revenue Systems",
    name: "Florida Department of Revenue",
    title: "State Government",
  },
  {
    quote: "Managed IT Services",
    name: "Fairstead IT Managed Services",
    title: "Private Sector IT",
  },
  {
    quote: "Army IT Enterprise",
    name: "U.S. Army ITES-2S",
    title: "Defense IT Services",
  },
];

// Split clients into 5 rows
function splitIntoRows(items: typeof clients, rowCount: number) {
  const result: typeof clients[] = [];
  const itemsPerRow = Math.ceil(items.length / rowCount);

  for (let i = 0; i < rowCount; i++) {
    const startIdx = i * itemsPerRow;
    const endIdx = Math.min(startIdx + itemsPerRow, items.length);
    result.push(items.slice(startIdx, endIdx));
  }

  return result;
}

export default function GovernmentClients() {
  const [isLoading, setIsLoading] = useState(true);
  const clientRows = splitIntoRows(clients, 3);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 1 second loading time

    return () => clearTimeout(timer);
  }, []);

  return (
    <SkeletonWrapper
      isLoading={isLoading}
      skeleton={<GovernmentClientsSkeleton />}
      loadingDelay={100}
    >
      <motion.section
        className="py-16 sm:py-24"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="mx-auto max-w-7xl px-4">
          <div className="text-left mb-8">
            <motion.h2
              className="text-foreground sm:text-6xl font-serif font-[400] text-4xl tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <FormattedMessage
                id="government.clients.title"
                defaultMessage="Our Government Clients & Partners"
              />
            </motion.h2>
            <motion.p
              className="mt-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <FormattedMessage
                id="government.clients.subtitle"
                defaultMessage="Trusted by federal, state, and local government agencies for mission-critical technology solutions."
              />
            </motion.p>
          </div>

          <motion.div
            className="mx-auto mt-8 max-w-7xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="space-y-2 py-2">
              <InfiniteMovingCards
                items={clientRows[0]}
                direction="right"
                speed="fast"
                pauseOnHover={true}
                className="patriotic-cards-blue"
              />

              <InfiniteMovingCards
                items={clientRows[1]}
                direction="left"
                speed="fast"
                pauseOnHover={true}
                className="patriotic-cards-white"
              />

              <InfiniteMovingCards
                items={clientRows[2]}
                direction="right"
                speed="fast"
                pauseOnHover={true}
                className="patriotic-cards-red"
              />
            </div>
          </motion.div>
        </div>
      </motion.section>
    </SkeletonWrapper>
  );
}
