import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { render, screen, within } from '@/lib/test-utils';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './accordion';

describe('Accordion component', () => {
    const renderAccordion = (props = {}) => {
        return render(
            <Accordion type="single" collapsible {...props}>
                <AccordionItem value="item-1">
                    <AccordionTrigger>Section 1</AccordionTrigger>
                    <AccordionContent>
                        <div>Content for section 1</div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>Section 2</AccordionTrigger>
                    <AccordionContent>
                        <div>Content for section 2</div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        );
    };

    describe('Functionality', () => {
        it('renders correctly with default variant', () => {
            renderAccordion();
            const triggers = screen.getAllByRole('button');
            const [firstTrigger, secondTrigger] = triggers as [HTMLElement, HTMLElement];

            expect([firstTrigger, secondTrigger]).toHaveLength(2);
            expect(firstTrigger).toHaveClass('text-neutral-900'); // Default variant
            expect(firstTrigger).toHaveAttribute('aria-expanded', 'false');
        });

        it('applies muted variant styles correctly', () => {
            render(
                <Accordion type="single" collapsible>
                    <AccordionItem value="test">
                        <AccordionTrigger variant="muted">Muted Section</AccordionTrigger>
                        <AccordionContent variant="muted">
                            <div>Muted content</div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            );

            const trigger = screen.getByRole('button', { name: 'Muted Section' });
            expect(trigger).toHaveClass('text-neutral-600');
        });

        it('merges custom className with default styles', () => {
            const customClass = 'custom-accordion';
            render(
                <Accordion type="single" className={customClass}>
                    <AccordionItem value="test">
                        <AccordionTrigger>Test Section</AccordionTrigger>
                        <AccordionContent>
                            <div>Test content</div>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            );

            // The accordion wrapper should have our custom class
            const accordion = screen.getByTestId('accordion');
            expect(accordion).toHaveClass(customClass);
        });
    });

    describe('Interaction', () => {
        it('expands and collapses content on click', async () => {
            const user = userEvent.setup();
            renderAccordion();

            const trigger = screen.getByRole('button', { name: 'Section 1' });

            // Initial state - content should be hidden
            expect(trigger).toHaveAttribute('aria-expanded', 'false');
            const regions = screen.getAllByRole('region', { hidden: true });
            const contentRegion = regions.find(
                (region) => region.getAttribute('aria-labelledby') === trigger.id
            );
            expect(contentRegion).toBeDefined();
            expect(contentRegion).toHaveAttribute('data-state', 'closed');

            // Click to expand
            await user.click(trigger);
            expect(trigger).toHaveAttribute('aria-expanded', 'true');
            expect(contentRegion).toHaveAttribute('data-state', 'open');
            if (contentRegion) {
                expect(
                    within(contentRegion).getByText('Content for section 1')
                ).toBeInTheDocument();
            }

            // Click to collapse
            await user.click(trigger);
            expect(trigger).toHaveAttribute('aria-expanded', 'false');
            expect(contentRegion).toHaveAttribute('data-state', 'closed');
        });

        it('handles keyboard navigation correctly', async () => {
            const user = userEvent.setup();
            renderAccordion();

            const triggers = screen.getAllByRole('button');
            const [firstTrigger, secondTrigger] = triggers as [HTMLElement, HTMLElement];

            // Focus first trigger
            await user.tab();
            expect(firstTrigger).toHaveFocus();

            // Navigate to second trigger
            await user.tab();
            expect(secondTrigger).toHaveFocus();

            // Activate with Enter key
            await user.keyboard('[Enter]');
            expect(secondTrigger).toHaveAttribute('aria-expanded', 'true');

            // Activate with Space key
            await user.keyboard('[Space]');
            expect(secondTrigger).toHaveAttribute('aria-expanded', 'false');
        });

        it('supports multiple expanded items when type is multiple', async () => {
            const user = userEvent.setup();
            renderAccordion({ type: 'multiple' });

            const triggers = screen.getAllByRole('button');
            const [firstTrigger, secondTrigger] = triggers as [HTMLElement, HTMLElement];

            // Expand first item
            await user.click(firstTrigger);
            expect(firstTrigger).toHaveAttribute('aria-expanded', 'true');

            // Expand second item while first remains expanded
            await user.click(secondTrigger);
            expect(firstTrigger).toHaveAttribute('aria-expanded', 'true');
            expect(secondTrigger).toHaveAttribute('aria-expanded', 'true');
        });
    });

    describe('Accessibility', () => {
        it('has no accessibility violations in default state', async () => {
            const { container } = renderAccordion();
            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it('has no accessibility violations when expanded', async () => {
            const user = userEvent.setup();
            const { container } = renderAccordion();

            const trigger = screen.getByRole('button', { name: 'Section 1' });
            await user.click(trigger);

            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });

        it('maintains proper ARIA attributes', async () => {
            const user = userEvent.setup();
            renderAccordion();

            const trigger = screen.getByRole('button', { name: 'Section 1' });
            await user.click(trigger);

            const regions = screen.getAllByRole('region');
            const contentRegion = regions.find(
                (region) => region.getAttribute('aria-labelledby') === trigger.id
            );
            expect(contentRegion).toBeDefined();
            expect(trigger).toHaveAttribute('aria-controls');
            expect(contentRegion).toHaveAttribute('role', 'region');
            expect(contentRegion).toHaveAttribute('aria-labelledby');
        });

        it('has no accessibility violations with multiple expanded items', async () => {
            const user = userEvent.setup();
            const { container } = renderAccordion({ type: 'multiple' });

            const triggers = screen.getAllByRole('button');
            const [firstTrigger, secondTrigger] = triggers as [HTMLElement, HTMLElement];
            await user.click(firstTrigger);
            await user.click(secondTrigger);

            const results = await axe(container);
            expect(results).toHaveNoViolations();
        });
    });
});
