import * as React from 'react';

import { type VariantProps, cva } from 'class-variance-authority';

import { Button } from '@/components/button/button';
import { cn } from '@/lib/cn';

const paginationVariants = cva('flex items-center gap-1', {
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

const paginationItemVariants = cva(
    [
        'inline-flex items-center justify-center rounded-md transition-colors min-h-0 p-0',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
    ].join(' '),
    {
        variants: {
            size: {
                sm: 'h-8 w-8 text-sm',
                md: 'h-10 w-10 text-base',
                lg: 'h-12 w-12 text-lg',
            },
            variant: {
                default: 'hover:bg-neutral-100',
                outline: 'border border-neutral-300 hover:bg-neutral-100',
                cta: 'bg-neutral-900 text-white hover:bg-neutral-800',
            },
        },
        defaultVariants: {
            size: 'md',
            variant: 'default',
        },
    }
);

export interface PaginationProps
    extends Omit<React.HTMLAttributes<HTMLElement>, 'onChange'>,
        VariantProps<typeof paginationVariants> {
    total: number;
    page: number;
    onChange?: (page: number) => void;
    showControls?: boolean;
    variant?: VariantProps<typeof paginationItemVariants>['variant'];
    className?: string;
}

function ChevronLeft() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m15 18-6-6 6-6" />
        </svg>
    );
}

function ChevronRight() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m9 18 6-6-6-6" />
        </svg>
    );
}

function Dots() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
        </svg>
    );
}

export function Pagination({
    total,
    page,
    onChange,
    size,
    variant = 'default',
    showControls = true,
    className,
    ...props
}: PaginationProps): React.JSX.Element {
    const getPages = React.useCallback(() => {
        const pages: (number | string)[] = [];
        const maxVisible = 7;
        const halfVisible = Math.floor(maxVisible / 2);

        if (total <= maxVisible) {
            return Array.from({ length: total }, (_, i) => i + 1);
        }

        // Always show first page
        pages.push(1);

        let startPage = Math.max(2, page - halfVisible);
        let endPage = Math.min(total - 1, page + halfVisible);

        if (page - halfVisible <= 1) {
            endPage = maxVisible - 1;
        }

        if (page + halfVisible >= total) {
            startPage = total - (maxVisible - 2);
        }

        if (startPage > 2) {
            pages.push('...');
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        if (endPage < total - 1) {
            pages.push('...');
        }

        // Always show last page
        pages.push(total);

        return pages;
    }, [total, page]);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= total && onChange) {
            onChange(newPage);
        }
    };

    return (
        <nav
            className={cn(paginationVariants({ size }), className)}
            aria-label="pagination"
            {...props}
        >
            {showControls ? (
                <Button
                    variant="default"
                    className={cn(paginationItemVariants({ size, variant }))}
                    isDisabled={page === 1}
                    onPress={() => handlePageChange(page - 1)}
                    aria-label="Go to previous page"
                >
                    <ChevronLeft />
                </Button>
            ) : null}

            {getPages().map((pageNumber, index) => {
                if (pageNumber === '...') {
                    return (
                        <div
                            key={`dots-${index}`}
                            className={cn(
                                paginationItemVariants({ size, variant }),
                                'pointer-events-none'
                            )}
                            role="separator"
                            aria-label="More pages"
                        >
                            <Dots />
                        </div>
                    );
                }

                return (
                    <Button
                        key={pageNumber}
                        variant={page === pageNumber ? 'cta' : variant}
                        className={cn(paginationItemVariants({ size, variant }))}
                        onPress={() => handlePageChange(pageNumber as number)}
                        aria-label={`Go to page ${pageNumber}`}
                        aria-current={page === pageNumber ? 'page' : undefined}
                    >
                        {pageNumber}
                    </Button>
                );
            })}

            {showControls ? (
                <Button
                    variant="default"
                    className={cn(paginationItemVariants({ size, variant }))}
                    isDisabled={page === total}
                    onPress={() => handlePageChange(page + 1)}
                    aria-label="Go to next page"
                >
                    <ChevronRight />
                </Button>
            ) : null}
        </nav>
    );
}
