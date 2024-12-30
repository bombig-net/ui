import { cn } from '@/lib/cn'
import { Button as AriaButton } from 'react-aria-components'
import type { ButtonProps as AriaButtonProps } from 'react-aria-components'
import { type VariantProps, cva } from 'class-variance-authority'

const buttonVariants = cva(
    [
        'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors',
        'px-4 py-2 min-h-10',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2'
    ].join(' '),
    {
        variants: {
            variant: {
                default: 'bg-neutral-900 text-neutral-50 hover:bg-neutral-800',
                cta: 'bg-neutral-950 font-semibold uppercase tracking-wide text-neutral-50 hover:bg-neutral-900',
                outline: 'border border-neutral-300 bg-transparent text-neutral-900 hover:bg-neutral-100',
            }
        },
        defaultVariants: {
            variant: 'default'
        }
    }
)

export interface ButtonProps extends AriaButtonProps, VariantProps<typeof buttonVariants> {
    className?: string;
}

export function Button({
    className,
    variant,
    ...props
}: ButtonProps) {
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
    )
}