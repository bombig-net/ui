import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { render, screen } from '@/lib/test-utils';

import { Link } from './link';

describe('Link component', () => {
    describe('Functionality', () => {
        it('renders correctly with default variant', () => {
            render(<Link href="https://example.com">Click me</Link>);
            const link = screen.getByRole('link', { name: 'Click me' });

            expect(link).toBeInTheDocument();
            expect(link).toHaveAttribute('href', 'https://example.com');
            // Default variant should have base styles
            expect(link).toHaveClass('text-white');
        });

        it('applies muted variant styles correctly', () => {
            render(
                <Link href="#" variant="muted">
                    Muted Link
                </Link>
            );
            const link = screen.getByRole('link', { name: 'Muted Link' });

            expect(link).toHaveClass('text-neutral-300');
        });

        it('applies subtle variant styles correctly', () => {
            render(
                <Link href="#" variant="subtle">
                    Subtle Link
                </Link>
            );
            const link = screen.getByRole('link', { name: 'Subtle Link' });

            expect(link).not.toHaveClass('underline');
            expect(link).toHaveClass('text-neutral-300');
        });

        it('handles disabled state correctly', () => {
            render(
                <Link href="#" isDisabled>
                    Disabled Link
                </Link>
            );
            const link = screen.getByRole('link', { name: 'Disabled Link' });

            expect(link).toHaveAttribute('aria-disabled', 'true');
            expect(link).toHaveClass('data-[disabled]:opacity-50');
        });

        it('forwards ref correctly', () => {
            const ref = jest.fn();
            render(
                <Link href="#" ref={ref}>
                    Reference Link
                </Link>
            );

            expect(ref).toHaveBeenCalled();
            expect(ref.mock.calls[0][0]).toBeInstanceOf(HTMLAnchorElement);
        });

        it('merges custom className with default styles', () => {
            const customClass = 'custom-class';
            render(
                <Link href="#" className={customClass}>
                    Custom Link
                </Link>
            );
            const link = screen.getByRole('link', { name: 'Custom Link' });

            expect(link).toHaveClass(customClass);
            expect(link).toHaveClass('inline-flex'); // Base style should still be present
        });
    });

    describe('Interaction', () => {
        it('handles keyboard interaction correctly', async () => {
            const user = userEvent.setup();
            const onPress = jest.fn();

            render(
                <Link href="#" onPress={onPress}>
                    Interactive Link
                </Link>
            );
            const link = screen.getByRole('link', { name: 'Interactive Link' });

            await user.tab();
            expect(link).toHaveFocus();

            await user.keyboard('[Enter]');
            expect(onPress).toHaveBeenCalled();
        });

        it('prevents interaction when disabled', async () => {
            const user = userEvent.setup();
            const onPress = jest.fn();

            render(
                <Link href="#" isDisabled onPress={onPress}>
                    Disabled Link
                </Link>
            );
            const link = screen.getByRole('link', { name: 'Disabled Link' });

            await user.click(link);
            expect(onPress).not.toHaveBeenCalled();
        });
    });

    describe('Accessibility', () => {
        it('has no accessibility violations in default state', async () => {
            const { container } = render(<Link href="https://example.com">Accessible Link</Link>);

            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it('has no accessibility violations when disabled', async () => {
            const { container } = render(
                <Link href="https://example.com" isDisabled>
                    Disabled Link
                </Link>
            );

            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it('handles external links correctly', async () => {
            const { container } = render(
                <Link href="https://external.com" target="_blank" rel="noopener noreferrer">
                    External Link
                    <svg aria-hidden="true" className="w-4 h-4" />
                </Link>
            );

            const link = screen.getByRole('link', { name: 'External Link' });
            expect(link).toHaveAttribute('target', '_blank');
            expect(link).toHaveAttribute('rel', 'noopener noreferrer');

            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it('maintains accessible name when used with icon', async () => {
            const { container } = render(
                <Link href="#">
                    Settings
                    <svg aria-hidden="true" className="w-4 h-4" />
                </Link>
            );

            expect(screen.getByRole('link')).toHaveAccessibleName('Settings');

            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });
    });
});
