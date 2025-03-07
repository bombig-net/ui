import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../button/button';

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardImage,
    CardLabel,
    CardTitle,
} from './card';

const meta = {
    title: 'Components/Card',
    component: Card,
    parameters: {
        docs: {
            description: {
                component: `
A versatile card component that serves as a container for related content. Styled with a pure black background, meteor-600 borders, and duck-400 accents for headlines.

### Features
- Pure black background with meteor-600 border
- Duck-400 colored headings with sans-serif font
- Serif font for content body
- Sans-serif font for labels
- Responsive image handling with zoom effects
- Multiple visual variants and styles
- Interactive states with hover and press effects
- Accessible keyboard navigation and ARIA attributes
- Optional Label component for bottom metadata (with regular and emphasized styles)

### Anatomy
\`\`\`tsx
<Card>
    <CardHeader>
        <CardTitle>Title</CardTitle>
        <CardDescription>Description</CardDescription>
    </CardHeader>
    <CardContent>Content</CardContent>
    <CardFooter>Footer</CardFooter>
    <CardLabel isEmphasized>Label</CardLabel>
</Card>
\`\`\`

### Accessibility
- Uses semantic HTML elements
- Proper heading hierarchy with configurable levels
- ARIA attributes for interactive states
- Keyboard navigation support
- Focus management and visible focus indicators
- Support for decorative and meaningful images

### Customization
The card can be customized through:
- Visual variants (default, ghost, outline)
- Shadow depth (none, sm, md, lg)
- Border radius (none, sm, md, lg)
- Backdrop blur effects
- Interactive behaviors
- Label emphasis (regular or emphasized with duck-400 color)
                `,
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            description: 'The visual style variant of the card',
            control: 'select',
            options: ['default', 'ghost', 'outline'],
        },
        shadow: {
            description: 'The shadow depth of the card',
            control: 'select',
            options: ['none', 'sm', 'md', 'lg'],
        },
        radius: {
            description: 'The border radius of the card',
            control: 'select',
            options: ['none', 'sm', 'md', 'lg'],
        },
        blur: {
            description: 'The intensity of the backdrop blur effect',
            control: 'select',
            options: ['none', 'sm', 'md', 'lg'],
        },
        isClickable: {
            description: 'Whether the entire card is clickable',
            control: 'boolean',
        },
        isHoverable: {
            description: 'Whether the card shows a hover effect',
            control: 'boolean',
        },
        isDisabled: {
            description: 'Whether the card is disabled (only applies to clickable cards)',
            control: 'boolean',
        },
        disableAnimation: {
            description: 'Whether to disable the entrance animation',
            control: 'boolean',
        },
        allowTextSelectionOnPress: {
            description: 'Whether to allow text selection on clickable cards',
            control: 'boolean',
        },
        fullWidth: {
            description: 'Whether the card should take up full width',
            control: 'boolean',
        },
    },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof Card>;

// 1. Basic Examples
export const Default: Story = {
    args: {
        children: (
            <>
                <CardHeader>
                    <CardTitle>Paper prototypes</CardTitle>
                    <CardDescription>A versatile tool for early design testing</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>
                        Paper prototypes allow designers to test interfaces with real users before
                        investing in development time.
                    </p>
                </CardContent>
                <CardLabel>Label</CardLabel>
            </>
        ),
    },
};

export const WithImage: Story = {
    name: 'Image Card',
    render: () => (
        <Card>
            <CardImage
                src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809"
                alt="Colorful abstract design"
                className="h-48"
            />
            <CardHeader>
                <CardTitle>Paper prototypes</CardTitle>
                <CardDescription>Can be used for usability testing with real users</CardDescription>
            </CardHeader>
            <CardLabel>Label</CardLabel>
        </Card>
    ),
};

export const WithActions: Story = {
    name: 'With Action Buttons',
    render: () => (
        <Card>
            <CardHeader>
                <CardTitle>Action Card</CardTitle>
                <CardDescription>
                    Cards can include interactive elements for user engagement
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p>This card demonstrates how our styled buttons integrate with cards.</p>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>Submit</Button>
            </CardFooter>
        </Card>
    ),
};

// 2. Visual Variants
export const Variants: Story = {
    name: 'Style Variants',
    render: () => (
        <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
            <Card variant="default">
                <CardHeader>
                    <CardTitle>Default</CardTitle>
                    <CardDescription>Standard card with meteor-600 border</CardDescription>
                </CardHeader>
                <CardContent>Hover to see the border lighten</CardContent>
                <CardLabel>Label</CardLabel>
            </Card>
            <Card variant="ghost">
                <CardHeader>
                    <CardTitle>Ghost</CardTitle>
                    <CardDescription>Transparent background with no border</CardDescription>
                </CardHeader>
                <CardContent>Ghost variant for subtle UI elements</CardContent>
                <CardLabel>Label</CardLabel>
            </Card>
            <Card variant="outline">
                <CardHeader>
                    <CardTitle>Outline</CardTitle>
                    <CardDescription>With meteor-600 border emphasis</CardDescription>
                </CardHeader>
                <CardContent>Outline variant with accent border</CardContent>
                <CardLabel>Label</CardLabel>
            </Card>
        </div>
    ),
};

// Example matching the screenshot
export const PrototypeCard: Story = {
    name: 'Prototype Info Card',
    render: () => (
        <Card className="max-w-sm">
            <CardImage
                src="https://images.unsplash.com/photo-1512446816042-444d641267d4?q=80&w=1000"
                alt="Amazon Echo Dot with illuminated blue-green ring on wooden surface"
                className="h-48 object-cover"
            />
            <CardHeader className="pb-0">
                <CardTitle>Paper prototypes</CardTitle>
                <CardDescription>Can be used for usability testing with real users</CardDescription>
            </CardHeader>
            <CardLabel isEmphasized>Label</CardLabel>
        </Card>
    ),
};

// Interactive Demo Card
export const InteractiveCard: Story = {
    name: 'Interactive Card',
    render: () => (
        <Card isClickable isHoverable className="max-w-sm">
            <CardImage
                src="https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=1000"
                alt="Dog looking at camera"
                className="h-48"
            />
            <CardHeader>
                <CardTitle>Interactive card</CardTitle>
                <CardDescription>Click on this card to trigger an action</CardDescription>
            </CardHeader>
            <CardLabel>Click me</CardLabel>
        </Card>
    ),
};

// Grid of cards
export const CardGrid: Story = {
    name: 'Card Grid',
    render: () => (
        <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} isHoverable>
                    <CardHeader>
                        <CardTitle>Card {i + 1}</CardTitle>
                        <CardDescription>A grid of styled cards</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p>This demonstrates how multiple cards look in a grid layout.</p>
                    </CardContent>
                    <CardLabel>Label {i + 1}</CardLabel>
                </Card>
            ))}
        </div>
    ),
};
