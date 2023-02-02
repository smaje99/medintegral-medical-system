
import { useMemo } from 'react';
import { createColumnHelper, ColumnDef } from '@tanstack/react-table';

import { Table as TableTemplate } from '@Components/Table';
// import { IndeterminateCheckbox } from '@Components/Input';
import { fuzzySort } from '@Components/Table/filters';

import type { TableProps, UserDataForTable } from './Table.types';
import IdentificationCell from '../IdentificationCell';

import styles from './Table.module.scss';
import { Badge } from '@Components/Badge';

const columnHelper = createColumnHelper<UserDataForTable>();

const Table = ({ users }: TableProps) => {
    const columns = useMemo<ColumnDef<UserDataForTable>[]>(() => ([/*
        {
            id: 'select',
            header: ({ table }) => (
                <IndeterminateCheckbox {...{
                    checked: table.getIsAllRowsSelected(),
                    indeterminate: table.getIsSomeRowsSelected(),
                    onChange: table.getToggleAllPageRowsSelectedHandler()
                }} />
            ),
            cell: ({ row }) => (
                <div>
                    <IndeterminateCheckbox {...{
                        checked: row.getIsSelected(),
                        indeterminate: row.getIsSomeSelected(),
                        onChange: row.getToggleSelectedHandler()
                    }} />
                </div>
            )
        }, */
        columnHelper.accessor('dni', {
            header: 'Identificación',
            cell: info => <IdentificationCell value={info.getValue()} />,
            filterFn: 'startWith'
        }),
        columnHelper.accessor('name', {
            header: 'Nombres',
            filterFn: 'fuzzy',
            sortingFn: fuzzySort
        }),
        columnHelper.accessor('surname', {
            header: 'Apellidos',
            filterFn: 'fuzzy',
            sortingFn: fuzzySort
        }),
        columnHelper.accessor('username', {
            header: 'Usuario',
            cell: info => (
                <Badge color="green" className={styles["badge-user"]}>
                    {info.getValue()}
                </Badge>
            )
        }),
        columnHelper.accessor('role', {
            header: 'Rol',
            cell: info => (
                <Badge color="green-blue" className={styles["badge-role"]}>
                    {info.getValue()}
                </Badge>
            )
        }),
        columnHelper.accessor('email', {
            header: 'Correo electrónico',
            filterFn: 'fuzzy',
            sortingFn: fuzzySort
        }),
        columnHelper.accessor('phone', {
            header: 'Celular',
            cell: info => (
                info.getValue()
                    .replace(/(\d{2})(\d{3})(\d{3})(\d{4})/, '$1 $2 $3 $4')
            )
        })
    ]), []);

    const data = useMemo(() => (
        users.data?.map(user => ({
            dni: user.dni.toString(),
            username: user.username,
            name: user.person.name,
            surname: user.person.surname,
            role: user.role.name,
            email: user.person.email,
            phone: user.person.phone
        } as UserDataForTable))
    ), [users]);

    return <TableTemplate<UserDataForTable> {...{ columns, data }} />
}

export default Table;