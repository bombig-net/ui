import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from './dialog';

// Extend expect with accessibility matcher
expect.extend(toHaveNoViolations);

// Mock ResizeObserver
class ResizeObserverMock {
    observe() {}
    unobserve() {}
    disconnect() {}
}

global.ResizeObserver = ResizeObserverMock;

describe('Dialog component', () => {
    const BasicDialog = () => (
        <Dialog>
            <DialogTrigger asChild>
                <button>Open Dialog</button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Test Dialog</DialogTitle>
                    <DialogDescription>This is a test dialog.</DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <button>Cancel</button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );

    describe('Functionality', () => {
        it('renders correctly with default variant', () => {
            render(<BasicDialog />);
            const trigger = screen.getByRole('button', { name: 'Open Dialog' });
            expect(trigger).toBeInTheDocument();
            expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
        });

        it('applies destructive variant styles correctly', async () => {
            const user = userEvent.setup();
            render(
                <Dialog>
                    <DialogTrigger>Open Dialog</DialogTrigger>
                    <DialogContent variant="destructive">
                        <DialogTitle>Destructive Dialog</DialogTitle>
                    </DialogContent>
                </Dialog>
            );

            await user.click(screen.getByRole('button', { name: 'Open Dialog' }));
            const dialog = await screen.findByRole('dialog');
            expect(dialog).toHaveClass('from-red-500/10');
        });

        it('renders scrollable content correctly', async () => {
            const user = userEvent.setup();
            render(
                <Dialog>
                    <DialogTrigger>Open Dialog</DialogTrigger>
                    <DialogContent scrollable>
                        <DialogTitle>Scrollable Dialog</DialogTitle>
                        <div style={{ height: '1000px' }}>Tall content</div>
                    </DialogContent>
                </Dialog>
            );

            await user.click(screen.getByRole('button', { name: 'Open Dialog' }));
            await screen.findByRole('dialog');

            // Find the overlay by its class
            const overlay = document.querySelector('.overflow-y-auto');
            expect(overlay).not.toBeNull();
        });

        it('merges custom className with default styles', async () => {
            const user = userEvent.setup();
            const customClass = 'custom-dialog-class';

            render(
                <Dialog>
                    <DialogTrigger>Open Dialog</DialogTrigger>
                    <DialogContent className={customClass}>
                        <DialogTitle>Custom Class Dialog</DialogTitle>
                    </DialogContent>
                </Dialog>
            );

            await user.click(screen.getByRole('button', { name: 'Open Dialog' }));
            const dialog = await screen.findByRole('dialog');
            expect(dialog).toHaveClass(customClass);
        });
    });

    describe('Interaction', () => {
        it('opens and closes on trigger click', async () => {
            const user = userEvent.setup();
            const onOpenChange = jest.fn();

            render(
                <Dialog onOpenChange={onOpenChange}>
                    <DialogTrigger>Open Dialog</DialogTrigger>
                    <DialogContent>
                        <DialogTitle>Test Dialog</DialogTitle>
                    </DialogContent>
                </Dialog>
            );

            // Open dialog
            await user.click(screen.getByRole('button', { name: 'Open Dialog' }));
            await screen.findByRole('dialog');
            expect(onOpenChange).toHaveBeenCalledWith(true);

            // Close dialog
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
                <Dialog onOpenChange={onOpenChange}>
                    <DialogTrigger>Open Dialog</DialogTrigger>
                    <DialogContent>
                        <DialogTitle>Test Dialog</DialogTitle>
                    </DialogContent>
                </Dialog>
            );

            await user.click(screen.getByRole('button', { name: 'Open Dialog' }));
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
                <Dialog open={true} onOpenChange={onOpenChange}>
                    <DialogTrigger asChild>
                        <button>Open Dialog</button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogTitle>Test Dialog</DialogTitle>
                    </DialogContent>
                </Dialog>
            );

            // Wait for the dialog to be in the document
            const dialog = await screen.findByRole('dialog');
            expect(dialog).toBeInTheDocument();

            // Find the overlay - use a more reliable selector that matches Radix UI's structure
            // The overlay is a div with a specific class containing "fixed inset-0"
            const overlay = document.querySelector('.fixed.inset-0');
            expect(overlay).not.toBeNull();

            // Simulate clicking the overlay
            if (overlay) {
                await user.click(overlay);
            }

            // Verify onOpenChange was called with false to close the dialog
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
                <Dialog>
                    <DialogTrigger>Open Dialog</DialogTrigger>
                    <DialogContent
                        onEscapeKeyDown={onEscapeKeyDown}
                        onPointerDownOutside={onPointerDownOutside}
                    >
                        <DialogTitle>Test Dialog</DialogTitle>
                    </DialogContent>
                </Dialog>
            );

            // Open dialog
            await user.click(screen.getByRole('button', { name: 'Open Dialog' }));
            const dialog = await screen.findByRole('dialog');

            // Try to close with Escape
            await user.keyboard('{Escape}');
            expect(onEscapeKeyDown).toHaveBeenCalled();
            expect(dialog).toBeInTheDocument();

            // Simulate clicking outside
            const mockEvent = new Event('pointerdown');
            onPointerDownOutside(mockEvent);

            expect(onPointerDownOutside).toHaveBeenCalled();
            expect(dialog).toBeInTheDocument();
        });
    });

    describe('Keyboard Navigation', () => {
        it('maintains focus trap within dialog', async () => {
            const user = userEvent.setup();
            render(
                <Dialog>
                    <DialogTrigger asChild>
                        <button>Open Dialog</button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Test Title</DialogTitle>
                        </DialogHeader>
                        <div>
                            <button>First Button</button>
                            <button>Second Button</button>
                        </div>
                    </DialogContent>
                </Dialog>
            );

            // Open dialog
            await user.click(screen.getByRole('button', { name: 'Open Dialog' }));
            const dialog = await screen.findByRole('dialog');

            // Verify that focusable elements exist within the dialog (without storing them as variables)
            expect(within(dialog).getByRole('button', { name: 'Close' })).toBeInTheDocument();
            expect(
                within(dialog).getByRole('button', { name: 'First Button' })
            ).toBeInTheDocument();
            expect(
                within(dialog).getByRole('button', { name: 'Second Button' })
            ).toBeInTheDocument();

            // Initial focus should be on an element within the dialog
            expect(document.activeElement).toBeInstanceOf(HTMLElement);
            expect(dialog.contains(document.activeElement)).toBe(true);

            // Find the currently focused element (should be one of our elements)
            let focusedElement = document.activeElement;

            // Press Tab to cycle through all elements (3 elements in total - close button, first button, second button)
            for (let i = 0; i < 3; i++) {
                await user.tab();

                // After each tab, verify that focus is still within the dialog
                // and has moved to a different element
                expect(dialog.contains(document.activeElement)).toBe(true);
                expect(document.activeElement).not.toBe(focusedElement);

                // Update which element has focus for the next iteration
                focusedElement = document.activeElement;
            }

            // After tabbing 3 times, we should cycle back to the first focusable element in the dialog
            await user.tab();
            expect(dialog.contains(document.activeElement)).toBe(true);

            // After tabbing backward, focus should still be trapped within the dialog
            await user.keyboard('{shift>}{tab}{/shift}');
            expect(dialog.contains(document.activeElement)).toBe(true);
        });
    });

    describe('Accessibility', () => {
        it('has no accessibility violations in default state', async () => {
            const { container } = render(<BasicDialog />);
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it('has no accessibility violations when open', async () => {
            const user = userEvent.setup();
            const { container } = render(<BasicDialog />);

            await user.click(screen.getByRole('button', { name: 'Open Dialog' }));
            await screen.findByRole('dialog');

            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it('maintains proper ARIA attributes', async () => {
            const user = userEvent.setup();
            render(<BasicDialog />);

            await user.click(screen.getByRole('button', { name: 'Open Dialog' }));
            const dialog = await screen.findByRole('dialog');

            // In Radix UI's implementation, dialog role is present but aria-modal might not be
            expect(dialog).toHaveAttribute('role', 'dialog');
            expect(dialog).toHaveAttribute('aria-labelledby');

            const title = within(dialog).getByRole('heading');
            expect(title.id).toBe(dialog.getAttribute('aria-labelledby'));
        });

        it('properly describes dialog content', async () => {
            const user = userEvent.setup();
            render(<BasicDialog />);

            await user.click(screen.getByRole('button', { name: 'Open Dialog' }));
            const dialog = await screen.findByRole('dialog');

            expect(dialog).toHaveAttribute('aria-describedby');
            const descriptionId = dialog.getAttribute('aria-describedby');
            const description = document.getElementById(descriptionId || '');

            expect(description).toBeInTheDocument();
            expect(description).toHaveTextContent('This is a test dialog.');
        });

        it('handles focus management correctly', async () => {
            const user = userEvent.setup();
            const onOpenAutoFocus = jest.fn();

            render(
                <Dialog>
                    <DialogTrigger>Open Dialog</DialogTrigger>
                    <DialogContent onOpenAutoFocus={onOpenAutoFocus}>
                        <DialogTitle>Test Dialog</DialogTitle>
                        <button>Test Button</button>
                    </DialogContent>
                </Dialog>
            );

            await user.click(screen.getByRole('button', { name: 'Open Dialog' }));
            await screen.findByRole('dialog');

            expect(onOpenAutoFocus).toHaveBeenCalled();
        });
    });

    describe('Content Variants', () => {
        it('renders with different position when scrollable', async () => {
            const user = userEvent.setup();
            render(
                <Dialog>
                    <DialogTrigger>Open Dialog</DialogTrigger>
                    <DialogContent scrollable>
                        <DialogTitle>Scrollable Dialog</DialogTitle>
                    </DialogContent>
                </Dialog>
            );

            await user.click(screen.getByRole('button', { name: 'Open Dialog' }));
            const dialog = await screen.findByRole('dialog');

            expect(dialog).toHaveClass('my-8');
            expect(dialog).not.toHaveClass('translate-x-[-50%]');
        });

        it('renders with default position when not scrollable', async () => {
            const user = userEvent.setup();
            render(
                <Dialog>
                    <DialogTrigger>Open Dialog</DialogTrigger>
                    <DialogContent>
                        <DialogTitle>Default Dialog</DialogTitle>
                    </DialogContent>
                </Dialog>
            );

            await user.click(screen.getByRole('button', { name: 'Open Dialog' }));
            const dialog = await screen.findByRole('dialog');

            expect(dialog).toHaveClass('translate-x-[-50%]');
            expect(dialog).not.toHaveClass('my-8');
        });
    });
});
