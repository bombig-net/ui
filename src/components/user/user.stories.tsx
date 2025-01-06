import type { Meta, StoryObj } from '@storybook/react';

import { User } from './user';

const meta = {
    title: 'Components/User',
    component: User,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof User>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        name: 'John Doe',
        description: 'Software Engineer',
    },
};

export const WithAvatar: Story = {
    args: {
        name: 'Jane Smith',
        description: 'Product Designer',
        avatarProps: {
            src: 'https://i.pravatar.cc/300',
            alt: 'Jane Smith',
        },
    },
};

export const WithFallback: Story = {
    args: {
        name: 'Alex Johnson',
        description: 'Developer',
        avatarFallback: '👤',
    },
};

export const Small: Story = {
    args: {
        name: 'Sam Wilson',
        description: 'UX Designer',
        size: 'sm',
    },
};

export const Large: Story = {
    args: {
        name: 'Emily Brown',
        description: 'Tech Lead',
        size: 'lg',
    },
};

export const NoDescription: Story = {
    args: {
        name: 'Mike Davis',
    },
};
