// @ts-check
/**
 * Script to copy assets to dist folder
 * This ensures fonts and configuration files are available to consumers
 */

/* eslint-disable */
import { promises as fs } from 'fs';
import path from 'path';

async function copyAssets() {
    try {
        // Copy font files to dist/fonts
        const srcFontDir = './src/assets/fonts';
        const destFontDir = './dist/fonts';

        // Ensure fonts directory exists
        await fs.mkdir(destFontDir, { recursive: true });

        // List all font files
        const fontFiles = await fs.readdir(srcFontDir);

        // Copy each font file
        for (const file of fontFiles) {
            if (file.endsWith('.woff2')) {
                const srcPath = path.join(srcFontDir, file);
                const destPath = path.join(destFontDir, file);
                await fs.copyFile(srcPath, destPath);
                console.log(`Copied ${file} to dist/fonts`);
            }
        }

        // Copy tailwind.config.js to dist folder
        const configFile = await fs.readFile('./tailwind.config.js', 'utf8');
        await fs.writeFile('./dist/tailwind.config.js', configFile);
        console.log('✅ Copied tailwind.config.js to dist folder');

        // Update font paths in the CSS file
        try {
            const cssFile = await fs.readFile('./dist/styles.css', 'utf8');
            // Replace font paths to use simple relative paths in the distributed version
            const updatedCss = cssFile.replace(/\.\.\/assets\/fonts\//g, './fonts/');
            await fs.writeFile('./dist/styles.css', updatedCss);
            console.log('✅ Updated font paths in CSS file');
        } catch (err) {
            console.error('Error updating CSS file:', err);
        }

        console.log('✅ All assets copied successfully');
    } catch (err) {
        console.error('Error copying assets:', err);
        process.exit(1);
    }
}

copyAssets();
