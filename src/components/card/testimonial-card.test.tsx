import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

import { TestimonialCard } from './testimonial-card';

describe('TestimonialCard', () => {
    const defaultProps = {
        backgroundImage: 'test-image.jpg',
        imageAlt: 'Test image',
        quote: 'This is a test quote',
        personName: 'John Doe',
        personTitle: 'Test Company',
    };

    it('renders without errors', () => {
        render(<TestimonialCard {...defaultProps} data-testid="testimonial-card" />);

        expect(screen.getByTestId('testimonial-card')).toBeInTheDocument();
        expect(screen.getByText(/This is a test quote/)).toBeInTheDocument();
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText(/Test Company/)).toBeInTheDocument();
    });

    it('renders the image correctly', () => {
        render(<TestimonialCard {...defaultProps} data-testid="testimonial-card" />);

        const image = screen.getByAltText('Test image');
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', 'test-image.jpg');
    });

    it('applies the standard yellow overlay and gradient', () => {
        render(<TestimonialCard {...defaultProps} data-testid="testimonial-card" />);

        // Check for the yellow base layer div
        const baseLayer = document.querySelector('.bg-\\[\\#F1C906\\]');
        expect(baseLayer).toBeInTheDocument();

        // Check for the gradient overlay
        const gradientLayer = document.querySelector('.bg-gradient-to-b.from-transparent.to-black');
        expect(gradientLayer).toBeInTheDocument();
    });

    it('renders without the personTitle when not provided', () => {
        render(
            <TestimonialCard
                {...defaultProps}
                personTitle={undefined}
                data-testid="testimonial-card"
            />
        );

        expect(screen.queryByText(/\/\//)).not.toBeInTheDocument();
    });

    it('respects the fixedAspectRatio prop', () => {
        render(
            <TestimonialCard
                {...defaultProps}
                fixedAspectRatio={true}
                data-testid="testimonial-card"
            />
        );

        const card = screen.getByTestId('testimonial-card');
        expect(card.className).toContain('aspect-[3/4]');

        // Render with fixedAspectRatio set to false
        render(
            <TestimonialCard
                {...defaultProps}
                fixedAspectRatio={false}
                data-testid="testimonial-card-no-ratio"
            />
        );

        const cardNoRatio = screen.getByTestId('testimonial-card-no-ratio');
        expect(cardNoRatio).not.toHaveAttribute('style', expect.stringContaining('aspect-ratio'));
    });

    it('renders with smaller text sizes by default', () => {
        const { container } = render(
            <TestimonialCard {...defaultProps} data-testid="testimonial-card" />
        );

        // Use a more flexible approach to find elements
        const quote = container.querySelector('p.text-sm');
        expect(quote).toBeInTheDocument();

        // Find the footer element that contains the attribution
        const attribution = container.querySelector('footer.text-xs');
        expect(attribution).toBeInTheDocument();
    });

    it('positions text at the bottom of the card', () => {
        render(<TestimonialCard {...defaultProps} data-testid="testimonial-card" />);

        const contentContainer = screen
            .getByTestId('testimonial-card')
            .querySelector('div[class*="flex-col justify-end"]');
        expect(contentContainer).toBeInTheDocument();
    });

    it('allows customizing width', () => {
        render(<TestimonialCard {...defaultProps} width="w-64" data-testid="testimonial-card" />);

        const card = screen.getByTestId('testimonial-card');
        expect(card.className).toContain('w-64');
    });

    it('passes accessibility tests', async () => {
        const { container } = render(<TestimonialCard {...defaultProps} />);

        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });
});
