import { useMemo } from 'react';
import { type ColumnDef, createColumnHelper } from '@tanstack/react-table';

import { Table as TableTemplate } from '@Components/Table';
import { SelectionColumn } from '@Components/Table/columns';
import { fuzzySort } from '@Components/Table/filters';
import type { Specialty } from '@Types/medical/specialty.model';

const columnHelper = createColumnHelper<Specialty>();

const Table: React.FC = () => {
    const columns = useMemo<ColumnDef<Specialty>[]>(() => [
        SelectionColumn<Specialty>(),
        columnHelper.accessor('name', {
            header: 'Especialidad',
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