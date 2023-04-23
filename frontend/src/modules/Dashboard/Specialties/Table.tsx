import { useMemo } from 'react';
import { type ColumnDef, createColumnHelper } from '@tanstack/react-table';

import { Table as TableTemplate } from '@Components/Table';
import { TitleCell } from '@Components/Table/cells';
import { SelectionColumn } from '@Components/Table/columns';
import { fuzzySort } from '@Components/Table/filters';
import routes from '@Helpers/routes';
import type { Specialty } from '@Types/medical/specialty.model';

const columnHelper = createColumnHelper<Specialty>();

const Table: React.FC = () => {
    const columns = useMemo<ColumnDef<Specialty>[]>(() => [
        SelectionColumn<Specialty>(),
        columnHelper.accessor('name', {
            header: 'Especialidad',
            cell: info => {
                const { id } = info.row.original;

                return (
                    <TitleCell
                        href={routes.dashboard.specialty(id)}
                        title='ver información general de la especialidad'
                    >
                        {info.getValue()}
                    </TitleCell>
                )
            },
            filterFn: 'fuzzy',
            sortingFn: fuzzySort
        }),
        columnHelper.accessor('description', {
            header: 'Descripción',
            filterFn: 'fuzzy'
        })
    ], []);

    return <TableTemplate<Specialty> columns={columns} />
}

export default Table;