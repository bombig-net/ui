import type { Meta, StoryObj } from '@storybook/react'
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from './navigation-menu'

const meta = {
    title: 'Components/NavigationMenu',
    component: NavigationMenu,
    parameters: {
        docs: {
            description: {
                component: `
A collection of navigation components built on top of [Radix UI's Navigation Menu](https://www.radix-ui.com/primitives/docs/components/navigation-menu) primitive.

### Features
- Keyboard navigation
- Composable parts (Trigger, Content, Link)
- Animated transitions
- Customizable styling through variants and className
- Full ARIA support
- Hover and focus states
- Submenus with automatic positioning

### Usage
\`\`\`tsx
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
} from '@bombig/ui'

function Example() {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <NavigationMenuLink href="/item-one">
                            Link to Item One
                        </NavigationMenuLink>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
            <NavigationMenuViewport />
        </NavigationMenu>
    )
}
\`\`\`

### Custom Styling
Override default styles using className:

\`\`\`tsx
<NavigationMenuTrigger className="text-blue-600">
    Custom trigger style
</NavigationMenuTrigger>
\`\`\`
                `
            }
        }
    },
    tags: ['autodocs']
} satisfies Meta<typeof NavigationMenu>

export default meta
type Story = StoryObj<typeof NavigationMenu>

export const Basic: Story = {
    render: () => (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <div className="gap-3 grid p-6 w-[400px]">
                            <NavigationMenuLink href="/docs">
                                <div className="font-medium text-sm">Introduction</div>
                                <div className="text-neutral-500 text-sm">
                                    A quick overview of the library and its features.
                                </div>
                            </NavigationMenuLink>
                            <NavigationMenuLink href="/docs/installation">
                                <div className="font-medium text-sm">Installation</div>
                                <div className="text-neutral-500 text-sm">
                                    Step-by-step guide to installing the library.
                                </div>
                            </NavigationMenuLink>
                        </div>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Components</NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <div className="gap-3 grid p-6 w-[400px]">
                            <NavigationMenuLink href="/docs/components/button">
                                <div className="font-medium text-sm">Button</div>
                                <div className="text-neutral-500 text-sm">
                                    Interactive button component with variants.
                                </div>
                            </NavigationMenuLink>
                            <NavigationMenuLink href="/docs/components/accordion">
                                <div className="font-medium text-sm">Accordion</div>
                                <div className="text-neutral-500 text-sm">
                                    Expandable content sections.
                                </div>
                            </NavigationMenuLink>
                        </div>
                    </NavigationMenuContent>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink href="/about" className="px-4 py-2">
                        About
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
            <NavigationMenuViewport />
        </NavigationMenu>
    )
}

export const Variants: Story = {
    render: () => (
        <div className="space-y-8">
            <div>
                <h3 className="mb-4 text-neutral-500 text-sm">Default Variant</h3>
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger variant="default">
                                Default Style
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <div className="p-4">Default content</div>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                    <NavigationMenuViewport />
                </NavigationMenu>
            </div>
            <div>
                <h3 className="mb-4 text-neutral-500 text-sm">Muted Variant</h3>
                <NavigationMenu>
                    <NavigationMenuList>
                        <NavigationMenuItem>
                            <NavigationMenuTrigger variant="muted">
                                Muted Style
                            </NavigationMenuTrigger>
                            <NavigationMenuContent>
                                <div className="p-4">Muted content</div>
                            </NavigationMenuContent>
                        </NavigationMenuItem>
                    </NavigationMenuList>
                    <NavigationMenuViewport />
                </NavigationMenu>
            </div>
        </div>
    )
} 