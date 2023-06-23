import { useSession } from 'next-auth/react';
import { AiFillEdit } from 'react-icons/ai';
import { FaMinus, FaPlus } from 'react-icons/fa';

import { Search } from '@/components/Input';
import { Bar as BarTemplate, useTable } from '@/components/Table/Table';
import { Actions, Permissions } from '@/helpers/permissions';
import type { Service } from '@/types/medical/service.model';
import { hasPermission } from '@/utils/auth';

import styles from './Bar.module.scss';

type Props = {
  readonly openCreateModal: () => void;
  readonly openUpdateModal: () => void;
  readonly openDisableModal: () => void;
};

const PERMISSION = Permissions.SERVICES;

const Bar: React.FC<Props> = ({ openCreateModal, openUpdateModal, openDisableModal }) => {
  const { data: session } = useSession();
  const { rowSelectionSize, globalFilter, setGlobalFilter } = useTable<Service>();

  return (
    <BarTemplate<Service> title=''>
      <Search
        name='service-search'
        value={globalFilter ?? ''}
        onChange={(value) => setGlobalFilter(String(value))}
        title='Buscar por todas los servicios'
        aria-label='Buscar por todas los servicios'
      />
      {rowSelectionSize === 0 && hasPermission(session, PERMISSION, Actions.CREATE) ? (
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
      {rowSelectionSize === 1 && hasPermission(session, PERMISSION, Actions.UPDATE) ? (
        <button
          className={styles.button}
          onClick={openCreateModal}
          title='Modificar servicio'
          aria-label='Modificar servicio'
        >
          <AiFillEdit aria-hidden />
          Modificar
        </button>
      ) : null}
      {rowSelectionSize > 0 && hasPermission(session, PERMISSION, Actions.DISABLE) ? (
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
  );
};

export default Bar;
