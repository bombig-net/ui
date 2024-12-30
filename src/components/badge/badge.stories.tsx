import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './badge'

const meta = {
    title: 'Components/Badge',
    component: Badge,
    parameters: {
        docs: {
            description: {
                component: `A Badge component that generates a small badge to the top-right of its child(ren). Based on MUI Base's Badge component.

Features:
- Support for custom content
- Max value display
- Show/hide zero values
- Visibility control

[MUI Base Badge Documentation](https://mui.com/base-ui/react-badge/)`
            }
        }
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
    render: () => (
        <Badge badgeContent={4}>
            <div className="bg-neutral-200 rounded w-10 h-10" />
        </Badge>
    )
}

export const WithMaxValue: Story = {
    render: () => (
        <Badge badgeContent={123} max={99}>
            <div className="bg-neutral-200 rounded w-10 h-10" />
        </Badge>
    )
}

export const WithZeroValue: Story = {
    render: () => (
        <div className="flex gap-4">
            <Badge badgeContent={0}>
                <div className="bg-neutral-200 rounded w-10 h-10" />
            </Badge>
            <Badge badgeContent={0} showZero>
                <div className="bg-neutral-200 rounded w-10 h-10" />
            </Badge>
        </div>
    )
}

export const Invisible: Story = {
    render: () => (
        <div className="flex gap-4">
            <Badge badgeContent={4}>
                <div className="bg-neutral-200 rounded w-10 h-10" />
            </Badge>
            <Badge badgeContent={4} invisible>
                <div className="bg-neutral-200 rounded w-10 h-10" />
            </Badge>
        </div>
    )
}

export const CustomContent: Story = {
    render: () => (
        <Badge badgeContent="New">
            <div className="bg-neutral-200 rounded w-10 h-10" />
        </Badge>
    )
} 