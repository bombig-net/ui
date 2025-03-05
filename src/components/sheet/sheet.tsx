import * as React from 'react';

import * as RadixDialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/cn';

const sheetOverlayVariants = cva(
    'z-50 fixed inset-0 bg-black/95 data-[state=open]:backdrop-blur-sm data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out',
    {
        variants: {
            variant: {
                default: '',
                opaque: '',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

const sheetContentVariants = cva(
    [
        // Base styles
        'z-50 fixed h-full',
        'bg-black border-2',
        'p-6',
        'max-w-md',
        // Typography
        'text-white font-serif',
        // Shadow and glow effects
        'shadow-[0_0_15px_rgba(255,165,0,0.3)]',
        'dark:shadow-[0_0_25px_rgba(255,165,0,0.2)]',
        // Sharp corners with diagonal cut (only on bottom-right for right side sheet and bottom-left for left side)
        'overflow-auto',
        // Focus styles
        'focus:outline-none',
    ].join(' '),
    {
        variants: {
            variant: {
                default: [
                    'border-yellow-500/50',
                    'from-orange-500/10 to-transparent bg-gradient-to-b',
                ].join(' '),
                destructive: [
                    'border-red-500/50',
                    'from-red-500/10 to-transparent bg-gradient-to-b',
                ].join(' '),
            },
            side: {
                right: [
                    'inset-y-0 right-0 border-l-2',
                    'data-[state=open]:animate-slide-in-from-right',
                    'data-[state=closed]:animate-slide-out-to-right',
                    'clip-path-polygon-[0_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%]',
                ].join(' '),
                left: [
                    'inset-y-0 left-0 border-r-2',
                    'data-[state=open]:animate-slide-in-from-left',
                    'data-[state=closed]:animate-slide-out-to-left',
                    'clip-path-polygon-[0_0,100%_0,100%_100%,12px_100%,0_calc(100%-12px)]',
                ].join(' '),
                top: [
                    'inset-x-0 top-0 border-b-2',
                    'data-[state=open]:animate-slide-in-from-top',
                    'data-[state=closed]:animate-slide-out-to-top',
                    'h-auto w-full max-h-[80vh]',
                ].join(' '),
                bottom: [
                    'inset-x-0 bottom-0 border-t-2',
                    'data-[state=open]:animate-slide-in-from-bottom',
                    'data-[state=closed]:animate-slide-out-to-bottom',
                    'h-auto w-full max-h-[80vh]',
                    'clip-path-polygon-[0_0,calc(100%-12px)_0,100%_12px,100%_100%,0_100%]',
                ].join(' '),
            },
            size: {
                sm: 'max-w-sm',
                default: 'max-w-md',
                lg: 'max-w-lg',
                xl: 'max-w-xl',
                full: 'max-w-full',
            },
        },
        defaultVariants: {
            variant: 'default',
            side: 'right',
            size: 'default',
        },
        compoundVariants: [
            {
                side: ['top', 'bottom'],
                size: 'sm',
                class: 'max-h-[25vh]',
            },
            {
                side: ['top', 'bottom'],
                size: 'default',
                class: 'max-h-[35vh]',
            },
            {
                side: ['top', 'bottom'],
                size: 'lg',
                class: 'max-h-[50vh]',
            },
            {
                side: ['top', 'bottom'],
                size: 'xl',
                class: 'max-h-[65vh]',
            },
            {
                side: ['top', 'bottom'],
                size: 'full',
                class: 'max-h-[80vh]',
            },
        ],
    }
);

export type SheetProps = RadixDialog.DialogProps;
export type SheetTriggerProps = RadixDialog.DialogTriggerProps;

export interface SheetContentProps
    extends RadixDialog.DialogContentProps,
        VariantProps<typeof sheetContentVariants> {
    /** Change the component to the HTML tag or custom component provided. */
    asChild?: boolean;
    /** The variant of the sheet overlay */
    overlayVariant?: VariantProps<typeof sheetOverlayVariants>['variant'];
    /** Optional element to portal the sheet into */
    container?: HTMLElement;
    /** Event handler called when auto-focusing on open. Can be prevented. */
    onOpenAutoFocus?: (event: Event) => void;
    /** Event handler called when auto-focusing on close. Can be prevented. */
    onCloseAutoFocus?: (event: Event) => void;
    /** Event handler called when the escape key is pressed. Can be prevented. */
    onEscapeKeyDown?: (event: KeyboardEvent) => void;
    /** Event handler called when a pointer event occurs outside the bounds. Can be prevented. */
    onPointerDownOutside?: (event: Event) => void;
    /** Event handler called when an interaction occurs outside the bounds. Can be prevented. */
    onInteractOutside?: (event: Event) => void;
}

export type SheetHeaderProps = React.HTMLAttributes<HTMLDivElement>;
export type SheetFooterProps = React.HTMLAttributes<HTMLDivElement>;
export type SheetTitleProps = RadixDialog.DialogTitleProps;
export type SheetDescriptionProps = RadixDialog.DialogDescriptionProps;
export type SheetCloseProps = RadixDialog.DialogCloseProps;

export const Sheet: React.FC<SheetProps> = ({ ...props }) => <RadixDialog.Root {...props} />;
Sheet.displayName = 'Sheet';

export const SheetTrigger: React.FC<SheetTriggerProps> = React.forwardRef<
    HTMLButtonElement,
    SheetTriggerProps
>(({ className, ...props }, ref) => (
    <RadixDialog.Trigger ref={ref} className={cn(className)} {...props} />
));
SheetTrigger.displayName = 'SheetTrigger';

export const SheetClose: React.FC<SheetCloseProps> = React.forwardRef<
    HTMLButtonElement,
    SheetCloseProps
>(({ className, ...props }, ref) => (
    <RadixDialog.Close ref={ref} className={cn(className)} {...props} />
));
SheetClose.displayName = 'SheetClose';

export const SheetContent: React.FC<SheetContentProps> = React.forwardRef<
    HTMLDivElement,
    SheetContentProps
>(
    (
        {
            className,
            children,
            variant,
            side,
            size,
            overlayVariant,
            container,
            onOpenAutoFocus,
            onCloseAutoFocus,
            onEscapeKeyDown,
            onPointerDownOutside,
            onInteractOutside,
            ...props
        },
        ref
    ) => (
        <RadixDialog.Portal container={container}>
            <RadixDialog.Overlay
                className={cn(sheetOverlayVariants({ variant: overlayVariant }))}
            />
            <RadixDialog.Content
                ref={ref}
                className={cn(sheetContentVariants({ variant, side, size }), className)}
                onOpenAutoFocus={onOpenAutoFocus}
                onCloseAutoFocus={onCloseAutoFocus}
                onEscapeKeyDown={onEscapeKeyDown}
                onPointerDownOutside={onPointerDownOutside}
                onInteractOutside={onInteractOutside}
                {...props}
            >
                {children}
                <RadixDialog.Close className="top-4 right-4 absolute data-[state=open]:bg-neutral-100 dark:data-[state=open]:bg-neutral-800 opacity-70 hover:opacity-100 rounded-sm focus:outline-none focus:ring-2 focus:ring-neutral-950 dark:focus:ring-neutral-300 ring-offset-white focus:ring-offset-2 dark:ring-offset-neutral-950 data-[state=open]:text-neutral-500 dark:data-[state=open]:text-neutral-400 transition-opacity disabled:pointer-events-none">
                    <Cross2Icon className="w-4 h-4" />
                    <span className="sr-only">Close</span>
                </RadixDialog.Close>
            </RadixDialog.Content>
        </RadixDialog.Portal>
    )
);
SheetContent.displayName = 'SheetContent';

export const SheetHeader: React.FC<SheetHeaderProps> = React.forwardRef<
    HTMLDivElement,
    SheetHeaderProps
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            'flex flex-col space-y-1.5',
            'border-b border-yellow-500/20',
            'mb-4',
            className
        )}
        {...props}
    />
));
SheetHeader.displayName = 'SheetHeader';

export const SheetFooter: React.FC<SheetFooterProps> = React.forwardRef<
    HTMLDivElement,
    SheetFooterProps
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className={cn(
            'flex sm:flex-row flex-col-reverse sm:justify-end sm:space-x-2',
            'border-t border-yellow-500/20',
            'mt-4',
            'pt-4',
            className
        )}
        {...props}
    />
));
SheetFooter.displayName = 'SheetFooter';

export const SheetTitle: React.FC<SheetTitleProps> = React.forwardRef<
    HTMLHeadingElement,
    SheetTitleProps
>(({ className, ...props }, ref) => (
    <RadixDialog.Title
        ref={ref}
        className={cn(
            'font-sans font-bold text-yellow-500 text-2xl tracking-tight',
            'mb-2',
            className
        )}
        {...props}
    />
));
SheetTitle.displayName = 'SheetTitle';

export const SheetDescription: React.FC<SheetDescriptionProps> = React.forwardRef<
    HTMLParagraphElement,
    SheetDescriptionProps
>(({ className, ...props }, ref) => (
    <RadixDialog.Description
        ref={ref}
        className={cn('mb-4 font-serif text-neutral-300 text-xs', className)}
        {...props}
    />
));
SheetDescription.displayName = 'SheetDescription';
