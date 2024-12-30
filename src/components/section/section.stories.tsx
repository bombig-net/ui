import type { Meta, StoryObj } from '@storybook/react'
import { Section } from './section'
import { Container } from '../container/container'

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
- Responsive vertical padding that adapts to screen size
- Support for polymorphic rendering with asChild
- Fully customizable through className

### Default Behavior
- Full width layout
- Responsive vertical padding:
  - Mobile: 32px (py-8)
  - Tablet: 48px (md:py-12)
  - Desktop: 64px (lg:py-16)

### Usage
\`\`\`tsx
import { Section, Container } from '@bombig/ui'

function Example() {
    return (
        <Section>
            <Container>
                <h2>Section Title</h2>
                <p>Section content that will have consistent vertical spacing.</p>
            </Container>
        </Section>
    )
}
\`\`\`

### Custom Styling
You can override any of the default styles using className:

\`\`\`tsx
// Custom padding
<Section className="py-16 md:py-24">
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
                `
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        asChild: {
            description: 'Change the default rendered element for the one passed as a child',
            control: 'boolean'
        },
        className: {
            description: 'Additional CSS classes to apply to the section',
            control: 'text'
        },
        children: {
            description: 'The content to be contained within the section',
            control: 'text'
        }
    }
} satisfies Meta<typeof Section>

export default meta
type Story = StoryObj<typeof Section>

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
        )
    }
}

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
        )
    }
}

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
        )
    }
}

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
        )
    }
} 