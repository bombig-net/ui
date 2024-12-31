import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { Link } from '@/components/link/link';
import { render, screen, within } from '@/lib/test-utils';

import { Breadcrumb, Breadcrumbs } from './breadcrumbs';

describe('Breadcrumbs component', () => {
    describe('User Interactions & Accessibility', () => {
        it('allows users to navigate through breadcrumbs with keyboard', async () => {
            const user = userEvent.setup();
            render(
                <nav aria-label="Breadcrumb navigation">
                    <Breadcrumbs>
                        <Breadcrumb>
                            <Link href="/">Home</Link>
                        </Breadcrumb>
                        <Breadcrumb>
                            <Link href="/products">Products</Link>
                        </Breadcrumb>
                        <Breadcrumb>
                            <span aria-current="page">Electronics</span>
                        </Breadcrumb>
                    </Breadcrumbs>
                </nav>
            );

            // Get all interactive elements
            const links = screen.getAllByRole('link');
            expect(links).toHaveLength(2); // Only two links, current page is not a link

            // First tab should focus the first link
            await user.tab();
            const firstLink = screen.getByRole('link', { name: 'Home' });
            expect(firstLink).toHaveFocus();

            // Second tab should focus the second link
            await user.tab();
            const secondLink = screen.getByRole('link', { name: 'Products' });
            expect(secondLink).toHaveFocus();

            // Third tab should move focus to the next focusable element after breadcrumbs
            // since the current page is not interactive
        });

        it('provides proper navigation structure', () => {
            render(
                <nav aria-label="Breadcrumb navigation">
                    <Breadcrumbs>
                        <Breadcrumb>
                            <Link href="/">Home</Link>
                        </Breadcrumb>
                        <Breadcrumb>
                            <span aria-current="page">Products</span>
                        </Breadcrumb>
                    </Breadcrumbs>
                </nav>
            );

            const nav = screen.getByRole('navigation', { name: 'Breadcrumb navigation' });
            expect(nav).toBeInTheDocument();

            const list = within(nav).getByRole('list');
            expect(list).toBeInTheDocument();

            const items = within(list).getAllByRole('listitem');
            expect(items).toHaveLength(2);
        });

        it('meets accessibility requirements', async () => {
            const { container } = render(
                <nav aria-label="Breadcrumb navigation">
                    <Breadcrumbs>
                        <Breadcrumb>
                            <Link href="/">Home</Link>
                        </Breadcrumb>
                        <Breadcrumb>
                            <Link href="/products">Products</Link>
                        </Breadcrumb>
                        <Breadcrumb>
                            <span aria-current="page">Electronics</span>
                        </Breadcrumb>
                    </Breadcrumbs>
                </nav>
            );

            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it('indicates current page correctly', () => {
            render(
                <nav aria-label="Breadcrumb navigation">
                    <Breadcrumbs>
                        <Breadcrumb>
                            <Link href="/">Home</Link>
                        </Breadcrumb>
                        <Breadcrumb>
                            <span aria-current="page">Products</span>
                        </Breadcrumb>
                    </Breadcrumbs>
                </nav>
            );

            const currentPage = screen.getByText('Products');
            expect(currentPage).toHaveAttribute('aria-current', 'page');
        });
    });

    describe('Interactive Behavior', () => {
        it('provides clickable links for navigation', () => {
            render(
                <nav aria-label="Breadcrumb navigation">
                    <Breadcrumbs>
                        <Breadcrumb>
                            <Link href="/">Home</Link>
                        </Breadcrumb>
                        <Breadcrumb>
                            <Link href="/products">Products</Link>
                        </Breadcrumb>
                        <Breadcrumb>
                            <span aria-current="page">Electronics</span>
                        </Breadcrumb>
                    </Breadcrumbs>
                </nav>
            );

            const links = screen.getAllByRole('link');

            // Verify all non-current links are clickable
            for (const link of links) {
                expect(link).toHaveAttribute('href');
                expect(link).not.toHaveAttribute('aria-current');
                expect(link).toBeEnabled();
            }
        });

        it('supports keyboard navigation', async () => {
            const user = userEvent.setup();
            render(
                <nav aria-label="Breadcrumb navigation">
                    <Breadcrumbs>
                        <Breadcrumb>
                            <Link href="/">Home</Link>
                        </Breadcrumb>
                        <Breadcrumb>
                            <Link href="/products">Products</Link>
                        </Breadcrumb>
                        <Breadcrumb>
                            <span aria-current="page">Electronics</span>
                        </Breadcrumb>
                    </Breadcrumbs>
                </nav>
            );

            // Verify keyboard navigation
            await user.tab(); // Focus first link
            expect(screen.getByRole('link', { name: 'Home' })).toHaveFocus();

            await user.tab(); // Focus second link
            expect(screen.getByRole('link', { name: 'Products' })).toHaveFocus();

            // Verify links have proper attributes for keyboard users
            const links = screen.getAllByRole('link');
            for (const link of links) {
                expect(link).toHaveAttribute('href');
                expect(link).toHaveClass('outline-none'); // Ensures custom focus styles
                expect(link).not.toHaveAttribute('tabindex', '-1'); // Ensures focusability
            }
        });
    });
});
