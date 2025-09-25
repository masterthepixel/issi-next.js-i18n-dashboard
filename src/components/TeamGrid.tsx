import { motion } from "motion/react";
import Image from "next/image";
import { useState } from "react";
import { FormattedMessage } from "react-intl";

import {
  MorphingDialog,
  MorphingDialogClose,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogDescription,
  MorphingDialogSubtitle,
  MorphingDialogTitle,
  MorphingDialogTrigger
} from "@/components/motion-primitives/morphing-dialog";

// Fallback image component with error handling
function TeamMemberImage({ src, alt, className, priority = false }: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (hasError) {
    // Fallback to a placeholder or default avatar
    return (
      <div className={`w-full h-full ${className} bg-muted flex items-center justify-center`}>
        <div className="text-muted-foreground text-4xl font-semibold">
          {alt.charAt(0).toUpperCase()}
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div className={`absolute inset-0 ${className} bg-muted animate-pulse`} />
      )}
      <Image
        src={src}
        alt={alt}
        fill
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onError={() => setHasError(true)}
        onLoad={() => setIsLoading(false)}
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
}

const people = [
  { id: 1, imageUrl: "/images/1.webp" },
  { id: 2, imageUrl: "/images/2.webp" },
  { id: 3, imageUrl: "/images/3.webp" },
  { id: 4, imageUrl: "/images/4.webp" },
  { id: 5, imageUrl: "/images/5.webp" },
  { id: 6, imageUrl: "/images/6.webp" },
  { id: 7, imageUrl: "/images/7.webp" },
];

export default function TeamGrid() {
  return (
    <motion.section
      className="py-24 sm:py-32"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-2xl lg:mx-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="text-pretty text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            <FormattedMessage id="team.section.title" />
          </h2>
          <p className="mt-6 text-lg/8 text-muted-foreground">
            <FormattedMessage id="team.section.subtitle" />
          </p>
        </motion.div>

        <motion.ul
          role="list"
          className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 xl:grid-cols-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {people.map((person) => {
            const nameId = `team.member.${person.id}.name`;
            const roleId = `team.member.${person.id}.role`;
            const bioId = `team.member.${person.id}.bio`;

            return (
              <MorphingDialog
                key={person.id}
                transition={{
                  type: 'spring',
                  bounce: 0.05,
                  duration: 0.25,
                }}
              >
                <MorphingDialogTrigger>
                  <li className="cursor-pointer">
                    <div className="aspect-[14/13] w-full rounded-2xl overflow-hidden outline outline-1 -outline-offset-1 outline-border">
                      <TeamMemberImage
                        src={person.imageUrl}
                        alt={`Photo of team member ${person.id}`}
                        className="object-cover"
                        priority={person.id <= 2} // Prioritize first 2 images for LCP
                      />
                    </div>
                    <MorphingDialogTitle className="mt-6 text-lg/8 font-serif font-normal tracking-tight text-foreground text-[1.4em] text-left">
                      <FormattedMessage id={nameId} />
                    </MorphingDialogTitle>
                    <MorphingDialogSubtitle className="text-base/7 text-muted-foreground text-left">
                      <FormattedMessage id={roleId} />
                    </MorphingDialogSubtitle>
                  </li>
                </MorphingDialogTrigger>
                <MorphingDialogContainer>
                  <MorphingDialogContent
                    style={{
                      borderRadius: '24px',
                    }}
                    className='pointer-events-auto relative flex h-auto w-full flex-col overflow-hidden border border-border bg-background sm:w-[500px]'
                  >
                    <div className='aspect-[4/3] w-full relative'>
                      <TeamMemberImage
                        src={person.imageUrl}
                        alt={`Photo of team member ${person.id}`}
                        className="object-cover"
                      />
                    </div>
                    <div className='p-6'>
                      <MorphingDialogTitle className="text-2xl font-serif font-normal tracking-tight text-foreground text-[2.5rem]">
                        <FormattedMessage id={nameId} />
                      </MorphingDialogTitle>
                      <MorphingDialogSubtitle className='text-xl text-muted-foreground'>
                        <FormattedMessage id={roleId} />
                      </MorphingDialogSubtitle>
                      <MorphingDialogDescription
                        disableLayoutAnimation
                        variants={{
                          initial: { opacity: 0, scale: 0.8, y: 100 },
                          animate: { opacity: 1, scale: 1, y: 0 },
                          exit: { opacity: 0, scale: 0.8, y: 100 },
                        }}
                      >
                        <p className='mt-4 text-muted-foreground'>
                          <FormattedMessage id={bioId} />
                        </p>
                      </MorphingDialogDescription>
                    </div>
                    <MorphingDialogClose />
                  </MorphingDialogContent>
                </MorphingDialogContainer>
              </MorphingDialog>
            );
          })}
        </motion.ul>
      </div>
    </motion.section>
  );
}
