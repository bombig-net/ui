import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import { Separator } from './separator';

describe('Separator', () => {
    // Helper function to get the separator element regardless of its role
    const getSeparator = () => {
        try {
            return screen.getByRole('separator');
        } catch {
            return screen.getByRole('none');
        }
    };

    it('renders without crashing', () => {
        render(<Separator />);
        expect(getSeparator()).toBeInTheDocument();
    });

    it('should have no accessibility violations', async () => {
        const { container } = render(<Separator />);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });

    describe('Orientation', () => {
        it('renders with horizontal orientation by default', () => {
            render(<Separator />);
            const separator = getSeparator();
            expect(separator).toHaveClass('h-px', 'w-full');
            expect(separator).toHaveAttribute('data-orientation', 'horizontal');
        });

        it('renders with vertical orientation', () => {
            render(<Separator orientation="vertical" />);
            const separator = getSeparator();
            expect(separator).toHaveClass('h-full', 'w-px');
            expect(separator).toHaveAttribute('data-orientation', 'vertical');
        });
    });

    describe('Variants', () => {
        it('renders with default variant', () => {
            render(<Separator variant="default" />);
            const separator = getSeparator();
            expect(separator).toHaveClass('bg-neutral-200');
        });

        it('renders with muted variant', () => {
            render(<Separator variant="muted" />);
            const separator = getSeparator();
            expect(separator).toHaveClass('bg-neutral-100');
        });

        it('renders with strong variant', () => {
            render(<Separator variant="strong" />);
            const separator = getSeparator();
            expect(separator).toHaveClass('bg-neutral-300');
        });
    });

    describe('Semantic behavior', () => {
        it('is decorative by default', () => {
            render(<Separator />);
            const separator = screen.getByRole('none');
            expect(separator).toHaveAttribute('data-orientation', 'horizontal');
        });

        it('supports non-decorative usage', () => {
            render(<Separator decorative={false} />);
            const separator = screen.getByRole('separator');
            expect(separator).toHaveAttribute('data-orientation', 'horizontal');
        });
    });

    describe('Styling', () => {
        it('applies custom className', () => {
            render(<Separator className="custom-class" />);
            const separator = getSeparator();
            expect(separator).toHaveClass('custom-class');
        });

        it('combines variant and custom classes', () => {
            render(<Separator variant="strong" className="my-4" />);
            const separator = getSeparator();
            expect(separator).toHaveClass('bg-neutral-300', 'my-4');
        });
    });
});
