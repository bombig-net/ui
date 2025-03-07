import * as React from 'react';

import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/cn';

import concreteTexture from '../../assets/concrete-texture.jpg';

import { Card, type CardProps, CardTitle } from './card';

// Import concrete texture image

const featureCardVariants = cva('relative overflow-hidden', {
    variants: {
        size: {
            sm: 'min-h-[240px]',
            md: 'min-h-[280px]',
            lg: 'min-h-[320px]',
        },
    },
    defaultVariants: {
        size: 'md',
    },
});

export interface FeatureCardProps
    extends Omit<CardProps, 'children'>,
        VariantProps<typeof featureCardVariants> {
    /**
     * The URL of the feature image (icon with transparent background)
     */
    featureImage: string;
    /**
     * The alt text for the image
     */
    imageAlt: string;
    /**
     * The title of the feature
     */
    title: string;
    /**
     * Custom width for the card (e.g., 'w-64', 'w-full')
     */
    width?: string;
    /**
     * Size of the card (controls minimum height)
     * - sm: 240px
     * - md: 280px (default)
     * - lg: 320px
     */
    size?: 'sm' | 'md' | 'lg';
    /**
     * Whether to apply a fixed aspect ratio
     */
    fixedAspectRatio?: boolean;
    /**
     * Custom aspect ratio (format: 'aspect-[width/height]', e.g., 'aspect-[1/1]')
     * Only applies when fixedAspectRatio is true
     */
    aspectRatio?: string;
}

export function FeatureCard({
    className,
    featureImage,
    imageAlt,
    title,
    width = 'w-full max-w-[320px]',
    size,
    fixedAspectRatio = false,
    aspectRatio = 'aspect-[1/1]',
    ...props
}: FeatureCardProps): React.JSX.Element {
    // Generate unique ID for SVG filter
    const id = React.useId();
    const filterId = `image-filter-${id}`;

    // Split title into two lines
    const splitTitle = React.useMemo(() => {
        // If title contains a line break, use that
        if (title.includes('\n')) {
            return title.split('\n');
        }

        // Split by words
        const words = title.split(' ');

        // If only one or two words, put one on each line
        if (words.length <= 2) {
            return words.length === 1 ? [words[0], ''] : words;
        }

        // Find the middle point to split at
        const middleIndex = Math.ceil(words.length / 2);

        // Create two lines
        const firstLine = words.slice(0, middleIndex).join(' ');
        const secondLine = words.slice(middleIndex).join(' ');

        return [firstLine, secondLine];
    }, [title]);

    return (
        <Card
            className={cn(
                featureCardVariants({ size }),
                width,
                'border-0 shadow-none',
                fixedAspectRatio && aspectRatio,
                className
            )}
            {...props}
        >
            {/* SVG Filter Definition for desaturation */}
            <svg
                width={0}
                height={0}
                style={{ position: 'absolute', top: '-9999px', left: '-9999px' }}
            >
                <defs>
                    <filter id={filterId}>
                        {/* Complete desaturation (saturation 0) */}
                        <feColorMatrix type="saturate" values="0" />
                    </filter>
                </defs>
            </svg>

            {/* Base color layer - meteor color */}
            <div className="z-0 absolute inset-0 bg-meteor-600" />

            {/* Concrete texture with color-burn blend mode and desaturation */}
            <div className="z-10 absolute inset-0 mix-blend-color-burn">
                <img
                    src={concreteTexture}
                    alt="Concrete texture"
                    className="w-full h-full object-cover"
                    style={{ filter: `url(#${filterId})` }}
                />
            </div>

            {/* Gradient overlay - from transparent to black */}
            <div className="z-20 absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>

            {/* Feature image - fills the entire card */}
            <div className="z-30 relative w-full h-full">
                <img src={featureImage} alt={imageAlt} className="w-full h-full object-cover" />
            </div>

            {/* Title - positioned at the bottom */}
            <div className="right-0 bottom-0 left-0 z-50 absolute flex flex-col items-center p-4">
                {splitTitle[0] ? (
                    <div className="mb-1">
                        <CardTitle className="inline-block bg-duck-400 m-0 px-2 py-1 font-sans font-extrabold text-black text-xl tracking-tighter rotate-1 transform">
                            {splitTitle[0]}
                        </CardTitle>
                    </div>
                ) : null}
                {splitTitle[1] ? (
                    <div>
                        <CardTitle className="inline-block bg-duck-400 m-0 px-2 py-1 font-sans font-extrabold text-black text-xl tracking-tighter -rotate-1 transform">
                            {splitTitle[1]}
                        </CardTitle>
                    </div>
                ) : null}
            </div>
        </Card>
    );
}

export * from './card';
export { Card, type CardProps };
