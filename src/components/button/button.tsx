import * as React from 'react';

import { type VariantProps, cva } from 'class-variance-authority';
import type { ButtonProps as AriaButtonProps } from 'react-aria-components';
import { Button as AriaButton } from 'react-aria-components';

import { cn } from '@/lib/cn';

const buttonVariants = cva(
    [
        'inline-flex items-center tracking-tight justify-center rounded-full text-base font-sans transition-colors',
        'px-8 py-2 min-h-10',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2',
    ].join(' '),
    {
        variants: {
            variant: {
                default: 'bg-duck-400 text-duck-950 hover:bg-duck-300',
                outline:
                    'border-2 border-duck-400 bg-transparent text-white hover:bg-duck-300 hover:border-duck-300 hover:text-duck-950',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

export interface ButtonProps extends AriaButtonProps, VariantProps<typeof buttonVariants> {
    className?: string;
}

export function Button({ className, variant, ...props }: ButtonProps): React.JSX.Element {
    return (
        <AriaButton
            className={({ isPressed, isHovered, isFocusVisible, isDisabled }) =>
                cn(
                    buttonVariants({ variant }),
                    // Dynamic states
                    isPressed && 'bg-neutral-950',
                    isHovered && variant === 'outline' && 'bg-neutral-100',
                    isFocusVisible && 'ring-2 ring-neutral-950 ring-offset-2',
                    isDisabled && 'pointer-events-none opacity-50',
                    // Custom classes
                    className
                )
            }
            {...props}
        />
    );
}
