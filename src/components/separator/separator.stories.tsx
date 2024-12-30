import type { Meta, StoryObj } from '@storybook/react';

import { Separator } from './separator';

const meta = {
    title: 'Components/Separator',
    component: Separator,
    parameters: {
        docs: {
            description: {
                component: `
A visual or semantic separator between content. Built on top of [Radix UI's Separator](https://www.radix-ui.com/primitives/docs/components/separator) 
primitive with a simplified styling API.

### Features
- Semantic separator with proper ARIA attributes
- Horizontal and vertical orientations
- Three visual variants: default, muted, and strong
- Support for decorative or semantic usage
- Fully customizable through className

### Default Behavior
- Horizontal orientation
- Default variant (neutral-200 color)
- Decorative (no semantic meaning)

### Usage
\`\`\`tsx
import { Separator } from '@bombig/ui'

function Example() {
    return (
        <div>
            <h2>Section 1</h2>
            <Separator />
            <h2>Section 2</h2>
        </div>
    )
}
\`\`\`

### Semantic Usage
When the separator conveys a semantic boundary, set \`decorative={false}\`:

\`\`\`tsx
<Separator decorative={false} />
\`\`\`

### Custom Styling
Override any of the default styles using className:

\`\`\`tsx
// Custom color
<Separator className="bg-blue-200" />

// Custom spacing
<Separator className="my-8" />
\`\`\`

### Vertical Orientation
Use with flex layouts for vertical separators:

\`\`\`tsx
<div className="flex items-center h-6">
    <div>Left</div>
    <Separator orientation="vertical" className="mx-2" />
    <div>Right</div>
</div>
\`\`\`
                `,
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        orientation: {
            description: 'The orientation of the separator',
            control: 'radio',
            options: ['horizontal', 'vertical'],
        },
        variant: {
            description: 'The visual style variant of the separator',
            control: 'select',
            options: ['default', 'muted', 'strong'],
        },
        decorative: {
            description:
                'Whether the separator is purely decorative or represents a semantic boundary',
            control: 'boolean',
        },
        className: {
            description: 'Additional CSS classes to apply to the separator',
            control: 'text',
        },
    },
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof Separator>;

export const Default: Story = {
    args: {
        children: (
            <div className="space-y-4">
                <div>Above separator</div>
                <Separator />
                <div>Below separator</div>
            </div>
        ),
    },
};

export const Variants: Story = {
    render: () => (
        <div className="space-y-4">
            <div className="space-y-1">
                <p className="text-neutral-500 text-sm">Default</p>
                <Separator variant="default" />
            </div>
            <div className="space-y-1">
                <p className="text-neutral-500 text-sm">Muted</p>
                <Separator variant="muted" />
            </div>
            <div className="space-y-1">
                <p className="text-neutral-500 text-sm">Strong</p>
                <Separator variant="strong" />
            </div>
        </div>
    ),
};

export const Vertical: Story = {
    render: () => (
        <div className="flex items-center space-x-4 h-6">
            <div>Left</div>
            <Separator orientation="vertical" />
            <div>Center</div>
            <Separator orientation="vertical" />
            <div>Right</div>
        </div>
    ),
};

export const CustomStyling: Story = {
    args: {
        className: 'bg-blue-200 my-8',
    },
    render: (args) => (
        <div className="space-y-4">
            <div>Custom styled separator below</div>
            <Separator {...args} />
            <div>Custom spacing above</div>
        </div>
    ),
};
