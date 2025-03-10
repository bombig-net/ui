// @ts-check
/**
 * Copies tailwind.config.js to dist folder and fixes font paths in CSS
 * The path fixing is necessary because TailwindCSS doesn't coordinate with tsup
 */

/* eslint-disable */
import { promises as fs } from 'fs';

async function copyAssetsAndFixPaths() {
    try {
        console.log('📦 Starting asset processing...');

        // Copy tailwind.config.js to dist folder
        const configFile = await fs.readFile('./tailwind.config.js', 'utf8');
        await fs.writeFile('./dist/tailwind.config.js', configFile);
        console.log('✅ Copied tailwind.config.js to dist folder');

        // Fix font paths in the CSS file
        try {
            const cssFile = await fs.readFile('./dist/styles.css', 'utf8');

            // Replace relative paths with the correct ones
            // We need this because TailwindCSS CLI generates CSS with the original paths
            // and tsup doesn't process these files
            const updatedCss = cssFile.replace(/\.\.\/assets\/fonts\//g, './fonts/');

            await fs.writeFile('./dist/styles.css', updatedCss);
            console.log(
                '✅ Fixed font paths in CSS file to use ./fonts/ for maximum compatibility'
            );
        } catch (err) {
            console.error('❌ Error updating CSS file:', err);
        }
    } catch (err) {
        console.error('❌ Error in asset processing:', err);
        process.exit(1);
    }
}

// Execute the process
copyAssetsAndFixPaths();
