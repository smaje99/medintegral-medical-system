import dayjs from 'dayjs';
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
                    <span>
                        {info.getValue() ?? 'Información no disponible'}
                    </span>
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
                    <span>
                        {info.getValue()
                            .replace(/(\d{2})(\d{3})(\d{3})(\d{4})/, '$1 $2 $3 $4')
                        }
                    </span>
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
                const birthdate = dayjs(new Date(info.getValue()).toDateString())
                    .add(1, 'day')
                    .format('DD/MM/YYYY');

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
        columnHelper.accessor('person', {
            header: () => <><MdBloodtype /> Grupo Sanguíneo</>,
            cell: info => (
                <>
                    <span>
                        {`${info.getValue().blood_type}${info.getValue().rh_factor}`}
                    </span>
                    <div role="toolbar">
                        <CopyButton
                            textToCopy={`${info.getValue().blood_type}${info.getValue().rh_factor}`}
                        />
                    </div>
                </>
            )
        }),
        columnHelper.accessor('person.ethnicity', {
            header: () => <><BsPersonBoundingBox /> Etnia</>,
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
        columnHelper.accessor('person.occupation', {
            header: () => <><MdWork /> Ocupación</>,
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
            header: () => <><BsFillCalendar2PlusFill /> Creado en</>,
            cell: info => {
                const createdAt = dayjs(new Date(info.getValue()).toDateString())
                    .add(1, 'day')
                    .format('DD/MM/YYYY');

                return (
                    <>
                        <span>{createdAt}</span>
                        <div role="toolbar">
                            <CopyButton textToCopy={createdAt} />
                        </div>
                    </>
                )
            }
        }),
        columnHelper.accessor('person.modified_at', {
            header: () => <><BsFillCalendar2MinusFill /> Modificado en</>,
            cell: info => {
                const modifiedAt = dayjs(new Date(info.getValue()).toDateString())
                    .add(1, 'day')
                    .format('DD/MM/YYYY');

                return (
                    <>
                        <span>{modifiedAt}</span>
                        <div role="toolbar">
                            <CopyButton textToCopy={modifiedAt} />
                        </div>
                    </>
                )
            }
        }),
        columnHelper.accessor('created_at', {
            header: () => <><BsFillCalendar2PlusFill /> Usuario creado en</>,
            cell: info => {
                const createdAt = dayjs(new Date(info.getValue()).toDateString())
                    .add(1, 'day')
                    .format('DD/MM/YYYY');

                return (
                    <>
                        <span>{createdAt}</span>
                        <div role="toolbar">
                            <CopyButton textToCopy={createdAt} />
                        </div>
                    </>
                )
            }
        }),
        columnHelper.accessor('modified_at', {
            header: () => <><BsFillCalendar2MinusFill /> Usuario modificado en</>,
            cell: info => {
                const modifiedAt = dayjs(new Date(info.getValue()).toDateString())
                    .add(1, 'day')
                    .format('DD/MM/YYYY');

                return (
                    <>
                        <span>{modifiedAt}</span>
                        <div role="toolbar">
                            <CopyButton textToCopy={modifiedAt} />
                        </div>
                    </>
                )
            }
        })
    ]), [user]);

    return (
        <InformationTable<User> {...{ data: [user.data], columns }} />
    )
}

export default PersonalData;