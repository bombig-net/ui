import type { StorybookConfig } from '@storybook/react-vite';
import { resolve } from 'path';

const config: StorybookConfig = {
    stories: ['../src/components/**/*.stories.@(ts|tsx)'],
    addons: [
        '@storybook/addon-links',
        '@storybook/addon-essentials',
        '@storybook/addon-interactions',
    ],
    framework: '@storybook/react-vite',
    docs: {
        autodocs: 'tag',
    },
    core: {
        builder: '@storybook/builder-vite',
    },
    async viteFinal(config) {
        return {
            ...config,
            resolve: {
                alias: {
                    '@': resolve(__dirname, '../src'),
                },
            },
            css: {
                postcss: {
                    plugins: [require('tailwindcss'), require('autoprefixer')],
                },
            },
        };
    },
};

export default config;
