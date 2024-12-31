import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

import { Button } from '../button/button';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardImage,
    CardTitle,
} from './card';

expect.extend(toHaveNoViolations);

describe('Card', () => {
    it('renders without crashing', () => {
        render(
            <Card>
                <CardHeader>
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>Card Description</CardDescription>
                </CardHeader>
                <CardContent>Content</CardContent>
                <CardFooter>Footer</CardFooter>
            </Card>
        );

        expect(screen.getByRole('article')).toBeInTheDocument();
        expect(screen.getByText('Card Title')).toBeInTheDocument();
        expect(screen.getByText('Card Description')).toBeInTheDocument();
        expect(screen.getByText('Content')).toBeInTheDocument();
        expect(screen.getByText('Footer')).toBeInTheDocument();
    });

    it('should have no accessibility violations', async () => {
        const { container } = render(
            <Card>
                <CardHeader>
                    <CardTitle>Accessible Card</CardTitle>
                    <CardDescription>This is an accessible card component</CardDescription>
                </CardHeader>
                <CardContent>Content</CardContent>
                <CardFooter>Footer</CardFooter>
            </Card>
        );
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });

    it('renders with different variants', () => {
        const { rerender } = render(<Card variant="default">Default Card</Card>);
        expect(screen.getByRole('article')).toHaveClass('hover:border-neutral-300');

        rerender(
            <Card variant="ghost" shadow="none">
                Ghost Card
            </Card>
        );
        expect(screen.getByRole('article')).toHaveClass('border-none');
        expect(screen.getByRole('article')).toHaveClass('shadow-none');

        rerender(<Card variant="outline">Outline Card</Card>);
        expect(screen.getByRole('article')).toHaveClass('border-2');
    });

    it('applies blur effects correctly', () => {
        const { rerender } = render(<Card blur="sm">Blur SM</Card>);
        expect(screen.getByRole('article')).toHaveClass('backdrop-blur-sm');

        rerender(<Card blur="md">Blur MD</Card>);
        expect(screen.getByRole('article')).toHaveClass('backdrop-blur-md');

        rerender(<Card blur="lg">Blur LG</Card>);
        expect(screen.getByRole('article')).toHaveClass('backdrop-blur-lg');
    });

    it('handles clickable state correctly', async () => {
        const user = userEvent.setup();
        const onPressSpy = jest.fn();

        render(
            <Card isClickable onPress={onPressSpy}>
                Clickable Card
            </Card>
        );

        const card = screen.getByRole('button');
        expect(card).toHaveAttribute('tabIndex', '0');
        expect(card).toHaveClass('cursor-pointer');

        await user.click(card);
        expect(onPressSpy).toHaveBeenCalledTimes(1);
    });

    it('handles disabled state', () => {
        render(
            <Card isDisabled isClickable>
                Disabled Card
            </Card>
        );

        const card = screen.getByRole('button');
        expect(card).toHaveClass('pointer-events-none', 'opacity-50');
        expect(card).toHaveAttribute('aria-disabled', 'true');
        expect(card).not.toHaveAttribute('tabIndex');
    });

    it('handles keyboard navigation when clickable', async () => {
        const user = userEvent.setup();
        const onPressSpy = jest.fn();

        render(
            <Card isClickable onPress={onPressSpy}>
                Keyboard Navigation Card
            </Card>
        );

        const card = screen.getByRole('button');

        await user.tab();
        expect(card).toHaveFocus();

        await user.keyboard('{Enter}');
        expect(onPressSpy).toHaveBeenCalledTimes(1);

        await user.keyboard(' ');
        expect(onPressSpy).toHaveBeenCalledTimes(2);
    });

    it('renders CardTitle with different heading levels', () => {
        const { rerender } = render(<CardTitle as="h1">Heading 1</CardTitle>);
        expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();

        rerender(<CardTitle as="h2">Heading 2</CardTitle>);
        expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();

        // Default should be h3
        rerender(<CardTitle>Default Heading</CardTitle>);
        expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
    });

    it('applies custom className to all components', () => {
        render(
            <Card className="custom-card">
                <CardHeader className="custom-header">
                    <CardTitle className="custom-title">Title</CardTitle>
                    <CardDescription className="custom-desc">Description</CardDescription>
                </CardHeader>
                <CardContent className="custom-content">Content</CardContent>
                <CardFooter className="custom-footer">Footer</CardFooter>
            </Card>
        );

        expect(screen.getByRole('article')).toHaveClass('custom-card');
        expect(screen.getByText('Title').parentElement).toHaveClass('custom-header');
        expect(screen.getByText('Title')).toHaveClass('custom-title');
        expect(screen.getByText('Description')).toHaveClass('custom-desc');
        expect(screen.getByText('Content')).toHaveClass('custom-content');
        expect(screen.getByText('Footer')).toHaveClass('custom-footer');
    });

    describe('accessibility', () => {
        it('has proper focus indicators', async () => {
            const user = userEvent.setup();
            render(
                <Card isClickable>
                    <CardContent>Focusable content</CardContent>
                </Card>
            );

            const card = screen.getByRole('button');
            await user.tab();

            expect(card).toHaveFocus();
            expect(card).toHaveClass('focus-visible:ring-2', 'focus-visible:ring-offset-2');
        });

        it('handles decorative images correctly', () => {
            render(
                <Card>
                    <CardImage src="/test.jpg" alt="Decorative image" isDecorative />
                    <CardContent>Content</CardContent>
                </Card>
            );

            const img = screen.getByAltText('');
            expect(img).toHaveAttribute('aria-hidden', 'true');
            expect(img).toHaveAttribute('alt', '');
        });

        it('enforces alt text for non-decorative images', () => {
            render(
                <Card>
                    <CardImage src="/test.jpg" alt="Meaningful image" />
                    <CardContent>Content</CardContent>
                </Card>
            );

            const img = screen.getByAltText('Meaningful image');
            expect(img).not.toHaveAttribute('aria-hidden');
            expect(img).toHaveAttribute('alt', 'Meaningful image');
        });

        it('maintains proper color contrast', () => {
            render(
                <Card>
                    <CardHeader>
                        <CardTitle>Title</CardTitle>
                        <CardDescription>Description text</CardDescription>
                    </CardHeader>
                </Card>
            );

            const description = screen.getByText('Description text');
            expect(description).toHaveClass('text-neutral-700');
        });

        it('provides proper keyboard navigation', async () => {
            const user = userEvent.setup();
            const onPress = jest.fn();

            render(
                <div>
                    <Card isClickable onPress={onPress}>
                        <CardContent>First card</CardContent>
                    </Card>
                    <Card isClickable onPress={onPress}>
                        <CardContent>Second card</CardContent>
                    </Card>
                </div>
            );

            // First tab focuses first card
            await user.tab();
            expect(screen.getByText('First card').parentElement).toHaveFocus();

            // Second tab focuses second card
            await user.tab();
            expect(screen.getByText('Second card').parentElement).toHaveFocus();

            // Space triggers onPress
            await user.keyboard(' ');
            expect(onPress).toHaveBeenCalled();
        });

        it('disables interaction when isDisabled is true', () => {
            render(
                <Card isClickable isDisabled>
                    <CardContent>Disabled card</CardContent>
                </Card>
            );

            const card = screen.getByRole('button');
            expect(card).toHaveAttribute('aria-disabled', 'true');
            expect(card).not.toHaveAttribute('tabIndex');
            expect(card).toHaveClass('pointer-events-none', 'opacity-50');
        });
    });

    describe('interactive behavior', () => {
        it('handles press events correctly', async () => {
            const user = userEvent.setup();
            const onPress = jest.fn();
            const onPressStart = jest.fn();
            const onPressEnd = jest.fn();
            const onPressChange = jest.fn();
            const onPressUp = jest.fn();

            render(
                <Card
                    isClickable
                    onPress={onPress}
                    onPressStart={onPressStart}
                    onPressEnd={onPressEnd}
                    onPressChange={onPressChange}
                    onPressUp={onPressUp}
                >
                    Interactive Card
                </Card>
            );

            const card = screen.getByRole('button');

            // Test mouse interactions
            await user.pointer({ keys: '[MouseLeft>]', target: card }); // MouseDown
            expect(onPressStart).toHaveBeenCalled();
            expect(onPressChange).toHaveBeenCalledWith(true);

            await user.pointer({ keys: '[/MouseLeft]', target: card }); // MouseUp
            expect(onPress).toHaveBeenCalled();
            expect(onPressEnd).toHaveBeenCalled();
            expect(onPressChange).toHaveBeenCalledWith(false);
            expect(onPressUp).toHaveBeenCalled();

            // Test keyboard interactions
            await user.tab();
            await user.keyboard('{Enter}');
            expect(onPressStart).toHaveBeenCalled();
            expect(onPress).toHaveBeenCalled();
            expect(onPressEnd).toHaveBeenCalled();

            await user.keyboard(' '); // Space key
            expect(onPressStart).toHaveBeenCalled();
            expect(onPress).toHaveBeenCalled();
            expect(onPressEnd).toHaveBeenCalled();
        });

        it('handles mouse leave correctly', async () => {
            const user = userEvent.setup();
            const onPressChange = jest.fn();

            render(
                <Card isClickable onPressChange={onPressChange}>
                    Hover Card
                </Card>
            );

            const card = screen.getByRole('button');

            // Mouse down and leave
            await user.pointer({ keys: '[MouseLeft>]', target: card });
            expect(onPressChange).toHaveBeenCalledWith(true);

            await user.hover(document.body); // Move mouse away
            expect(onPressChange).toHaveBeenCalledWith(false);
        });

        it('handles text selection behavior', () => {
            const { rerender } = render(
                <Card isClickable>
                    <CardContent>Selectable Text</CardContent>
                </Card>
            );

            expect(screen.getByRole('button')).toHaveClass('select-none');

            rerender(
                <Card isClickable allowTextSelectionOnPress>
                    <CardContent>Selectable Text</CardContent>
                </Card>
            );

            expect(screen.getByRole('button')).not.toHaveClass('select-none');
        });
    });

    describe('visual features', () => {
        it('handles hover effects correctly', () => {
            render(
                <Card isHoverable>
                    <CardContent>Hoverable Card</CardContent>
                </Card>
            );

            expect(screen.getByRole('article')).toHaveClass('hover:scale-[1.02]');
        });

        it('handles animation states', () => {
            const { rerender } = render(
                <Card>
                    <CardContent>Animated Card</CardContent>
                </Card>
            );

            expect(screen.getByRole('article')).toHaveClass(
                'animate-in',
                'fade-in-0',
                'zoom-in-95'
            );

            rerender(
                <Card disableAnimation>
                    <CardContent>Non-animated Card</CardContent>
                </Card>
            );

            expect(screen.getByRole('article')).not.toHaveClass(
                'animate-in',
                'fade-in-0',
                'zoom-in-95'
            );
        });

        it('handles full width layout', () => {
            render(
                <Card fullWidth>
                    <CardContent>Full Width Card</CardContent>
                </Card>
            );

            expect(screen.getByRole('article')).toHaveClass('w-full');
        });
    });

    describe('CardImage features', () => {
        it('handles zoom effects correctly', () => {
            render(
                <Card>
                    <CardImage src="/test.jpg" alt="Zoomable image" isZoomed />
                </Card>
            );

            expect(screen.getByAltText('Zoomable image')).toHaveClass(
                'transition-transform',
                'duration-200',
                'hover:scale-110'
            );
        });

        it('handles cover image mode correctly', () => {
            render(
                <Card>
                    <CardImage src="/test.jpg" alt="Cover image" isCover />
                </Card>
            );

            const img = screen.getByAltText('Cover image');
            expect(img).toHaveClass('absolute', 'inset-0', 'h-full');
            expect(img).not.toHaveClass('rounded-lg');
        });

        it('handles different radius values', () => {
            const { rerender } = render(
                <Card>
                    <CardImage src="/test.jpg" alt="Image" radius="none" />
                </Card>
            );

            expect(screen.getByAltText('Image')).toHaveClass('rounded-none');

            rerender(
                <Card>
                    <CardImage src="/test.jpg" alt="Image" radius="sm" />
                </Card>
            );

            expect(screen.getByAltText('Image')).toHaveClass('rounded-sm');
        });

        it('renders as div when specified', () => {
            render(
                <Card>
                    <CardImage as="div" src="/test.jpg" alt="Div image" />
                </Card>
            );

            expect(screen.getByAltText('Div image').parentElement).toHaveClass('overflow-hidden');
        });
    });

    describe('CardHeader and CardFooter features', () => {
        it('handles blurred backgrounds correctly', () => {
            render(
                <Card>
                    <CardHeader isBlurred>Header Content</CardHeader>
                    <CardContent>Main Content</CardContent>
                    <CardFooter isBlurred>Footer Content</CardFooter>
                </Card>
            );

            // Find the header and footer elements directly
            const header = screen.getByText('Header Content').closest('header');
            const footer = screen.getByText('Footer Content').closest('footer');

            expect(header).toHaveClass('backdrop-blur-sm', 'bg-white/50');
            expect(footer).toHaveClass('backdrop-blur-sm', 'bg-white/50');
        });

        it('handles content without padding', () => {
            render(
                <Card>
                    <CardContent noPadding>No Padding Content</CardContent>
                </Card>
            );

            // Find the content div directly
            const content = screen.getByText('No Padding Content').closest('div');
            expect(content).toHaveClass('p-0');
        });
    });

    it('renders with action buttons', async () => {
        const user = userEvent.setup();
        const onCancelSpy = jest.fn();
        const onSubmitSpy = jest.fn();

        render(
            <Card>
                <CardHeader>
                    <CardTitle>Card with Actions</CardTitle>
                    <CardDescription>A card with interactive buttons</CardDescription>
                </CardHeader>
                <CardContent>Content with actions</CardContent>
                <CardFooter className="flex justify-end gap-2">
                    <Button variant="outline" onPress={onCancelSpy}>
                        Cancel
                    </Button>
                    <Button onPress={onSubmitSpy}>Submit</Button>
                </CardFooter>
            </Card>
        );

        // Verify buttons are rendered
        const cancelButton = screen.getByRole('button', { name: 'Cancel' });
        const submitButton = screen.getByRole('button', { name: 'Submit' });

        expect(cancelButton).toHaveClass('border-neutral-300');
        expect(submitButton).toHaveClass('bg-neutral-900');

        // Test button interactions
        await user.click(cancelButton);
        expect(onCancelSpy).toHaveBeenCalledTimes(1);

        await user.click(submitButton);
        expect(onSubmitSpy).toHaveBeenCalledTimes(1);
    });
});
