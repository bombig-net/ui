import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

import { Pagination } from './pagination';

expect.extend(toHaveNoViolations);

describe('Pagination', () => {
    it('renders without crashing', () => {
        render(<Pagination total={10} page={1} />);
        expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('should have no accessibility violations', async () => {
        const { container } = render(<Pagination total={10} page={1} />);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });

    it('renders correct number of pages', () => {
        render(<Pagination total={5} page={1} />);
        expect(screen.getAllByRole('button')).toHaveLength(7); // 5 pages + 2 controls
    });

    it('handles page changes', async () => {
        const user = userEvent.setup();
        const onChangeMock = jest.fn();

        render(<Pagination total={5} page={1} onChange={onChangeMock} />);

        // Click next page
        await user.click(screen.getByLabelText('Go to next page'));
        expect(onChangeMock).toHaveBeenCalledWith(2);

        // Click specific page
        await user.click(screen.getByLabelText('Go to page 4'));
        expect(onChangeMock).toHaveBeenCalledWith(4);
    });

    it('disables controls appropriately', () => {
        const { rerender } = render(<Pagination total={5} page={1} />);
        expect(screen.getByLabelText('Go to previous page')).toBeDisabled();
        expect(screen.getByLabelText('Go to next page')).not.toBeDisabled();

        rerender(<Pagination total={5} page={5} />);
        expect(screen.getByLabelText('Go to previous page')).not.toBeDisabled();
        expect(screen.getByLabelText('Go to next page')).toBeDisabled();
    });

    it('renders with different sizes', () => {
        const { rerender } = render(<Pagination total={5} page={1} size="sm" />);
        expect(screen.getByRole('navigation')).toHaveClass('text-sm');

        rerender(<Pagination total={5} page={1} size="md" />);
        expect(screen.getByRole('navigation')).toHaveClass('text-base');

        rerender(<Pagination total={5} page={1} size="lg" />);
        expect(screen.getByRole('navigation')).toHaveClass('text-lg');
    });

    it('renders with different variants', () => {
        const { rerender } = render(<Pagination total={5} page={1} variant="default" />);
        const buttons = screen.getAllByRole('button');
        expect(buttons[0]).toHaveClass('hover:bg-neutral-100');

        rerender(<Pagination total={5} page={1} variant="outline" />);
        expect(buttons[0]).toHaveClass('border-2');
        expect(buttons[0]).toHaveClass('border-duck-400');
    });

    it('can hide controls', () => {
        render(<Pagination total={5} page={1} showControls={false} />);
        expect(screen.queryByLabelText('Go to previous page')).not.toBeInTheDocument();
        expect(screen.queryByLabelText('Go to next page')).not.toBeInTheDocument();
    });

    it('shows ellipsis for many pages', () => {
        render(<Pagination total={20} page={10} />);
        const ellipsisElements = screen.getAllByRole('separator');
        expect(ellipsisElements).toHaveLength(2);
    });

    it('applies custom className', () => {
        render(<Pagination total={5} page={1} className="custom-class" />);
        expect(screen.getByRole('navigation')).toHaveClass('custom-class');
    });
});
