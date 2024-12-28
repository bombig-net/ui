import { type VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/lib/cn'
import { Button as AriaButton } from 'react-aria-components'
import type { ButtonProps as AriaButtonProps } from 'react-aria-components'

/**
 * @description
 * Button component built on top of React Aria's Button component.
 * Provides a accessible button with various visual styles and states.
 * 
 * @example
 * ```tsx
 * <Button variant="primary" size="default">
 *   Click me
 * </Button>
 * ```
 * 
 * @accessibility
 * - Follows WAI-ARIA Button pattern
 * - Supports keyboard navigation
 * - Includes proper ARIA attributes
 * - Handles focus management
 * 
 * @see {@link https://react-spectrum.adobe.com/react-aria/Button.html React Aria Button}
 */

const buttonVariants = cva(
    'inline-flex justify-center items-center disabled:opacity-50 rounded-md focus-visible:ring-2 focus-visible:ring-slate-400 font-medium text-sm transition-colors disabled:pointer-events-none focus-visible:outline-none',
    {
        variants: {
            variant: {
                default: 'bg-brand text-black hover:bg-brand/90',
                destructive: 'bg-red-500 text-slate-50 hover:bg-red-500/90',
                outline: 'border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900',
                secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-100/80',
                ghost: 'hover:bg-slate-100 hover:text-slate-900',
                link: 'text-slate-900 underline-offset-4 hover:underline',
            },
            size: {
                default: 'h-10 px-4 py-2',
                sm: 'h-9 rounded-md px-3',
                lg: 'h-11 rounded-md px-8',
                icon: 'h-10 w-10',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
)

/**
 * Props for the Button component
 * @typedef {Object} ButtonProps
 * @property {string} [variant] - Visual style variant of the button
 * @property {string} [size] - Size variant of the button
 * @property {string} [className] - Additional CSS classes to apply
 */
export interface ButtonProps
    extends AriaButtonProps,
    VariantProps<typeof buttonVariants> { }

/**
 * Primary Button component for user interaction.
 * Built on top of React Aria's Button for accessibility.
 * 
 * @param {ButtonProps} props - Component props
 * @returns {JSX.Element} Rendered button component
 */
export function Button({
    className,
    variant,
    size,
    ...props
}: ButtonProps) {
    return (
        <AriaButton
            className={cn(buttonVariants({ variant, size }), className)}
            {...props}
        />
    )
}