import { useSession } from 'next-auth/react';
import { AiFillEdit } from 'react-icons/ai';
import { FaMinus, FaPlus } from 'react-icons/fa';

import { Search } from '@Components/Input';
import { Bar as BarTemplate, useTable } from '@Components/Table/Table';
import type { Service } from '@Types/medical/service.model';
import { hasPermission } from '@Utils/auth';

import styles from './Bar.module.scss';

type Props = {
    readonly openCreateModal: () => void;
    readonly openUpdateModal: () => void;
    readonly openDisableModal: () => void;
}

const Bar: React.FC<Props> = ({
    openCreateModal, openUpdateModal, openDisableModal
}) => {
    const { data: session } = useSession();
    const { rowSelectionSize, globalFilter, setGlobalFilter } = useTable<Service>();

    return (
        <BarTemplate<Service> title=''>
            <Search
                name='service-search'
                value={globalFilter ?? ''}
                onChange={value => setGlobalFilter(String(value))}
                title='Buscar por todas los servicios'
                aria-label='Buscar por todas los servicios'
            />
            {rowSelectionSize === 0 && hasPermission(session, 'servicios', 'creación') ? (
                <button
                    className={styles.button}
                    onClick={openCreateModal}
                    title='Crear servicio'
                    aria-label='Crear servicio'
                >
                    <FaPlus aria-hidden />
                    Crear
                </button>
            ) : null}
            {rowSelectionSize === 1 && hasPermission(session, 'servicios', 'modificación') ? (
                <button
                    className={styles.button}
                    onClick={openCreateModal}
                    title='Modificar servicio'
                    aria-label='Modificar servicio'
                >
                    <AiFillEdit  aria-hidden />
                    Modificar
                </button>
            ) : null}
            {rowSelectionSize > 0 && hasPermission(session, 'servicios', 'deshabilitar') ? (
                <button
                    className={styles['button--disable']}
                    onClick={openCreateModal}
                    title='Remover servicio'
                    aria-label='Remover servicio'
                >
                    <FaMinus aria-hidden />
                    Remover
                </button>
            ) : null}
        </BarTemplate>
    )
}

export default Bar;