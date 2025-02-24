import { axe } from 'jest-axe';

import { Container } from '@/components/container/container';
import { render, screen } from '@/lib/test-utils';

import { Section } from './section';

describe('Section', () => {
    it('renders children correctly', () => {
        render(
            <Section>
                <div>Test content</div>
            </Section>
        );

        expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('applies custom className correctly', () => {
        render(
            <Section className="custom-class">
                <div>Test content</div>
            </Section>
        );

        const section = screen.getByText('Test content').parentElement;
        expect(section).toHaveClass('custom-class');
    });

    it('renders as a different element when asChild is true', () => {
        render(
            <Section asChild>
                <article data-testid="test-article">Test content</article>
            </Section>
        );

        const article = screen.getByTestId('test-article');
        expect(article.tagName).toBe('ARTICLE');
        expect(article).toHaveClass('w-full', 'py-6', 'md:py-12', 'lg:py-24');
    });

    it('merges classNames when asChild is true', () => {
        render(
            <Section asChild className="custom-class">
                <article data-testid="test-article" className="article-class">
                    Test content
                </article>
            </Section>
        );

        const article = screen.getByTestId('test-article');
        expect(article).toHaveClass('custom-class', 'article-class');
    });

    it('composes with Container component', () => {
        render(
            <Section>
                <Container>
                    <div>Container content</div>
                </Container>
            </Section>
        );

        const container = screen.getByText('Container content').parentElement;
        expect(container).toHaveClass('mx-auto', 'px-4');
    });

    it('has no accessibility violations', async () => {
        const { container } = render(
            <Section>
                <h2>Section Title</h2>
                <p>Section content</p>
            </Section>
        );

        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });

    it('has no accessibility violations when used as article', async () => {
        const { container } = render(
            <Section asChild>
                <article>
                    <h2>Article Title</h2>
                    <p>Article content</p>
                </article>
            </Section>
        );

        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });

    it('maintains responsive padding classes by default', () => {
        render(
            <Section>
                <div>Test content</div>
            </Section>
        );

        const section = screen.getByText('Test content').parentElement;
        expect(section).toHaveClass('py-6', 'md:py-12', 'lg:py-24');
    });

    it('allows padding classes to be overridden', () => {
        render(
            <Section className="py-16 md:py-24 lg:py-32">
                <div>Test content</div>
            </Section>
        );

        const section = screen.getByText('Test content').parentElement;
        expect(section).toHaveClass('py-16', 'md:py-24', 'lg:py-32');
        expect(section).not.toHaveClass('py-6', 'md:py-12', 'lg:py-24');
    });
});
