import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import ScrollToTopButton from "./ScrollToTopButton";

// Mock window.scrollTo
const scrollToMock = vi.fn();
window.scrollTo = scrollToMock;

describe("ScrollToTopButton", () => {
    afterEach(() => {
        vi.clearAllMocks();
    });

    it("is not visible initially", () => {
        render(<ScrollToTopButton />);
        expect(screen.queryByLabelText("Scroll to top")).not.toBeInTheDocument();
    });

    it("becomes visible after scrolling down", () => {
        render(<ScrollToTopButton />);
        // Simulate scrolling down
        fireEvent.scroll(window, { target: { scrollY: 500 } });
        expect(screen.getByLabelText("Scroll to top")).toBeInTheDocument();
    });

    it("becomes hidden after scrolling back to the top", () => {
        render(<ScrollToTopButton />);
        // First, scroll down to make it visible
        fireEvent.scroll(window, { target: { scrollY: 500 } });
        expect(screen.getByLabelText("Scroll to top")).toBeInTheDocument();

        // Then, scroll back to the top
        fireEvent.scroll(window, { target: { scrollY: 100 } });
        expect(screen.queryByLabelText("Scroll to top")).not.toBeInTheDocument();
    });

    it("calls window.scrollTo when clicked", () => {
        render(<ScrollToTopButton />);
        // Make the button visible
        fireEvent.scroll(window, { target: { scrollY: 500 } });

        const button = screen.getByLabelText("Scroll to top");
        fireEvent.click(button);

        expect(scrollToMock).toHaveBeenCalledWith({
            top: 0,
            behavior: "smooth",
        });
    });
});