import { forwardRef } from 'react';

import { ChevronDownIcon } from '@radix-ui/react-icons';
import * as RadixNavigationMenu from '@radix-ui/react-navigation-menu';
import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/cn';

const navigationMenuTriggerStyle = cva(
    'inline-flex justify-center items-center bg-transparent data-[state=open]:bg-duck-400/20 data-[active]:bg-duck-400/20 hover:bg-neutral-800 focus:bg-neutral-800 disabled:opacity-50 px-4 py-2 rounded-md outline-none w-max h-10 font-medium text-white hover:text-white focus:text-white text-sm transition-colors',
    {
        variants: {
            variant: {
                default: '',
                muted: 'text-neutral-400 hover:text-neutral-200 focus:text-neutral-200',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

export type NavigationMenuProps = RadixNavigationMenu.NavigationMenuProps & {
    value?: string;
    defaultValue?: string;
};
export type NavigationMenuListProps = RadixNavigationMenu.NavigationMenuListProps;
export type NavigationMenuItemProps = RadixNavigationMenu.NavigationMenuItemProps;
export type NavigationMenuTriggerProps = RadixNavigationMenu.NavigationMenuTriggerProps &
    VariantProps<typeof navigationMenuTriggerStyle>;
export type NavigationMenuContentProps = RadixNavigationMenu.NavigationMenuContentProps;
export type NavigationMenuLinkProps = RadixNavigationMenu.NavigationMenuLinkProps;
export type NavigationMenuViewportProps = RadixNavigationMenu.NavigationMenuViewportProps;
export type NavigationMenuIndicatorProps = RadixNavigationMenu.NavigationMenuIndicatorProps;
export type NavigationMenuSubProps = RadixNavigationMenu.NavigationMenuSubProps;

export const NavigationMenu = forwardRef<HTMLElement, NavigationMenuProps>(
    ({ className, children, ...props }, ref) => (
        <RadixNavigationMenu.Root
            ref={ref}
            className={cn(
                'z-10 relative flex flex-1 justify-center items-center max-w-max',
                className
            )}
            {...props}
        >
            {children}
        </RadixNavigationMenu.Root>
    )
);
NavigationMenu.displayName = 'NavigationMenu';

export const NavigationMenuList = forwardRef<HTMLUListElement, NavigationMenuListProps>(
    ({ className, ...props }, ref) => (
        <RadixNavigationMenu.List
            ref={ref}
            className={cn(
                'flex flex-1 justify-center items-center space-x-1 p-1 list-none',
                className
            )}
            {...props}
        />
    )
);
NavigationMenuList.displayName = 'NavigationMenuList';

export const NavigationMenuItem = RadixNavigationMenu.Item;

export const NavigationMenuTrigger = forwardRef<HTMLButtonElement, NavigationMenuTriggerProps>(
    ({ className, variant, children, ...props }, ref) => (
        <RadixNavigationMenu.Trigger
            ref={ref}
            className={cn(navigationMenuTriggerStyle({ variant }), className)}
            {...props}
        >
            {children}
            <ChevronDownIcon
                className="top-[1px] relative ml-1 w-3 h-3 group-data-[state=open]:rotate-180 transition duration-300"
                aria-hidden="true"
            />
        </RadixNavigationMenu.Trigger>
    )
);
NavigationMenuTrigger.displayName = 'NavigationMenuTrigger';

export const NavigationMenuContent = forwardRef<HTMLDivElement, NavigationMenuContentProps>(
    ({ className, ...props }, ref) => (
        <RadixNavigationMenu.Content
            ref={ref}
            className={cn(
                'top-0 data-[motion=from-end]:slide-in-from-right-52 data-[motion=to-end]:slide-out-to-right-52 left-0 data-[motion=to-start]:slide-out-to-left-52 absolute data-[motion^=from-]:fade-in data-[motion=from-start]:slide-in-from-left-52 data-[motion^=to-]:fade-out w-full md:w-auto data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out',
                className
            )}
            {...props}
        />
    )
);
NavigationMenuContent.displayName = 'NavigationMenuContent';

export const NavigationMenuLink = forwardRef<HTMLAnchorElement, NavigationMenuLinkProps>(
    ({ className, ...props }, ref) => (
        <RadixNavigationMenu.Link
            ref={ref}
            className={cn(
                'block space-y-1 data-[active]:bg-duck-400/20 hover:bg-neutral-800 focus:bg-neutral-800 p-3 rounded-md outline-none text-white text-sm no-underline leading-none transition-colors select-none',
                className
            )}
            {...props}
        />
    )
);
NavigationMenuLink.displayName = 'NavigationMenuLink';

export const NavigationMenuViewport = forwardRef<HTMLDivElement, NavigationMenuViewportProps>(
    ({ className, ...props }, ref) => (
        <div className="top-full left-0 absolute flex justify-center perspective-[2000px]">
            <RadixNavigationMenu.Viewport
                ref={ref}
                className={cn(
                    'relative bg-neutral-900 shadow-lg data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 mt-1.5 border border-neutral-800 rounded-md w-full md:w-[var(--radix-navigation-menu-viewport-width)] h-[var(--radix-navigation-menu-viewport-height)] data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out data-[state=open]:fade-in',
                    className
                )}
                {...props}
            />
        </div>
    )
);
NavigationMenuViewport.displayName = 'NavigationMenuViewport';

export const NavigationMenuIndicator = forwardRef<HTMLDivElement, NavigationMenuIndicatorProps>(
    ({ className, ...props }, ref) => (
        <RadixNavigationMenu.Indicator
            ref={ref}
            className={cn(
                'data-[state=hidden]:fade-out top-full z-[1] flex justify-center items-end h-2.5 overflow-hidden data-[state=hidden]:animate-out data-[state=visible]:animate-in data-[state=visible]:fade-in',
                className
            )}
            {...props}
        >
            <div className="top-[60%] relative bg-white shadow-md rounded-tl-sm w-2 h-2 rotate-45" />
        </RadixNavigationMenu.Indicator>
    )
);
NavigationMenuIndicator.displayName = 'NavigationMenuIndicator';

export const NavigationMenuSub = forwardRef<HTMLDivElement, NavigationMenuSubProps>(
    ({ className, children, ...props }, ref) => (
        <RadixNavigationMenu.Sub ref={ref} className={cn('z-10 relative', className)} {...props}>
            {children}
        </RadixNavigationMenu.Sub>
    )
);
NavigationMenuSub.displayName = 'NavigationMenuSub';
