import { type ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { useMemo } from 'react';

import { Badge } from '@/components/Badge';
import { CopyButton } from '@/components/Button';
import { Table as TableTemplate } from '@/components/Table';
import { TitleCell } from '@/components/Table/cells';
import { SelectionColumn } from '@/components/Table/columns';
import routes from '@/helpers/routes';
import type { DoctorInService } from '@/types/medical/doctor.model';
import type { Person } from '@/types/person';
import { formatIdentificationNumber } from '@/utils/formatter';

export type DoctorInServiceForTable = Omit<DoctorInService, 'person'> & {
  readonly person: Omit<Person, 'dni'> & {
    dni: string;
  };
};

const columnHelper = createColumnHelper<DoctorInServiceForTable>();

const Table: React.FC = () => {
  const columns = useMemo<ColumnDef<DoctorInServiceForTable>[]>(
    () => [
      SelectionColumn<DoctorInServiceForTable>(),
      columnHelper.accessor('person.dni', {
        header: 'Identificación',
        cell: (info) => {
          const {
            person: { dni },
            isActive,
          } = info.row.original;

          return (
            <TitleCell
              href={routes.dashboard.user(dni)}
              title='ver información general del médico'
              isActive={isActive}
            >
              {formatIdentificationNumber(info.getValue())}
            </TitleCell>
          );
        },
      }),
      columnHelper.accessor('person.name', {
        header: 'Nombre',
        cell: (info) => (
          <>
            <span>{info.getValue()}</span>
            <div role='toolbar'>
              <CopyButton textToCopy={info.getValue()} />
            </div>
          </>
        ),
      }),
      columnHelper.accessor('person.surname', {
        header: 'Apellido',
        cell: (info) => (
          <>
            <span>{info.getValue()}</span>
            <div role='toolbar'>
              <CopyButton textToCopy={info.getValue()} />
            </div>
          </>
        ),
      }),
      columnHelper.accessor('session', {
        header: 'Sesión',
        cell: (info) => (
          <>
            <Badge color='green-blue'>{info.getValue()}</Badge>
            <div role='toolbar'>
              <CopyButton textToCopy={info.getValue()} />
            </div>
          </>
        ),
      }),
      columnHelper.accessor('serviceType', {
        header: 'Jornada',
        cell: (info) => (
          <>
            <Badge color='green-blue'>{info.getValue()}</Badge>
            <div role='toolbar'>
              <CopyButton textToCopy={info.getValue()} />
            </div>
          </>
        ),
      }),
    ],
    []
  );

  return <TableTemplate<DoctorInServiceForTable> columns={columns} />;
};

export default Table;
