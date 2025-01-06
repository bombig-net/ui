import * as React from 'react';

import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/cn';

const userVariants = cva('inline-flex items-center gap-4 w-fit', {
    variants: {
        size: {
            sm: 'text-sm',
            md: 'text-base',
            lg: 'text-lg',
        },
    },
    defaultVariants: {
        size: 'md',
    },
});

const avatarVariants = cva(
    'inline-flex relative justify-center items-center bg-neutral-100 rounded-full overflow-hidden',
    {
        variants: {
            size: {
                sm: 'h-8 w-8',
                md: 'h-10 w-10',
                lg: 'h-12 w-12',
            },
        },
        defaultVariants: {
            size: 'md',
        },
    }
);

export interface UserProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof userVariants> {
    name: string;
    description?: string;
    avatarProps?: React.ImgHTMLAttributes<HTMLImageElement>;
    avatarFallback?: string;
    className?: string;
}

export function User({
    name,
    description,
    avatarProps,
    avatarFallback,
    size,
    className,
    ...props
}: UserProps): React.JSX.Element {
    const initials = React.useMemo(() => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()
            .slice(0, 2);
    }, [name]);

    return (
        <div className={cn(userVariants({ size }), className)} {...props}>
            <div className={avatarVariants({ size })}>
                {avatarProps?.src ? (
                    <img
                        alt={avatarProps.alt || `${name}'s avatar`}
                        className="w-full h-full object-cover"
                        {...avatarProps}
                    />
                ) : (
                    <span className="text-neutral-600">{avatarFallback || initials}</span>
                )}
            </div>
            <div className="flex flex-col gap-1">
                <span className="font-medium text-sm leading-none">{name}</span>
                {description ? (
                    <span className="text-neutral-500 text-sm leading-none">{description}</span>
                ) : null}
            </div>
        </div>
    );
}
