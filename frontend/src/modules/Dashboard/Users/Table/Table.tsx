import { useMemo } from 'react';
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';

import { Badge } from '@Components/Badge';
import {
    CopyButton, EmailButton, TelButton, WhatsAppButton
} from '@Components/Button';
import { Table as TableTemplate } from '@Components/Table';
import { IdentificationCell } from '@Components/Table/cells';
import { SelectionColumn } from '@Components/Table/columns';
import { fuzzySort } from '@Components/Table/filters';
import routes from '@Helpers/routes';
import { formatPhone } from '@Utils/phone';

import type { TableProps, UserDataForTable } from './Table.types';

import styles from './Table.module.scss';

const columnHelper = createColumnHelper<UserDataForTable>();

const Table: React.FC<TableProps> = () => {
    const columns = useMemo<ColumnDef<UserDataForTable>[]>(() => ([
        SelectionColumn<UserDataForTable>(),
        columnHelper.accessor('dni', {
            header: 'Identificación',
            cell: info => (
                <IdentificationCell
                    href={routes.dashboard.user(info.getValue())}
                    title="ver información general del usuario"
                    isActive={info.row.original.isActive}
                >
                    {info.getValue()}
                </IdentificationCell>
            ),
            filterFn: 'startWith'
        }),
        columnHelper.accessor('person.name', {
            header: 'Nombres',
            cell: info => (
                <>
                    <span>{info.getValue()}</span>
                    <div role="toolbar">
                        <CopyButton textToCopy={info.getValue()} />
                    </div>
                </>
            ),
            filterFn: 'fuzzy',
            sortingFn: fuzzySort
        }),
        columnHelper.accessor('person.surname', {
            header: 'Apellidos',
            filterFn: 'fuzzy',
            cell: info => (
                <>
                    <span>{info.getValue()}</span>
                    <div role="toolbar">
                        <CopyButton textToCopy={info.getValue()} />
                    </div>
                </>
            ),
            sortingFn: fuzzySort
        }),
        columnHelper.accessor('username', {
            header: 'Usuario',
            cell: info => (
                <>
                    <Badge color="green" className={styles["badge-user"]}>
                        {info.getValue()}
                    </Badge>
                    <div role="toolbar">
                        <CopyButton textToCopy={info.getValue()} />
                    </div>
                </>
            )
        }),
        columnHelper.accessor('role.name', {
            header: 'Rol',
            cell: info => (
                <Badge color="green-blue" className={styles["badge-role"]}>
                    {info.getValue()}
                </Badge>
            )
        }),
        columnHelper.accessor('person.email', {
            header: 'Correo electrónico',
            cell: info => (
                <>
                    <span>{info.getValue()}</span>
                    <div role="toolbar">
                        <CopyButton textToCopy={info.getValue()} />
                        <EmailButton email={info.getValue()} />
                    </div>
                </>
            ),
            filterFn: 'fuzzy',
            sortingFn: fuzzySort
        }),
        columnHelper.accessor('person.phone', {
            header: 'Celular',
            cell: info => (
                <>
                    <span>{formatPhone(info.getValue())}</span>
                    <div role="toolbar">
                        <CopyButton textToCopy={info.getValue()} />
                        <TelButton number={info.getValue()} />
                        <WhatsAppButton phoneNumber={info.getValue()} />
                    </div>
                </>
            ),
        })
    ]), []);

    return <TableTemplate<UserDataForTable> columns={columns} />
}

export default Table;