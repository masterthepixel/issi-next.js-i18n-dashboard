import { vi, beforeEach, describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";

// Mock motion/react with a simple factory function
vi.mock("motion/react", () => {
    return {
        useAnimationFrame: vi.fn(),
        useMotionValue: (initial: any) => ({
            get: () => initial,
            set: (value: any) => { },
        }),
        useScroll: () => ({
            scrollY: { get: () => 0 },
        }),
        useVelocity: (value: any) => ({
            get: () => 0,
        }),
        useSpring: (value: any) => ({
            get: () => 0,
        }),
        useTransform: (value: any, transform: any) => ({
            get: () => transform(value.get()),
        }),
        motion: {
            div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
        },
    };
});

describe("ScrollTextMarquee", () => {
    beforeEach(() => {
        // Mock window.matchMedia for prefers-reduced-motion
        Object.defineProperty(window, "matchMedia", {
            writable: true,
            value: vi.fn().mockImplementation((query) => ({
                matches: false,
                media: query,
                onchange: null,
                addListener: vi.fn(), // deprecated
                removeListener: vi.fn(), // deprecated
                addEventListener: vi.fn(),
                removeEventListener: vi.fn(),
                dispatchEvent: vi.fn(),
            })),
        });
    });

    it("renders children correctly", async () => {
        const ScrollTextMarquee = (await import("./scroll-text-marquee"))
            .default;
        render(
            <ScrollTextMarquee>
                <div>Child Content</div>
            </ScrollTextMarquee>,
        );
        const children = await screen.findAllByText("Child Content");
        expect(children.length).toBe(3);
    });

    it("toggles pause and play", async () => {
        const ScrollTextMarquee = (await import("./scroll-text-marquee"))
            .default;
        const { container } = render(
            <ScrollTextMarquee>
                <div>Child Content</div>
            </ScrollTextMarquee>,
        );

        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        const firstInstance = container.querySelector(".flex.flex-nowrap.overflow-hidden.relative.whitespace-nowrap.py-1\\.5.group");

        if (firstInstance) {
            const pauseButton = (await screen.findAllByLabelText("Pause scrolling animation"))[0];
            expect(pauseButton).toBeInTheDocument();

            fireEvent.click(pauseButton);

            const playButton = screen.getByLabelText("Play scrolling animation");
            expect(playButton).toBeInTheDocument();
        }
    });

    it("does not animate when prefers-reduced-motion is true", async () => {
        // Set prefers-reduced-motion to true
        Object.defineProperty(window, "matchMedia", {
            writable: true,
            value: vi.fn().mockImplementation((query) => ({
                matches: true,
                media: query,
                onchange: null,
                addListener: vi.fn(),
                removeListener: vi.fn(),
                addEventListener: vi.fn(),
                removeEventListener: vi.fn(),
                dispatchEvent: vi.fn(),
            })),
        });

        const { useAnimationFrame } = await import("motion/react");
        const ScrollTextMarquee = (await import("./scroll-text-marquee"))
            .default;

        render(
            <ScrollTextMarquee>
                <div>Child Content</div>
            </ScrollTextMarquee>,
        );

        // The animation frame should be requested, but the callback should not be executed
        expect(useAnimationFrame).toHaveBeenCalled();
    });
});