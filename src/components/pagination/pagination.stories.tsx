import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Pagination } from './pagination';

const meta = {
    title: 'Components/Pagination',
    component: Pagination,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        total: 10,
        page: 1,
    },
    render: function Render(args) {
        const [page, setPage] = useState(args.page);
        return <Pagination {...args} page={page} onChange={setPage} />;
    },
};

export const ManyPages: Story = {
    args: {
        total: 20,
        page: 10,
    },
};

export const Small: Story = {
    args: {
        total: 5,
        page: 1,
        size: 'sm',
    },
};

export const Large: Story = {
    args: {
        total: 5,
        page: 1,
        size: 'lg',
    },
};

export const Outline: Story = {
    args: {
        total: 5,
        page: 1,
        variant: 'outline',
    },
};

export const NoControls: Story = {
    args: {
        total: 5,
        page: 1,
        showControls: false,
    },
};

export const FewPages: Story = {
    args: {
        total: 3,
        page: 1,
    },
};
