import { register } from '@tokens-studio/sd-transforms';
import StyleDictionary from 'style-dictionary';

register(StyleDictionary);

const sd = new StyleDictionary({
    source: ['tokens/**/*.json'],
    preprocessors: ['tokens-studio'], // required since v0.16.0
    platforms: {
        css: {
            transformGroup: 'tokens-studio',
            transforms: ['name/kebab'],
            buildPath: 'src/styles/',
            files: [
                {
                    destination: 'variables.css',
                    format: 'css/variables'
                }
            ]
        }
    }
});

await sd.cleanAllPlatforms();
await sd.buildAllPlatforms(); 