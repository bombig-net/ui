import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

import { Cell, Column, Row, Table, TableBody, TableHeader } from './table';

const mockData = {
    columns: [
        { name: 'Name', key: 'name' },
        { name: 'Type', key: 'type' },
        { name: 'Date', key: 'date' },
    ],
    rows: [
        { id: 1, name: 'Document', type: 'File', date: '2024-01-20' },
        { id: 2, name: 'Images', type: 'Folder', date: '2024-01-19' },
    ],
};

const BasicTable = () => (
    <Table aria-label="Test table">
        <TableHeader>
            <Column isRowHeader>Name</Column>
            <Column>Type</Column>
            <Column>Date</Column>
        </TableHeader>
        <TableBody>
            {mockData.rows.map((row) => (
                <Row key={row.id}>
                    <Cell>{row.name}</Cell>
                    <Cell>{row.type}</Cell>
                    <Cell>{row.date}</Cell>
                </Row>
            ))}
        </TableBody>
    </Table>
);

const SelectableTable = () => (
    <Table aria-label="Selectable table" selectionMode="multiple">
        <TableHeader>
            <Column isRowHeader>Name</Column>
            <Column>Type</Column>
            <Column>Date</Column>
        </TableHeader>
        <TableBody>
            {mockData.rows.map((row) => (
                <Row key={row.id}>
                    <Cell>{row.name}</Cell>
                    <Cell>{row.type}</Cell>
                    <Cell>{row.date}</Cell>
                </Row>
            ))}
        </TableBody>
    </Table>
);

const SortableTable = () => (
    <Table aria-label="Sortable table">
        <TableHeader>
            <Column isRowHeader allowsSorting>
                Name
            </Column>
            <Column allowsSorting>Type</Column>
            <Column allowsSorting>Date</Column>
        </TableHeader>
        <TableBody>
            {mockData.rows.map((row) => (
                <Row key={row.id}>
                    <Cell>{row.name}</Cell>
                    <Cell>{row.type}</Cell>
                    <Cell>{row.date}</Cell>
                </Row>
            ))}
        </TableBody>
    </Table>
);

describe('Table', () => {
    it('renders without crashing', () => {
        render(<BasicTable />);
        expect(screen.getByRole('grid', { name: 'Test table' })).toBeInTheDocument();
    });

    it('should have no accessibility violations', async () => {
        const { container } = render(<BasicTable />);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });

    describe('Basic functionality', () => {
        it('renders correct number of rows and columns', () => {
            render(<BasicTable />);
            const table = screen.getByRole('grid');
            const rows = within(table).getAllByRole('row');

            // Header + data rows
            expect(rows).toHaveLength(mockData.rows.length + 1);

            // Check header cells
            const headerRow = rows[0];
            if (!headerRow) {
                throw new Error('Header row not found');
            }
            const headerCells = within(headerRow).getAllByRole('columnheader');
            expect(headerCells).toHaveLength(mockData.columns.length);

            // Check first row cells
            const firstDataRow = rows[1];
            if (!firstDataRow) {
                throw new Error('First data row not found');
            }
            const cells = within(firstDataRow).getAllByRole('gridcell');
            expect(cells).toHaveLength(mockData.columns.length - 1); // -1 because one cell is rowheader
        });

        it('renders row headers correctly', () => {
            render(<BasicTable />);
            const rows = screen.getAllByRole('row');
            const firstRow = rows[1];
            if (!firstRow) {
                throw new Error('First row not found');
            }
            const firstCell = within(firstRow).getByRole('rowheader');
            const firstRowData = mockData.rows[0];
            if (!firstRowData) {
                throw new Error('First row data not found');
            }
            expect(firstCell).toHaveTextContent(firstRowData.name);
        });

        it('applies correct base styles', () => {
            render(<BasicTable />);
            const table = screen.getByRole('grid');
            expect(table).toHaveClass('w-full', 'border-collapse');
        });
    });

    describe('Sorting functionality', () => {
        it('renders sortable columns with correct attributes', () => {
            render(<SortableTable />);
            const nameColumn = screen.getByRole('columnheader', { name: /name/i });
            expect(nameColumn).toHaveAttribute('aria-sort');
        });

        it('shows sort indicators on sortable columns', async () => {
            const user = userEvent.setup();
            render(<SortableTable />);

            const nameColumn = screen.getByRole('columnheader', { name: /name/i });
            await user.click(nameColumn);
            expect(nameColumn).toHaveAttribute('aria-sort');
        });
    });

    describe('Selection functionality', () => {
        it('supports row selection', async () => {
            const user = userEvent.setup();
            render(<SelectableTable />);

            const rows = screen.getAllByRole('row');
            const firstRow = rows[1];
            if (!firstRow) {
                throw new Error('First row not found');
            }

            await user.click(firstRow);
            expect(firstRow).toHaveAttribute('aria-selected', 'true');
        });
    });

    describe('Keyboard navigation', () => {
        it('supports keyboard focus on first row', async () => {
            const user = userEvent.setup();
            render(<BasicTable />);

            const grid = screen.getByRole('grid');
            const rows = within(grid).getAllByRole('row');
            const firstDataRow = rows[1];
            if (!firstDataRow) {
                throw new Error('First data row not found');
            }

            await user.tab();
            expect(document.activeElement).toBe(firstDataRow);
        });
    });

    describe('Styling', () => {
        it('applies custom className to table components', () => {
            render(
                <Table className="custom-table" aria-label="Styled table">
                    <TableHeader className="custom-header">
                        <Column isRowHeader className="custom-column">
                            Header
                        </Column>
                    </TableHeader>
                    <TableBody className="custom-body">
                        <Row className="custom-row">
                            <Cell className="custom-cell">Content</Cell>
                        </Row>
                    </TableBody>
                </Table>
            );

            expect(screen.getByRole('grid')).toHaveClass('custom-table');
            expect(screen.getByRole('row', { name: /content/i })).toHaveClass('custom-row');
            expect(screen.getByRole('rowheader')).toHaveClass('custom-cell');
        });

        it('combines default and custom styles', () => {
            render(
                <Table className="custom-table" aria-label="Combined styles table">
                    <TableHeader>
                        <Column isRowHeader>Header</Column>
                    </TableHeader>
                    <TableBody>
                        <Row>
                            <Cell>Content</Cell>
                        </Row>
                    </TableBody>
                </Table>
            );

            const table = screen.getByRole('grid');
            expect(table).toHaveClass('w-full', 'border-collapse', 'custom-table');
        });
    });
});
