import type { Meta, StoryObj } from '@storybook/react'
import { Container } from './container'

const meta = {
    title: 'Components/Container',
    component: Container,
    parameters: {
        docs: {
            description: {
                component: `
A responsive container component that provides consistent max-width and padding across different screen sizes.
Inspired by [Radix UI Themes Container](https://github.com/radix-ui/themes/blob/main/packages/radix-ui-themes/src/components/container.tsx) 
but with a simplified API focused on composition through Tailwind classes.

### Features
- Responsive padding that adapts to screen size
- Sensible max-width defaults
- Centered layout with auto margins
- Support for polymorphic rendering with asChild
- Fully customizable through className

### Default Behavior
- Full width with centered content (mx-auto)
- Max width of 1280px (max-w-7xl)
- Responsive horizontal padding:
  - Mobile: 16px (px-4)
  - Tablet: 24px (sm:px-6)
  - Desktop: 32px (lg:px-8)

### Usage
\`\`\`tsx
import { Container } from '@bombig/ui'

function Example() {
    return (
        <Container>
            <h1>My Content</h1>
            <p>This content will be properly contained and centered.</p>
        </Container>
    )
}
\`\`\`

### Custom Styling
You can override any of the default styles using className:

\`\`\`tsx
// Custom max-width and padding
<Container className="px-8 max-w-5xl">
    Content
</Container>

// Different background color
<Container className="bg-neutral-100">
    Content
</Container>
\`\`\`

### Polymorphic Usage
Use asChild to change the underlying element while maintaining container styles:

\`\`\`tsx
<Container asChild>
    <main>
        Content
    </main>
</Container>
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
            description: 'Additional CSS classes to apply to the container',
            control: 'text'
        },
        children: {
            description: 'The content to be contained',
            control: 'text'
        }
    }
} satisfies Meta<typeof Container>

export default meta
type Story = StoryObj<typeof Container>

export const Default: Story = {
    args: {
        children: (
            <div className="flex justify-center items-center border-2 border-neutral-300 bg-neutral-100 border-dashed rounded-lg h-32">
                Contained Content
            </div>
        )
    }
}

export const CustomMaxWidth: Story = {
    args: {
        className: 'max-w-2xl',
        children: (
            <div className="flex justify-center items-center border-2 border-neutral-300 bg-neutral-100 border-dashed rounded-lg h-32">
                Narrower Container
            </div>
        )
    }
}

export const WithBackground: Story = {
    args: {
        className: 'bg-neutral-100 py-8 rounded-lg',
        children: (
            <div className="flex justify-center items-center border-2 border-neutral-300 bg-white border-dashed rounded-lg h-32">
                Container with Background
            </div>
        )
    }
}

export const AsMainElement: Story = {
    args: {
        asChild: true,
        children: (
            <main className="flex justify-center items-center border-2 border-neutral-300 bg-neutral-100 border-dashed rounded-lg h-32">
                Rendered as main element
            </main>
        )
    }
} 