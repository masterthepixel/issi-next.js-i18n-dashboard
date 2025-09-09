import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Meteors } from "./meteors";

describe("Meteors", () => {
    it("renders the default number of meteors", () => {
        render(<Meteors />);
        const meteors = screen.getAllByRole("presentation", { hidden: true });
        expect(meteors.length).toBe(20);
    });

    it("renders a specified number of meteors", () => {
        render(<Meteors number={10} />);
        const meteors = screen.getAllByRole("presentation", { hidden: true });
        expect(meteors.length).toBe(10);
    });

    it("applies correct styles to meteors based on mocked random values", () => {
        const mockMathRandom = vi
            .spyOn(Math, "random")
            .mockImplementationOnce(() => 0.1) // for top
            .mockImplementationOnce(() => 0.2) // for left
            .mockImplementationOnce(() => 0.3) // for delay
            .mockImplementationOnce(() => 0.4); // for duration

        render(<Meteors number={1} />);
        const meteor = screen.getByRole("presentation", { hidden: true });

        // These values are derived from the mocked Math.random() sequence
        const expectedTop = "-60px"; // Math.floor(0.1 * 1400 - 200) = -60
        const expectedLeft = "224px"; // Math.floor(0.2 * 2120 - 200) = 224
        const expectedDelay = "0.38s"; // 0.3 * (0.8 - 0.2) + 0.2 = 0.38
        const expectedDuration = "5s"; // Math.floor(0.4 * 8 + 2) = 5

        expect(meteor).toHaveStyle(`--top: ${expectedTop}`);
        expect(meteor).toHaveStyle(`--left: ${expectedLeft}`);
        expect(meteor).toHaveStyle(`--animation-delay: ${expectedDelay}`);
        expect(meteor).toHaveStyle(`--animation-duration: ${expectedDuration}`);

        // Restore the original implementation
        mockMathRandom.mockRestore();
    });
});
