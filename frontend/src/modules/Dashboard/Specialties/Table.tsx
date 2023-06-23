import { type ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { useMemo } from 'react';

import { Table as TableTemplate } from '@/components/Table';
import { TitleCell } from '@/components/Table/cells';
import { SelectionColumn } from '@/components/Table/columns';
import { fuzzySort } from '@/components/Table/filters';
import routes from '@/helpers/routes';
import type { Specialty } from '@/types/medical/specialty.model';

const columnHelper = createColumnHelper<Specialty>();

const Table: React.FC = () => {
  const columns = useMemo<ColumnDef<Specialty>[]>(
    () => [
      SelectionColumn<Specialty>(),
      columnHelper.accessor('name', {
        header: 'Especialidad',
        cell: (info) => {
          const { id } = info.row.original;

          return (
            <TitleCell
              href={routes.dashboard.specialty(id)}
              title='ver información general de la especialidad'
            >
              {info.getValue()}
            </TitleCell>
          );
        },
        filterFn: 'fuzzy',
        sortingFn: fuzzySort,
      }),
      columnHelper.accessor('description', {
        header: 'Descripción',
        filterFn: 'fuzzy',
      }),
    ],
    []
  );

  return <TableTemplate<Specialty> columns={columns} />;
};

export default Table;
