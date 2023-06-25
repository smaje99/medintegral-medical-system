import { type ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { useMemo } from 'react';
import { TbSignature } from 'react-icons/tb';

// eslint-disable-next-line import/no-unresolved
import { InformationTable } from '@/components/Table';
import type { User } from '@/types/user/user';

type Props = Required<Pick<User, 'doctor'>>;

type DoctorDataTable = User['doctor'];

const columnHelper = createColumnHelper<DoctorDataTable>();

const DoctorData: React.FC<Props> = ({ doctor }) => {
  const columns = useMemo<ColumnDef<DoctorDataTable>[]>(
    () => [
      columnHelper.accessor('signature', {
        header: () => (
          <>
            {' '}
            <TbSignature /> Firma{' '}
          </>
        ),
      }),
    ],
    []
  );

  return <InformationTable<DoctorDataTable> {...{ data: [doctor], columns }} />;
};

export default DoctorData;
