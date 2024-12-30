import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

import { Badge } from './badge';

expect.extend(toHaveNoViolations);

describe('Badge', () => {
    it('should render badge with content', () => {
        render(
            <Badge badgeContent={4}>
                <div data-testid="child">Content</div>
            </Badge>
        );

        expect(screen.getByText('4')).toBeInTheDocument();
        expect(screen.getByTestId('child')).toBeInTheDocument();
    });

    it('should handle max value', () => {
        render(
            <Badge badgeContent={150} max={99}>
                <div>Content</div>
            </Badge>
        );

        expect(screen.getByText('99+')).toBeInTheDocument();
    });

    it('should handle zero value visibility', () => {
        const { container } = render(
            <Badge badgeContent={0}>
                <div>Content</div>
            </Badge>
        );

        // Check if the badge element exists but is hidden
        const badge = container.querySelector('.base-Badge-badge');
        expect(badge).toHaveClass('data-[invisible=true]:hidden');

        // Test with showZero prop
        const { container: containerWithZero } = render(
            <Badge badgeContent={0} showZero>
                <div>Content</div>
            </Badge>
        );

        const visibleBadge = containerWithZero.querySelector('.base-Badge-badge');
        expect(visibleBadge).toBeVisible();
        expect(visibleBadge).toHaveTextContent('0');
    });

    it('should handle invisible state', () => {
        const { container } = render(
            <Badge badgeContent={4} invisible>
                <div>Content</div>
            </Badge>
        );

        const badge = container.querySelector('.base-Badge-badge');
        expect(badge).toHaveClass('base-Badge-invisible');
        expect(badge).toHaveClass('data-[invisible=true]:hidden');
    });

    it('should render custom content', () => {
        render(
            <Badge badgeContent="New">
                <div>Content</div>
            </Badge>
        );

        expect(screen.getByText('New')).toBeInTheDocument();
    });

    it('should apply custom className', () => {
        const customClass = 'custom-badge';
        render(
            <Badge className={customClass} badgeContent={4}>
                <div>Content</div>
            </Badge>
        );

        const badge = screen.getByText('4').closest('.base-Badge-root');
        expect(badge).toHaveClass(customClass);
    });

    describe('accessibility', () => {
        it('should have no accessibility violations in default state', async () => {
            const { container } = render(
                <Badge badgeContent={4}>
                    <button type="button">Notifications</button>
                </Badge>
            );

            const results = await axe(container, {
                rules: {
                    'color-contrast': { enabled: true },
                    'aria-hidden-focus': { enabled: true },
                },
            });

            expect(results).toHaveNoViolations();
        });

        it('should have no accessibility violations with custom content', async () => {
            const { container } = render(
                <Badge badgeContent="New">
                    <button type="button">Messages</button>
                </Badge>
            );

            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it('should have no accessibility violations when invisible', async () => {
            const { container } = render(
                <Badge badgeContent={4} invisible>
                    <button type="button">Notifications</button>
                </Badge>
            );

            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it('should have no accessibility violations with zero value', async () => {
            const { container } = render(
                <Badge badgeContent={0} showZero>
                    <button type="button">Messages</button>
                </Badge>
            );

            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });
    });
});
