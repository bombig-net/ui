import type { Meta, StoryObj } from '@storybook/react';

import { TestimonialCard } from './testimonial-card';

const meta: Meta<typeof TestimonialCard> = {
    title: 'Components/Card/TestimonialCard',
    component: TestimonialCard,
    tags: ['autodocs'],
    args: {
        backgroundImage:
            'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&h=516&q=80',
        imageAlt: 'Professional businessman in a blue suit',
        quote: 'Thanks to bombig.net we are in the top #3 in all relevant keywords.',
        personName: 'Laurent Boes',
        personTitle: 'Patronus Protection',
        width: 'w-80',
        fixedAspectRatio: true,
    },
    parameters: {
        docs: {
            description: {
                component: `
The TestimonialCard component is designed to showcase customer quotes with visual impact.
- The component uses a standardized effect with:
  - Yellow base layer (#F1C906)
  - Portrait photo with color-burn blend mode and full desaturation
  - Gradient overlay from transparent to black at the bottom
- All text is positioned at the bottom of the card
- Text sizes are intentionally small to create a modern, understated look
- **Note:** The aspect ratio is the responsibility of each instance, not controlled by the component by default
- You can override this by setting \`fixedAspectRatio={true}\` on any instance
`,
            },
        },
    },
    argTypes: {
        backgroundImage: {
            control: 'text',
            description: 'URL for the background image (portrait photo)',
        },
        imageAlt: {
            control: 'text',
            description: 'Alt text for the image (for accessibility)',
        },
        quote: {
            control: 'text',
            description: 'The testimonial quote text',
        },
        personName: {
            control: 'text',
            description: 'The name of the person giving the testimonial',
        },
        personTitle: {
            control: 'text',
            description: 'The title or company of the person (optional)',
        },
        quoteSize: {
            control: 'radio',
            options: ['sm', 'md', 'lg'],
            description: 'The size of the quote text (smaller sizes by default)',
        },
        attributionSize: {
            control: 'radio',
            options: ['sm', 'md', 'lg'],
            description: 'The size of the attribution text (smaller sizes by default)',
        },
        gradientOpacity: {
            control: 'radio',
            options: ['light', 'medium', 'dark'],
            description: 'The opacity of the gradient overlay',
        },
        gradientHeight: {
            control: 'radio',
            options: ['sm', 'md', 'lg'],
            description: 'The height of the gradient overlay',
        },
        fixedAspectRatio: {
            control: 'boolean',
            description: 'Whether to fix the aspect ratio to portrait (3:4)',
        },
        width: {
            control: 'text',
            description: 'Custom width for the card (e.g., "w-64", "w-full")',
        },
    },
};

export default meta;
type Story = StoryObj<typeof TestimonialCard>;

export const Default: Story = {
    args: {},
};

export const WithPhoto: Story = {
    args: {
        backgroundImage:
            'https://images.unsplash.com/photo-1546776310-eef45dd6d63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&h=516&q=80',
        imageAlt: 'Professional man with glasses',
        quote: 'With an actual photo, the testimonial shows the person behind the quote.',
        personName: 'John Smith',
        personTitle: 'CEO, Example Inc',
        width: 'w-96',
        fixedAspectRatio: true,
    },
};

export const ResponsiveGrid: Story = {
    render: function ResponsiveGridExample() {
        return (
            <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                <TestimonialCard
                    backgroundImage="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&h=516&q=80"
                    imageAlt="Professional woman with red hair"
                    quote="Bombig.net transformed our online presence completely."
                    personName="Sarah Johnson"
                    personTitle="Marketing Director"
                    width="w-full"
                    fixedAspectRatio={true}
                />
                <TestimonialCard
                    backgroundImage="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&h=516&q=80"
                    imageAlt="Professional man in blue suit"
                    quote="Working with bombig.net delivered a 45% increase in leads."
                    personName="David Chen"
                    personTitle="CEO, TechSolutions"
                    width="w-full"
                    fixedAspectRatio={true}
                />
                <TestimonialCard
                    backgroundImage="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&h=516&q=80"
                    imageAlt="Professional woman in business attire"
                    quote="Their team delivered beyond our expectations."
                    personName="Michelle Rodriguez"
                    personTitle="VP of Operations"
                    width="w-full"
                    fixedAspectRatio={true}
                />
            </div>
        );
    },
};
