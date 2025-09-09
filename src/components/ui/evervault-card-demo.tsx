import React from "react";
import { EvervaultCard, Icon } from "@/components/ui/evervault-card";

export default function EvervaultCardDemo() {
  return (
    <div className="border border-black/[0.2] dark:border-white/[0.2] flex flex-col items-start max-w-sm mx-auto p-4 relative h-[30rem]">
      <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

      <EvervaultCard text="hover" />

      <h2 className="dark: mt-4">
        Hover over this card to reveal an awesome effect. Running out of copy
        here.
      </h2>
      <p className="">
        Watch me hover
      </p>
    </div>
  );
}

