import { act, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { GlowingStarsBackground } from "./glowing-stars-background";

// Mock motion/react to avoid dealing with animations in tests
vi.mock("motion/react", async () => {
    const actual = await vi.importActual("motion/react");
    return {
        ...actual,
        motion: {
            div: ({ children, ...props }: { children: React.ReactNode }) => (
                <div {...props}>{children}</div>
            ),
        },
        AnimatePresence: ({ children }: { children: React.ReactNode }) => (
            <>{children}</>
        ),
    };
});

describe("GlowingStarsBackground", () => {
    beforeEach(() => {
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.useRealTimers();
        vi.clearAllMocks();
    });

    it("renders children correctly", () => {
        render(
            <GlowingStarsBackground>
                <div>Test Child</div>
            </GlowingStarsBackground>
        );
        expect(screen.getByText("Test Child")).toBeInTheDocument();
    });

    it("renders the correct number of stars for medium density (default)", () => {
        render(<GlowingStarsBackground />);
        const stars = screen.getAllByTestId("star-container");
        expect(stars.length).toBe(108);
    });

    it("renders the correct number of stars for low density", () => {
        render(<GlowingStarsBackground starDensity="low" />);
        const stars = screen.getAllByTestId("star-container");
        expect(stars.length).toBe(72);
    });

    it("updates glowing stars after an interval", () => {
        const { container } = render(<GlowingStarsBackground />);

        // Initially, no stars should have the glow component
        let glows = container.querySelectorAll('.shadow-primary\\/50');
        expect(glows.length).toBe(0);

        // Advance timers by 3 seconds to trigger the interval
        act(() => {
            vi.advanceTimersByTime(3000);
        });

        // Now, there should be glowing stars. The number can be random, so just check if it's greater than 0.
        glows = container.querySelectorAll('.shadow-primary\\/50');
        expect(glows.length).toBeGreaterThan(0);
        // The component tries to highlight 5 stars. Due to Math.random, it might be less.
        expect(glows.length).toBeLessThanOrEqual(5);
    });

    it("cleans up the interval on unmount", () => {
        const clearIntervalSpy = vi.spyOn(global, "clearInterval");
        const { unmount } = render(<GlowingStarsBackground />);

        unmount();

        expect(clearIntervalSpy).toHaveBeenCalledTimes(1);
    });
});