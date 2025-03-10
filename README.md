<div align="center">
  <img src="assets/hero.jpg" alt="Bombig UI Components" width="100%" />
  <br />
  <br />
  <h1>⚡ bombig/ui</h1>

[![npm version](https://img.shields.io/npm/v/@bombig/ui.svg?style=flat)](https://www.npmjs.com/package/@bombig/ui)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/@bombig/ui?label=bundle%20size)](https://bundlephobia.com/package/@bombig/ui)
[![npm downloads](https://img.shields.io/npm/dm/@bombig/ui.svg)](https://www.npmjs.com/package/@bombig/ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18+-61DAFB.svg)](https://reactjs.org/)
[![Tests](https://github.com/bombig-net/ui/actions/workflows/test.yml/badge.svg)](https://github.com/bombig-net/ui/actions/workflows/test.yml)
[![Coverage](https://github.com/bombig-net/ui/actions/workflows/coverage-report.yml/badge.svg)](https://ui.bombig.net/coverage/)
[![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@main/badge/badge-storybook.svg)](https://ui.bombig.net)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat)](https://github.com/prettier/prettier)
[![Made with React Aria](https://img.shields.io/badge/React%20Aria-Powered-7B61FF.svg?style=flat&logo=data:image/svg+xml;base64,YOUR_ENCODED_SVG)](https://react-spectrum.adobe.com/react-aria/)
[![Built with Radix](https://img.shields.io/badge/Built%20with-Radix_UI-FF3E96.svg?style=flat)](https://www.radix-ui.com/)
[![Figma Design System](https://img.shields.io/badge/Figma-Design%20System-black.svg?style=flat&logo=figma)](https://www.figma.com/)

Modern React component library powering all bombig.net websites and apps - crafted with ❤️ using React Aria, Radix UI, Tailwind CSS, and TypeScript.

[Documentation](https://ui.bombig.net) • [GitHub](https://github.com/bombig-net/ui) • [npm](https://www.npmjs.com/package/@bombig/ui) • [Coverage Report](https://ui.bombig.net/coverage/)

</div>

## ✨ Features

- 🎯 Built with React Aria and Radix UI primitives
- 🎨 Design tokens with organized typography, colors, and spacing
- 💅 All styles customizable via className prop
- ♿️ Accessible components out of the box
- 📦 Full TypeScript support with strict type checking
- 📱 Responsive design by default
- 🚀 Optimized for both development and production
- 🧪 Comprehensive test suite with Jest and Testing Library
- 🎭 Accessibility testing with jest-axe
- 📝 ESLint and Prettier integration for code quality
- 🖋️ Custom fonts bundled and ready to use

## 📦 Installation

```bash
# Using pnpm (recommended)
pnpm add @bombig/ui

# Using npm
npm install @bombig/ui

# Using yarn
yarn add @bombig/ui
```

## 💻 Usage

1. Import the CSS in your app's entry point (e.g., `app.tsx`, `_app.tsx`, or `main.tsx`):

```jsx
import '@bombig/ui/styles';
```

2. Use the components in your app:

```jsx
import { Button } from '@bombig/ui';

function App() {
    return <Button>Click me</Button>;
}
```

That's it! No additional configuration needed. The components will work out of the box with all the necessary styles and design tokens. All required fonts (Euclid Circular B and Geist Mono) are included with the package and will be loaded automatically with the styles.

If you need direct access to the font files (for example, to use in your own CSS), they are also exposed through the package:

```css
/* Example of importing fonts directly */
@font-face {
    font-family: 'Euclid Circular B';
    src: url('@bombig/ui/fonts/EuclidCircularB-Semibold-WebXL.woff2') format('woff2');
    font-weight: 600;
    font-style: normal;
    font-display: swap;
}
```

The exact syntax may vary depending on your bundler or framework. For webpack, you might need to use:

```css
@font-face {
    font-family: 'Euclid Circular B';
    src: url('~@bombig/ui/fonts/EuclidCircularB-Semibold-WebXL.woff2') format('woff2');
    /* ... */
}
```

## 🎨 Using the Design System in Your Own Components

If you want to use our design tokens, colors, typography, and other theme customizations in your own components, you can extend your Tailwind configuration:

```js
// tailwind.config.js
module.exports = {
    // Use the @bombig/ui Tailwind configuration
    presets: [require('@bombig/ui/tailwind')],
    // Your other Tailwind configuration
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
        // Include your content paths
    ],
};
```

This gives you access to all our design tokens:

```jsx
// Your custom component using our design system
function CustomCard() {
    return (
        <div className="bg-duck-400 text-lg font-sans p-6 rounded-lg">
            Custom component using Bombig UI design tokens
        </div>
    );
}
```

### Tailwind CSS Compatibility

This design system uses Tailwind CSS internally for styling. The Tailwind configuration is exposed through the package's exports, allowing you to use it as a preset in your own Tailwind setup:

```js
// tailwind.config.js
module.exports = {
    presets: [require('@bombig/ui/tailwind')],
    // Your project-specific configuration
    content: [
        './src/**/*.{js,jsx,ts,tsx}',
        // Include your content paths
    ],
};
```

This preset includes all the design system's custom colors, fonts, spacing values, and other theme settings.

## 📚 Documentation

Visit our [Storybook documentation](https://ui.bombig.net) for:

- **Component Showcase**: Explore all available components
- **Live Examples**: Interact with components and see them in action
- **Usage Guidelines**: Learn best practices for each component
- **Props Reference**: Detailed API documentation for all component properties
- **Theme Explorer**: See the complete design system tokens, colors, and typography
- **Responsive Examples**: Test components at different viewport sizes

The documentation is continuously updated as the design system evolves.

## 🛠 Development

This is bombig.net's internal design system, crafted for our projects and rapid prototyping. While primarily for internal use, we maintain high code quality standards and welcome external usage.

```bash
# Install dependencies
pnpm install

# Start development mode
pnpm dev

# Build the library (production)
pnpm build

# Build without validation (faster for development)
pnpm build:dev

# Run Storybook development server
pnpm storybook

# Build Storybook static site
pnpm build-storybook

# Run tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:coverage

# Type check
pnpm typecheck

# Lint code
pnpm lint

# Format code
pnpm format

# Validate all (types, lint, format, tests)
pnpm validate
```

### VS Code Setup

We recommend using VS Code with the following extensions for the best development experience:

- ESLint
- Prettier
- Tailwind CSS IntelliSense

The repository includes recommended VS Code settings and extensions in the `.vscode` directory.

### Code Quality

The project uses:

- TypeScript with strict mode enabled
- ESLint for code quality
- Prettier for code formatting
- Jest and Testing Library for testing
- jest-axe for accessibility testing

All code changes are validated through GitHub Actions CI/CD pipeline, which checks:

- Type correctness
- Linting rules
- Code formatting
- Test coverage
- Build success

## 🤝 Contributing

While this is our internal tool, we welcome community contributions:

- 🐛 Report bugs and issues
- 💡 Propose new components
- 🔧 Submit pull requests
- 📝 Improve documentation

Please ensure your contributions pass all validation checks:

```bash
pnpm validate
```

## ⚖️ License

MIT License - see the [LICENSE](LICENSE) file for details.

**Note:** The MIT license covers the component library code only. Bombig.net brand assets and logos remain proprietary.

---

<br />
<div align="center">

<p>
  <a href="https://bombig.net">
    <img src="assets/bombig-logo.svg" alt="Bombig.net" height="30" />
  </a>
  <br />
  <sub>Crafted with ⚡ by the team at <a href="https://bombig.net">bombig.net</a></sub>
  <br />
  <sub>Want to work with us? <a href="https://bombig.net/">Let's talk!</a></sub>
</p>

</div>
