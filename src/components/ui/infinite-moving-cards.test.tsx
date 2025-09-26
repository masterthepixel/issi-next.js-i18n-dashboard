import { render, screen } from "@testing-library/react";
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
    beforeEach(() => {
        // Mock requestIdleCallback to run synchronously
        vi.stubGlobal('requestIdleCallback', (callback: () => void) => callback());
        // Mock matchMedia for prefers-reduced-motion
        vi.stubGlobal('matchMedia', vi.fn(() => ({
            matches: false,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
        })));
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("renders the correct number of items", () => {
        render(<InfiniteMovingCards items={mockItems} />);
        // Component duplicates items for infinite scroll effect
        const quotes = screen.getAllByText(/quote/);
        expect(quotes.length).toBe(mockItems.length * 2);
    });

    it("renders item content correctly", () => {
        render(<InfiniteMovingCards items={mockItems} className="testimonial-cards" />);
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
        const scroller = container.querySelector(".scroller");
        expect(scroller).toHaveClass("scroller");
    });

    it("pauses animation on hover when specified", () => {
        const { container } = render(
            <InfiniteMovingCards items={mockItems} pauseOnHover={true} />
        );
        const list = container.querySelector("ul");
        expect(list).toHaveClass("hover:[animation-play-state:paused]");
    });

    it("does not pause animation on hover when not specified", () => {
        const { container } = render(
            <InfiniteMovingCards items={mockItems} pauseOnHover={false} />
        );
        const list = container.querySelector("ul");
        expect(list).not.toHaveClass("hover:[animation-play-state:paused]");
    });
});
