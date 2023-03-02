import { useMemo } from 'react';
import { HiIdentification } from 'react-icons/hi2';
import { TbSignature } from 'react-icons/tb';
import { type ColumnDef, createColumnHelper } from '@tanstack/react-table';

import { Badge } from '@Components/Badge';
import { CopyButton } from '@Components/Button';
import { InformationTable } from '@Components/Table';

import type { DoctorDataProps, DoctorDataTable } from '../User.types';

import styles from './DoctorData.module.scss';

const columnHelper = createColumnHelper<DoctorDataTable>();

const DoctorData: React.FC<DoctorDataProps> = ({ doctor }) => {
    const columns = useMemo<ColumnDef<DoctorDataTable>[]>(() => ([
        columnHelper.accessor('medicalLicenses', {
            header: () => <> <HiIdentification /> Registro médico </>,
            cell: info => (
                <>
                    <ul className={styles['box']} role='listbox'>
                        {info.getValue().map((license, idx) => (
                            <li key={`doctor-license-${license}-${idx}`}>
                                <Badge color='green-blue' className={styles.badge}>
                                    {license}
                                </Badge>
                            </li>
                        ))}
                    </ul>
                    <div role='toolbar'>
                        <CopyButton textToCopy={info.getValue().join(', ')} />
                    </div>
                </>
            )
        }),
        columnHelper.accessor('signature', {
            header: () => <> <TbSignature /> Firma </>
        })
    ]), [])

    return <InformationTable<DoctorDataTable> {...{ data: [doctor], columns }} />
}

export default DoctorData;