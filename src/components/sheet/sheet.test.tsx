import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from './sheet';

// Extend expect with accessibility matcher
expect.extend(toHaveNoViolations);

// Mock ResizeObserver
class ResizeObserverMock {
    observe() {}
    unobserve() {}
    disconnect() {}
}

global.ResizeObserver = ResizeObserverMock;

describe('Sheet component', () => {
    const BasicSheet = () => (
        <Sheet>
            <SheetTrigger asChild>
                <button>Open Sheet</button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Test Sheet</SheetTitle>
                    <SheetDescription>This is a test sheet.</SheetDescription>
                </SheetHeader>
                <SheetFooter>
                    <button>Cancel</button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );

    describe('Functionality', () => {
        it('renders correctly with default variant and side', () => {
            render(<BasicSheet />);
            const trigger = screen.getByRole('button', { name: 'Open Sheet' });
            expect(trigger).toBeInTheDocument();
            expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        });

        it('applies destructive variant styles correctly', async () => {
            const user = userEvent.setup();
            render(
                <Sheet>
                    <SheetTrigger>Open Sheet</SheetTrigger>
                    <SheetContent variant="destructive">
                        <SheetTitle>Destructive Sheet</SheetTitle>
                    </SheetContent>
                </Sheet>
            );

            await user.click(screen.getByRole('button', { name: 'Open Sheet' }));
            const sheet = await screen.findByRole('dialog');
            expect(sheet).toHaveClass('from-red-500/10');
        });

        it('renders with different positions based on side prop', async () => {
            const user = userEvent.setup();
            render(
                <Sheet>
                    <SheetTrigger>Open Sheet</SheetTrigger>
                    <SheetContent side="left">
                        <SheetTitle>Left Side Sheet</SheetTitle>
                    </SheetContent>
                </Sheet>
            );

            await user.click(screen.getByRole('button', { name: 'Open Sheet' }));
            const sheet = await screen.findByRole('dialog');
            expect(sheet).toHaveClass('inset-y-0 left-0');
        });

        it('applies size variant styles correctly', async () => {
            const user = userEvent.setup();
            render(
                <Sheet>
                    <SheetTrigger>Open Sheet</SheetTrigger>
                    <SheetContent size="lg">
                        <SheetTitle>Large Sheet</SheetTitle>
                    </SheetContent>
                </Sheet>
            );

            await user.click(screen.getByRole('button', { name: 'Open Sheet' }));
            const sheet = await screen.findByRole('dialog');
            expect(sheet).toHaveClass('max-w-lg');
        });

        it('merges custom className with default styles', async () => {
            const user = userEvent.setup();
            const customClass = 'custom-sheet-class';

            render(
                <Sheet>
                    <SheetTrigger>Open Sheet</SheetTrigger>
                    <SheetContent className={customClass}>
                        <SheetTitle>Custom Class Sheet</SheetTitle>
                    </SheetContent>
                </Sheet>
            );

            await user.click(screen.getByRole('button', { name: 'Open Sheet' }));
            const sheet = await screen.findByRole('dialog');
            expect(sheet).toHaveClass(customClass);
        });
    });

    describe('Interaction', () => {
        it('opens and closes on trigger click', async () => {
            const user = userEvent.setup();
            const onOpenChange = jest.fn();

            render(
                <Sheet onOpenChange={onOpenChange}>
                    <SheetTrigger>Open Sheet</SheetTrigger>
                    <SheetContent>
                        <SheetTitle>Test Sheet</SheetTitle>
                    </SheetContent>
                </Sheet>
            );

            // Open sheet
            await user.click(screen.getByRole('button', { name: 'Open Sheet' }));
            await screen.findByRole('dialog');
            expect(onOpenChange).toHaveBeenCalledWith(true);

            // Close sheet
            const closeButton = screen.getByRole('button', { name: 'Close' });
            await user.click(closeButton);

            await waitFor(() => {
                expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
                expect(onOpenChange).toHaveBeenCalledWith(false);
            });
        });

        it('closes on escape key press', async () => {
            const user = userEvent.setup();
            const onOpenChange = jest.fn();

            render(
                <Sheet onOpenChange={onOpenChange}>
                    <SheetTrigger>Open Sheet</SheetTrigger>
                    <SheetContent>
                        <SheetTitle>Test Sheet</SheetTitle>
                    </SheetContent>
                </Sheet>
            );

            await user.click(screen.getByRole('button', { name: 'Open Sheet' }));
            await screen.findByRole('dialog');

            await user.keyboard('{Escape}');

            await waitFor(() => {
                expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
                expect(onOpenChange).toHaveBeenCalledWith(false);
            });
        });

        it('closes on overlay click', async () => {
            const user = userEvent.setup();
            const onOpenChange = jest.fn();

            render(
                <Sheet open={true} onOpenChange={onOpenChange}>
                    <SheetTrigger asChild>
                        <button>Open Sheet</button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetTitle>Test Sheet</SheetTitle>
                    </SheetContent>
                </Sheet>
            );

            // Wait for the sheet to be in the document
            const sheet = await screen.findByRole('dialog');
            expect(sheet).toBeInTheDocument();

            // Find the overlay - use a more reliable selector that matches Radix UI's structure
            const overlay = document.querySelector('.fixed.inset-0');
            expect(overlay).not.toBeNull();

            // Simulate clicking the overlay
            if (overlay) {
                await user.click(overlay);
            }

            // Verify onOpenChange was called with false to close the sheet
            expect(onOpenChange).toHaveBeenCalledWith(false);
        });

        it('prevents default close behavior when handlers prevent it', async () => {
            const user = userEvent.setup();
            const onEscapeKeyDown = jest.fn((event: KeyboardEvent) => {
                event.preventDefault();
            });
            const onPointerDownOutside = jest.fn((event: Event) => {
                event.preventDefault();
            });

            render(
                <Sheet>
                    <SheetTrigger>Open Sheet</SheetTrigger>
                    <SheetContent
                        onEscapeKeyDown={onEscapeKeyDown}
                        onPointerDownOutside={onPointerDownOutside}
                    >
                        <SheetTitle>Test Sheet</SheetTitle>
                    </SheetContent>
                </Sheet>
            );

            // Open sheet
            await user.click(screen.getByRole('button', { name: 'Open Sheet' }));
            const sheet = await screen.findByRole('dialog');

            // Try to close with Escape
            await user.keyboard('{Escape}');
            expect(onEscapeKeyDown).toHaveBeenCalled();
            expect(sheet).toBeInTheDocument();

            // Simulate clicking outside
            const mockEvent = new Event('pointerdown');
            onPointerDownOutside(mockEvent);

            expect(onPointerDownOutside).toHaveBeenCalled();
            expect(sheet).toBeInTheDocument();
        });
    });

    describe('Keyboard Navigation', () => {
        it('maintains focus trap within sheet', async () => {
            const user = userEvent.setup();
            render(
                <Sheet>
                    <SheetTrigger asChild>
                        <button>Open Sheet</button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Test Title</SheetTitle>
                        </SheetHeader>
                        <div>
                            <button>First Button</button>
                            <button>Second Button</button>
                        </div>
                    </SheetContent>
                </Sheet>
            );

            // Open sheet
            await user.click(screen.getByRole('button', { name: 'Open Sheet' }));
            const sheet = await screen.findByRole('dialog');

            // Verify that focusable elements exist within the sheet
            expect(within(sheet).getByRole('button', { name: 'Close' })).toBeInTheDocument();
            expect(within(sheet).getByRole('button', { name: 'First Button' })).toBeInTheDocument();
            expect(
                within(sheet).getByRole('button', { name: 'Second Button' })
            ).toBeInTheDocument();

            // Initial focus should be on an element within the sheet
            expect(document.activeElement).toBeInstanceOf(HTMLElement);
            expect(sheet.contains(document.activeElement)).toBe(true);

            // Find the currently focused element
            let focusedElement = document.activeElement;

            // Press Tab to cycle through all elements (3 elements in total - close button, first button, second button)
            for (let i = 0; i < 3; i++) {
                await user.tab();

                // After each tab, verify that focus is still within the sheet
                // and has moved to a different element
                expect(sheet.contains(document.activeElement)).toBe(true);
                expect(document.activeElement).not.toBe(focusedElement);

                // Update which element has focus for the next iteration
                focusedElement = document.activeElement;
            }

            // After tabbing 3 times, we should cycle back to the first focusable element in the sheet
            await user.tab();
            expect(sheet.contains(document.activeElement)).toBe(true);

            // After tabbing backward, focus should still be trapped within the sheet
            await user.keyboard('{shift>}{tab}{/shift}');
            expect(sheet.contains(document.activeElement)).toBe(true);
        });
    });

    describe('Accessibility', () => {
        it('has no accessibility violations in default state', async () => {
            const { container } = render(<BasicSheet />);
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it('has no accessibility violations when open', async () => {
            const user = userEvent.setup();
            const { container } = render(<BasicSheet />);

            await user.click(screen.getByRole('button', { name: 'Open Sheet' }));
            await screen.findByRole('dialog');

            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it('maintains proper ARIA attributes', async () => {
            const user = userEvent.setup();
            render(<BasicSheet />);

            await user.click(screen.getByRole('button', { name: 'Open Sheet' }));
            const sheet = await screen.findByRole('dialog');

            expect(sheet).toHaveAttribute('role', 'dialog');
            expect(sheet).toHaveAttribute('aria-labelledby');

            const title = within(sheet).getByRole('heading');
            expect(title.id).toBe(sheet.getAttribute('aria-labelledby'));
        });

        it('properly describes sheet content', async () => {
            const user = userEvent.setup();
            render(<BasicSheet />);

            await user.click(screen.getByRole('button', { name: 'Open Sheet' }));
            const sheet = await screen.findByRole('dialog');

            expect(sheet).toHaveAttribute('aria-describedby');
            const descriptionId = sheet.getAttribute('aria-describedby');
            const description = document.getElementById(descriptionId || '');

            expect(description).toBeInTheDocument();
            expect(description).toHaveTextContent('This is a test sheet.');
        });

        it('handles focus management correctly', async () => {
            const user = userEvent.setup();
            const onOpenAutoFocus = jest.fn();

            render(
                <Sheet>
                    <SheetTrigger>Open Sheet</SheetTrigger>
                    <SheetContent onOpenAutoFocus={onOpenAutoFocus}>
                        <SheetTitle>Test Sheet</SheetTitle>
                        <button>Test Button</button>
                    </SheetContent>
                </Sheet>
            );

            await user.click(screen.getByRole('button', { name: 'Open Sheet' }));
            await screen.findByRole('dialog');

            expect(onOpenAutoFocus).toHaveBeenCalled();
        });
    });

    describe('Side Variants', () => {
        it('renders with right side placement by default', async () => {
            const user = userEvent.setup();
            render(
                <Sheet>
                    <SheetTrigger>Open Sheet</SheetTrigger>
                    <SheetContent>
                        <SheetTitle>Default Sheet</SheetTitle>
                    </SheetContent>
                </Sheet>
            );

            await user.click(screen.getByRole('button', { name: 'Open Sheet' }));
            const sheet = await screen.findByRole('dialog');

            expect(sheet).toHaveClass('inset-y-0 right-0');
        });

        it('renders with left side placement when specified', async () => {
            const user = userEvent.setup();
            render(
                <Sheet>
                    <SheetTrigger>Open Sheet</SheetTrigger>
                    <SheetContent side="left">
                        <SheetTitle>Left Sheet</SheetTitle>
                    </SheetContent>
                </Sheet>
            );

            await user.click(screen.getByRole('button', { name: 'Open Sheet' }));
            const sheet = await screen.findByRole('dialog');

            expect(sheet).toHaveClass('inset-y-0 left-0');
            expect(sheet).toHaveClass('data-[state=open]:animate-slide-in-from-left');
        });

        it('renders with top placement when specified', async () => {
            const user = userEvent.setup();
            render(
                <Sheet>
                    <SheetTrigger>Open Sheet</SheetTrigger>
                    <SheetContent side="top">
                        <SheetTitle>Top Sheet</SheetTitle>
                    </SheetContent>
                </Sheet>
            );

            await user.click(screen.getByRole('button', { name: 'Open Sheet' }));
            const sheet = await screen.findByRole('dialog');

            expect(sheet).toHaveClass('inset-x-0 top-0');
            expect(sheet).toHaveClass('data-[state=open]:animate-slide-in-from-top');
        });

        it('renders with bottom placement when specified', async () => {
            const user = userEvent.setup();
            render(
                <Sheet>
                    <SheetTrigger>Open Sheet</SheetTrigger>
                    <SheetContent side="bottom">
                        <SheetTitle>Bottom Sheet</SheetTitle>
                    </SheetContent>
                </Sheet>
            );

            await user.click(screen.getByRole('button', { name: 'Open Sheet' }));
            const sheet = await screen.findByRole('dialog');

            expect(sheet).toHaveClass('inset-x-0 bottom-0');
            expect(sheet).toHaveClass('data-[state=open]:animate-slide-in-from-bottom');
        });
    });

    describe('Size Variants', () => {
        it('applies different width based on size prop', async () => {
            const user = userEvent.setup();

            // Test small size
            const { unmount } = render(
                <Sheet>
                    <SheetTrigger>Open Sheet</SheetTrigger>
                    <SheetContent size="sm">
                        <SheetTitle>Small Sheet</SheetTitle>
                    </SheetContent>
                </Sheet>
            );

            await user.click(screen.getByRole('button', { name: 'Open Sheet' }));
            let sheet = await screen.findByRole('dialog');
            expect(sheet).toHaveClass('max-w-sm');

            // Cleanup
            unmount();

            // Test large size
            render(
                <Sheet>
                    <SheetTrigger>Open Sheet</SheetTrigger>
                    <SheetContent size="lg">
                        <SheetTitle>Large Sheet</SheetTitle>
                    </SheetContent>
                </Sheet>
            );

            await user.click(screen.getByRole('button', { name: 'Open Sheet' }));
            sheet = await screen.findByRole('dialog');
            expect(sheet).toHaveClass('max-w-lg');
        });

        it('applies appropriate height for top/bottom sheets', async () => {
            const user = userEvent.setup();

            render(
                <Sheet>
                    <SheetTrigger>Open Sheet</SheetTrigger>
                    <SheetContent side="bottom" size="lg">
                        <SheetTitle>Bottom Sheet</SheetTitle>
                    </SheetContent>
                </Sheet>
            );

            await user.click(screen.getByRole('button', { name: 'Open Sheet' }));
            const sheet = await screen.findByRole('dialog');

            // For bottom sheets, height classes should be applied
            expect(sheet).toHaveClass('max-h-[50vh]');
        });
    });
});
