import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from './navigation-menu';

expect.extend(toHaveNoViolations);

// Mock ResizeObserver
class ResizeObserverMock {
    observe() {}
    unobserve() {}
    disconnect() {}
}

global.ResizeObserver = ResizeObserverMock;

describe('NavigationMenu', () => {
    const BasicMenu = () => (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Products</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <div className="p-4">
                            <NavigationMenuLink href="/products/1">Product 1</NavigationMenuLink>
                            <NavigationMenuLink href="/products/2">Product 2</NavigationMenuLink>
                        </div>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink href="/about" className="px-4 py-2">
                        About
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
            <NavigationMenuViewport />
        </NavigationMenu>
    );

    it('renders without crashing', () => {
        render(<BasicMenu />);
        expect(screen.getByRole('button', { name: 'Products' })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();
    });

    it('should have no accessibility violations', async () => {
        const { container } = render(<BasicMenu />);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });

    describe('Keyboard Navigation', () => {
        it('allows navigation between menu items using arrow keys', async () => {
            const user = userEvent.setup();
            render(<BasicMenu />);

            const productsButton = screen.getByRole('button', { name: 'Products' });
            const aboutLink = screen.getByRole('link', { name: 'About' });

            // Start with Products focused
            await user.tab();
            expect(productsButton).toHaveFocus();

            // Move to About using arrow right
            await user.keyboard('{ArrowRight}');
            expect(aboutLink).toHaveFocus();

            // Move back to Products using arrow left
            await user.keyboard('{ArrowLeft}');
            expect(productsButton).toHaveFocus();
        });

        it('opens submenu with Enter or Space key', async () => {
            const user = userEvent.setup();
            render(<BasicMenu />);

            const productsButton = screen.getByRole('button', { name: 'Products' });

            await user.tab();
            expect(productsButton).toHaveFocus();

            // Open menu with Enter
            await user.keyboard('{Enter}');
            await waitFor(() => {
                const content = screen.getByRole('link', { name: 'Product 1' });
                expect(content).toBeInTheDocument();
            });

            // Close menu with Escape
            await user.keyboard('{Escape}');
            await waitFor(() => {
                const content = screen.queryByRole('link', { name: 'Product 1' });
                expect(content).not.toBeInTheDocument();
            });

            // Open menu with Space
            await user.keyboard(' ');
            await waitFor(() => {
                const content = screen.getByRole('link', { name: 'Product 1' });
                expect(content).toBeInTheDocument();
            });
        });
    });

    describe('Mouse Interaction', () => {
        it('opens submenu on trigger click', async () => {
            const user = userEvent.setup();
            render(<BasicMenu />);

            const trigger = screen.getByRole('button', { name: 'Products' });
            await user.click(trigger);

            const product1Link = screen.getByRole('link', { name: 'Product 1' });
            expect(product1Link).toBeVisible();
        });

        it('closes submenu when clicking outside', async () => {
            const user = userEvent.setup();
            render(<BasicMenu />);

            // Open menu
            const trigger = screen.getByRole('button', { name: 'Products' });
            await user.click(trigger);

            const product1Link = screen.getByRole('link', { name: 'Product 1' });
            expect(product1Link).toBeVisible();

            // Click outside
            await user.click(document.body);
            expect(product1Link).not.toBeVisible();
        });
    });

    describe('Variants', () => {
        it('applies default variant styles to trigger', () => {
            render(
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger variant="default">Default</NavigationMenuTrigger>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            );

            const trigger = screen.getByRole('button', { name: 'Default' });
            expect(trigger).toHaveClass('text-neutral-700');
        });

        it('applies muted variant styles to trigger', () => {
            render(
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger variant="muted">Muted</NavigationMenuTrigger>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </NavigationMenu>
            );

            const trigger = screen.getByRole('button', { name: 'Muted' });
            expect(trigger).toHaveClass('text-neutral-500');
        });
    });

    describe('Link Behavior', () => {
        it('renders links with correct href', () => {
            render(<BasicMenu />);
            const aboutLink = screen.getByRole('link', { name: 'About' });
            expect(aboutLink).toHaveAttribute('href', '/about');
        });

        it('applies correct styles to links', () => {
            render(<BasicMenu />);
            const aboutLink = screen.getByRole('link', { name: 'About' });
            expect(aboutLink).toHaveClass('px-4', 'py-2');
        });
    });

    describe('Viewport', () => {
        it('shows viewport when menu is opened', async () => {
            const user = userEvent.setup();
            render(<BasicMenu />);

            const trigger = screen.getByRole('button', { name: 'Products' });
            await user.click(trigger);

            await waitFor(() => {
                const viewportWrapper = screen
                    .getByRole('navigation')
                    .querySelector('div[data-state]');
                expect(viewportWrapper).toHaveAttribute('data-state', 'open');
            });
        });
    });

    describe('Complex Navigation', () => {
        it('handles nested content with proper accessibility', async () => {
            render(
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <div role="group" aria-label="Resources">
                                    <h3>Documentation</h3>
                                    <NavigationMenuLink href="/docs">
                                        Getting Started
                                    </NavigationMenuLink>
                                </div>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                    <NavigationMenuViewport />
                </NavigationMenu>
            );

            const user = userEvent.setup();
            const trigger = screen.getByRole('button', { name: 'Resources' });

            await user.click(trigger);

            const group = screen.getByRole('group', { name: 'Resources' });
            expect(within(group).getByText('Documentation')).toBeInTheDocument();
            expect(within(group).getByRole('link', { name: 'Getting Started' })).toHaveAttribute(
                'href',
                '/docs'
            );
        });
    });

    describe('Accessibility Features', () => {
        it('has correct ARIA attributes on trigger', () => {
            render(<BasicMenu />);
            const trigger = screen.getByRole('button', { name: 'Products' });

            expect(trigger).toHaveAttribute('aria-expanded', 'false');
        });

        it('updates ARIA attributes when menu is opened', async () => {
            const user = userEvent.setup();
            render(<BasicMenu />);

            const trigger = screen.getByRole('button', { name: 'Products' });
            await user.click(trigger);

            expect(trigger).toHaveAttribute('aria-expanded', 'true');
        });

        it('maintains focus management during keyboard navigation', async () => {
            const user = userEvent.setup();
            render(<BasicMenu />);

            // Tab to first trigger
            await user.tab();
            const trigger = screen.getByRole('button', { name: 'Products' });
            expect(trigger).toHaveFocus();

            // Open menu with Enter
            await user.keyboard('{Enter}');

            // Tab to first menu item
            await user.tab();
            const product1Link = screen.getByRole('link', { name: 'Product 1' });
            expect(product1Link).toHaveFocus();
        });
    });
});
