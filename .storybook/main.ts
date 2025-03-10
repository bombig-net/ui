import { resolve } from 'path';

import type { StorybookConfig } from '@storybook/react-vite';
import autoprefixer from 'autoprefixer';
import tailwindcss from 'tailwindcss';

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
    staticDirs: ['./public', { from: '../src/assets/fonts', to: '/fonts' }],
    async viteFinal(config) {
        await Promise.resolve();

        return {
            ...config,
            resolve: {
                alias: {
                    '@': resolve(__dirname, '../src'),
                },
            },
            css: {
                postcss: {
                    plugins: [tailwindcss, autoprefixer],
                },
            },
        };
    },
};

export default config;
