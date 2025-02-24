import * as React from 'react';

import { cn } from '@/lib/cn';

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
}: SectionProps): React.JSX.Element {
    if (asChild && React.isValidElement(children)) {
        const child = children as React.ReactElement<{ className?: string }>;
        return React.cloneElement(child, {
            ...props,
            className: cn(
                // Base styles
                'w-full',
                // Default spacing that can be overridden via className
                'py-6 md:py-12 lg:py-24',
                className,
                child.props.className
            ),
        } as React.HTMLAttributes<HTMLElement>);
    }

    return (
        <section
            {...props}
            className={cn(
                // Base styles
                'w-full',
                // Default spacing that can be overridden via className
                'py-6 md:py-12 lg:py-24',
                className
            )}
        >
            {children}
        </section>
    );
}
