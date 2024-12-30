import type { Meta, StoryObj } from '@storybook/react';

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './accordion';

const meta = {
    title: 'Components/Accordion',
    component: Accordion,
    parameters: {
        docs: {
            description: {
                component: `
An expandable/collapsible content area built on top of [Radix UI's Accordion](https://www.radix-ui.com/primitives/docs/components/accordion) primitive.

### Features
- Single or multiple item expansion
- Keyboard navigation
- Animated transitions
- Customizable styling through variants and className
- Full ARIA support
- Collapsible content areas

### Usage
\`\`\`tsx
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@bombig/ui'

function Example() {
    return (
        <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
                <AccordionTrigger>Section 1</AccordionTrigger>
                <AccordionContent>Content for section 1</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger>Section 2</AccordionTrigger>
                <AccordionContent>Content for section 2</AccordionContent>
            </AccordionItem>
        </Accordion>
    )
}
\`\`\`

### Multiple Items
Allow multiple items to be expanded simultaneously:

\`\`\`tsx
<Accordion type="multiple">
    {/* ... accordion items */}
</Accordion>
\`\`\`

### Custom Styling
Override default styles using className:

\`\`\`tsx
<AccordionTrigger className="text-blue-600">
    Custom trigger style
</AccordionTrigger>
\`\`\`
                `,
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        type: {
            description: 'Whether a single or multiple items can be opened at once',
            control: 'radio',
            options: ['single', 'multiple'],
        },
        collapsible: {
            description:
                'When type="single", allows closing content when clicking trigger of open item',
            control: 'boolean',
        },
        defaultValue: {
            description: 'The value of the item(s) to expand by default (controlled)',
            control: 'text',
        },
    },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Single: Story = {
    args: {
        type: 'single',
        collapsible: true,
    },
    render: (args) => (
        <Accordion {...args} className="w-full">
            <AccordionItem value="item-1">
                <AccordionTrigger>What is this component?</AccordionTrigger>
                <AccordionContent>
                    This is a React component built on top of Radix UI&apos;s Accordion primitive,
                    providing an accessible and customizable way to show and hide content.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger>Can I customize the styling?</AccordionTrigger>
                <AccordionContent>
                    Yes! You can use the variant prop for predefined styles or override any styles
                    using the className prop on any of the accordion components.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
                <AccordionTrigger>Is it accessible?</AccordionTrigger>
                <AccordionContent>
                    Yes, the component follows WAI-ARIA Accordion pattern and includes proper
                    keyboard navigation, ARIA attributes, and focus management.
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    ),
};

export const Multiple: Story = {
    args: {
        type: 'multiple',
    },
    render: (args) => (
        <Accordion {...args} className="w-full">
            <AccordionItem value="item-1">
                <AccordionTrigger>First Section</AccordionTrigger>
                <AccordionContent>
                    You can open multiple sections at once in this mode.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger>Second Section</AccordionTrigger>
                <AccordionContent>
                    Try opening this while the other sections are open!
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
                <AccordionTrigger>Third Section</AccordionTrigger>
                <AccordionContent>All sections can be open simultaneously.</AccordionContent>
            </AccordionItem>
        </Accordion>
    ),
};

export const Variants: Story = {
    args: {
        type: 'single',
        collapsible: true,
    },
    render: (args) => (
        <div className="space-y-8">
            <div>
                <h3 className="mb-4 text-neutral-500 text-sm">Default Variant</h3>
                <Accordion {...args}>
                    <AccordionItem value="default">
                        <AccordionTrigger variant="default">Default Style</AccordionTrigger>
                        <AccordionContent variant="default">
                            This uses the default styling variant.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
            <div>
                <h3 className="mb-4 text-neutral-500 text-sm">Muted Variant</h3>
                <Accordion {...args}>
                    <AccordionItem value="muted">
                        <AccordionTrigger variant="muted">Muted Style</AccordionTrigger>
                        <AccordionContent variant="muted">
                            This uses the muted styling variant.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    ),
};
