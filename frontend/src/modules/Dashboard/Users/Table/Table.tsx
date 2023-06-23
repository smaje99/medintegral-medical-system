import { type ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { useMemo } from 'react';

import { Badge } from '@/components/Badge';
import { CopyButton, EmailButton, TelButton, WhatsAppButton } from '@/components/Button';
import { Table as TableTemplate } from '@/components/Table';
import { TitleCell } from '@/components/Table/cells';
import { SelectionColumn } from '@/components/Table/columns';
import { fuzzySort } from '@/components/Table/filters';
import routes from '@/helpers/routes';
import type { User } from '@/types/user/user';
import { formatIdentificationNumber, formatPhone } from '@/utils/formatter';

import styles from './Table.module.scss';

export interface UserDataForTable extends Omit<User, 'dni'> {
  dni: string;
}

const columnHelper = createColumnHelper<UserDataForTable>();

const Table: React.FC = () => {
  const columns = useMemo<ColumnDef<UserDataForTable>[]>(
    () => [
      SelectionColumn<UserDataForTable>(),
      columnHelper.accessor('dni', {
        header: 'Identificación',
        cell: (info) => (
          <TitleCell
            href={routes.dashboard.user(info.getValue())}
            title='ver información general del usuario'
            isActive={info.row.original.isActive}
          >
            {formatIdentificationNumber(info.getValue())}
          </TitleCell>
        ),
        filterFn: 'startWith',
      }),
      columnHelper.accessor<'person.name', string>('person.name', {
        header: 'Nombres',
        cell: (info) => (
          <>
            <span>{info.getValue()}</span>
            <div role='toolbar'>
              <CopyButton textToCopy={info.getValue()} />
            </div>
          </>
        ),
        filterFn: 'fuzzy',
        sortingFn: fuzzySort,
      }),
      columnHelper.accessor<'person.surname', string>('person.surname', {
        header: 'Apellidos',
        filterFn: 'fuzzy',
        cell: (info) => (
          <>
            <span>{info.getValue()}</span>
            <div role='toolbar'>
              <CopyButton textToCopy={info.getValue()} />
            </div>
          </>
        ),
        sortingFn: fuzzySort,
      }),
      columnHelper.accessor('username', {
        header: 'Usuario',
        cell: (info) => (
          <>
            <Badge color='green' className={styles['badge-user']}>
              {info.getValue()}
            </Badge>
            <div role='toolbar'>
              <CopyButton textToCopy={info.getValue()} />
            </div>
          </>
        ),
      }),
      columnHelper.accessor<'role.name', string>('role.name', {
        header: 'Rol',
        cell: (info) => (
          <Badge color='green-blue' className={styles['badge-role']}>
            {info.getValue()}
          </Badge>
        ),
      }),
      columnHelper.accessor<'person.email', string>('person.email', {
        header: 'Correo electrónico',
        cell: (info) => (
          <>
            <span>{info.getValue()}</span>
            <div role='toolbar'>
              <CopyButton textToCopy={info.getValue()} />
              <EmailButton email={info.getValue()} />
            </div>
          </>
        ),
        filterFn: 'fuzzy',
        sortingFn: fuzzySort,
      }),
      columnHelper.accessor<'person.phone', string>('person.phone', {
        header: 'Celular',
        cell: (info) => (
          <>
            <span>{formatPhone(info.getValue())}</span>
            <div role='toolbar'>
              <CopyButton textToCopy={info.getValue()} />
              <TelButton number={info.getValue()} />
              <WhatsAppButton phoneNumber={info.getValue()} />
            </div>
          </>
        ),
      }),
    ],
    []
  );

  return <TableTemplate<UserDataForTable> columns={columns} />;
};

export default Table;
