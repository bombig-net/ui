import { cn } from '@/lib/cn'
import { Breadcrumbs as AriaBreadcrumbs, Breadcrumb as AriaBreadcrumb } from 'react-aria-components'
import { forwardRef } from 'react'

const breadcrumbsStyles = [
    // Base layout
    'flex items-center flex-wrap',
    // Reset list styles
    'list-none m-0 p-0',
    // Base text styling
    'text-base text-neutral-600',
    // Proper spacing for wrapping
    'gap-2 gap-y-1'
]

const breadcrumbStyles = [
    // Layout
    'flex items-center',
    // Separator styling - using a slash as it's the most accessible and recognizable
    'after:content-["/"] after:select-none after:text-neutral-300 after:mx-[0.4em] after:inline-block',
    'last:after:hidden',
    // Ensure proper spacing when wrapping
    'whitespace-nowrap'
]

export interface BreadcrumbsProps extends React.ComponentPropsWithoutRef<typeof AriaBreadcrumbs> { }
export interface BreadcrumbProps extends React.ComponentPropsWithoutRef<typeof AriaBreadcrumb> { }

export const Breadcrumbs = forwardRef<HTMLOListElement, BreadcrumbsProps>(
    ({ className, ...props }, ref) => {
        return (
            <AriaBreadcrumbs
                ref={ref}
                className={cn(breadcrumbsStyles, className)}
                {...props}
            />
        )
    }
)
Breadcrumbs.displayName = 'Breadcrumbs'

export const Breadcrumb = forwardRef<HTMLLIElement, BreadcrumbProps>(
    ({ className, ...props }, ref) => {
        return (
            <AriaBreadcrumb
                ref={ref}
                className={cn(breadcrumbStyles, className)}
                {...props}
            />
        )
    }
)
Breadcrumb.displayName = 'Breadcrumb' 