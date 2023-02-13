import { zip } from 'lodash';
import { RiFileWarningFill } from 'react-icons/ri';
import {
    flexRender, getCoreRowModel, useReactTable
} from '@tanstack/react-table';

import type { InformationTableProps } from './InformationTable.types';

import styles from './InformationTable.module.scss';

function InformationTable<D extends object = {}>(
    { columns, data }: InformationTableProps<D>
) {
    const table = useReactTable<D>({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        filterFns: undefined
    });

    return (
        <table className={styles["table"]}>
            <tbody>
                {zip(
                    table.getHeaderGroups()[0].headers,
                    table.getRowModel().rows[0].getVisibleCells()
                ).map(([header, cell]) => (
                    <tr key={`${header.id}-${cell.id}`} className={styles["row"]}>
                        <th key={header.id} className={styles["header"]}>
                            {header.isPlaceholder ? null : flexRender(
                                header.column.columnDef.header, header.getContext()
                            )}
                        </th>
                        <td key={cell.id} className={styles["cell"]}>
                            {cell.getValue()
                                ? flexRender(cell.column.columnDef.cell, cell.getContext())
                                : (
                                    <span className={styles["no-content"]}>
                                        Información no existente <RiFileWarningFill />
                                    </span>
                                )
                            }
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default InformationTable;