import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

import { Container } from './container';

expect.extend(toHaveNoViolations);

describe('Container', () => {
    it('renders without crashing', () => {
        render(
            <Container>
                <p>Content</p>
            </Container>
        );
        expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('should have no accessibility violations', async () => {
        const { container } = render(
            <Container>
                <main>
                    <h1>Main Content</h1>
                    <p>Some content inside the container</p>
                </main>
            </Container>
        );
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });

    it('applies default classes', () => {
        render(
            <Container>
                <p>Content</p>
            </Container>
        );
        const container = screen.getByText('Content').parentElement;
        expect(container).toHaveClass('w-full');
        expect(container).toHaveClass('mx-auto');
        expect(container).toHaveClass('max-w-7xl');
        expect(container).toHaveClass('px-4');
        expect(container).toHaveClass('sm:px-6');
        expect(container).toHaveClass('lg:px-8');
    });

    it('applies custom className', () => {
        render(
            <Container className="bg-red-500 custom-class">
                <p>Content</p>
            </Container>
        );
        const container = screen.getByText('Content').parentElement;
        expect(container).toHaveClass('custom-class');
        expect(container).toHaveClass('bg-red-500');
        // Should still have default classes
        expect(container).toHaveClass('w-full');
        expect(container).toHaveClass('mx-auto');
    });

    it('renders as a div by default', () => {
        render(
            <Container>
                <p>Content</p>
            </Container>
        );
        const container = screen.getByText('Content').parentElement;
        expect(container?.tagName).toBe('DIV');
    });

    describe('when asChild is true', () => {
        it('renders children as the root element', () => {
            render(
                <Container asChild>
                    <section className="mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-7xl">
                        <p>Content</p>
                    </section>
                </Container>
            );
            const section = screen.getByText('Content').parentElement;
            expect(section?.tagName).toBe('SECTION');
        });

        it('forwards additional props to the child element', () => {
            render(
                <Container asChild>
                    <section
                        className="mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-7xl"
                        aria-label="main section"
                    >
                        <p>Content</p>
                    </section>
                </Container>
            );
            const section = screen.getByText('Content').parentElement;
            expect(section).toHaveAttribute('aria-label', 'main section');
        });
    });

    it('should have no accessibility violations with semantic HTML', async () => {
        const { container } = render(
            <Container asChild>
                <main className="mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-7xl">
                    <header>
                        <h1>Page Title</h1>
                    </header>
                    <article>
                        <h2>Article Title</h2>
                        <p>Article content</p>
                    </article>
                    <footer>
                        <p>Footer content</p>
                    </footer>
                </main>
            </Container>
        );
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });
});
