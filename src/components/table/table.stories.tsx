import { useState } from 'react';

import type { Meta, StoryObj } from '@storybook/react';
import type { Selection, SortDescriptor } from 'react-aria-components';

import { Cell, Column, Row, Table, TableBody, TableHeader } from './table';

const meta = {
    title: 'Components/Table',
    component: Table,
    parameters: {
        docs: {
            description: {
                component: `A Table component that provides accessible data grid functionality. Based on React Aria's Table component.

Features:
- Keyboard navigation and selection
- Support for single and multiple selection
- Row focus management
- ARIA grid semantics
- Support for sorting (click column headers or use keyboard)
- Support for disabled rows
- Support for custom cell rendering

[React Aria Table Documentation](https://react-spectrum.adobe.com/react-aria/Table.html)`,
            },
        },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const columns = [
    { name: 'Name', key: 'name' },
    { name: 'Type', key: 'type' },
    { name: 'Date Modified', key: 'date' },
];

const rows = [
    { id: 1, name: 'Games', type: 'Folder', date: '6/7/2020' },
    { id: 2, name: 'Program Files', type: 'Folder', date: '4/7/2021' },
    { id: 3, name: 'bootlog.txt', type: 'Text file', date: '1/18/2024' },
    { id: 4, name: 'package.json', type: 'JSON file', date: '1/18/2024' },
];

export const Default: Story = {
    render: () => (
        <Table aria-label="Files">
            <TableHeader>
                <Column isRowHeader>Name</Column>
                <Column>Type</Column>
                <Column>Date Modified</Column>
            </TableHeader>
            <TableBody>
                {rows.map((row) => (
                    <Row key={row.id}>
                        <Cell>{row.name}</Cell>
                        <Cell>{row.type}</Cell>
                        <Cell>{row.date}</Cell>
                    </Row>
                ))}
            </TableBody>
        </Table>
    ),
};

const SelectionExample = () => {
    const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));

    return (
        <Table
            aria-label="Files with selection"
            selectionMode="multiple"
            selectedKeys={selectedKeys}
            onSelectionChange={setSelectedKeys}
        >
            <TableHeader>
                <Column isRowHeader>Name</Column>
                <Column>Type</Column>
                <Column>Date Modified</Column>
            </TableHeader>
            <TableBody>
                {rows.map((row) => (
                    <Row key={row.id}>
                        <Cell>{row.name}</Cell>
                        <Cell>{row.type}</Cell>
                        <Cell>{row.date}</Cell>
                    </Row>
                ))}
            </TableBody>
        </Table>
    );
};

const SortingExample = () => {
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
        column: 'name',
        direction: 'ascending',
    });

    const sortedRows = [...rows].sort((a, b) => {
        const first = a[sortDescriptor.column as keyof typeof a];
        const second = b[sortDescriptor.column as keyof typeof b];
        let cmp = (first || '').toString().localeCompare((second || '').toString());
        if (sortDescriptor.direction === 'descending') {
            cmp *= -1;
        }
        return cmp;
    });

    return (
        <Table
            aria-label="Files with sorting"
            sortDescriptor={sortDescriptor}
            onSortChange={setSortDescriptor}
        >
            <TableHeader>
                {columns.map((column) => (
                    <Column
                        key={column.key}
                        id={column.key}
                        isRowHeader={column.key === 'name'}
                        allowsSorting
                    >
                        {column.name}
                    </Column>
                ))}
            </TableHeader>
            <TableBody>
                {sortedRows.map((row) => (
                    <Row key={row.id}>
                        <Cell>{row.name}</Cell>
                        <Cell>{row.type}</Cell>
                        <Cell>{row.date}</Cell>
                    </Row>
                ))}
            </TableBody>
        </Table>
    );
};

export const WithSelection: Story = {
    render: () => <SelectionExample />,
};

export const WithSorting: Story = {
    render: () => <SortingExample />,
};
