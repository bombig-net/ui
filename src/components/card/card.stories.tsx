import type { Meta, StoryObj } from '@storybook/react';

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

const meta = {
    title: 'Components/Card',
    component: Card,
    parameters: {
        docs: {
            description: {
                component: `
A versatile card component that serves as a container for related content. Built with accessibility and flexibility in mind.

### Features
- Semantic HTML structure (\`<article>\`, \`<header>\`, \`<footer>\`)
- Compound component pattern for flexible layouts
- Accessible keyboard navigation and ARIA attributes
- Multiple visual variants and styles
- Interactive states with hover and press effects
- Responsive image handling with zoom effects
- Backdrop blur effects for header/footer
- Customizable animations and text selection

### Anatomy
\`\`\`tsx
<Card>
    <CardHeader>
        <CardTitle>Title</CardTitle>
        <CardDescription>Description</CardDescription>
    </CardHeader>
    <CardContent>Content</CardContent>
    <CardFooter>Footer</CardFooter>
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
- Custom className support
- Interactive behaviors
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
                    <CardTitle>Card Title</CardTitle>
                    <CardDescription>This is a description of the card content.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>This is the main content area of the card. You can put any content here.</p>
                </CardContent>
                <CardFooter>
                    <p className="text-neutral-500 text-sm">Footer content</p>
                </CardFooter>
            </>
        ),
    },
};

export const WithActions: Story = {
    name: 'With Action Buttons',
    render: () => (
        <Card>
            <CardHeader>
                <CardTitle>Card with Actions</CardTitle>
                <CardDescription>A card with interactive elements in the footer</CardDescription>
            </CardHeader>
            <CardContent>
                <p>This card demonstrates how to include interactive elements within a card.</p>
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
        <div className="gap-4 grid grid-cols-3">
            <Card variant="default">
                <CardHeader>
                    <CardTitle>Default</CardTitle>
                    <CardDescription>Standard card with border and shadow</CardDescription>
                </CardHeader>
                <CardContent>Default variant</CardContent>
            </Card>
            <Card variant="ghost">
                <CardHeader>
                    <CardTitle>Ghost</CardTitle>
                    <CardDescription>No border or shadow</CardDescription>
                </CardHeader>
                <CardContent>Ghost variant</CardContent>
            </Card>
            <Card variant="outline">
                <CardHeader>
                    <CardTitle>Outline</CardTitle>
                    <CardDescription>Thicker border emphasis</CardDescription>
                </CardHeader>
                <CardContent>Outline variant</CardContent>
            </Card>
        </div>
    ),
};

export const Shadows: Story = {
    render: () => (
        <div className="gap-4 grid grid-cols-2">
            {(['none', 'sm', 'md', 'lg'] as const).map((shadow) => (
                <Card key={shadow} shadow={shadow}>
                    <CardHeader>
                        <CardTitle>Shadow {shadow.toUpperCase()}</CardTitle>
                        <CardDescription>Shows shadow-{shadow} elevation</CardDescription>
                    </CardHeader>
                    <CardContent>Content</CardContent>
                </Card>
            ))}
        </div>
    ),
};

export const BorderRadius: Story = {
    render: () => (
        <div className="gap-4 grid grid-cols-2">
            {(['none', 'sm', 'md', 'lg'] as const).map((radius) => (
                <Card key={radius} radius={radius}>
                    <CardHeader>
                        <CardTitle>Radius {radius.toUpperCase()}</CardTitle>
                        <CardDescription>Shows rounded-{radius} corners</CardDescription>
                    </CardHeader>
                    <CardContent>Content</CardContent>
                </Card>
            ))}
        </div>
    ),
};

// 3. Interactive States
export const Interactive: Story = {
    name: 'Interactive States',
    render: () => (
        <div className="gap-4 grid grid-cols-2">
            <Card
                isClickable
                isHoverable
                onPress={() => {
                    // In a real application, this would trigger a navigation or action
                    // Example: router.push('/details') or openModal()
                }}
            >
                <CardHeader>
                    <CardTitle>Interactive Card</CardTitle>
                    <CardDescription>Click anywhere and watch the hover effect</CardDescription>
                </CardHeader>
                <CardContent>
                    This entire card is clickable and has a scale effect on hover
                </CardContent>
            </Card>
            <Card isClickable isHoverable isDisabled>
                <CardHeader>
                    <CardTitle>Disabled Card</CardTitle>
                    <CardDescription>This card cannot be interacted with</CardDescription>
                </CardHeader>
                <CardContent>Disabled state example</CardContent>
            </Card>
        </div>
    ),
};

export const TextSelection: Story = {
    name: 'Text Selection Behavior',
    render: () => (
        <div className="gap-4 grid grid-cols-2">
            <Card isClickable isHoverable>
                <CardHeader>
                    <CardTitle>Default Behavior</CardTitle>
                    <CardDescription>Text selection disabled when clickable</CardDescription>
                </CardHeader>
                <CardContent>Try to select this text - it should be prevented</CardContent>
            </Card>
            <Card isClickable isHoverable allowTextSelectionOnPress>
                <CardHeader>
                    <CardTitle>Text Selection Enabled</CardTitle>
                    <CardDescription>Text can be selected even when clickable</CardDescription>
                </CardHeader>
                <CardContent>Try to select this text - it should work</CardContent>
            </Card>
        </div>
    ),
};

// 4. Image Examples
export const WithImage: Story = {
    name: 'Basic Image',
    render: () => (
        <div className="max-w-sm">
            <Card>
                <CardImage
                    src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1194&q=80"
                    alt="City skyline"
                    className="h-[200px]"
                />
                <CardHeader>
                    <CardTitle>City View</CardTitle>
                    <CardDescription>A beautiful city skyline at dusk</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Experience the stunning views of the city from this vantage point.</p>
                </CardContent>
            </Card>
        </div>
    ),
};

export const ImageWithZoom: Story = {
    render: () => (
        <div className="max-w-sm">
            <Card>
                <CardImage
                    src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1194&q=80"
                    alt="City skyline with zoom effect"
                    className="h-[200px]"
                    isZoomed
                />
                <CardHeader>
                    <CardTitle>Interactive Image</CardTitle>
                    <CardDescription>Hover over the image to see the zoom effect</CardDescription>
                </CardHeader>
            </Card>
        </div>
    ),
};

export const CoverImage: Story = {
    render: () => (
        <div className="max-w-sm">
            <Card className="h-[300px]">
                <CardImage
                    src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1194&q=80"
                    alt="City skyline"
                    isCover
                />
                <div className="bottom-0 absolute inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                    <CardTitle className="text-white">Cover Image</CardTitle>
                    <CardDescription className="text-white/80">
                        Image that covers the entire card with gradient overlay
                    </CardDescription>
                </div>
            </Card>
        </div>
    ),
};

// 5. Special Effects
export const BlurredSections: Story = {
    name: 'Backdrop Blur',
    render: () => (
        <div className="relative rounded-lg max-w-md overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500" />
            <Card className="relative">
                <CardHeader isBlurred>
                    <CardTitle className="text-white">Blurred Header</CardTitle>
                    <CardDescription className="text-white/80">
                        This header has a backdrop blur effect
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-white">Main content area without blur</p>
                </CardContent>
                <CardFooter isBlurred>
                    <p className="text-white">Blurred footer section</p>
                </CardFooter>
            </Card>
        </div>
    ),
};

export const CustomStyling: Story = {
    name: 'Custom Styles',
    render: () => (
        <Card className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            <CardHeader>
                <CardTitle className="text-white">Custom Styled Card</CardTitle>
                <CardDescription className="text-blue-100">
                    A card with custom background and text colors
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-white/90">
                    This card demonstrates how to apply custom styles using className
                </p>
            </CardContent>
            <CardFooter>
                <p className="text-blue-100">Custom footer styling</p>
            </CardFooter>
        </Card>
    ),
};
