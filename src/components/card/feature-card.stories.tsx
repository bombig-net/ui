import type { Meta, StoryObj } from '@storybook/react';

import exampleFeature from '../../assets/example-feature.png';

import { FeatureCard } from './feature-card';

const meta: Meta<typeof FeatureCard> = {
    title: 'Components/Card/FeatureCard',
    component: FeatureCard,
    tags: ['autodocs'],
    args: {
        featureImage: exampleFeature,
        imageAlt: 'Feature example',
        title: 'Rank at the top of Google',
        width: 'w-64',
        size: 'md',
        fixedAspectRatio: true,
        aspectRatio: 'aspect-[1/1]',
    },
    parameters: {
        docs: {
            description: {
                component: `
The FeatureCard component is designed to showcase feature images with a distinctive background effect.
- The component uses a standardized effect with:
  - Concrete/beton texture background with meteor color overlay
  - Gradient that fades to black at the bottom
  - Feature image that fills the entire card
  - Title automatically split into two lines, each with its own yellow background block
- Text is centered and uses font-sans with yellow background
- Each card maintains a square aspect ratio by default
- The title is automatically split into two lines for better readability
`,
            },
        },
    },
    argTypes: {
        featureImage: {
            control: 'text',
            description: 'URL for the feature image',
        },
        imageAlt: {
            control: 'text',
            description: 'Alt text for the image (for accessibility)',
        },
        title: {
            control: 'text',
            description: 'The feature title text (automatically split into two lines)',
        },
        size: {
            control: 'radio',
            options: ['sm', 'md', 'lg'],
            description: 'Size of the card (controls minimum height)',
        },
        width: {
            control: 'text',
            description: 'Custom width for the card (e.g., "w-64", "w-full")',
        },
        fixedAspectRatio: {
            control: 'boolean',
            description: 'Whether to apply a fixed aspect ratio',
        },
        aspectRatio: {
            control: 'text',
            description: 'Custom aspect ratio (e.g., "aspect-[1/1]")',
        },
    },
};

export default meta;
type Story = StoryObj<typeof FeatureCard>;

export const Default: Story = {};

export const ResponsiveGrid: Story = {
    render: function ResponsiveGridExample() {
        return (
            <div className="flex flex-row gap-6 overflow-x-auto">
                <FeatureCard
                    featureImage={exampleFeature}
                    imageAlt="Feature example"
                    title="Rank at the top of Google"
                    width="w-64"
                    fixedAspectRatio={true}
                    aspectRatio="aspect-[1/1]"
                />
                <FeatureCard
                    featureImage={exampleFeature}
                    imageAlt="Feature example"
                    title="Turn visitors into customers"
                    width="w-64"
                    fixedAspectRatio={true}
                    aspectRatio="aspect-[1/1]"
                />
                <FeatureCard
                    featureImage={exampleFeature}
                    imageAlt="Feature example"
                    title="Get more applications"
                    width="w-64"
                    fixedAspectRatio={true}
                    aspectRatio="aspect-[1/1]"
                />
            </div>
        );
    },
};
