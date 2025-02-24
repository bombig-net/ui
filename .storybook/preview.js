import React from 'react';
import '../src/styles/globals.css';

/** @type { import('@storybook/react').Preview } */
const preview = {
    parameters: {
        backgrounds: {
            default: 'black',
            values: [
                {
                    name: 'black',
                    value: '#000000',
                },
            ],
        },
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },
    decorators: [
        (Story) =>
            React.createElement(
                'div',
                { className: 'font-serif text-neutral-300 text-base' },
                React.createElement(Story)
            ),
    ],
};

export default preview;
