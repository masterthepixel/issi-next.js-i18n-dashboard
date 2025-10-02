import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { FormattedMessage } from "react-intl";

import {
    SimpleDialog,
    SimpleDialogClose,
    SimpleDialogContent,
    SimpleDialogTrigger,
} from "@/components/SimpleDialog";
import { TeamMemberImage } from "./TeamMemberImage";
import {
    featuredCardVariants,
    featuredHoverEffects,
} from "./animations";

interface FeaturedTeamCardProps {
    id: number;
    imageUrl: string;
    priority?: boolean;
    gridClass?: string;
}

/**
 * Featured team member card - Large 2x2 layout for CEO/key leader
 * Enhanced with gradient overlay, badge, and prominent CTAs
 */
export function FeaturedTeamCard({
    id,
    imageUrl,
    priority = false,
    gridClass = "",
}: FeaturedTeamCardProps) {
    const shouldReduceMotion = useReducedMotion();

    const nameId = `team.member.${id}.name`;
    const roleId = `team.member.${id}.role`;
    const bioId = `team.member.${id}.bio`;

    return (
        <SimpleDialog>
            <SimpleDialogTrigger className={gridClass}>
                <motion.div
                    className="group overflow-hidden rounded-2xl border border-border bg-card cursor-pointer text-left w-full h-full flex flex-col"
                    variants={featuredCardVariants}
                    whileHover={shouldReduceMotion ? {} : featuredHoverEffects}
                    style={{ contain: "layout style paint" }}
                >
                    {/* Content - Text First */}
                    <div className="p-6 sm:p-8">
                        <h3 className="text-4xl sm:text-5xl font-serif font-normal tracking-tight text-foreground">
                            <FormattedMessage id={nameId} />
                        </h3>
                        <p className="mt-2 text-base sm:text-lg text-muted-foreground font-light">
                            <FormattedMessage id={roleId} />
                        </p>
                    </div>

                    {/* Image Container - Contained within card */}
                    <div className="relative w-full px-6 pb-6 sm:px-8 sm:pb-8">
                        <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden">
                            <TeamMemberImage
                                src={imageUrl}
                                alt={`Featured team member ${id}`}
                                className="object-cover rounded-lg"
                                priority={priority}
                            />
                        </div>
                    </div>
                </motion.div>
            </SimpleDialogTrigger>

            {/* Modal Content */}
            <SimpleDialogContent className="p-0 max-w-3xl">
                <div className="aspect-[4/3] w-full relative">
                    <TeamMemberImage
                        src={imageUrl}
                        alt={`Featured team member ${id}`}
                        className="object-cover"
                    />
                </div>
                <div className="p-6 sm:p-8">
                    <Badge className="mb-4 border-emerald-500/30 bg-emerald-500/15 text-emerald-300 dark:text-emerald-400">
                        <FormattedMessage id="team.featured.badge" />
                    </Badge>
                    <h2 className="text-3xl font-serif font-normal tracking-tight text-foreground">
                        <FormattedMessage id={nameId} />
                    </h2>
                    <p className="text-xl text-muted-foreground mt-2">
                        <FormattedMessage id={roleId} />
                    </p>
                    <p className="text-sm text-emerald-500 mt-1">
                        <FormattedMessage id="team.featured.experience" />
                    </p>
                    <p className="mt-6 text-muted-foreground leading-relaxed">
                        <FormattedMessage id={bioId} />
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <Button
                            variant="default"
                            onClick={(e) => {
                                e.preventDefault();
                                // Contact button - could navigate to contact page
                            }}
                        >
                            <Mail className="h-4 w-4 mr-2" />
                            <FormattedMessage id="team.card.contactdirect" />
                        </Button>
                    </div>
                </div>
                <SimpleDialogClose />
            </SimpleDialogContent>
        </SimpleDialog>
    );
}
