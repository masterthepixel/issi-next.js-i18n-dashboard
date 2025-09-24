import { PlusIcon } from "lucide-react";
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
      className="py-16 sm:py-24"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      <div className="mx-auto max-w-7xl px-2 lg:px-4">
        <motion.div
          className="mx-auto max-w-2xl lg:mx-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="text-pretty text-foreground sm:text-5xl">
            <FormattedMessage id="team.section.title" />
          </h2>
          <p className="mt-6 text-lg/8 text-muted-foreground">
            <FormattedMessage id="team.section.subtitle" />
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-min mt-12"
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
                <MorphingDialogTrigger
                  style={{
                    borderRadius: '12px',
                  }}
                  className='flex max-w-[270px] flex-col overflow-hidden border border-zinc-950/10 bg-white dark:border-zinc-50/10 dark:bg-zinc-900'
                >
                  <MorphingDialogImage
                    src={person.imageUrl}
                    alt={`Photo of ${nameId}`}
                    className='h-48 w-full object-cover'
                  />
                  <div className='flex grow flex-row items-end justify-between px-3 py-2'>
                    <div>
                      <MorphingDialogTitle className='text-zinc-950 dark:text-zinc-50'>
                        <FormattedMessage id={nameId} />
                      </MorphingDialogTitle>
                      <MorphingDialogSubtitle className='text-zinc-700 dark:text-zinc-400'>
                        <FormattedMessage id={roleId} />
                      </MorphingDialogSubtitle>
                    </div>
                    <button
                      type='button'
                      className='relative ml-1 flex h-6 w-6 shrink-0 scale-100 select-none appearance-none items-center justify-center rounded-lg border border-zinc-950/10 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 focus-visible:ring-2 active:scale-[0.98] dark:border-zinc-50/10 dark:bg-zinc-900 dark:text-zinc-500 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 dark:focus-visible:ring-zinc-500'
                      aria-label='Open dialog'
                    >
                      <PlusIcon size={12} />
                    </button>
                  </div>
                </MorphingDialogTrigger>
                <MorphingDialogContainer>
                  <MorphingDialogContent
                    style={{
                      borderRadius: '24px',
                    }}
                    className='pointer-events-auto relative flex h-auto w-full flex-col overflow-hidden border border-zinc-950/10 bg-white dark:border-zinc-50/10 dark:bg-zinc-900 sm:w-[500px]'
                  >
                    <MorphingDialogImage
                      src={person.imageUrl}
                      alt={`Photo of ${nameId}`}
                      className='h-full w-full'
                    />
                    <div className='p-6'>
                      <MorphingDialogTitle className='text-2xl text-zinc-950 dark:text-zinc-50'>
                        <FormattedMessage id={nameId} />
                      </MorphingDialogTitle>
                      <MorphingDialogSubtitle className='text-zinc-700 dark:text-zinc-400'>
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
                        <p className='mt-2 text-zinc-500 dark:text-zinc-500'>
                          <FormattedMessage id={bioId} />
                        </p>
                      </MorphingDialogDescription>
                    </div>
                    <MorphingDialogClose className='text-zinc-50' />
                  </MorphingDialogContent>
                </MorphingDialogContainer>
              </MorphingDialog>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
}
