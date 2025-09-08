"use client";

import {
  AcademicCapIcon,
  BeakerIcon,
  BookOpenIcon,
  BuildingLibraryIcon,
  BuildingOfficeIcon,
  CommandLineIcon,
  DocumentTextIcon,
  GlobeAmericasIcon,
  ScaleIcon,
  ServerIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  WrenchScrewdriverIcon
} from "@heroicons/react/24/outline";
import { FormattedMessage } from "react-intl";
import { InfiniteMovingBadges } from "./ui/infinite-moving-badges";

// Updated to include icons
const clients = [
  { name: "Savannah River Nuclear Solutions", icon: BeakerIcon },
  { name: "Professional Services Contract", icon: BuildingOfficeIcon },
  { name: "Library of Congress", icon: BookOpenIcon },
  { name: "Leidos ITSSC II Contract", icon: ServerIcon },
  { name: "Food and Drug APES Contract", icon: BeakerIcon },
  { name: "Anne Arundel County BPA Contract", icon: BuildingOfficeIcon },
  { name: "EPTS Modernization", icon: CommandLineIcon },
  { name: "National LMS BPA", icon: AcademicCapIcon },
  { name: "ECTS Implementation", icon: CommandLineIcon },
  { name: "DoDEA Contract", icon: ShieldCheckIcon },
  { name: "Leidos ITSSC Subcontract", icon: ServerIcon },
  { name: "NRECA Contract", icon: BuildingOfficeIcon },
  { name: "CMS Contract", icon: BuildingOfficeIcon },
  { name: "IBTS Contract", icon: BuildingOfficeIcon },
  { name: "U.S. EPAAS Contract", icon: GlobeAmericasIcon },
  { name: "SC Inc. Subcontract for CMS", icon: BuildingOfficeIcon },
  { name: "SC Inc. Subcontract for DoDEA", icon: AcademicCapIcon },
  { name: "Library of Congress LMS Contract", icon: BookOpenIcon },
  { name: "LMS and Maintenance Contract", icon: AcademicCapIcon },
  { name: "NORAD/NORTHCOM", icon: ShieldCheckIcon },
  { name: "National Security Agency", icon: ShieldCheckIcon },
  { name: "S4 Inc. Subcontract for NORAD", icon: ShieldCheckIcon },
  { name: "USNORTHCOM (N2ITSM) Contract", icon: ShieldCheckIcon },
  { name: "Tarrant County Probation Office", icon: ScaleIcon },
  { name: "University of Maryland Baltimore", icon: AcademicCapIcon },
  { name: "Food and Drug Administration", icon: BeakerIcon },
  { name: "U.S. Army Sam/Calm Division", icon: ShieldCheckIcon },
  { name: "U.S. Dept. of Veterans Affairs", icon: UserGroupIcon },
  { name: "ITS NEDC", icon: ServerIcon },
  { name: "USDA ITS/ARS PWA PBRAU", icon: GlobeAmericasIcon },
  { name: "Naval Air Warfare Center", icon: ShieldCheckIcon },
  { name: "CNCS and Maintenance Contract", icon: WrenchScrewdriverIcon },
  { name: "USDA - National IT Center", icon: GlobeAmericasIcon },
  { name: "USAAC LMS Contract", icon: AcademicCapIcon },
  { name: "U.S. Government Publishing Office", icon: DocumentTextIcon },
  { name: "City of Goodyear Contract", icon: BuildingOfficeIcon },
  { name: "Federal Communications Commission", icon: CommandLineIcon },
  { name: "National Security Agency Contract", icon: ShieldCheckIcon },
  { name: "Library of Congress Percipio", icon: BookOpenIcon },
  { name: "Florida Department of Revenue", icon: BuildingLibraryIcon },
  { name: "Fairstead IT Managed Services", icon: ServerIcon },
  { name: "U.S. Army ITES-2S", icon: ShieldCheckIcon }
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
  const clientRows = splitIntoRows(clients, 5);

  // Badge style generator for enhanced WCAG AAA contrast
  const getBadgeStyle = (index: number) => {
    // Alternating colors with high contrast for accessibility (WCAG AAA compliant)
    const colorIndex = index % 5; // Use 5 different colors for more variety

    switch (colorIndex) {
      case 0:
        return 'bg-slate-900 text-primary-foreground ring-1 ring-slate-700'; // Dark slate
      case 1:
        return 'bg-blue-800 text-primary-foreground ring-1 ring-blue-700'; // Deep blue
      case 2:
        return 'bg-purple-800 text-primary-foreground ring-1 ring-purple-700'; // Deep purple
      case 3:
        return 'bg-emerald-800 text-primary-foreground ring-1 ring-emerald-700'; // Deep emerald
      case 4:
        return 'bg-amber-800 text-primary-foreground ring-1 ring-amber-700'; // Deep amber
      default:
        return 'bg-slate-900 text-primary-foreground ring-1 ring-slate-700';
    }
  };

  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-left mb-8">
          <h2 className="text-foreground sm:text-4xl">
            <FormattedMessage id="government.clients.title" defaultMessage="Our Government Clients & Partners" />
          </h2>
          <p className="mt-4  " text-lead4997>
            <FormattedMessage id="government.clients.subtitle" defaultMessage="Trusted by federal, state, and local government agencies for mission-critical technology solutions." />
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-7xl">
          <div className="space-y-3 py-2">
            <InfiniteMovingBadges
              items={clientRows[0]}
              direction="right"
              speed="fast"
              pauseOnHover={true}
              badgeClassName={getBadgeStyle}
            />

            <InfiniteMovingBadges
              items={clientRows[1]}
              direction="left"
              speed="fast"
              pauseOnHover={true}
              badgeClassName={getBadgeStyle}
            />

            <InfiniteMovingBadges
              items={clientRows[2]}
              direction="right"
              speed="fast"
              pauseOnHover={true}
              badgeClassName={getBadgeStyle}
            />

            <InfiniteMovingBadges
              items={clientRows[3]}
              direction="left"
              speed="fast"
              pauseOnHover={true}
              badgeClassName={getBadgeStyle}
            />

            <InfiniteMovingBadges
              items={clientRows[4]}
              direction="right"
              speed="fast"
              pauseOnHover={true}
              badgeClassName={getBadgeStyle}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
