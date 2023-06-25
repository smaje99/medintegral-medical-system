import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { AiFillEdit } from 'react-icons/ai';
import { FaPlus } from 'react-icons/fa';

import { Search } from '@/components/Input';
import { Bar as BarTemplate, useTable } from '@/components/Table/Table';
import { Actions, Permissions } from '@/helpers/permissions';
import routes from '@/helpers/routes';
import { Specialty } from '@/types/medical/specialty.model';
import { hasPermission } from '@/utils/auth';

import styles from './Bar.module.scss';

type Props = {
  openCreateModal: () => void;
};

const PERMISSION = Permissions.SPECIALTIES;

const Bar: React.FC<Props> = ({ openCreateModal }) => {
  const { globalFilter, setGlobalFilter, rowSelectionSize, getSelectedFlatRows } =
    useTable<Specialty>();
  const { data: session } = useSession();
  const router = useRouter();

  const handleToGoSpecialtyUpdate = () => {
    const { id } = getSelectedFlatRows()[0].original;
    const route = routes.dashboard.specialty(id);
    router.push({ pathname: route, query: { update: true } });
  };

  return (
    <BarTemplate<Specialty> title='Especialidades'>
      <Search
        name='specialty-search'
        value={globalFilter ?? ''}
        onChange={(value) => setGlobalFilter(String(value))}
        title='Buscar por todas las especialidades'
        aria-label='Buscar por todas las especialidades'
      />
      {rowSelectionSize === 0 && hasPermission(session, PERMISSION, Actions.CREATE) ? (
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
      {rowSelectionSize === 1 && hasPermission(session, PERMISSION, Actions.UPDATE) ? (
        <button
          className={styles.button}
          onClick={handleToGoSpecialtyUpdate}
          title='Modificar especialidad'
          aria-label='Modificar especialidad'
        >
          <AiFillEdit />
          Modificar
        </button>
      ) : null}
    </BarTemplate>
  );
};

export default Bar;
