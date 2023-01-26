import { useState } from 'react';
import {
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFacetedMinMaxValues,
    getFacetedRowModel,
    getFacetedUniqueValues,
    getFilteredRowModel,
    getSortedRowModel,
    RowSelectionState,
    SortingState,
    useReactTable
} from '@tanstack/react-table';

import { TableProps } from './Table.types';
import { Filter, fuzzyFilter, startWithFilter } from './filters';

import styles from './Table.module.scss';

function Table<D extends object = {}>({ columns, data }: TableProps<D>) {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
    const [sorting, setSorting] = useState<SortingState>([]);

    const table = useReactTable<D>({
        data,
        columns,
        filterFns: {
            fuzzy: fuzzyFilter,
            startWith: startWithFilter
        },
        state: { columnFilters, rowSelection, sorting },
        onColumnFiltersChange: setColumnFilters,
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

    return (
        <table className={styles["table"]}>
            <thead>
                {getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <th
                                key={header.id}
                                className={styles["head-cell"]}
                                colSpan={header.colSpan}
                            >
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