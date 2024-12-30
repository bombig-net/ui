import { Badge as MuiBadge } from '@mui/base/Badge'
import { forwardRef } from 'react'
import { cn } from '@/lib/cn'

const badgeStyles = [
    // Base styles
    'inline-flex',
    'relative',
    'align-middle',
    'outline-none',
]

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
]

export interface BadgeProps extends React.ComponentPropsWithoutRef<typeof MuiBadge> {
    /**
     * The content rendered within the badge.
     */
    badgeContent?: React.ReactNode
    /**
     * The badge will be added relative to this node.
     */
    children?: React.ReactNode
    /**
     * If true, the badge is invisible.
     * @default false
     */
    invisible?: boolean
    /**
     * Max count to show.
     * @default 99
     */
    max?: number
    /**
     * Controls whether the badge is hidden when badgeContent is zero.
     * @default false
     */
    showZero?: boolean
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
    ({ className, children, badgeContent, invisible, max = 99, showZero = false, ...props }, ref) => {
        return (
            <MuiBadge
                ref={ref}
                className={cn(badgeStyles, className)}
                slotProps={{
                    badge: {
                        className: cn(badgeContentStyles)
                    }
                }}
                badgeContent={badgeContent}
                invisible={invisible}
                max={max}
                showZero={showZero}
                {...props}
            >
                {children}
            </MuiBadge>
        )
    }
)
Badge.displayName = 'Badge' 