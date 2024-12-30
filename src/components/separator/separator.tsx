import { cn } from '@/lib/cn'
import * as RadixSeparator from '@radix-ui/react-separator'
import { type VariantProps, cva } from 'class-variance-authority'

const separatorVariants = cva(
    'bg-neutral-200 shrink-0',
    {
        variants: {
            variant: {
                default: 'bg-neutral-200',
                muted: 'bg-neutral-100',
                strong: 'bg-neutral-300'
            }
        },
        defaultVariants: {
            variant: 'default'
        }
    }
)

const orientationVariants = {
    horizontal: 'h-px w-full',
    vertical: 'h-full w-px'
} as const

export interface SeparatorProps extends RadixSeparator.SeparatorProps, VariantProps<typeof separatorVariants> { }

/**
 * A visual or semantic separator between content.
 * Built on top of Radix UI's Separator primitive.
 */
export function Separator({
    className,
    variant,
    orientation = 'horizontal',
    decorative = true,
    ...props
}: SeparatorProps) {
    return (
        <RadixSeparator.Root
            decorative={decorative}
            orientation={orientation}
            className={cn(
                separatorVariants({ variant }),
                orientationVariants[orientation],
                className
            )}
            {...props}
        />
    )
} 