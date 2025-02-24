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
    'border border-white/20 rounded-lg',
    'outline-none',
    // Focus styles
    'data-[focus-visible]:outline-2 data-[focus-visible]:outline-duck-400 data-[focus-visible]:outline-offset-2',
];

const headerStyles = ['border-b border-white/20', 'bg-white/5'];

const columnStyles = [
    // Base styles
    'p-3 text-sm font-medium text-white',
    'text-left',
    'outline-none',
    'group/column',
    // Interactive states for sortable columns
    'data-[sortable=true]:cursor-pointer',
    'data-[sortable=true]:hover:bg-white/10',
    'data-[sortable=true]:focus-visible:bg-white/10',
    // Focus styles
    'data-[focus-visible]:outline-2 data-[focus-visible]:outline-duck-400 data-[focus-visible]:outline-offset-[-2px]',
    // Sort direction indicators
    'data-[sortable=true]:relative data-[sortable=true]:pr-6',
    'data-[sorted=true]:after:absolute data-[sorted=true]:after:right-2 data-[sorted=true]:after:top-1/2 data-[sorted=true]:after:-translate-y-1/2',
    'data-[sort-direction=ascending]:after:content-["↑"] data-[sort-direction=ascending]:after:text-duck-400',
    'data-[sort-direction=descending]:after:content-["↓"] data-[sort-direction=descending]:after:text-duck-400',
    // Unsorted indicator on hover
    'data-[sortable=true]:not([data-sorted=true]):hover:after:content-["↕"] data-[sortable=true]:not([data-sorted=true]):hover:after:absolute data-[sortable=true]:not([data-sorted=true]):hover:after:right-2 data-[sortable=true]:not([data-sorted=true]):hover:after:top-1/2 data-[sortable=true]:not([data-sorted=true]):hover:after:-translate-y-1/2 data-[sortable=true]:not([data-sorted=true]):hover:after:text-white/60',
];

const bodyStyles = ['divide-y divide-white/20'];

const rowStyles = [
    'outline-none',
    // Interactive states
    'data-[selected]:bg-duck-400/20',
    'data-[pressed]:bg-white/5',
    'data-[focus-visible]:outline-2 data-[focus-visible]:outline-duck-400 data-[focus-visible]:outline-offset-[-2px]',
    // Disabled state
    'data-[disabled]:opacity-50',
];

const cellStyles = [
    'p-3 text-sm text-white/90',
    'outline-none',
    // Focus styles
    'data-[focus-visible]:outline-2 data-[focus-visible]:outline-duck-400 data-[focus-visible]:outline-offset-[-2px]',
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
