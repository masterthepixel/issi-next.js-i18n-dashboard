/**
 * Note: Use position fixed according to your needs
 * Desktop navbar is better positioned at the bottom
 * Mobile navbar is better positioned at bottom right.
 **/

import { cn } from "@/lib/utils";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef, useState } from "react";

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  // Create background colors for each item based on their index/title
  const getItemBgColor = (index: number, title: string) => {
    const colors = [
      "bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700", // services
      "bg-purple-100 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-700", // products
      "bg-green-100 dark:bg-green-900/30 border border-green-200 dark:border-green-700", // government
      "bg-orange-100 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-700", // eLearning
      "bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-700", // compliance
      "bg-teal-100 dark:bg-teal-900/30 border border-teal-200 dark:border-teal-700", // about
    ];
    return colors[index % colors.length] || "bg-gray-100 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700";
  };
    return (
    <div className={cn("relative block md:hidden", className)}>
      {/* Always show the horizontal dock - no toggle needed */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-2 px-3 py-2 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-lg rounded-full border border-gray-200 dark:border-neutral-700 shadow-lg"
      >
        {items.map((item, idx) => (
          <motion.a
            key={item.title}
            href={item.href}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 hover:scale-110 hover:shadow-md",
              getItemBgColor(idx, item.title)
            )}
          >
            <div className="h-5 w-5">{item.icon}</div>
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  let mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto hidden h-16 items-end gap-4 rounded-2xl bg-gray-50 px-4 pb-3 md:flex dark:bg-neutral-900",
        className
      )}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  href,
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  href: string;
}) {
  let ref = useRef<HTMLDivElement>(null);

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  let widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  let heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

  let widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
  let heightTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [20, 40, 20]
  );

  let width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  let widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);

  // Get background color based on title
  const getBgColor = (title: string) => {
    const titleLower = title.toLowerCase();
    if (titleLower.includes('service')) return "bg-blue-200 dark:bg-blue-800";
    if (titleLower.includes('product')) return "bg-purple-200 dark:bg-purple-800";
    if (titleLower.includes('government')) return "bg-green-200 dark:bg-green-800";
    if (titleLower.includes('learning') || titleLower.includes('elearning')) return "bg-orange-200 dark:bg-orange-800";
    if (titleLower.includes('compliance')) return "bg-red-200 dark:bg-red-800";
    if (titleLower.includes('about')) return "bg-teal-200 dark:bg-teal-800";
    return "bg-gray-200 dark:bg-neutral-800";
  };

  return (
    <a href={href}>
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={cn(
          "relative flex aspect-square items-center justify-center rounded-full transition-colors duration-200",
          getBgColor(title)
        )}
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              className="absolute -top-8 left-1/2 w-fit rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs whitespace-pre text-neutral-700 dark:border-neutral-900 dark:bg-neutral-800 dark:text-white"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center justify-center"
        >
          {icon}
        </motion.div>
      </motion.div>
    </a>
  );
}
