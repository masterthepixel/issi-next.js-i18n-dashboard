import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import { FormattedMessage } from "react-intl";

import {
  Expandable,
  ExpandableCard,
  ExpandableContent,
  ExpandableTrigger,
  useExpandable,
} from "@/components/ui/expandable";

const people = [
  { id: 1, imageUrl: "/images/1.jpg" },
  { id: 2, imageUrl: "/images/2.jpg" },
  { id: 3, imageUrl: "/images/3.jpg" },
  { id: 4, imageUrl: "/images/4.jpg" },
  { id: 5, imageUrl: "/images/5.jpg" },
  { id: 7, imageUrl: "/images/7.jpg" },
];

const ExpandIcon = () => {
  const { isExpanded } = useExpandable();

  return isExpanded ? (
    <ChevronUp className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
  ) : (
    <ChevronDown className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
  );
};

export default function TeamGrid() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-2 lg:px-4">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-pretty text-foreground sm:text-5xl">
            <FormattedMessage id="team.section.title" />
          </h2>
          <p className="mt-6 text-lg/8 text-muted-foreground">
            <FormattedMessage id="team.section.subtitle" />
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-min">
          {people.map((person) => {
            const nameId = `team.member.${person.id}.name`;
            const roleId = `team.member.${person.id}.role`;
            const bioId = `team.member.${person.id}.bio`;
            return (
              <div key={person.id} className="w-full">
                <Expandable
                  transitionDuration={0.4}
                  expandDirection="vertical"
                >
                  <ExpandableCard
                    className="w-full bg-card border border-border shadow-sm hover:shadow-md transition-all duration-200 overflow-visible"
                    collapsedSize={{ width: undefined, height: 140 }}
                    expandedSize={{ width: undefined, height: undefined }}
                  >
                    {/* Collapsed view - Avatar, Name, Position, and Expand Icon */}
                    <ExpandableTrigger>
                      <div className="flex flex-row items-center gap-4 p-4 group">
                        <Image
                          alt={nameId}
                          src={person.imageUrl as string}
                          width={64}
                          height={64}
                          className="size-16 rounded-full object-cover shadow-md ring-2 ring-border border-2 border-background flex-shrink-0"
                          loading="lazy"
                        />
                        <div className="flex flex-col justify-center flex-grow min-w-0">
                          <h3 className="text-foreground truncate group-hover:text-foreground/80 transition-colors">
                            <FormattedMessage id={nameId} />
                          </h3>
                          <p className="">
                            <FormattedMessage id={roleId} />
                          </p>
                        </div>
                        <div className="flex-shrink-0 ml-2">
                          {/* Dynamic expand/collapse icon */}
                          <div className="transform transition-transform duration-200">
                            <ExpandIcon />
                          </div>
                        </div>
                      </div>
                    </ExpandableTrigger>

                    {/* Expanded content - Bio */}
                    <ExpandableContent preset="slide-up">
                      <div className="px-4 pb-4">
                        <div className="pt-2 border-t border-border">
                          <p className="">
                            <FormattedMessage id={bioId} />
                          </p>
                        </div>
                      </div>
                    </ExpandableContent>
                  </ExpandableCard>
                </Expandable>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
