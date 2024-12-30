import * as React from 'react';
import { forwardRef } from 'react';

import type { BadgeProps as MuiBadgeProps } from '@mui/base/Badge';
import { Badge as MuiBadge } from '@mui/base/Badge';

import { cn } from '@/lib/cn';

const badgeStyles = [
    // Base styles
    'inline-flex',
    'relative',
    'align-middle',
    'outline-none',
] as const;

const badgeContentStyles = [
    // Base styles
    'absolute',
    'flex items-center justify-center',
    'rounded-full',
    'min-w-[20px] h-5',
    'px-1.5',
    'text-xs font-medium',
    'bg-neutral-900 text-white',
    'top-0 right-0',
    '-translate-y-1/2 translate-x-1/2',
    // Invisible state
    'data-[invisible=true]:hidden',
] as const;

export interface BadgeProps extends Omit<MuiBadgeProps, 'slots' | 'slotProps'> {
    /**
     * The content rendered within the badge.
     */
    badgeContent?: React.ReactNode;
    /**
     * The badge will be added relative to this node.
     */
    children?: React.ReactNode;
    /**
     * If true, the badge is invisible.
     * @default false
     */
    invisible?: boolean;
    /**
     * Max count to show.
     * @default 99
     */
    max?: number;
    /**
     * Controls whether the badge is hidden when badgeContent is zero.
     * @default false
     */
    showZero?: boolean;
    /**
     * Additional CSS classes to apply to the badge.
     */
    className?: string;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
    (props: BadgeProps, ref: React.ForwardedRef<HTMLSpanElement>) => {
        const {
            className,
            children,
            badgeContent,
            invisible,
            max = 99,
            showZero = false,
            ...rest
        } = props;

        return (
            <MuiBadge
                ref={ref}
                className={cn(badgeStyles, className)}
                slotProps={{
                    badge: {
                        className: cn(badgeContentStyles),
                    },
                }}
                badgeContent={badgeContent}
                invisible={invisible}
                max={max}
                showZero={showZero}
                {...rest}
            >
                {children}
            </MuiBadge>
        );
    }
);
Badge.displayName = 'Badge';
