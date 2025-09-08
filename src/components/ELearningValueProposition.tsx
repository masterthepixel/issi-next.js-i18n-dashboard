"use client";

import { FormattedMessage } from "react-intl";

const valueCards = [
  {
    icon: "🎓",
    titleKey: "elearning.value.ecosystem.title",
    descriptionKey: "elearning.value.ecosystem.description",
  },
  {
    icon: "🛡️",
    titleKey: "elearning.value.security.title",
    descriptionKey: "elearning.value.security.description",
  },
  {
    icon: "🚀",
    titleKey: "elearning.value.track.title",
    descriptionKey: "elearning.value.track.description",
  },
];

const stats = [
  {
    numberKey: "elearning.stats.implementations.number",
    labelKey: "elearning.stats.implementations.label",
  },
  { numberKey: "elearning.stats.courses.number", labelKey: "elearning.stats.courses.label" },
  { numberKey: "elearning.stats.users.number", labelKey: "elearning.stats.users.label" },
];

export default function ELearningValueProposition() {
  return (
    <section className="py-24 sm:py-32 ">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">        <h1 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-[var(--h1-gradient-from)] to-[var(--h1-gradient-to)]">
          <FormattedMessage id="elearning.value.title" />
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-center  " text-lead1232>
          <FormattedMessage id="elearning.value.subtitle" />
        </p>

        {/* Value Cards */}
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {valueCards.map((card, index) => (
            <div
              key={index}
              className=" p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-center glass-card"
            >
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground text-3xl mb-6">
                {card.icon}
              </div>
              <h3 className="text-foreground mb-4">
                <FormattedMessage id={card.titleKey} />
              </h3>
              <p className="text-muted-foreground">
                <FormattedMessage id={card.descriptionKey} />
              </p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mx-auto mt-16 flex flex-wrap justify-center gap-12 sm:gap-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-muted-foreground sm:text-5xl">
                <FormattedMessage id={stat.numberKey} />
              </div>
              <div className="mt-2  " text-caption2681>
                <FormattedMessage id={stat.labelKey} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
