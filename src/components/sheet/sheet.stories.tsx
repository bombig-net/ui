import type { Meta, StoryObj } from '@storybook/react';

import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from './sheet';

const meta = {
    title: 'Components/Sheet',
    component: Sheet,
    parameters: {
        docs: {
            description: {
                component: `
A sheet component for displaying content that slides in from the edge of the screen.
Built on top of [Radix UI's Dialog](https://www.radix-ui.com/primitives/docs/components/dialog) primitive.

### Features
- Slides in from different sides (left, right, top, bottom)
- Multiple size options
- Keyboard navigation support
- Focus management
- ARIA-compliant
- Fully customizable through variants and className
- Animation effects

### Usage
\`\`\`tsx
import { 
    Sheet, 
    SheetContent, 
    SheetDescription, 
    SheetFooter, 
    SheetHeader, 
    SheetTitle, 
    SheetTrigger 
} from '@bombig/ui'

function Example() {
    return (
        <Sheet>
            <SheetTrigger>Open Sheet</SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Sheet Title</SheetTitle>
                    <SheetDescription>Sheet description goes here</SheetDescription>
                </SheetHeader>
                <div>Your content here</div>
                <SheetFooter>
                    <button>Action Button</button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
\`\`\`

### Side Variants
Choose which side the sheet appears from:

\`\`\`tsx
<SheetContent side="left">Left side content</SheetContent>
<SheetContent side="right">Right side content</SheetContent>
<SheetContent side="top">Top side content</SheetContent>
<SheetContent side="bottom">Bottom side content</SheetContent>
\`\`\`

### Size Variants
Control the size of the sheet:

\`\`\`tsx
<SheetContent size="sm">Small sheet</SheetContent>
<SheetContent size="default">Default size sheet</SheetContent>
<SheetContent size="lg">Large sheet</SheetContent>
<SheetContent size="xl">Extra large sheet</SheetContent>
<SheetContent size="full">Full width/height sheet</SheetContent>
\`\`\`

### Custom Styling
Override default styles using className:

\`\`\`tsx
<SheetContent className="custom-sheet-style">
    Custom styled sheet
</SheetContent>
\`\`\`
                `,
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        open: {
            control: 'boolean',
            description: 'Controls the open state of the sheet',
        },
        onOpenChange: {
            action: 'onOpenChange',
            description: 'Event handler called when the open state changes',
        },
    },
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

// Base sheet component used in stories
const SheetExample = ({
    side,
    size,
    variant,
}: {
    side?: 'top' | 'right' | 'bottom' | 'left';
    size?: 'sm' | 'default' | 'lg' | 'xl' | 'full';
    variant?: 'default' | 'destructive';
}) => (
    <Sheet>
        <SheetTrigger asChild>
            <button className="bg-yellow-500 hover:bg-yellow-400 px-4 py-2 rounded-sm font-sans text-black transition-colors">
                Open Sheet
            </button>
        </SheetTrigger>
        <SheetContent side={side} size={size} variant={variant}>
            <SheetHeader>
                <SheetTitle>Sheet Title</SheetTitle>
                <SheetDescription>
                    This is a description of the sheet. It provides context about the content
                    within.
                </SheetDescription>
            </SheetHeader>
            <div className="py-4">
                <p className="mb-4">
                    This is the main content area of the sheet. You can add any components or
                    content here.
                </p>
                <div className="gap-2 grid">
                    <button className="bg-neutral-800 hover:bg-neutral-700 px-4 py-2 rounded-sm transition-colors">
                        Button 1
                    </button>
                    <button className="bg-neutral-800 hover:bg-neutral-700 px-4 py-2 rounded-sm transition-colors">
                        Button 2
                    </button>
                </div>
            </div>
            <SheetFooter>
                <button className="bg-yellow-500 hover:bg-yellow-400 px-4 py-2 rounded-sm font-sans text-black transition-colors">
                    Save Changes
                </button>
            </SheetFooter>
        </SheetContent>
    </Sheet>
);

export const Default: Story = {
    render: () => <SheetExample />,
};

export const FromLeft: Story = {
    render: () => <SheetExample side="left" />,
};

export const FromTop: Story = {
    render: () => <SheetExample side="top" />,
};

export const FromBottom: Story = {
    render: () => <SheetExample side="bottom" />,
};

export const Destructive: Story = {
    render: () => <SheetExample variant="destructive" />,
};

export const Small: Story = {
    render: () => <SheetExample size="sm" />,
};

export const Large: Story = {
    render: () => <SheetExample size="lg" />,
};

export const ExtraLarge: Story = {
    render: () => <SheetExample size="xl" />,
};

export const FullSize: Story = {
    render: () => <SheetExample size="full" />,
};

export const BottomLarge: Story = {
    render: () => <SheetExample side="bottom" size="lg" />,
};

export const TopSmall: Story = {
    render: () => <SheetExample side="top" size="sm" />,
};

export const AllVariants: Story = {
    render: () => (
        <div className="flex flex-wrap gap-4">
            <div className="mb-8">
                <h3 className="mb-2 font-bold text-lg">Side Variants</h3>
                <div className="flex gap-4">
                    <div>
                        <p className="mb-2">Right (Default)</p>
                        <SheetExample />
                    </div>
                    <div>
                        <p className="mb-2">Left</p>
                        <SheetExample side="left" />
                    </div>
                    <div>
                        <p className="mb-2">Top</p>
                        <SheetExample side="top" />
                    </div>
                    <div>
                        <p className="mb-2">Bottom</p>
                        <SheetExample side="bottom" />
                    </div>
                </div>
            </div>

            <div className="mb-8">
                <h3 className="mb-2 font-bold text-lg">Size Variants</h3>
                <div className="flex gap-4">
                    <div>
                        <p className="mb-2">Small</p>
                        <SheetExample size="sm" />
                    </div>
                    <div>
                        <p className="mb-2">Default</p>
                        <SheetExample />
                    </div>
                    <div>
                        <p className="mb-2">Large</p>
                        <SheetExample size="lg" />
                    </div>
                    <div>
                        <p className="mb-2">Extra Large</p>
                        <SheetExample size="xl" />
                    </div>
                    <div>
                        <p className="mb-2">Full</p>
                        <SheetExample size="full" />
                    </div>
                </div>
            </div>

            <div className="mb-8">
                <h3 className="mb-2 font-bold text-lg">Appearance Variants</h3>
                <div className="flex gap-4">
                    <div>
                        <p className="mb-2">Default</p>
                        <SheetExample />
                    </div>
                    <div>
                        <p className="mb-2">Destructive</p>
                        <SheetExample variant="destructive" />
                    </div>
                </div>
            </div>

            <div className="mb-8">
                <h3 className="mb-2 font-bold text-lg">Compound Variants</h3>
                <div className="flex gap-4">
                    <div>
                        <p className="mb-2">Bottom + Large</p>
                        <SheetExample side="bottom" size="lg" />
                    </div>
                    <div>
                        <p className="mb-2">Left + Small</p>
                        <SheetExample side="left" size="sm" />
                    </div>
                    <div>
                        <p className="mb-2">Top + Destructive</p>
                        <SheetExample side="top" variant="destructive" />
                    </div>
                </div>
            </div>
        </div>
    ),
};
