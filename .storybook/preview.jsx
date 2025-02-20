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
};

export default preview;
