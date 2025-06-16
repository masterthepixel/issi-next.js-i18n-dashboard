"use client";

import { cn } from "@/lib/utils";
import { animate } from "motion/react";
import { memo, useCallback, useEffect, useRef } from "react";

interface GlowingEffectProps {
  blur?: number;
  inactiveZone?: number;
  proximity?: number;
  spread?: number;
  variant?: "default" | "white" | "category";
  glow?: boolean;
  className?: string;
  disabled?: boolean;
  movementDuration?: number;
  borderWidth?: number;
  category?: string;
}

const GlowingEffect = memo(
  ({
    blur = 0,
    inactiveZone = 0.7,
    proximity = 0,
    spread = 20,
    variant = "default",
    glow = false,
    className,
    movementDuration = 2,
    borderWidth = 1,
    disabled = true,
    category = "featured",
  }: GlowingEffectProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const lastPosition = useRef({ x: 0, y: 0 });
    const animationFrameRef = useRef<number>(0);

    const handleMove = useCallback(
      (e?: MouseEvent | { x: number; y: number }) => {
        if (!containerRef.current) return;

        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }

        animationFrameRef.current = requestAnimationFrame(() => {
          const element = containerRef.current;
          if (!element) return;

          const { left, top, width, height } = element.getBoundingClientRect();
          const mouseX = e?.x ?? lastPosition.current.x;
          const mouseY = e?.y ?? lastPosition.current.y;

          if (e) {
            lastPosition.current = { x: mouseX, y: mouseY };
          }

          const center = [left + width * 0.5, top + height * 0.5];
          const distanceFromCenter = Math.hypot(
            mouseX - center[0],
            mouseY - center[1]
          );
          const inactiveRadius = 0.5 * Math.min(width, height) * inactiveZone;

          if (distanceFromCenter < inactiveRadius) {
            element.style.setProperty("--active", "0");
            return;
          }

          const isActive =
            mouseX > left - proximity &&
            mouseX < left + width + proximity &&
            mouseY > top - proximity &&
            mouseY < top + height + proximity;

          element.style.setProperty("--active", isActive ? "1" : "0");

          if (!isActive) return;

          const currentAngle =
            parseFloat(element.style.getPropertyValue("--start")) || 0;
          let targetAngle =
            (180 * Math.atan2(mouseY - center[1], mouseX - center[0])) /
              Math.PI +
            90;

          const angleDiff = ((targetAngle - currentAngle + 180) % 360) - 180;
          const newAngle = currentAngle + angleDiff;

          animate(currentAngle, newAngle, {
            duration: movementDuration,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (value) => {
              element.style.setProperty("--start", String(value));
            },
          });
        });
      },
      [inactiveZone, proximity, movementDuration]
    );

    useEffect(() => {
      if (disabled) return;

      const handleScroll = () => handleMove();
      const handlePointerMove = (e: PointerEvent) => handleMove(e);

      window.addEventListener("scroll", handleScroll, { passive: true });
      document.body.addEventListener("pointermove", handlePointerMove, {
        passive: true,
      });

      return () => {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        window.removeEventListener("scroll", handleScroll);
        document.body.removeEventListener("pointermove", handlePointerMove);
      };
    }, [handleMove, disabled]);

    // Category-specific gradients matching your color scheme
    const getCategoryGradient = (cat: string) => {
      switch (cat) {
        case "featured":
          return `radial-gradient(circle, #3b82f6 10%, #3b82f600 25%),
                  repeating-conic-gradient(
                    from 236.84deg at 50% 50%,
                    #3b82f6 0%,
                    #60a5fa calc(25% / 5),
                    #93c5fd calc(50% / 5),
                    #dbeafe calc(75% / 5),
                    #3b82f6 calc(100% / 5)
                  )`;
        case "project":
          return `radial-gradient(circle, #16a34a 10%, #16a34a00 25%),
                  repeating-conic-gradient(
                    from 236.84deg at 50% 50%,
                    #16a34a 0%,
                    #22c55e calc(25% / 5),
                    #4ade80 calc(50% / 5),
                    #86efac calc(75% / 5),
                    #16a34a calc(100% / 5)
                  )`;
        case "hr":
          return `radial-gradient(circle, #9333ea 10%, #9333ea00 25%),
                  repeating-conic-gradient(
                    from 236.84deg at 50% 50%,
                    #9333ea 0%,
                    #a855f7 calc(25% / 5),
                    #c084fc calc(50% / 5),
                    #ddd6fe calc(75% / 5),
                    #9333ea calc(100% / 5)
                  )`;
        case "compliance":
          return `radial-gradient(circle, #ea580c 10%, #ea580c00 25%),
                  repeating-conic-gradient(
                    from 236.84deg at 50% 50%,
                    #ea580c 0%,
                    #f97316 calc(25% / 5),
                    #fb923c calc(50% / 5),
                    #fed7aa calc(75% / 5),
                    #ea580c calc(100% / 5)
                  )`;
        case "data":
          return `radial-gradient(circle, #dc2626 10%, #dc262600 25%),
                  repeating-conic-gradient(
                    from 236.84deg at 50% 50%,
                    #dc2626 0%,
                    #ef4444 calc(25% / 5),
                    #f87171 calc(50% / 5),
                    #fca5a5 calc(75% / 5),
                    #dc2626 calc(100% / 5)
                  )`;
        case "modernization":
          return `radial-gradient(circle, #4f46e5 10%, #4f46e500 25%),
                  repeating-conic-gradient(
                    from 236.84deg at 50% 50%,
                    #4f46e5 0%,
                    #6366f1 calc(25% / 5),
                    #818cf8 calc(50% / 5),
                    #c7d2fe calc(75% / 5),
                    #4f46e5 calc(100% / 5)
                  )`;
        case "technology":
          return `radial-gradient(circle, #0d9488 10%, #0d948800 25%),
                  repeating-conic-gradient(
                    from 236.84deg at 50% 50%,
                    #0d9488 0%,
                    #14b8a6 calc(25% / 5),
                    #5eead4 calc(50% / 5),
                    #99f6e4 calc(75% / 5),
                    #0d9488 calc(100% / 5)
                  )`;
        default:
          return `radial-gradient(circle, #6b7280 10%, #6b728000 25%),
                  repeating-conic-gradient(
                    from 236.84deg at 50% 50%,
                    #6b7280 0%,
                    #9ca3af calc(25% / 5),
                    #d1d5db calc(50% / 5),
                    #f3f4f6 calc(75% / 5),
                    #6b7280 calc(100% / 5)
                  )`;
      }
    };

    return (
      <>
        <div
          className={cn(
            "pointer-events-none absolute -inset-px hidden rounded-[inherit] border opacity-0 transition-opacity",
            glow && "opacity-100",
            variant === "white" && "border-white",
            disabled && "!block"
          )}
        />        <div
          ref={containerRef}
          style={{
            "--blur": `${blur}px`,
            "--spread": spread,
            "--start": "0",
            "--active": "0",
            "--glowingeffect-border-width": `${borderWidth}px`,
            "--repeating-conic-gradient-times": "5",
            "--gradient":
              variant === "white"
                ? `repeating-conic-gradient(
                from 236.84deg at 50% 50%,
                var(--black),
                var(--black) calc(25% / var(--repeating-conic-gradient-times))
              )`
                : variant === "category"
                ? getCategoryGradient(category)
                : `radial-gradient(circle, #dd7bbb 10%, #dd7bbb00 20%),
              radial-gradient(circle at 40% 40%, #d79f1e 5%, #d79f1e00 15%),
              radial-gradient(circle at 60% 60%, #5a922c 10%, #5a922c00 20%), 
              radial-gradient(circle at 40% 60%, #4c7894 10%, #4c789400 20%),
              repeating-conic-gradient(
                from 236.84deg at 50% 50%,
                #dd7bbb 0%,
                #d79f1e calc(25% / var(--repeating-conic-gradient-times)),
                #5a922c calc(50% / var(--repeating-conic-gradient-times)), 
                #4c7894 calc(75% / var(--repeating-conic-gradient-times)),
                #dd7bbb calc(100% / var(--repeating-conic-gradient-times))
              )`,
          } as React.CSSProperties}
          className={cn(
            "pointer-events-none absolute inset-0 rounded-[inherit] opacity-100 transition-opacity",
            glow && "opacity-100",
            blur > 0 && "blur-[var(--blur)] ",
            className,
            disabled && "!hidden"
          )}
        >
          <div
            className={cn(
              "glow",
              "rounded-[inherit]",
              'after:content-[""] after:rounded-[inherit] after:absolute after:inset-[calc(-1*var(--glowingeffect-border-width))]',
              "after:[border:var(--glowingeffect-border-width)_solid_transparent]",
              "after:[background:var(--gradient)] after:[background-attachment:fixed]",
              "after:opacity-[var(--active)] after:transition-opacity after:duration-300",
              "after:[mask-clip:padding-box,border-box]",
              "after:[mask-composite:intersect]",
              "after:[mask-image:linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff,#00000000_calc(var(--spread)*2deg))]"
            )}
          />
        </div>
      </>
    );
  }
);

GlowingEffect.displayName = "GlowingEffect";

export { GlowingEffect };
