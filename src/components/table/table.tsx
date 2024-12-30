import { forwardRef } from 'react';

import {
    Cell as AriaCell,
    Column as AriaColumn,
    Row as AriaRow,
    Table as AriaTable,
    TableBody as AriaTableBody,
    TableHeader as AriaTableHeader,
} from 'react-aria-components';

import { cn } from '@/lib/cn';

const tableStyles = [
    // Base styles
    'w-full border-collapse',
    'border border-neutral-200 rounded-lg',
    'outline-none',
    // Focus styles
    'data-[focus-visible]:outline-2 data-[focus-visible]:outline-neutral-900 data-[focus-visible]:outline-offset-2',
];

const headerStyles = ['border-b border-neutral-200', 'bg-neutral-50'];

const columnStyles = [
    // Base styles
    'p-3 text-sm font-medium text-neutral-900',
    'text-left',
    'outline-none',
    'group/column',
    // Interactive states for sortable columns
    'data-[sortable=true]:cursor-pointer',
    'data-[sortable=true]:hover:bg-neutral-100',
    'data-[sortable=true]:focus-visible:bg-neutral-100',
    // Focus styles
    'data-[focus-visible]:outline-2 data-[focus-visible]:outline-neutral-900 data-[focus-visible]:outline-offset-[-2px]',
    // Sort direction indicators
    'data-[sortable=true]:relative data-[sortable=true]:pr-6',
    'data-[sorted=true]:after:absolute data-[sorted=true]:after:right-2 data-[sorted=true]:after:top-1/2 data-[sorted=true]:after:-translate-y-1/2',
    'data-[sort-direction=ascending]:after:content-["↑"]',
    'data-[sort-direction=descending]:after:content-["↓"]',
    // Unsorted indicator on hover
    'data-[sortable=true]:not([data-sorted=true]):hover:after:content-["↕"] data-[sortable=true]:not([data-sorted=true]):hover:after:absolute data-[sortable=true]:not([data-sorted=true]):hover:after:right-2 data-[sortable=true]:not([data-sorted=true]):hover:after:top-1/2 data-[sortable=true]:not([data-sorted=true]):hover:after:-translate-y-1/2 data-[sortable=true]:not([data-sorted=true]):hover:after:text-neutral-400',
];

const bodyStyles = ['divide-y divide-neutral-200'];

const rowStyles = [
    'outline-none',
    // Interactive states
    'data-[selected]:bg-neutral-100',
    'data-[pressed]:bg-neutral-50',
    'data-[focus-visible]:outline-2 data-[focus-visible]:outline-neutral-900 data-[focus-visible]:outline-offset-[-2px]',
    // Disabled state
    'data-[disabled]:opacity-50',
];

const cellStyles = [
    'p-3 text-sm text-neutral-600',
    'outline-none',
    // Focus styles
    'data-[focus-visible]:outline-2 data-[focus-visible]:outline-neutral-900 data-[focus-visible]:outline-offset-[-2px]',
];

export type TableProps = React.ComponentPropsWithoutRef<typeof AriaTable>;
export type TableHeaderProps = React.ComponentPropsWithoutRef<typeof AriaTableHeader>;
export type TableBodyProps = React.ComponentPropsWithoutRef<typeof AriaTableBody>;
export type ColumnProps = React.ComponentPropsWithoutRef<typeof AriaColumn>;
export type RowProps = React.ComponentPropsWithoutRef<typeof AriaRow>;
export type CellProps = React.ComponentPropsWithoutRef<typeof AriaCell>;

export const Table = forwardRef<HTMLTableElement, TableProps>(({ className, ...props }, ref) => {
    return <AriaTable ref={ref} className={cn(tableStyles, className)} {...props} />;
});
Table.displayName = 'Table';

export const TableHeader = forwardRef<HTMLTableSectionElement, TableHeaderProps>(
    ({ className, ...props }, ref) => {
        return <AriaTableHeader ref={ref} className={cn(headerStyles, className)} {...props} />;
    }
);
TableHeader.displayName = 'TableHeader';

export const Column = forwardRef<HTMLTableCellElement, ColumnProps>(
    ({ className, ...props }, ref) => {
        return <AriaColumn ref={ref} className={cn(columnStyles, className)} {...props} />;
    }
);
Column.displayName = 'Column';

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
    ({ className, ...props }, ref) => {
        return <AriaTableBody ref={ref} className={cn(bodyStyles, className)} {...props} />;
    }
);
TableBody.displayName = 'TableBody';

export const Row = forwardRef<HTMLTableRowElement, RowProps>(({ className, ...props }, ref) => {
    return <AriaRow ref={ref} className={cn(rowStyles, className)} {...props} />;
});
Row.displayName = 'Row';

export const Cell = forwardRef<HTMLTableCellElement, CellProps>(({ className, ...props }, ref) => {
    return <AriaCell ref={ref} className={cn(cellStyles, className)} {...props} />;
});
Cell.displayName = 'Cell';
