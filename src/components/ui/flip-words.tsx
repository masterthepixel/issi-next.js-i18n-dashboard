"use client";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

export const FlipWords = ({
  words,
  duration = 3000,
  className,
}: {
  words: string[];
  duration?: number;
  className?: string;
}) => {
  // Use an index-based interval to rotate words. This avoids creating many
  // timeouts and ensures proper cleanup when the component unmounts or when
  // the `words` array changes.
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!words || words.length <= 1) return;

    setIndex(0);
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, duration);

    return () => clearInterval(id);
  }, [words, duration]);

  const currentWord = words && words.length ? words[index] : "";

  return (
    <AnimatePresence onExitComplete={() => { /* no-op: interval drives updates */ }}>
      <motion.div
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 10,
        }}
        exit={{
          opacity: 0,
          y: -40,
          x: 40,
          filter: "blur(8px)",
          scale: 2,
          position: "absolute",
        }}
        className={className}
        key={currentWord + index}
      >
        {currentWord}
      </motion.div>
    </AnimatePresence>
  );
};
