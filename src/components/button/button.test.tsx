import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

import { Button } from './button';

expect.extend(toHaveNoViolations);

describe('Button', () => {
    it('renders without crashing', () => {
        render(<Button>Click me</Button>);
        expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
    });

    it('should have no accessibility violations', async () => {
        const { container } = render(<Button>Accessible Button</Button>);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });

    it('renders with different variants', () => {
        const { rerender } = render(<Button variant="default">Default</Button>);
        expect(screen.getByRole('button')).toHaveClass('bg-neutral-900');

        rerender(<Button variant="cta">CTA</Button>);
        expect(screen.getByRole('button')).toHaveClass('bg-neutral-950');

        rerender(<Button variant="outline">Outline</Button>);
        expect(screen.getByRole('button')).toHaveClass('border-neutral-300');
    });

    it('applies custom className', () => {
        render(<Button className="custom-class">Custom Button</Button>);
        expect(screen.getByRole('button')).toHaveClass('custom-class');
    });

    it('handles disabled state', () => {
        render(<Button isDisabled>Disabled Button</Button>);
        const button = screen.getByRole('button');
        expect(button).toHaveClass('opacity-50');
        expect(button).toHaveClass('pointer-events-none');
        expect(button).toBeDisabled();
    });

    it('handles user interactions', async () => {
        const user = userEvent.setup();
        const onPressSpy = jest.fn();

        render(<Button onPress={onPressSpy}>Interactive Button</Button>);
        const button = screen.getByRole('button');

        await user.click(button);
        expect(onPressSpy).toHaveBeenCalledTimes(1);
    });

    it('handles keyboard interactions', async () => {
        const user = userEvent.setup();
        const onPressSpy = jest.fn();

        render(<Button onPress={onPressSpy}>Keyboard Button</Button>);

        // Focus the button first
        const button = screen.getByRole('button');
        await user.tab();
        expect(button).toHaveFocus();

        // Test Space key
        await user.keyboard(' ');
        expect(onPressSpy).toHaveBeenCalledTimes(1);

        // Test Enter key
        await user.keyboard('{Enter}');
        expect(onPressSpy).toHaveBeenCalledTimes(2);
    });

    it('handles focus visible state', async () => {
        const user = userEvent.setup();
        render(<Button>Focus Button</Button>);

        // Use keyboard navigation to trigger focus-visible
        await user.tab();
        const button = screen.getByRole('button');
        expect(button).toHaveAttribute('data-focus-visible');
    });

    it('renders with children as a function', () => {
        render(
            <Button>
                {({ isPressed }) => <span>{isPressed ? 'Pressed!' : 'Not Pressed'}</span>}
            </Button>
        );

        expect(screen.getByText('Not Pressed')).toBeInTheDocument();
    });
});
