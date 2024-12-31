import * as React from 'react';

import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/cn';

const cardVariants = cva(
    [
        'rounded-lg border border-neutral-200 bg-white text-neutral-950',
        'transition-all duration-200 relative',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2',
    ].join(' '),
    {
        variants: {
            variant: {
                default: 'hover:border-neutral-300',
                ghost: 'border-none shadow-none',
                outline: 'border-2',
            },
            shadow: {
                none: 'shadow-none',
                sm: 'shadow-sm',
                md: 'shadow-md',
                lg: 'shadow-lg',
            },
            radius: {
                none: 'rounded-none',
                sm: 'rounded-sm',
                md: 'rounded-md',
                lg: 'rounded-lg',
            },
            blur: {
                none: '',
                sm: 'backdrop-blur-sm',
                md: 'backdrop-blur-md',
                lg: 'backdrop-blur-lg',
            },
        },
        defaultVariants: {
            variant: 'default',
            shadow: 'sm',
            radius: 'lg',
            blur: 'none',
        },
    }
);

export interface CardProps
    extends Omit<React.HTMLAttributes<HTMLElement>, 'onClick'>,
        VariantProps<typeof cardVariants> {
    asChild?: boolean;
    isClickable?: boolean;
    isHoverable?: boolean;
    isDisabled?: boolean;
    disableAnimation?: boolean;
    allowTextSelectionOnPress?: boolean;
    fullWidth?: boolean;
    onPress?: (e: React.MouseEvent | React.KeyboardEvent) => void;
    onPressStart?: (e: React.MouseEvent | React.KeyboardEvent) => void;
    onPressEnd?: (e: React.MouseEvent | React.KeyboardEvent) => void;
    onPressChange?: (isPressed: boolean) => void;
    onPressUp?: (e: React.MouseEvent | React.KeyboardEvent) => void;
}

export function Card({
    className,
    variant,
    shadow,
    radius,
    blur,
    asChild = false,
    isClickable = false,
    isHoverable = false,
    isDisabled = false,
    disableAnimation = false,
    allowTextSelectionOnPress = false,
    fullWidth = false,
    onPress,
    onPressStart,
    onPressEnd,
    onPressChange,
    onPressUp,
    ...props
}: CardProps): React.JSX.Element {
    const [isPressed, setIsPressed] = React.useState(false);
    const [isFocusVisible, setIsFocusVisible] = React.useState(false);
    const Comp = asChild ? React.Fragment : 'article';
    const role = isClickable ? 'button' : undefined;
    const tabIndex = isClickable && !isDisabled ? 0 : undefined;

    const handlePress = (e: React.MouseEvent | React.KeyboardEvent) => {
        if (isDisabled) {
            return;
        }
        onPress?.(e);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (isDisabled) {
            return;
        }
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsPressed(true);
            onPressStart?.(e);
            onPressChange?.(true);
        }
    };

    const handleKeyUp = (e: React.KeyboardEvent) => {
        if (isDisabled) {
            return;
        }
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsPressed(false);
            handlePress(e);
            onPressEnd?.(e);
            onPressChange?.(false);
            onPressUp?.(e);
        }
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        if (isDisabled) {
            return;
        }
        setIsPressed(true);
        onPressStart?.(e);
        onPressChange?.(true);
    };

    const handleMouseUp = (e: React.MouseEvent) => {
        if (isDisabled) {
            return;
        }
        setIsPressed(false);
        onPressEnd?.(e);
        onPressChange?.(false);
        onPressUp?.(e);
    };

    const handleMouseLeave = () => {
        if (isDisabled) {
            return;
        }
        setIsPressed(false);
        onPressChange?.(false);
    };

    React.useEffect(() => {
        const handleFocusVisible = (e: KeyboardEvent) => {
            if (e.key === 'Tab') {
                setIsFocusVisible(true);
            }
        };

        document.addEventListener('keydown', handleFocusVisible);
        return () => {
            document.removeEventListener('keydown', handleFocusVisible);
        };
    }, []);

    return (
        <Comp
            role={role}
            tabIndex={tabIndex}
            aria-disabled={isDisabled}
            data-hover={isHoverable || undefined}
            data-focus={isFocusVisible || undefined}
            data-focus-visible={isFocusVisible || undefined}
            data-disabled={isDisabled || undefined}
            data-pressed={isPressed || undefined}
            className={cn(
                cardVariants({ variant, shadow, radius, blur }),
                isClickable && 'cursor-pointer',
                isHoverable && 'hover:scale-[1.02]',
                isDisabled && 'pointer-events-none opacity-50',
                !disableAnimation && 'animate-in fade-in-0 zoom-in-95',
                !allowTextSelectionOnPress && isClickable && 'select-none',
                fullWidth && 'w-full',
                className
            )}
            onKeyDown={isClickable ? handleKeyDown : undefined}
            onKeyUp={isClickable ? handleKeyUp : undefined}
            onMouseDown={isClickable ? handleMouseDown : undefined}
            onMouseUp={isClickable ? handleMouseUp : undefined}
            onMouseLeave={isClickable ? handleMouseLeave : undefined}
            onClick={isClickable ? handlePress : undefined}
            {...props}
        >
            {props.children}
        </Comp>
    );
}

const cardHeaderVariants = cva('flex flex-col space-y-1.5 p-6', {
    variants: {
        variant: {
            default: '',
            ghost: '',
            outline: '',
        },
        isBlurred: {
            true: 'backdrop-blur-sm bg-white/50',
            false: '',
        },
    },
    defaultVariants: {
        variant: 'default',
        isBlurred: false,
    },
});

export interface CardHeaderProps
    extends React.HTMLAttributes<HTMLElement>,
        VariantProps<typeof cardHeaderVariants> {
    isBlurred?: boolean;
}

export function CardHeader({
    className,
    variant,
    isBlurred,
    ...props
}: CardHeaderProps): React.JSX.Element {
    return (
        <header className={cn(cardHeaderVariants({ variant, isBlurred }), className)} {...props} />
    );
}

const cardTitleVariants = cva('font-semibold text-2xl leading-none tracking-tight', {
    variants: {
        variant: {
            default: '',
            ghost: '',
            outline: '',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

export interface CardTitleProps
    extends React.HTMLAttributes<HTMLHeadingElement>,
        VariantProps<typeof cardTitleVariants> {
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export function CardTitle({
    className,
    variant,
    as: Comp = 'h3',
    ...props
}: CardTitleProps): React.JSX.Element {
    return <Comp className={cn(cardTitleVariants({ variant }), className)} {...props} />;
}

const cardDescriptionVariants = cva('text-neutral-600 text-sm', {
    variants: {
        variant: {
            default: 'text-neutral-700',
            ghost: 'text-neutral-700',
            outline: 'text-neutral-700',
        },
    },
    defaultVariants: {
        variant: 'default',
    },
});

export interface CardDescriptionProps
    extends React.HTMLAttributes<HTMLParagraphElement>,
        VariantProps<typeof cardDescriptionVariants> {}

export function CardDescription({
    className,
    variant,
    ...props
}: CardDescriptionProps): React.JSX.Element {
    return <p className={cn(cardDescriptionVariants({ variant }), className)} {...props} />;
}

const cardContentVariants = cva('p-6 pt-0', {
    variants: {
        variant: {
            default: '',
            ghost: '',
            outline: '',
        },
        noPadding: {
            true: 'p-0',
            false: '',
        },
    },
    defaultVariants: {
        variant: 'default',
        noPadding: false,
    },
});

export interface CardContentProps
    extends React.HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof cardContentVariants> {
    noPadding?: boolean;
}

export function CardContent({
    className,
    variant,
    noPadding,
    ...props
}: CardContentProps): React.JSX.Element {
    return (
        <div className={cn(cardContentVariants({ variant, noPadding }), className)} {...props} />
    );
}

const cardFooterVariants = cva('flex items-center p-6 pt-0', {
    variants: {
        variant: {
            default: '',
            ghost: '',
            outline: '',
        },
        isBlurred: {
            true: 'backdrop-blur-sm bg-white/50',
            false: '',
        },
    },
    defaultVariants: {
        variant: 'default',
        isBlurred: false,
    },
});

export interface CardFooterProps
    extends React.HTMLAttributes<HTMLElement>,
        VariantProps<typeof cardFooterVariants> {
    isBlurred?: boolean;
}

export function CardFooter({
    className,
    variant,
    isBlurred,
    ...props
}: CardFooterProps): React.JSX.Element {
    return (
        <footer className={cn(cardFooterVariants({ variant, isBlurred }), className)} {...props} />
    );
}

export interface CardImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    as?: 'img' | 'div';
    src: string;
    alt: string;
    isZoomed?: boolean;
    radius?: 'none' | 'sm' | 'md' | 'lg';
    isCover?: boolean;
    isDecorative?: boolean;
}

export function CardImage({
    className,
    as = 'img',
    src,
    alt,
    isZoomed = false,
    radius = 'lg',
    isCover = false,
    isDecorative = false,
    ...props
}: CardImageProps): React.JSX.Element {
    const imageClasses = cn(
        'w-full object-cover',
        {
            'rounded-none': radius === 'none' || isCover,
            'rounded-sm': radius === 'sm' && !isCover,
            'rounded-md': radius === 'md' && !isCover,
            'rounded-lg': radius === 'lg' && !isCover,
            'transition-transform duration-200 hover:scale-110': isZoomed,
            'absolute inset-0 h-full': isCover,
        },
        className
    );

    const imgProps = {
        src,
        alt: isDecorative ? '' : alt,
        'aria-hidden': isDecorative || undefined,
        className: imageClasses,
        ...props,
    };

    if (as === 'div') {
        return (
            <div
                className={cn('overflow-hidden', {
                    'rounded-none': radius === 'none' || isCover,
                    'rounded-sm': radius === 'sm' && !isCover,
                    'rounded-md': radius === 'md' && !isCover,
                    'rounded-lg': radius === 'lg' && !isCover,
                    'absolute inset-0': isCover,
                })}
                aria-label={isDecorative ? undefined : alt}
            >
                <img {...imgProps} />
            </div>
        );
    }

    return <img {...imgProps} />;
}
