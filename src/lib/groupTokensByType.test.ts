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
});
