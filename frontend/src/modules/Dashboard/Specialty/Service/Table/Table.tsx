import { type ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { useMemo } from 'react';

import { CopyButton } from '@/components/Button';
import { Table as TableTemplate } from '@/components/Table';
import { SelectionColumn } from '@/components/Table/columns';
import { fuzzySort } from '@/components/Table/filters';
import type { Service } from '@/types/medical/service.model';
import { formatCurrency } from '@/utils/formatter';

import styles from './Table.module.scss';

const columnHelper = createColumnHelper<Service>();

const Table: React.FC = () => {
  const columns = useMemo<ColumnDef<Service>[]>(
    () => [
      SelectionColumn<Service>(),
      columnHelper.accessor('name', {
        header: 'Servicio',
        cell: (info) => (
          <>
            <span className={styles.title}>{info.getValue()}</span>
            <div role='toolbar'>
              <CopyButton textToCopy={info.getValue()} />
            </div>
          </>
        ),
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
        cell: (info) => <span className={styles.number}>{info.getValue()} minutos</span>,
      }),
      columnHelper.accessor('cost', {
        header: 'Precio',
        cell: (info) => (
          <span className={styles.number}>{formatCurrency(info.getValue())}</span>
        ),
      }),
    ],
    []
  );

  return <TableTemplate<Service> columns={columns} />;
};

export default Table;
