import { motion } from "motion/react";
import { FormattedMessage } from "react-intl";

import {
  MorphingDialog,
  MorphingDialogClose,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogDescription,
  MorphingDialogImage,
  MorphingDialogSubtitle,
  MorphingDialogTitle,
  MorphingDialogTrigger,
} from "@/components/motion-primitives/morphing-dialog";

const people = [
  { id: 1, imageUrl: "/images/1.jpg" },
  { id: 2, imageUrl: "/images/2.jpg" },
  { id: 3, imageUrl: "/images/3.jpg" },
  { id: 4, imageUrl: "/images/4.jpg" },
  { id: 5, imageUrl: "/images/5.jpg" },
  { id: 7, imageUrl: "/images/7.jpg" },
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
                <MorphingDialogTrigger asChild>
                  <li className="cursor-pointer">
                    <MorphingDialogImage
                      src={person.imageUrl}
                      alt={`Photo of team member`}
                      className="aspect-[14/13] w-full rounded-2xl object-cover outline outline-1 -outline-offset-1 outline-border"
                    />
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
                    <MorphingDialogImage
                      src={person.imageUrl}
                      alt={`Photo of team member`}
                      className='h-full w-full'
                    />
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
