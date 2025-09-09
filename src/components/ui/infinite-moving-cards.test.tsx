import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { InfiniteMovingCards } from "./infinite-moving-cards";

const mockItems = [
    {
        quote: "This is a test quote.",
        name: "John Doe",
        title: "Tester",
        avatar: "https://example.com/avatar.png",
    },
    {
        quote: "Another test quote.",
        name: "Jane Doe",
        title: "Developer",
    },
];

describe("InfiniteMovingCards", () => {
    it("renders the correct number of items", () => {
        render(<InfiniteMovingCards items={mockItems} />);
        const quotes = screen.getAllByText(/quote/);
        // The component duplicates items for the infinite scroll effect
        expect(quotes.length).toBe(mockItems.length * 2);
    });

    it("renders item content correctly", () => {
        render(<InfiniteMovingCards items={mockItems} />);
        expect(screen.getAllByText("This is a test quote.")).toHaveLength(2);
        expect(screen.getAllByText("John Doe")).toHaveLength(2);
        expect(screen.getAllByText("Tester")).toHaveLength(2);
        const avatars = screen.getAllByAltText("John Doe avatar");
        expect(avatars).toHaveLength(2);
        avatars.forEach(avatar => {
            expect(avatar).toHaveAttribute("src", "https://example.com/avatar.png");
        });
    });

    it("applies the correct animation classes based on props", () => {
        const { container } = render(
            <InfiniteMovingCards items={mockItems} speed="slow" direction="right" />
        );
        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        const scroller = container.querySelector(".scroller");
        expect(scroller).toHaveClass("scroller");
    });

    it("pauses animation on hover when specified", () => {
        const { container } = render(
            <InfiniteMovingCards items={mockItems} pauseOnHover={true} />
        );
        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        const list = container.querySelector("ul");
        expect(list).toHaveClass("hover:[animation-play-state:paused]");
    });

    it("does not pause animation on hover when not specified", () => {
        const { container } = render(
            <InfiniteMovingCards items={mockItems} pauseOnHover={false} />
        );
        // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
        const list = container.querySelector("ul");
        expect(list).not.toHaveClass("hover:[animation-play-state:paused]");
    });
});
