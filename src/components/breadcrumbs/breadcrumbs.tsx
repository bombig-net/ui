import { forwardRef } from 'react';

import {
    Breadcrumb as AriaBreadcrumb,
    Breadcrumbs as AriaBreadcrumbs,
} from 'react-aria-components';

import { cn } from '@/lib/cn';

const breadcrumbsStyles = [
    'flex items-center flex-wrap',
    'list-none m-0 p-0',
    'text-base',
    'gap-2 gap-y-1',
];

const breadcrumbStyles = [
    'flex items-center',
    'after:content-["/"] after:select-none after:text-neutral-300 after:mx-[0.4em] after:inline-block',
    'last:after:hidden',
    'whitespace-nowrap',
    '[&_span[aria-current]]:opacity-50',
];

export type BreadcrumbsProps = React.ComponentPropsWithoutRef<typeof AriaBreadcrumbs>;
export type BreadcrumbProps = React.ComponentPropsWithoutRef<typeof AriaBreadcrumb>;

export const Breadcrumbs = forwardRef<HTMLOListElement, BreadcrumbsProps>(
    ({ className, ...props }, ref) => {
        return (
            <AriaBreadcrumbs ref={ref} className={cn(breadcrumbsStyles, className)} {...props} />
        );
    }
);
Breadcrumbs.displayName = 'Breadcrumbs';

export const Breadcrumb = forwardRef<HTMLLIElement, BreadcrumbProps>(
    ({ className, children, ...props }, ref) => {
        return (
            <AriaBreadcrumb ref={ref} className={cn(breadcrumbStyles, className)} {...props}>
                {children}
            </AriaBreadcrumb>
        );
    }
);
Breadcrumb.displayName = 'Breadcrumb';
