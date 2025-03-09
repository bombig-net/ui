import { groupTokensByType } from './groupTokensByType';

describe('groupTokensByType', () => {
    it('should group color tokens correctly', () => {
        const tokenSet = {
            global: {
                'duck-50': { value: '#fefde8', type: 'color' },
                'duck-100': { value: '#fffcc2', type: 'color' },
            },
            $themes: [],
            $metadata: { tokenSetOrder: ['global'] },
        };

        expect(groupTokensByType(tokenSet)).toEqual({
            color: {
                'duck-50': '#fefde8',
                'duck-100': '#fffcc2',
            },
        });
    });

    it('should group typography tokens with complex values', () => {
        const tokenSet = {
            global: {
                'text-base': {
                    value: {
                        fontSize: '16px',
                        lineHeight: '24px',
                        letterSpacing: '0px',
                    },
                    type: 'typography',
                },
            },
            $themes: [],
            $metadata: { tokenSetOrder: ['global'] },
        };

        expect(groupTokensByType(tokenSet)).toEqual({
            typography: {
                'text-base': {
                    fontSize: '16px',
                    lineHeight: '24px',
                    letterSpacing: '0px',
                },
            },
        });
    });

    it('should handle multiple token types simultaneously', () => {
        const tokenSet = {
            global: {
                'duck-50': { value: '#fefde8', type: 'color' },
                'spacing-1': { value: '4px', type: 'spacing' },
                'font-sans': { value: 'Arial', type: 'fontFamilies' },
            },
            $themes: [],
            $metadata: { tokenSetOrder: ['global'] },
        };

        expect(groupTokensByType(tokenSet)).toEqual({
            color: { 'duck-50': '#fefde8' },
            spacing: { 'spacing-1': '4px' },
            fontFamilies: { 'font-sans': 'Arial' },
        });
    });

    it('should handle empty token set', () => {
        const tokenSet = {
            global: {},
            $themes: [],
            $metadata: { tokenSetOrder: ['global'] },
        };

        expect(groupTokensByType(tokenSet)).toEqual({});
    });

    it('groups tokens by their type', () => {
        const tokenSet = {
            global: {
                'duck-50': {
                    value: '#fefde8',
                    type: 'color',
                },
                'tracking-tight': {
                    value: '-0.025em',
                    type: 'letterSpacing',
                },
                'text-base': {
                    value: {
                        fontSize: '20px',
                        lineHeight: '28px',
                        letterSpacing: '{tracking-tight}',
                    },
                    type: 'typography',
                },
            },
            $themes: [],
            $metadata: {
                tokenSetOrder: ['global'],
            },
        };

        const result = groupTokensByType(tokenSet);

        // Check that tokens are grouped by type
        expect(result.color).toBeDefined();
        expect(result.letterSpacing).toBeDefined();
        expect(result.typography).toBeDefined();

        // Type assertion to handle the 'possibly undefined' error
        const colorTokens = result.color as Record<string, string>;
        const letterSpacingTokens = result.letterSpacing as Record<string, string>;
        const typographyTokens = result.typography as Record<
            string,
            {
                fontSize: string;
                lineHeight: string;
                letterSpacing: string;
            }
        >;

        // Check that direct values are correctly extracted
        expect(colorTokens['duck-50']).toBe('#fefde8');
        expect(letterSpacingTokens['tracking-tight']).toBe('-0.025em');

        // Check that nested token references are correctly resolved
        expect(typographyTokens['text-base']).toEqual({
            fontSize: '20px',
            lineHeight: '28px',
            letterSpacing: '-0.025em', // This should be resolved from {tracking-tight}
        });
    });
});
