import React, { forwardRef } from 'react';

import { type VariantProps, cva } from 'class-variance-authority';
import { Link as AriaLink } from 'react-aria-components';

import { cn } from '@/lib/cn';

const linkVariants = cva(
    [
        // Base styles
        'inline-flex items-center justify-center gap-2',
        'cursor-pointer select-none',
        'text-base leading-none',
        'outline-none',
        'transition-all duration-200',
        // Default link styling
        'text-neutral-900 underline decoration-neutral-500/60 underline-offset-4 decoration-solid',
        // Interactive states
        'hover:decoration-neutral-900 hover:decoration-wavy',
        'data-[pressed]:text-neutral-700 data-[pressed]:decoration-neutral-700',
        // Focus visible
        'data-[focus-visible]:outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-neutral-900 data-[focus-visible]:ring-offset-2',
        // Disabled state
        'data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed data-[disabled]:hover:decoration-neutral-500/60 data-[disabled]:hover:decoration-solid',
    ],
    {
        variants: {
            variant: {
                default: '',
                muted: [
                    'text-neutral-600 decoration-neutral-400/60',
                    'hover:text-neutral-900 hover:decoration-neutral-600 hover:decoration-wavy',
                    'data-[pressed]:text-neutral-500 data-[pressed]:decoration-neutral-500',
                ],
                subtle: [
                    'no-underline text-neutral-600',
                    'hover:text-neutral-900 hover:underline hover:decoration-neutral-600 hover:decoration-wavy',
                    'data-[pressed]:text-neutral-500 data-[pressed]:decoration-neutral-500',
                ],
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

export interface LinkProps
    extends React.ComponentPropsWithoutRef<typeof AriaLink>,
        VariantProps<typeof linkVariants> {
    'aria-current'?: 'page' | 'step' | 'location' | 'date' | 'time';
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
    ({ className, variant, 'aria-current': ariaCurrent, ...props }, ref): React.ReactElement => {
        return (
            <AriaLink
                ref={ref}
                className={cn(linkVariants({ variant }), className)}
                aria-current={ariaCurrent}
                {...props}
            />
        );
    }
);
Link.displayName = 'Link';
