import * as React from 'react';

import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/cn';

import { Card, type CardProps } from './card';

const testimonialCardVariants = cva('relative aspect-[3/4] overflow-hidden', {
    variants: {
        gradientOpacity: {
            light: 'after:bg-gradient-to-t after:from-black/30 after:to-transparent',
            medium: 'after:bg-gradient-to-t after:from-black/50 after:to-transparent',
            dark: 'after:bg-gradient-to-t after:from-black/70 after:to-transparent',
        },
        gradientHeight: {
            sm: 'after:h-1/4',
            md: 'after:h-1/3',
            lg: 'after:h-1/2',
        },
    },
    defaultVariants: {
        gradientOpacity: 'dark',
        gradientHeight: 'md',
    },
});

const quoteVariants = cva('relative mb-6 font-bold leading-tight', {
    variants: {
        size: {
            sm: 'text-sm',
            md: 'text-base',
            lg: 'text-lg',
        },
    },
    defaultVariants: {
        size: 'sm',
    },
});

const attributionVariants = cva('font-semibold', {
    variants: {
        size: {
            sm: 'text-xs',
            md: 'text-sm',
            lg: 'text-base',
        },
    },
    defaultVariants: {
        size: 'sm',
    },
});

export interface TestimonialCardProps
    extends Omit<CardProps, 'children'>,
        VariantProps<typeof testimonialCardVariants> {
    /**
     * The URL of the background image (usually a person's photo)
     */
    backgroundImage: string;
    /**
     * The alt text for the background image
     */
    imageAlt: string;
    /**
     * The testimonial quote text
     */
    quote: string;
    /**
     * The name of the person giving the testimonial
     */
    personName: string;
    /**
     * The title or company of the person (optional)
     */
    personTitle?: string;
    /**
     * The size of the quote text
     */
    quoteSize?: 'sm' | 'md' | 'lg';
    /**
     * The size of the attribution text
     */
    attributionSize?: 'sm' | 'md' | 'lg';
    /**
     * Whether to fix the aspect ratio to portrait (3:4)
     */
    fixedAspectRatio?: boolean;
    /**
     * Custom width for the card (e.g., 'w-64', 'w-full')
     */
    width?: string;
}

export function TestimonialCard({
    className,
    backgroundImage,
    imageAlt,
    quote,
    personName,
    personTitle,
    gradientOpacity,
    gradientHeight,
    quoteSize,
    attributionSize,
    fixedAspectRatio = false,
    width = 'w-full max-w-[320px]',
    ...props
}: TestimonialCardProps): React.JSX.Element {
    const id = React.useId();
    const filterId = `image-filter-${id}`;

    return (
        <Card
            className={cn(
                testimonialCardVariants({
                    gradientOpacity,
                    gradientHeight,
                }),
                width,
                {
                    'aspect-[3/4]': fixedAspectRatio,
                },
                'relative overflow-hidden group border-0 shadow-none',
                className
            )}
            {...props}
        >
            {/* SVG Filter Definition */}
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

            {/* Base color layer - exact #F1C906 */}
            <div className="z-0 absolute inset-0 bg-[#F1C906]" />

            {/* Image layer with color-burn blend mode and saturation 0 */}
            {backgroundImage ? (
                <div className="z-10 absolute inset-0 mix-blend-color-burn">
                    <img
                        src={backgroundImage}
                        alt={imageAlt}
                        className="w-full h-full object-cover"
                        style={{ filter: `url(#${filterId})` }}
                    />
                </div>
            ) : null}

            {/* Tint layer - gradient from transparent to black */}
            <div className="z-20 absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>

            {/* Quote content */}
            <div className="z-30 absolute inset-0">
                <div className={cn('relative w-full h-full', 'flex flex-col justify-end p-4')}>
                    <blockquote>
                        <p className={cn(quoteVariants({ size: quoteSize }), 'text-[#F1C906]')}>
                            &ldquo;{quote}&rdquo;
                        </p>
                        <footer
                            className={cn(
                                attributionVariants({ size: attributionSize }),
                                'text-white'
                            )}
                        >
                            {personName}
                            {personTitle ? (
                                <span>
                                    {' // '}
                                    {personTitle}
                                </span>
                            ) : null}
                        </footer>
                    </blockquote>
                </div>
            </div>
        </Card>
    );
}

export * from './card';
export { Card, type CardProps };
