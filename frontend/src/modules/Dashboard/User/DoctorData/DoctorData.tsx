import { useMemo } from 'react';
import { TbSignature } from 'react-icons/tb';
import { type ColumnDef, createColumnHelper } from '@tanstack/react-table';

import { InformationTable } from '@Components/Table';

import type { DoctorDataProps, DoctorDataTable } from '../User.types';

const columnHelper = createColumnHelper<DoctorDataTable>();

const DoctorData: React.FC<DoctorDataProps> = ({ doctor }) => {
    const columns = useMemo<ColumnDef<DoctorDataTable>[]>(() => ([
        columnHelper.accessor('signature', {
            header: () => <> <TbSignature /> Firma </>
        })
    ]), []);

    return <InformationTable<DoctorDataTable> {...{ data: [doctor], columns }} />
}

export default DoctorData;