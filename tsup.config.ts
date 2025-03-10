import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    clean: true,
    minify: true,
    external: ['react', 'react-dom'],
    treeshake: true,
    // Use the built-in publicDir feature to copy assets
    publicDir: 'src/assets',
    // Customize asset handling
    loader: {
        '.woff2': 'file', // Handle font files correctly
    },
    // Log success message
    onSuccess: 'echo ✅ Build completed successfully with proper font handling',
});
