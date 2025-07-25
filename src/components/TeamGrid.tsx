import Image from "next/image";
import { FormattedMessage } from "react-intl";
import Masonry from "react-masonry-css";

import "@/app/masonry.css";

const people = [
  { id: 1, imageUrl: "/images/1.jpg" },
  { id: 2, imageUrl: "/images/2.jpg" },
  { id: 3, imageUrl: "/images/3.jpg" },
  { id: 4, imageUrl: "/images/4.jpg" },
  { id: 5, imageUrl: "/images/5.jpg" },
  { id: 7, imageUrl: "/images/7.jpg" },
  { id: 8, imageUrl: "/images/8.jpg" },
];

export default function TeamGrid() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-2 lg:px-4">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-4xl font-semibold tracking-tight text-pretty text-slate-900 dark:text-white sm:text-5xl">
            <FormattedMessage id="team.section.title" />
          </h2>
          <p className="mt-6 text-lg/8 text-slate-700 dark:text-slate-50">
            <FormattedMessage id="team.section.subtitle" />
          </p>
        </div>
        <Masonry
          breakpointCols={{ default: 2, 1024: 2, 640: 1 }}
          className="flex w-auto -ml-4"
          columnClassName="masonry-column"
        >
          {people.map((person) => {
            const nameId = `team.member.${person.id}.name`;
            const roleId = `team.member.${person.id}.role`;
            const bioId = `team.member.${person.id}.bio`;
            return (
              <div key={person.id} className="mb-0">
                <div className="mt-4 glass-card text-left flex flex-col gap-4 w-full max-w-xl mx-auto rounded-2xl border-slate-400/50 p-6">
                  <div className="flex flex-row items-start gap-6 w-full mt-2">
                    <Image
                      alt={nameId}
                      src={person.imageUrl as string}
                      width={96}
                      height={96}
                      className="size-20 rounded-full object-cover shadow-md ring-4 ring-slate-700/50 dark:ring-slate-100/50 border-white"
                      loading="lazy"
                    />
                    <div className="flex flex-col justify-center">
                      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mt-2">
                        <FormattedMessage id={nameId} />
                      </h3>
                      <p className="text-xs font-550 dark:text-yellow-300 text-slate-600 -mt-1.5">
                        <FormattedMessage id={roleId} />
                      </p>
                    </div>
                  </div>
                  <div className="w-full mt-2">
                    <FormattedMessage id={bioId} />
                  </div>
                </div>
              </div>
            );
          })}
        </Masonry>
      </div>
    </section>
  );
}
