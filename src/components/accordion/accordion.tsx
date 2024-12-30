import * as React from 'react';

import * as RadixAccordion from '@radix-ui/react-accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import { type VariantProps, cva } from 'class-variance-authority';

import { cn } from '@/lib/cn';

const accordionTriggerVariants = cva(
    'flex w-full items-center justify-between py-4 text-sm font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180',
    {
        variants: {
            variant: {
                default: 'text-neutral-900',
                muted: 'text-neutral-600',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

const accordionContentVariants = cva(
    'text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden',
    {
        variants: {
            variant: {
                default: 'text-neutral-700',
                muted: 'text-neutral-500',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

type AccordionPropsBase = {
    className?: string;
};

type AccordionSingleProps = AccordionPropsBase & RadixAccordion.AccordionSingleProps;
type AccordionMultipleProps = AccordionPropsBase & RadixAccordion.AccordionMultipleProps;

export type AccordionProps = AccordionSingleProps | AccordionMultipleProps;
export type AccordionItemProps = RadixAccordion.AccordionItemProps;
export interface AccordionTriggerProps
    extends RadixAccordion.AccordionTriggerProps,
        VariantProps<typeof accordionTriggerVariants> {}
export interface AccordionContentProps
    extends RadixAccordion.AccordionContentProps,
        VariantProps<typeof accordionContentVariants> {}

export function Accordion(props: AccordionProps): React.JSX.Element {
    return <RadixAccordion.Root {...props} />;
}

export function AccordionItem({ className, ...props }: AccordionItemProps): React.JSX.Element {
    return (
        <RadixAccordion.Item className={cn('border-neutral-200 border-b', className)} {...props} />
    );
}

export function AccordionTrigger({
    className,
    variant,
    children,
    ...props
}: AccordionTriggerProps): React.JSX.Element {
    return (
        <RadixAccordion.Header className="flex">
            <RadixAccordion.Trigger
                className={cn(accordionTriggerVariants({ variant }), className)}
                {...props}
            >
                {children}
                <ChevronDownIcon
                    className="w-4 h-4 transition-transform duration-200 shrink-0"
                    aria-hidden
                />
            </RadixAccordion.Trigger>
        </RadixAccordion.Header>
    );
}

export function AccordionContent({
    className,
    variant,
    children,
    ...props
}: AccordionContentProps): React.JSX.Element {
    return (
        <RadixAccordion.Content
            className={cn(accordionContentVariants({ variant }), className)}
            {...props}
        >
            <div className="pt-0 pb-4">{children}</div>
        </RadixAccordion.Content>
    );
}
