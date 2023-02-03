import { useMemo } from 'react';
import {
    BsFillCalendar2EventFill,
    BsFillCalendar2MinusFill,
    BsFillCalendar2PlusFill,
    BsFillFilePersonFill,
    BsFillTelephoneFill,
    BsPersonBoundingBox
} from 'react-icons/bs';
import { FaGenderless, FaMapMarkerAlt } from 'react-icons/fa';
import { GiLinkedRings } from 'react-icons/gi';
import { HiIdentification } from 'react-icons/hi2';
import { MdAttachEmail, MdBloodtype, MdWork } from 'react-icons/md';
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';

import {
    CopyButton, EmailButton, TelButton, WhatsAppButton
} from '@Components/Button';
import { InformationTable } from '@Components/Table';
import type { User } from '@Types/user/user';
import { addDays, dateWithFormat, relativeDateToNow } from '@Utils/date';
import { formatPhone } from '@Utils/phone';

import type { PersonalDataProps } from '../User.types';

import styles from './PersonalData.module.scss';

const columnHelper = createColumnHelper<User>();

const PersonalData = ({ user }: PersonalDataProps) => {
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
        columnHelper.accessor('person.name', {
            header: () => <><BsFillFilePersonFill /> Nombre</>,
            cell: info => (
                <>
                    <span>{info.getValue()}</span>
                    <div role="toolbar">
                        <CopyButton textToCopy={info.getValue()} />
                    </div>
                </>
            )
        }),
        columnHelper.accessor('person.surname', {
            header: () => <><BsFillFilePersonFill /> Apellido</>,
            cell: info => (
                <>
                    <span>{info.getValue()}</span>
                    <div role="toolbar">
                        <CopyButton textToCopy={info.getValue()} />
                    </div>
                </>
            )
        }),
        columnHelper.accessor('person.address', {
            header: () => <><FaMapMarkerAlt /> Dirección</>,
            cell: info => (
                <>
                    <span>{info.getValue()}</span>
                    <div role="toolbar">
                        <CopyButton textToCopy={info.getValue()} />
                    </div>
                </>
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
        }),
        columnHelper.accessor('person.gender', {
            header: () => <><FaGenderless /> Genero</>,
            cell: info => (
                <>
                    <span>{info.getValue()}</span>
                    <div role="toolbar">
                        <CopyButton textToCopy={info.getValue()} />
                    </div>
                </>
            )
        }),
        columnHelper.accessor('person.age', {
            header: () => <><BsFillCalendar2EventFill /> Edad</>,
            cell: info => (
                <>
                    <span>
                        {info.getValue() ?? 'Información no disponible'}
                    </span>
                    <div role="toolbar">
                        <CopyButton textToCopy={info.getValue()} />
                    </div>
                </>
            )
        }),
        columnHelper.accessor('person.birthdate', {
            header: () => <><BsFillCalendar2EventFill /> Fecha de nacimiento</>,
            cell: info => {
                const birthdate = dateWithFormat(addDays(info.getValue(), 1));

                return (
                    <>
                        <span>{birthdate}</span>
                        <div role="toolbar">
                            <CopyButton textToCopy={birthdate} />
                        </div>
                    </>
                )
            }
        }),
        columnHelper.accessor('person.blood_type', {
            header: () => <><MdBloodtype /> Grupo Sanguíneo</>,
            cell: info => {
                const rhFactor = (info.row.getValue('person') as User['person']).rh_factor;
                const blood = `${info.getValue()}${rhFactor}`;

                return (
                    <>
                        <span>{blood}</span>
                        <div role="toolbar">
                            <CopyButton textToCopy={blood} />
                        </div>
                    </>
                )
            }
        }),
        columnHelper.accessor('person.ethnicity', {
            header: () => <><BsPersonBoundingBox /> Etnia</>,
            cell: info => (
                <>
                    <span>{info.getValue()}</span>
                    <div role="toolbar">
                        <CopyButton textToCopy={info.getValue()} />
                    </div>
                </>
            )
        }),
        columnHelper.accessor('person.occupation', {
            header: () => <><MdWork /> Ocupación</>,
            cell: info => (
                <>
                    <span>{info.getValue()}</span>
                    <div role="toolbar">
                        <CopyButton textToCopy={info.getValue()} />
                    </div>
                </>
            )
        }),
        columnHelper.accessor('person.civil_status', {
            header: () => <><GiLinkedRings /> Estado civil</>,
            cell: info => (
                <>
                    <span>{info.getValue()}</span>
                    <div role="toolbar">
                        <CopyButton textToCopy={info.getValue()} />
                    </div>
                </>
            )
        }),
        columnHelper.accessor('person.created_at', {
            header: () => <><BsFillCalendar2PlusFill /> Creado</>,
            cell: info => relativeDateToNow(info.getValue())
        }),
        columnHelper.accessor('person.modified_at', {
            header: () => <><BsFillCalendar2MinusFill /> Modificado</>,
            cell: info => relativeDateToNow(info.getValue())
        }),
        columnHelper.accessor('created_at', {
            header: () => <><BsFillCalendar2PlusFill /> Usuario creado</>,
            cell: info => relativeDateToNow(info.getValue())
        }),
        columnHelper.accessor('modified_at', {
            header: () => <><BsFillCalendar2MinusFill /> Usuario modificado</>,
            cell: info => relativeDateToNow(info.getValue())
        })
    ]), []);

    return <InformationTable<User> {...{ data: [user.data], columns }} />
}

export default PersonalData;