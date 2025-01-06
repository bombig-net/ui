import * as React from 'react';

import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/cn';

const commentVariants = cva(
    [
        'relative flex gap-4',
        'transition-all duration-200',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2',
    ].join(' '),
    {
        variants: {
            variant: {
                default: '',
                ghost: 'opacity-75',
                highlight: 'bg-neutral-50 p-4 rounded-lg',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

const commentGroupVariants = cva('space-y-6', {
    variants: {
        variant: {
            default: '',
            nested: 'ml-12 mt-6',
            threaded: 'border-l-2 border-neutral-100 pl-6 ml-6',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

const commentContentVariants = cva('flex-1 space-y-2', {
    variants: {
        variant: {
            default: '',
            compact: 'space-y-1',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

// Comment interfaces
export interface CommentProps
    extends React.HTMLAttributes<HTMLElement>,
        VariantProps<typeof commentVariants> {
    author: string;
    avatarUrl?: string;
    metadata?: React.ReactNode;
    actions?: React.ReactNode;
    isDeleted?: boolean;
}

export interface CommentGroupProps
    extends React.HTMLAttributes<HTMLElement>,
        VariantProps<typeof commentGroupVariants> {
    collapsed?: boolean;
}

export interface CommentContentProps
    extends React.HTMLAttributes<HTMLElement>,
        VariantProps<typeof commentContentVariants> {}

// Main Comment component
export function Comment({
    className,
    variant,
    author,
    avatarUrl,
    metadata,
    actions,
    isDeleted,
    children,
    ...props
}: CommentProps): React.JSX.Element {
    if (isDeleted) {
        return (
            <div className={cn('text-neutral-500 italic', className)}>
                This comment has been deleted.
            </div>
        );
    }

    return (
        <article className={cn(commentVariants({ variant }), className)} {...props}>
            {avatarUrl ? (
                <img
                    src={avatarUrl}
                    alt={`${author}'s avatar`}
                    className="rounded-full w-10 h-10 object-cover"
                />
            ) : null}
            <div className="flex-1">
                <div className="flex items-center gap-2">
                    <span className="font-semibold">{author}</span>
                    {metadata ? <span className="text-neutral-500 text-sm">{metadata}</span> : null}
                </div>
                <div className="mt-1">{children}</div>
                {actions ? (
                    <div className="flex gap-4 mt-2 text-neutral-500 text-sm">{actions}</div>
                ) : null}
            </div>
        </article>
    );
}

// Comment Group component
export function CommentGroup({
    className,
    variant,
    collapsed,
    children,
    ...props
}: CommentGroupProps): React.JSX.Element | null {
    if (collapsed) {
        return null;
    }

    return (
        <div className={cn(commentGroupVariants({ variant }), className)} {...props}>
            {children}
        </div>
    );
}

// Comment Content component
export function CommentContent({
    className,
    variant,
    children,
    ...props
}: CommentContentProps): React.JSX.Element {
    return (
        <div className={cn(commentContentVariants({ variant }), className)} {...props}>
            {children}
        </div>
    );
}

// Comment Action component
export function CommentAction({
    className,
    children,
    ...props
}: React.HTMLAttributes<HTMLButtonElement>): React.JSX.Element {
    return (
        <button
            className={cn('hover:text-neutral-900 transition-colors duration-200', className)}
            {...props}
        >
            {children}
        </button>
    );
}

// Comment Actions container
export function CommentActions({
    className,
    children,
    ...props
}: React.HTMLAttributes<HTMLDivElement>): React.JSX.Element {
    return (
        <div className={cn('flex gap-4 text-neutral-500 text-sm', className)} {...props}>
            {children}
        </div>
    );
}

// Comment Metadata component
export function CommentMetadata({
    className,
    children,
    ...props
}: React.HTMLAttributes<HTMLSpanElement>): React.JSX.Element {
    return (
        <span className={cn('text-neutral-500 text-sm', className)} {...props}>
            {children}
        </span>
    );
}
