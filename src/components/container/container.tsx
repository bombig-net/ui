import * as React from 'react';

import { cn } from '@/lib/cn';

export interface ContainerProps extends React.ComponentPropsWithoutRef<'div'> {
    /**
     * Change the default rendered element for the one passed as a child, merging their props and behavior.
     * @default false
     */
    asChild?: boolean;
    /**
     * Additional CSS classes to apply to the container
     */
    className?: string;
}

/**
 * Container component that provides a responsive wrapper with sensible max-width and padding defaults.
 * Inspired by Radix UI Themes Container component.
 */
export function Container({
    asChild = false,
    className,
    children,
    ...props
}: ContainerProps): React.JSX.Element {
    const Comp = asChild ? React.Fragment : 'div';

    return (
        <Comp
            {...props}
            className={cn(
                // Base styles
                'w-full mx-auto',
                // Default max-width and padding that can be overridden via className
                'max-w-7xl px-4 sm:px-6 lg:px-8',
                className
            )}
        >
            {children}
        </Comp>
    );
}
