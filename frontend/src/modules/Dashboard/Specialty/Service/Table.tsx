import { type ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { useMemo } from 'react';

import { CopyButton } from '@/components/Button';
import { Table as TableTemplate } from '@/components/Table';
import { RightCell, TitleCell } from '@/components/Table/cells';
import { SelectionColumn } from '@/components/Table/columns';
import { fuzzySort } from '@/components/Table/filters';
import routes from '@/helpers/routes';
import type { Service } from '@/types/medical/service.model';
import { formatCurrency } from '@/utils/formatter';

const columnHelper = createColumnHelper<Service>();

const Table: React.FC = () => {
  const columns = useMemo<ColumnDef<Service>[]>(
    () => [
      SelectionColumn<Service>(),
      columnHelper.accessor('name', {
        header: 'Servicio',
        cell: (info) => {
          const { id } = info.row.original;

          return (
            <TitleCell
              href={routes.dashboard.service(id)}
              title='ver información general del servicio'
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
        cell: (info) => (
          <>
            <span>{info.getValue()}</span>
            <div role='toolbar'>
              <CopyButton textToCopy={info.getValue()} />
            </div>
          </>
        ),
        filterFn: 'fuzzy',
      }),
      columnHelper.accessor('duration', {
        header: 'Duración',
        cell: (info) => <RightCell>{info.getValue()} minutos</RightCell>,
      }),
      columnHelper.accessor('cost', {
        header: 'Precio',
        cell: (info) => <RightCell>{formatCurrency(info.getValue())}</RightCell>,
      }),
    ],
    []
  );

  return <TableTemplate<Service> columns={columns} />;
};

export default Table;
