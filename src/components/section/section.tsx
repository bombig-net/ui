import { cn } from '@/lib/cn'
import * as React from 'react'

export interface SectionProps extends React.ComponentPropsWithoutRef<'section'> {
    /**
     * Change the default rendered element for the one passed as a child, merging their props and behavior.
     * @default false
     */
    asChild?: boolean;
    /**
     * Additional CSS classes to apply to the section
     */
    className?: string;
}

/**
 * Section component that provides a semantic sectioning element with consistent spacing.
 * Inspired by Radix UI Themes Section component.
 */
export function Section({
    asChild = false,
    className,
    children,
    ...props
}: SectionProps) {
    const Comp = asChild ? React.Fragment : 'section'

    return (
        <Comp
            {...props}
            className={cn(
                // Base styles
                'w-full',
                // Default spacing that can be overridden via className
                'py-8 md:py-12 lg:py-16',
                className
            )}
        >
            {children}
        </Comp>
    )
} 