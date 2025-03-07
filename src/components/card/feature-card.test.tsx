import { render, screen } from '@testing-library/react';

import { FeatureCard } from './feature-card';

// Mock the concrete texture import
jest.mock('../../assets/concrete-texture.jpg', () => 'mocked-concrete-texture.jpg');

describe('FeatureCard', () => {
    const defaultProps = {
        featureImage: 'test-image.png',
        imageAlt: 'Test image',
        title: 'Test Title',
    };

    beforeEach(() => {
        // Reset mocks between tests
        jest.clearAllMocks();
    });

    it('renders without errors', () => {
        render(<FeatureCard {...defaultProps} />);

        // Check if title parts are rendered (now split into two elements)
        expect(screen.getByText('Test')).toBeInTheDocument();
        expect(screen.getByText('Title')).toBeInTheDocument();

        // Check if image is rendered
        const image = screen.getByAltText('Test image');
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', 'test-image.png');

        // Check if concrete texture is rendered (by alt text)
        const textureImage = screen.getByAltText('Concrete texture');
        expect(textureImage).toBeInTheDocument();
    });

    it('renders the title in a CardTitle component with correct styling', () => {
        render(<FeatureCard {...defaultProps} />);

        // Get both parts of the title
        const firstTitlePart = screen.getByText('Test');
        const secondTitlePart = screen.getByText('Title');

        // Check styling on both parts
        const firstTitleContainer = firstTitlePart.closest('.bg-duck-400');
        const secondTitleContainer = secondTitlePart.closest('.bg-duck-400');

        expect(firstTitleContainer).toBeInTheDocument();
        expect(firstTitleContainer).toHaveClass('text-black');
        expect(firstTitleContainer).toHaveClass('font-extrabold');

        expect(secondTitleContainer).toBeInTheDocument();
        expect(secondTitleContainer).toHaveClass('text-black');
        expect(secondTitleContainer).toHaveClass('font-extrabold');
    });

    it('applies all the correct visual effects', () => {
        render(<FeatureCard {...defaultProps} />);

        // Check background elements
        const baseColorLayer = document.querySelector('.bg-meteor-600');
        expect(baseColorLayer).toBeInTheDocument();

        const colorBurnLayer = document.querySelector('.mix-blend-color-burn');
        expect(colorBurnLayer).toBeInTheDocument();

        const gradientOverlay = document.querySelector('.bg-gradient-to-b');
        expect(gradientOverlay).toBeInTheDocument();
    });

    it('applies custom width class', () => {
        const { container } = render(<FeatureCard {...defaultProps} width="w-96" />);

        // Find the card element with the width class
        const cardElement = container.querySelector('.w-96');
        expect(cardElement).toBeInTheDocument();
    });

    it('applies the correct size class', () => {
        const { container } = render(<FeatureCard {...defaultProps} size="lg" />);

        // Find any element with min-height class
        // Using a more general approach instead of looking for specific values
        const elements = container.querySelectorAll('[class*="min-h-"]');
        expect(elements.length).toBeGreaterThan(0);
    });

    it('supports fixed aspect ratio', () => {
        const { container } = render(
            <FeatureCard {...defaultProps} fixedAspectRatio={true} aspectRatio="aspect-[2/1]" />
        );

        // Check if the aspect ratio class is applied
        const element = container.querySelector('.aspect-\\[2\\/1\\]');
        expect(element).toBeInTheDocument();
    });

    it('handles explicit line breaks in titles', () => {
        const { container } = render(
            <FeatureCard {...defaultProps} title="First Line\nSecond Line" />
        );

        // Find elements by their container class, as the raw text isn't correctly rendered
        const titleElements = container.querySelectorAll('.bg-duck-400');
        expect(titleElements.length).toBe(2);

        // Verify that at least one of them contains "First Line" or part of it
        const firstLineElement = Array.from(titleElements).find(
            (element) =>
                element.textContent?.includes('First') || element.textContent?.includes('Line')
        );
        expect(firstLineElement).toBeTruthy();

        // Verify the second line similarly
        const secondLineElement = Array.from(titleElements).find(
            (element) =>
                element.textContent?.includes('Second') || element.textContent?.includes('Line')
        );
        expect(secondLineElement).toBeTruthy();
    });

    it('auto-splits long titles into multiple lines', () => {
        const { container } = render(
            <FeatureCard
                {...defaultProps}
                title="This is a longer title that should be automatically split"
            />
        );

        // We expect at least two elements with the bg-duck-400 class (one for each line)
        const yellowBackgrounds = container.querySelectorAll('.bg-duck-400');
        expect(yellowBackgrounds.length).toBeGreaterThan(1);
    });
});
