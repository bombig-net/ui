import * as React from 'react';

import type { Meta, StoryObj } from '@storybook/react';

import { Link } from './link';

const meta = {
    title: 'Components/Link',
    component: Link,
    parameters: {
        docs: {
            description: {
                component: `A Link component that provides accessible link behavior. Based on React Aria's Link component.

Features:
- Support for both client-side and standard navigation
- Keyboard focus management and keyboard activation
- Support for disabled state
- Sophisticated hover, focus, and press states
- Underline decoration with improved contrast
- Focus visible ring for keyboard navigation
- Support for custom styling based on component state
- Follows WAI-ARIA Link pattern for accessibility

[React Aria Link Documentation](https://react-spectrum.adobe.com/react-aria/Link.html)`,
            },
        },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: 'Default Link',
        href: '#',
    },
};

export const Muted: Story = {
    args: {
        children: 'Muted Link',
        href: '#',
        variant: 'muted',
    },
};

export const Subtle: Story = {
    args: {
        children: 'Subtle Link',
        href: '#',
        variant: 'subtle',
    },
};

export const Disabled: Story = {
    args: {
        children: 'Disabled Link',
        href: '#',
        isDisabled: true,
    },
};

export const ExternalLink: Story = {
    args: {
        children: (
            <>
                External Link
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4"
                >
                    <path
                        fillRule="evenodd"
                        d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z"
                        clipRule="evenodd"
                    />
                    <path
                        fillRule="evenodd"
                        d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z"
                        clipRule="evenodd"
                    />
                </svg>
            </>
        ),
        href: 'https://example.com',
        target: '_blank',
        rel: 'noopener noreferrer',
    },
};

export const InlineText: Story = {
    args: {
        children: 'Inline link',
        href: '#',
    },
    decorators: [
        (Story: () => React.JSX.Element): React.JSX.Element => (
            <p>
                This is a paragraph with an {Story()} in the middle of the text to demonstrate how
                it flows with the content.
            </p>
        ),
    ],
};
