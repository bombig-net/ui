import React, { forwardRef } from 'react';

import { type VariantProps, cva } from 'class-variance-authority';
import { Link as AriaLink } from 'react-aria-components';

import { cn } from '@/lib/cn';

const linkVariants = cva(
    [
        // Base styles
        'inline-flex items-center justify-center gap-2',
        'cursor-pointer select-none',
        'text-base font-serif font-medium leading-none',
        'outline-none',
        'transition-all duration-200',
        // Default link styling
        'text-white underline decoration-white/60 underline-offset-4 decoration-solid',
        // Interactive states
        'hover:text-duck-400 hover:decoration-duck-400/60 hover:decoration-wavy',
        'data-[pressed]:text-duck-300 data-[pressed]:decoration-duck-300/60',
        // Focus visible
        'data-[focus-visible]:outline-none data-[focus-visible]:ring-2 data-[focus-visible]:ring-duck-400 data-[focus-visible]:ring-offset-2',
        // Disabled state
        'data-[disabled]:opacity-50 data-[disabled]:cursor-not-allowed data-[disabled]:hover:decoration-neutral-500/60 data-[disabled]:hover:decoration-solid',
    ],
    {
        variants: {
            variant: {
                default: '',
                muted: ['text-neutral-300 decoration-neutral-300/60'],
                subtle: [
                    'no-underline text-neutral-300 decoration-neutral-300/60',
                    'hover:underline',
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
