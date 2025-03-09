/**
 * Tailwind CSS preset for @bombig/ui
 *
 * This preset exports our design system tokens, colors, typography, and other
 * theme customizations for use in other projects.
 */

// Import the original config
import tailwindConfig from './tailwind.config.js';

// Create a new object without the content property
const presetConfig = { ...tailwindConfig };
delete presetConfig.content;

export default presetConfig;
