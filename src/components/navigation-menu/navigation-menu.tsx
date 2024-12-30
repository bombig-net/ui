import { cn } from '@/lib/cn'
import * as RadixNavigationMenu from '@radix-ui/react-navigation-menu'
import { type VariantProps, cva } from 'class-variance-authority'
import { ChevronDownIcon } from '@radix-ui/react-icons'
import { forwardRef } from 'react'

const navigationMenuTriggerStyle = cva(
    'inline-flex justify-center items-center bg-white data-[state=open]:bg-neutral-100/50 hover:bg-neutral-100 focus:bg-neutral-100 data-[active]:bg-neutral-100/50 disabled:opacity-50 px-4 py-2 rounded-md w-max h-10 font-medium text-sm hover:text-neutral-900 focus:text-neutral-900 transition-colors disabled:pointer-events-none focus:outline-none group',
    {
        variants: {
            variant: {
                default: 'text-neutral-700',
                muted: 'text-neutral-500',
            }
        },
        defaultVariants: {
            variant: 'default'
        }
    }
)

export interface NavigationMenuProps extends RadixNavigationMenu.NavigationMenuProps { }
export interface NavigationMenuListProps extends RadixNavigationMenu.NavigationMenuListProps { }
export interface NavigationMenuItemProps extends RadixNavigationMenu.NavigationMenuItemProps { }
export interface NavigationMenuTriggerProps extends RadixNavigationMenu.NavigationMenuTriggerProps, VariantProps<typeof navigationMenuTriggerStyle> { }
export interface NavigationMenuContentProps extends RadixNavigationMenu.NavigationMenuContentProps { }
export interface NavigationMenuLinkProps extends RadixNavigationMenu.NavigationMenuLinkProps { }
export interface NavigationMenuViewportProps extends RadixNavigationMenu.NavigationMenuViewportProps { }
export interface NavigationMenuIndicatorProps extends RadixNavigationMenu.NavigationMenuIndicatorProps { }

export const NavigationMenu = forwardRef<HTMLElement, NavigationMenuProps>(({ className, children, ...props }, ref) => (
    <RadixNavigationMenu.Root
        ref={ref}
        className={cn("relative z-10 flex flex-1 justify-center items-center max-w-max", className)}
        {...props}
    >
        {children}
    </RadixNavigationMenu.Root>
))
NavigationMenu.displayName = 'NavigationMenu'

export const NavigationMenuList = forwardRef<HTMLUListElement, NavigationMenuListProps>(({ className, ...props }, ref) => (
    <RadixNavigationMenu.List
        ref={ref}
        className={cn(
            'flex flex-1 justify-center items-center space-x-1 p-1 list-none',
            className
        )}
        {...props}
    />
))
NavigationMenuList.displayName = 'NavigationMenuList'

export const NavigationMenuItem = RadixNavigationMenu.Item

export const NavigationMenuTrigger = forwardRef<HTMLButtonElement, NavigationMenuTriggerProps>(
    ({ className, variant, children, ...props }, ref) => (
        <RadixNavigationMenu.Trigger
            ref={ref}
            className={cn(navigationMenuTriggerStyle({ variant }), className)}
            {...props}
        >
            {children}
            <ChevronDownIcon
                className="group-data-[state=open]:rotate-180 relative top-[1px] ml-1 w-3 h-3 transition duration-300"
                aria-hidden="true"
            />
        </RadixNavigationMenu.Trigger>
    )
)
NavigationMenuTrigger.displayName = 'NavigationMenuTrigger'

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
)
NavigationMenuContent.displayName = 'NavigationMenuContent'

export const NavigationMenuLink = forwardRef<HTMLAnchorElement, NavigationMenuLinkProps>(
    ({ className, ...props }, ref) => (
        <RadixNavigationMenu.Link
            ref={ref}
            className={cn(
                'block space-y-1 hover:bg-neutral-100 focus:bg-neutral-100 p-3 rounded-md no-underline leading-none transition-colors select-none outline-none',
                className
            )}
            {...props}
        />
    )
)
NavigationMenuLink.displayName = 'NavigationMenuLink'

export const NavigationMenuViewport = forwardRef<HTMLDivElement, NavigationMenuViewportProps>(
    ({ className, ...props }, ref) => (
        <div className="top-full left-0 absolute flex justify-center perspective-[2000px]">
            <RadixNavigationMenu.Viewport
                ref={ref}
                className={cn(
                    'relative border-neutral-200 bg-white shadow-lg data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 mt-1.5 border rounded-md w-full md:w-[var(--radix-navigation-menu-viewport-width)] h-[var(--radix-navigation-menu-viewport-height)] data-[state=closed]:animate-out data-[state=open]:animate-in overflow-hidden',
                    className
                )}
                {...props}
            />
        </div>
    )
)
NavigationMenuViewport.displayName = 'NavigationMenuViewport'

export const NavigationMenuIndicator = forwardRef<HTMLDivElement, NavigationMenuIndicatorProps>(
    ({ className, ...props }, ref) => (
        <RadixNavigationMenu.Indicator
            ref={ref}
            className={cn(
                'top-full z-[1] flex justify-center items-end data-[state=hidden]:fade-out h-2.5 data-[state=hidden]:animate-out data-[state=visible]:animate-in overflow-hidden data-[state=visible]:fade-in',
                className
            )}
            {...props}
        >
            <div className="relative top-[60%] bg-white shadow-md rounded-tl-sm w-2 h-2 rotate-45" />
        </RadixNavigationMenu.Indicator>
    )
)
NavigationMenuIndicator.displayName = 'NavigationMenuIndicator' 