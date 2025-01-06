import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

import { User } from './user';

expect.extend(toHaveNoViolations);

describe('User', () => {
    it('renders without crashing', () => {
        render(<User name="John Doe" />);
        expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    it('should have no accessibility violations', async () => {
        const { container } = render(<User name="John Doe" />);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });

    it('renders with different sizes', () => {
        const { rerender } = render(<User name="John Doe" size="sm" />);
        expect(screen.getByText('John Doe').parentElement?.parentElement).toHaveClass('text-sm');

        rerender(<User name="John Doe" size="md" />);
        expect(screen.getByText('John Doe').parentElement?.parentElement).toHaveClass('text-base');

        rerender(<User name="John Doe" size="lg" />);
        expect(screen.getByText('John Doe').parentElement?.parentElement).toHaveClass('text-lg');
    });

    it('renders description when provided', () => {
        render(<User name="John Doe" description="Software Engineer" />);
        expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    });

    it('renders avatar image when src is provided', () => {
        render(
            <User
                name="John Doe"
                avatarProps={{
                    src: 'https://example.com/avatar.jpg',
                    alt: 'John Doe avatar',
                }}
            />
        );
        expect(screen.getByRole('img', { name: 'John Doe avatar' })).toBeInTheDocument();
    });

    it('renders initials when no avatar src is provided', () => {
        render(<User name="John Doe" />);
        expect(screen.getByText('JD')).toBeInTheDocument();
    });

    it('renders avatar fallback when provided', () => {
        render(<User name="John Doe" avatarFallback="👤" />);
        expect(screen.getByText('👤')).toBeInTheDocument();
    });

    it('applies custom className', () => {
        render(<User name="John Doe" className="custom-class" />);
        expect(screen.getByText('John Doe').parentElement?.parentElement).toHaveClass(
            'custom-class'
        );
    });
});
