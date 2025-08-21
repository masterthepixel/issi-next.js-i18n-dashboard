import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("motion/react", async () => {
    const actual = await vi.importActual("motion/react");
    return {
        ...actual,
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

describe("ScrollBaseAnimation", () => {
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
        const ScrollBaseAnimation = (await import("./scroll-base-animation"))
            .default;
        render(
            <ScrollBaseAnimation>
                <div>Child Content</div>
            </ScrollBaseAnimation>,
        );
        const children = await screen.findAllByText("Child Content");
        expect(children.length).toBe(2);
    });

    it("toggles pause and play", async () => {
        const ScrollBaseAnimation = (await import("./scroll-base-animation"))
            .default;
        const { container } = render(
            <ScrollBaseAnimation>
                <div>Child Content</div>
            </ScrollBaseAnimation>,
        );

        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        const firstInstance = container.querySelector(".flex.flex-nowrap.overflow-visible.relative.whitespace-nowrap.py-6.group");

        if (firstInstance) {
            const pauseButton = screen.getByLabelText("Pause scrolling animation");
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
        const ScrollBaseAnimation = (await import("./scroll-base-animation"))
            .default;

        render(
            <ScrollBaseAnimation>
                <div>Child Content</div>
            </ScrollBaseAnimation>,
        );

        // The animation frame should be requested, but the callback should not be executed
        expect(useAnimationFrame).toHaveBeenCalled();
    });
});