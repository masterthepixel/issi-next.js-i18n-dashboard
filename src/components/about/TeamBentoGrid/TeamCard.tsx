import { motion, useReducedMotion } from "motion/react";
import { FormattedMessage } from "react-intl";

import {
    SimpleDialog,
    SimpleDialogClose,
    SimpleDialogContent,
    SimpleDialogTrigger,
} from "@/components/SimpleDialog";
import { TeamMemberImage } from "./TeamMemberImage";
import { cardVariants, smallCardHoverEffects } from "./animations";

interface TeamCardProps {
    id: number;
    imageUrl: string;
    size: "small" | "medium";
    priority?: boolean;
    gridClass?: string;
}

/**
 * Standard team member card with size variants
 * Small: Compact vertical layout
 * Medium: More spacious with bio preview
 */
export function TeamCard({ id, imageUrl, size, priority = false, gridClass = "" }: TeamCardProps) {
    const shouldReduceMotion = useReducedMotion();

    const nameId = `team.member.${id}.name`;
    const roleId = `team.member.${id}.role`;
    const bioId = `team.member.${id}.bio`;

    return (
        <SimpleDialog>
            <SimpleDialogTrigger className={gridClass}>
                <motion.div
                    className="group overflow-hidden rounded-2xl border border-border bg-card cursor-pointer text-left w-full h-full flex flex-col"
                    variants={cardVariants}
                    whileHover={shouldReduceMotion ? {} : smallCardHoverEffects}
                    style={{ contain: "layout style paint" }}
                >
                    {/* Content - Text First */}
                    <div className={size === "small" ? "p-4 pb-3" : "p-5 pb-4"}>
                        <h3 className="font-serif font-normal tracking-tight text-foreground text-3xl">
                            <FormattedMessage id={nameId} />
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground font-light">
                            <FormattedMessage id={roleId} />
                        </p>
                    </div>

                    {/* Image Container - Contained within card */}
                    <div className="relative w-full px-4 pb-4">
                        <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
                            <TeamMemberImage
                                src={imageUrl}
                                alt={`Team member ${id}`}
                                className="object-cover rounded-lg"
                                priority={priority}
                            />
                        </div>
                    </div>
                </motion.div>
            </SimpleDialogTrigger>

            {/* Modal Content */}
            <SimpleDialogContent className="p-0">
                <div className="aspect-[4/3] w-full relative">
                    <TeamMemberImage
                        src={imageUrl}
                        alt={`Team member ${id}`}
                        className="object-cover"
                    />
                </div>
                <div className="p-6">
                    <h2 className="text-2xl font-serif font-normal tracking-tight text-foreground">
                        <FormattedMessage id={nameId} />
                    </h2>
                    <p className="text-xl text-muted-foreground mt-1">
                        <FormattedMessage id={roleId} />
                    </p>
                    <p className="mt-4 text-muted-foreground">
                        <FormattedMessage id={bioId} />
                    </p>
                </div>
                <SimpleDialogClose />
            </SimpleDialogContent>
        </SimpleDialog>
    );
}
