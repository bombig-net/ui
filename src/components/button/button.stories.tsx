import type { Meta, StoryObj } from '@storybook/react'
import { Button } from './button'

const meta = {
    title: 'Components/Button',
    component: Button,
    parameters: {
        docs: {
            description: {
                component: 'A button component that follows WAI-ARIA Button pattern and provides various visual styles.'
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            description: 'The visual style variant of the button',
            control: 'select',
            options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link']
        },
        size: {
            description: 'The size variant of the button',
            control: 'select',
            options: ['default', 'sm', 'lg', 'icon']
        },
        children: {
            description: 'The content to display inside the button',
            control: 'text'
        },
        isDisabled: {
            description: 'Whether the button is disabled',
            control: 'boolean'
        }
    }
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof Button>

export const Default: Story = {
    args: {
        children: 'Button',
        variant: 'default'
    }
}

export const Secondary: Story = {
    args: {
        children: 'Secondary',
        variant: 'secondary'
    }
}

export const Destructive: Story = {
    args: {
        children: 'Destructive',
        variant: 'destructive'
    }
}

export const Outline: Story = {
    args: {
        children: 'Outline',
        variant: 'outline'
    }
}

export const Ghost: Story = {
    args: {
        children: 'Ghost',
        variant: 'ghost'
    }
}

export const Link: Story = {
    args: {
        children: 'Link',
        variant: 'link'
    }
}

export const Small: Story = {
    args: {
        children: 'Small',
        size: 'sm'
    }
}

export const Large: Story = {
    args: {
        children: 'Large',
        size: 'lg'
    }
}

export const Disabled: Story = {
    args: {
        children: 'Disabled',
        isDisabled: true
    }
}

export const WithIcon: Story = {
    args: {
        children: '→',
        size: 'icon'
    }
}