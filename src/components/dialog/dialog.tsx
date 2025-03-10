import * as React from 'react';

import * as RadixDialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/cn';

const dialogOverlayVariants = cva(
    'z-50 fixed inset-0 bg-black/95 data-[state=open]:backdrop-blur-sm data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out',
    {
        variants: {
            variant: {
                default: '',
                opaque: '',
            },
            scroll: {
                true: 'overflow-y-auto grid place-items-center',
                false: '',
            },
        },
        defaultVariants: {
            variant: 'default',
            scroll: false,
        },
    }
);

const dialogContentVariants = cva(
    [
        // Base styles
        'z-50 grid',
        'bg-black border-2',
        'p-6',
        'w-full max-w-lg',
        // Animation
        'data-[state=open]:animate-slide-up-fade data-[state=closed]:animate-slide-down-fade',
        // Shadow and glow effects
        'shadow-[0_0_15px_rgba(255,165,0,0.3)]',
        'dark:shadow-[0_0_25px_rgba(255,165,0,0.2)]',
        // Typography
        'text-white font-serif',
        // Sharp corners with diagonal cut
        'clip-path-polygon-[0_0,100%_0,100%_calc(100%-12px),calc(100%-12px)_100%,0_100%]',
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
            position: {
                default: 'fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]',
                center: 'my-8',
            },
        },
        defaultVariants: {
            variant: 'default',
            position: 'default',
        },
    }
);

export type DialogProps = RadixDialog.DialogProps;
export type DialogTriggerProps = RadixDialog.DialogTriggerProps;

export interface DialogContentProps
    extends RadixDialog.DialogContentProps,
        VariantProps<typeof dialogContentVariants> {
    /** Change the component to the HTML tag or custom component provided. */
    asChild?: boolean;
    /** The variant of the dialog overlay */
    overlayVariant?: VariantProps<typeof dialogOverlayVariants>['variant'];
    /** Whether the dialog should be scrollable */
    scrollable?: boolean;
    /** Optional element to portal the dialog into */
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

export type DialogHeaderProps = React.HTMLAttributes<HTMLDivElement>;
export type DialogFooterProps = React.HTMLAttributes<HTMLDivElement>;
export type DialogTitleProps = RadixDialog.DialogTitleProps;
export type DialogDescriptionProps = RadixDialog.DialogDescriptionProps;

export const Dialog: React.FC<DialogProps> = ({ ...props }) => <RadixDialog.Root {...props} />;
Dialog.displayName = 'Dialog';

export const DialogTrigger: React.FC<DialogTriggerProps> = React.forwardRef<
    HTMLButtonElement,
    DialogTriggerProps
>(({ className, ...props }, ref) => (
    <RadixDialog.Trigger ref={ref} className={cn(className)} {...props} />
));
DialogTrigger.displayName = 'DialogTrigger';

export const DialogContent: React.FC<DialogContentProps> = React.forwardRef<
    HTMLDivElement,
    DialogContentProps
>(
    (
        {
            className,
            children,
            variant,
            overlayVariant,
            scrollable = false,
            container,
            onOpenAutoFocus,
            onCloseAutoFocus,
            onEscapeKeyDown,
            onPointerDownOutside,
            onInteractOutside,
            'aria-describedby': ariaDescribedby = '',
            ...props
        },
        ref
    ) => (
        <RadixDialog.Portal container={container}>
            <RadixDialog.Overlay
                className={cn(
                    dialogOverlayVariants({ variant: overlayVariant, scroll: scrollable })
                )}
            />
            <RadixDialog.Content
                ref={ref}
                className={cn(
                    dialogContentVariants({ variant, position: scrollable ? 'center' : 'default' }),
                    className
                )}
                onOpenAutoFocus={onOpenAutoFocus}
                onCloseAutoFocus={onCloseAutoFocus}
                onEscapeKeyDown={onEscapeKeyDown}
                onPointerDownOutside={onPointerDownOutside}
                onInteractOutside={onInteractOutside}
                aria-describedby={ariaDescribedby}
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
DialogContent.displayName = 'DialogContent';

export const DialogHeader: React.FC<DialogHeaderProps> = React.forwardRef<
    HTMLDivElement,
    DialogHeaderProps
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
DialogHeader.displayName = 'DialogHeader';

export const DialogFooter: React.FC<DialogFooterProps> = React.forwardRef<
    HTMLDivElement,
    DialogFooterProps
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
DialogFooter.displayName = 'DialogFooter';

export const DialogTitle: React.FC<DialogTitleProps> = React.forwardRef<
    HTMLHeadingElement,
    DialogTitleProps
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
DialogTitle.displayName = 'DialogTitle';

export const DialogDescription: React.FC<DialogDescriptionProps> = React.forwardRef<
    HTMLParagraphElement,
    DialogDescriptionProps
>(({ className, ...props }, ref) => (
    <RadixDialog.Description
        ref={ref}
        className={cn('mb-4 font-serif text-neutral-300 text-xs', className)}
        {...props}
    />
));
DialogDescription.displayName = 'DialogDescription';
