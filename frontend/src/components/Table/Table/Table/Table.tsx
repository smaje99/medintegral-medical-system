import { useEffect, useState } from 'react';
import {
    flexRender,
    getCoreRowModel,
    getFacetedMinMaxValues,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getSortedRowModel,
    type ColumnDef,
    type ColumnFiltersState,
    type RowSelectionState,
    type SortingState,
    useReactTable,
} from '@tanstack/react-table';

import { Filter, fuzzyFilter, startWithFilter } from '@Components/Table/filters';
import { useTable } from '../hooks';

import styles from './Table.module.scss';

export interface Props<D extends object = {}> {
    columns : ColumnDef<D>[];
}

function Table<D extends object = {}>({ columns }: Props<D>) {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    const [sorting, setSorting] = useState<SortingState>([]);

    const {
        setRowSelection: setRowSelectionProvider,
        setTable,
        dataForTable: { data },
        globalFilter,
        setGlobalFilter
    } = useTable<D>();

    const table = useReactTable<D>({
        data,
        columns,
        filterFns: {
            fuzzy: fuzzyFilter,
            startWith: startWithFilter
        },
        state: {
            columnFilters,
            globalFilter,
            rowSelection,
            sorting
        },
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: fuzzyFilter,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFacetedRowModel: getFacetedRowModel(),
        getFacetedUniqueValues: getFacetedUniqueValues(),
        getFacetedMinMaxValues: getFacetedMinMaxValues(),
    });

    const {
        getFooterGroups,
        getHeaderGroups,
        getRowModel
    } = table;

    useEffect(() => {
        setTable(table);
        setRowSelectionProvider(rowSelection);
    }, [table, rowSelection]);

    return (
        <table className={styles["table"]}>
            <thead>
                {getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <th key={header.id} className={styles["head-cell"]}>
                                {header.isPlaceholder ? null : (<>
                                    <div
                                        className={
                                            header.column.getCanFilter() ? styles["sorting"] : ''
                                        }
                                        onClick={header.column.getToggleSortingHandler()}
                                    >
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                        {{
                                            asc: ' 🔼', desc: ' 🔽',
                                        }[header.column.getIsSorted() as string] ?? null}
                                    </div>
                                    {header.column.getCanFilter() && (
                                        <div>
                                            <Filter column={header.column} table={table} />
                                        </div>
                                    )}
                                </>)}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody>
                {getRowModel().rows.map(row => (
                    <tr
                        key={row.id}
                        className={`${styles.row} ${row.getIsSelected() && styles.active}`}
                    >
                        {row.getVisibleCells().map(cell => (
                            <td key={cell.id} className={styles["cell"]}>
                                {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext()
                                )}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
            <tfoot>
                {getFooterGroups().map(footerGroup => (
                    <tr key={footerGroup.id}>
                        {footerGroup.headers.map(header => (
                            <th key={header.id} colSpan={header.colSpan}>
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.footer,
                                        header.getContext()
                                    )
                                }
                            </th>
                        ))}
                    </tr>
                ))}
            </tfoot>
        </table>
    )
}

export default Table;