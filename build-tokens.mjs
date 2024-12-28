import StyleDictionary from 'style-dictionary';
import { register } from '@tokens-studio/sd-transforms';

register(StyleDictionary);

// Helper function to convert hex to RGB channels
function hexToRGBChannels(hex) {
    const cleanHex = hex.replace('#', '');
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    return `${r} ${g} ${b}`;
}

StyleDictionary.registerFormat({
    name: 'css/variables-rgb',
    format: function ({ dictionary }) {
        return `/**
 * Do not edit directly, this file was auto-generated.
 */

:root {
${dictionary.allTokens.map(token => {
            if (token.type === 'color') {
                return `  --${token.name}: ${hexToRGBChannels(token.value)}; /* ${token.description || ''} */`;
            }
            return `  --${token.name}: ${token.value};${token.description ? ` /* ${token.description} */` : ''}`;
        }).join('\n')}
}`
    }
});

const sd = new StyleDictionary({
    source: ['tokens/**/*.json'],
    preprocessors: ['tokens-studio'],
    platforms: {
        css: {
            transformGroup: 'tokens-studio',
            transforms: ['name/kebab'],
            buildPath: 'src/styles/',
            files: [{
                destination: 'variables.css',
                format: 'css/variables-rgb'
            }]
        }
    }
});

sd.buildAllPlatforms();