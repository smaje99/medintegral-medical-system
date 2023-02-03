import { useMemo } from 'react';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { FaTag, FaUserAlt } from 'react-icons/fa';
import { HiIdentification } from 'react-icons/hi2';
import { MdAttachEmail } from 'react-icons/md';
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';

import { Badge } from '@Components/Badge';
import {
    CopyButton, EmailButton, TelButton, WhatsAppButton
} from '@Components/Button';
import { InformationTable } from '@Components/Table';
import type { User } from '@Types/user/user';
import { formatPhone } from '@Utils/phone';

import type { ProfileMainDataProps } from '../User.types';

import styles from './ProfileMainData.module.scss';

const columnHelper = createColumnHelper<User>();

const ProfileMainData = ({ user }: ProfileMainDataProps) => {
    const columns = useMemo<ColumnDef<User>[]>(() => ([
        columnHelper.accessor('person', {
            header: () => <><HiIdentification /> Identificación</>,
            cell: info => {
                const documentType = info.getValue().document_type;
                const dni = Intl.NumberFormat('es-CO').format(info.getValue().dni);

                return (
                    <>
                        <span className={styles["identification"]}>
                            {`${documentType} ${dni}`}
                        </span>
                        <div role="toolbar">
                            <CopyButton textToCopy={info.getValue().dni.toString()} />
                        </div>
                    </>
                )
            }
        }),
        columnHelper.accessor('username', {
            header: () => <><FaUserAlt /> Usuario</>,
            cell: info => (
                <>
                    <Badge color="green" className={styles["badge"]}>
                        {info.getValue()}
                    </Badge>
                    <div role="toolbar">
                        <CopyButton textToCopy={info.getValue()} />
                    </div>
                </>
            )
        }),
        columnHelper.accessor('role.name', {
            header: () => <><FaTag /> Role</>,
            cell: info => (
                <Badge color="green-blue" className={styles["badge"]}>
                    {info.getValue()}
                </Badge>
            )
        }),
        columnHelper.accessor('person.email', {
            header: () => <><MdAttachEmail /> Correo electrónico</>,
            cell: info => (
                <>
                    <span>{info.getValue()}</span>
                    <div role="toolbar">
                        <CopyButton textToCopy={info.getValue()} />
                        <EmailButton email={info.getValue()} />
                    </div>
                </>
            )
        }),
        columnHelper.accessor('person.phone', {
            header: () => <><BsFillTelephoneFill /> Celular</>,
            cell: info => (
                <>
                    <span>{formatPhone(info.getValue())}</span>
                    <div role="toolbar">
                        <CopyButton textToCopy={info.getValue()} />
                        <TelButton number={info.getValue()} />
                        <WhatsAppButton number={info.getValue()} />
                    </div>
                </>
            )
        })
    ]), []);

    return <InformationTable<User> {...{ data: [user.data], columns }} />
}

export default ProfileMainData;