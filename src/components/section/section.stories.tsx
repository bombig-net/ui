import type { Meta, StoryObj } from '@storybook/react';

import { Container } from '@/components/container/container';

import { Section } from './section';

const meta = {
    title: 'Components/Section',
    component: Section,
    parameters: {
        docs: {
            description: {
                component: `
A semantic sectioning component that provides consistent vertical spacing with responsive adjustments.
Inspired by [Radix UI Themes Section](https://github.com/radix-ui/themes/blob/main/packages/radix-ui-themes/src/components/section.tsx)
but with a simplified API focused on composition through Tailwind classes.

### Features
- Semantic \`<section>\` element by default
- Progressive responsive padding that scales with screen size
- Support for polymorphic rendering with asChild
- Fully customizable through className

### Default Behavior
- Full width layout
- Progressive responsive padding:
  - Mobile (< 768px): 24px (py-6)
  - Tablet (≥ 768px): 48px (md:py-12)
  - Desktop (≥ 1024px): 96px (lg:py-24)

The padding scales progressively, doubling at each breakpoint to create a natural visual hierarchy:
- Mobile → Tablet: 24px → 48px (2x)
- Tablet → Desktop: 48px → 96px (2x)

This scaling ensures comfortable spacing across all devices while preserving valuable screen space on mobile.

### Usage
\`\`\`tsx
import { Section, Container } from '@bombig/ui'

function Example() {
    return (
        <Section>
            <Container>
                <h2>Section Title</h2>
                <p>Section content with responsive vertical spacing.</p>
            </Container>
        </Section>
    )
}
\`\`\`

### Custom Styling
You can override any of the default styles using className:

\`\`\`tsx
// Custom padding
<Section className="py-8 md:py-16 lg:py-32">
    Content
</Section>

// With background color
<Section className="bg-neutral-100">
    Content
</Section>
\`\`\`

### Polymorphic Usage
Use asChild to change the underlying element while maintaining section styles:

\`\`\`tsx
<Section asChild>
    <article>
        Content
    </article>
</Section>
\`\`\`

### Common Patterns
Sections are often used with Containers to create a consistent layout structure:

\`\`\`tsx
<Section className="bg-neutral-100">
    <Container>
        <h2>Section with Background</h2>
        <p>Content that is both contained and has section spacing.</p>
    </Container>
</Section>
\`\`\`

### Responsive Design
The section's padding is designed to create a comfortable reading experience across all devices:
- Mobile devices get compact spacing to maximize content area
- Tablet devices get moderate spacing for better content separation
- Desktop screens get generous spacing for optimal readability and visual hierarchy

This progressive scaling helps maintain visual consistency while adapting to each device's constraints and capabilities.
                `,
            },
        },
    },
    tags: ['autodocs'],
    argTypes: {
        asChild: {
            description: 'Change the default rendered element for the one passed as a child',
            control: 'boolean',
        },
        className: {
            description: 'Additional CSS classes to apply to the section',
            control: 'text',
        },
        children: {
            description: 'The content to be contained within the section',
            control: 'text',
        },
    },
} satisfies Meta<typeof Section>;

export default meta;
type Story = StoryObj<typeof Section>;

export const Default: Story = {
    args: {
        children: (
            <Container>
                <div className="space-y-4">
                    <div className="bg-neutral-200 rounded w-1/4 h-8" />
                    <div className="bg-neutral-100 rounded w-3/4 h-4" />
                    <div className="bg-neutral-100 rounded w-2/3 h-4" />
                </div>
            </Container>
        ),
    },
};

export const WithBackground: Story = {
    args: {
        className: 'bg-neutral-100',
        children: (
            <Container>
                <div className="space-y-4">
                    <div className="bg-neutral-300 rounded w-1/4 h-8" />
                    <div className="bg-neutral-200 rounded w-3/4 h-4" />
                    <div className="bg-neutral-200 rounded w-2/3 h-4" />
                </div>
            </Container>
        ),
    },
};

export const CustomSpacing: Story = {
    args: {
        className: 'py-16 md:py-24',
        children: (
            <Container>
                <div className="space-y-4">
                    <div className="bg-neutral-200 rounded w-1/4 h-8" />
                    <div className="bg-neutral-100 rounded w-3/4 h-4" />
                    <div className="bg-neutral-100 rounded w-2/3 h-4" />
                </div>
            </Container>
        ),
    },
};

export const AsArticle: Story = {
    args: {
        asChild: true,
        children: (
            <article>
                <Container>
                    <div className="space-y-4">
                        <div className="bg-neutral-200 rounded w-1/4 h-8" />
                        <div className="bg-neutral-100 rounded w-3/4 h-4" />
                        <div className="bg-neutral-100 rounded w-2/3 h-4" />
                    </div>
                </Container>
            </article>
        ),
    },
};
