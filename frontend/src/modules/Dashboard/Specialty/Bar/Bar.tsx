import { useSession } from 'next-auth/react';
import { FaPlus } from 'react-icons/fa';

import { Search } from '@Components/Input';
import { Bar as BarTemplate, useTable } from '@Components/Table/Table';
import { Specialty } from '@Types/medical/specialty.model';
import { hasPermission } from '@Utils/auth';

import styles from './Bar.module.scss';

type Props = {
    openCreateModal: () => void;
}

const Bar: React.FC<Props> = ({ openCreateModal }) => {
    const {
        globalFilter, setGlobalFilter, rowSelectionSize
    } = useTable<Specialty>();
    const { data: session } = useSession();

    return (
        <BarTemplate<Specialty> title='Especialidades'>
            <Search
                name='specialty-search'
                value={globalFilter ?? ''}
                onChange={value => setGlobalFilter(String(value))}
                title='Buscar por todas las especialidades'
                aria-label='Buscar por todas las especialidades'
            />
            {rowSelectionSize === 0
                && hasPermission(session, 'especialidades', 'creación') ? (
                <button
                    className={styles.button}
                    onClick={openCreateModal}
                    title='Crear especialidad'
                    aria-label='Crear especialidad'
                >
                    <FaPlus aria-hidden />
                    Crear
                </button>
            ) : null}
        </BarTemplate>
    )
}

export default Bar;