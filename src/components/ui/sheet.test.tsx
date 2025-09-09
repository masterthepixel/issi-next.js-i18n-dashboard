import '@testing-library/jest-dom/vitest';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from './sheet';

describe('Sheet Component', () => {
    it('should open the sheet when the trigger is clicked', () => {
        render(
            <Sheet>
                <SheetTrigger>Open</SheetTrigger>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Sheet Title</SheetTitle>
                        <SheetDescription>Sheet Description</SheetDescription>
                    </SheetHeader>
                    <div>Sheet Body</div>
                    <SheetFooter>
                        <SheetClose>Close</SheetClose>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        );

        const trigger = screen.getByText('Open');
        fireEvent.click(trigger);

        expect(screen.getByText('Sheet Title')).toBeInTheDocument();
        expect(screen.getByText('Sheet Description')).toBeInTheDocument();
        expect(screen.getByText('Sheet Body')).toBeInTheDocument();
    });

    it('should close the sheet when the close button is clicked', () => {
        render(
            <Sheet defaultOpen>
                <SheetContent>
                    <SheetHeader>
                        <SheetTitle>Sheet Title</SheetTitle>
                        <SheetDescription>Sheet Description</SheetDescription>
                    </SheetHeader>
                    <SheetFooter data-testid="sheet-footer">
                        <SheetClose>Close</SheetClose>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
        );

        const footer = screen.getByTestId('sheet-footer');
        // Prefer the visible textual Close button inside the footer to avoid
        // matching the icon-only close button (which uses an sr-only label).
        const closeText = within(footer).getByText('Close');
        const closeButton = closeText.closest('button');
        if (!closeButton) throw new Error('Footer close button not found');
        fireEvent.click(closeButton);

        // After closing, the content should not be in the document.
        expect(screen.queryByText('Sheet Title')).not.toBeInTheDocument();
    });

    it('should render with different side variants', () => {
        const { rerender } = render(
            <Sheet defaultOpen>
                <SheetContent side="left" data-testid="sheet-content">
                    <SheetHeader>
                        <SheetTitle>Left Sheet</SheetTitle>
                        <SheetDescription>Description</SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        );

        const sheetContent = screen.getByTestId('sheet-content');
        expect(sheetContent).toHaveClass('sm:max-w-sm');

        rerender(
            <Sheet defaultOpen>
                <SheetContent side="top" data-testid="sheet-content">
                    <SheetHeader>
                        <SheetTitle>Top Sheet</SheetTitle>
                        <SheetDescription>Description</SheetDescription>
                    </SheetHeader>
                </SheetContent>
            </Sheet>
        );

        const topSheetContent = screen.getByTestId('sheet-content');
        expect(topSheetContent).toHaveClass('border-b');
    });
});
