import eslint from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import storybookPlugin from 'eslint-plugin-storybook';
import tailwindPlugin from 'eslint-plugin-tailwindcss';
import globals from 'globals';

/** @type {import('eslint').Linter.Config[]} */
export default [
    eslint.configs.recommended,
    {
        ignores: [
            'dist/**',
            'storybook-static/**',
            'node_modules/**',
            '.next/**',
            'coverage/**',
            'build/**',
            'public/**',
        ],
    },
    // JavaScript config files
    {
        files: ['*.config.js', 'postcss.config.js', 'tailwind.config.js'],
        languageOptions: {
            globals: {
                ...globals.node,
                module: true,
            },
            sourceType: 'module',
            ecmaVersion: 'latest',
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                allowImportExportEverywhere: true,
                importAssertions: true,
            },
        },
    },
    // TypeScript config files
    {
        files: ['*.config.ts', 'tsup.config.ts'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: './tsconfig.json',
                ecmaVersion: 2022,
                sourceType: 'module',
            },
        },
        plugins: {
            '@typescript-eslint': tseslint,
        },
        rules: {
            '@typescript-eslint/no-unsafe-assignment': 'off',
            '@typescript-eslint/no-unsafe-member-access': 'off',
            '@typescript-eslint/no-unsafe-return': 'off',
            '@typescript-eslint/no-unsafe-call': 'off',
        },
    },
    {
        files: ['**/*.{ts,tsx}'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                project: './tsconfig.json',
                ecmaVersion: 2022,
                sourceType: 'module',
                ecmaFeatures: { jsx: true },
            },
            globals: {
                ...globals.browser,
                ...globals.node,
                React: true,
                JSX: true,
            },
        },
        plugins: {
            '@typescript-eslint': tseslint,
            react: reactPlugin,
            'react-hooks': reactHooksPlugin,
            tailwindcss: tailwindPlugin,
            import: importPlugin,
        },
        settings: {
            react: { version: 'detect' },
            'import/parsers': {
                '@typescript-eslint/parser': ['.ts', '.tsx'],
            },
            'import/resolver': {
                typescript: { alwaysTryTypes: true },
                node: true,
            },
        },
        rules: {
            // TypeScript strict rules
            ...tseslint.configs.recommended.rules,
            ...tseslint.configs['recommended-requiring-type-checking'].rules,
            ...tseslint.configs.strict.rules,
            '@typescript-eslint/explicit-module-boundary-types': 'error',
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                },
            ],
            '@typescript-eslint/consistent-type-imports': [
                'error',
                {
                    prefer: 'type-imports',
                },
            ],
            '@typescript-eslint/no-non-null-assertion': 'error',
            '@typescript-eslint/no-floating-promises': 'error',
            '@typescript-eslint/no-misused-promises': 'error',
            '@typescript-eslint/await-thenable': 'error',
            '@typescript-eslint/no-unnecessary-condition': 'error',

            // React strict rules
            ...reactPlugin.configs.recommended.rules,
            ...reactHooksPlugin.configs.recommended.rules,
            'react/prop-types': 'off',
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'error',
            'react/react-in-jsx-scope': 'off',
            'react/jsx-no-leaked-render': ['error', { validStrategies: ['ternary'] }],
            'react/jsx-handler-names': [
                'error',
                {
                    eventHandlerPrefix: 'handle',
                    eventHandlerPropPrefix: 'on',
                },
            ],

            // Import rules
            'import/order': [
                'error',
                {
                    groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
                    pathGroups: [
                        {
                            pattern: 'react',
                            group: 'external',
                            position: 'before',
                        },
                        {
                            pattern: '@/**',
                            group: 'internal',
                            position: 'after',
                        },
                    ],
                    pathGroupsExcludedImportTypes: ['react'],
                    'newlines-between': 'always',
                    alphabetize: {
                        order: 'asc',
                        caseInsensitive: true,
                    },
                },
            ],
            'import/first': 'error',
            'import/newline-after-import': 'error',
            'import/no-duplicates': 'error',
            'import/no-cycle': 'error',
            'import/no-useless-path-segments': 'error',

            // General rules
            'no-console': ['error', { allow: ['warn', 'error'] }],
            'no-debugger': 'error',
            'no-alert': 'error',
            'no-undef': 'error',
            'prefer-const': 'error',
            'no-var': 'error',
            eqeqeq: ['error', 'always'],
            curly: ['error', 'all'],
        },
    },
    {
        files: [
            '**/*.test.{ts,tsx}',
            '**/*.spec.{ts,tsx}',
            'src/lib/test-utils.tsx',
            'jest.setup.ts',
        ],
        languageOptions: {
            globals: {
                ...globals.jest,
                jest: true,
                expect: true,
                describe: true,
                it: true,
                beforeEach: true,
                afterEach: true,
            },
        },
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-unsafe-assignment': 'off',
            '@typescript-eslint/no-unsafe-member-access': 'off',
            '@typescript-eslint/no-unsafe-call': 'off',
            '@typescript-eslint/unbound-method': 'off',
        },
    },
    {
        files: ['**/*.stories.{ts,tsx}'],
        plugins: { storybook: storybookPlugin },
        rules: {
            ...storybookPlugin.configs.recommended.rules,
            'storybook/hierarchy-separator': 'error',
            'storybook/default-exports': 'error',
        },
    },
    {
        files: ['.storybook/**/*.{js,ts}'],
        plugins: { storybook: storybookPlugin },
        rules: {
            ...storybookPlugin.configs.recommended.rules,
        },
    },
];
