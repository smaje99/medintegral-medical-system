import { useRouter } from 'next/router';
import { AiFillEdit } from 'react-icons/ai';
import { FaPlus } from 'react-icons/fa';

import { Bar as BarTemplate, Item, useTable } from '@/components/Table/Table';
import { Actions, Permissions } from '@/helpers/permissions';
import routes from '@/helpers/routes';
import { Specialty } from '@/types/medical/specialty.model';

type Props = {
  openCreateModal: () => void;
};

const Bar: React.FC<Props> = ({ openCreateModal }) => {
  const { globalFilter, setGlobalFilter, getSelectedFlatRows } = useTable<Specialty>();
  const router = useRouter();

  const handleToGoSpecialtyUpdate = () => {
    const { id } = getSelectedFlatRows()[0].original;
    const route = routes.dashboard.specialty(id);
    router.push({ pathname: route, query: { update: true } });
  };

  return (
    <BarTemplate<Specialty> title='Especialidades' permission={Permissions.SPECIALTIES}>
      <Item
        itemType='search'
        name='specialty-search'
        value={globalFilter ?? ''}
        onChange={(value) => setGlobalFilter(String(value))}
        title='Buscar por todas las especialidades'
        aria-label='Buscar por todas las especialidades'
      />
      <Item
        itemType='button'
        action={Actions.CREATE}
        canView={(rowSelectionSize) => rowSelectionSize === 0}
        onClick={openCreateModal}
        title='Crear especialidad'
        aria-label='Crear especialidad'
      >
        <FaPlus aria-hidden />
        Crear
      </Item>
      <Item
        itemType='button'
        action={Actions.UPDATE}
        canView={(rowSelectionSize) => rowSelectionSize === 1}
        onClick={handleToGoSpecialtyUpdate}
        title='Modificar especialidad'
        aria-label='Modificar especialidad'
      >
        <AiFillEdit aria-hidden />
        Modificar
      </Item>
    </BarTemplate>
  );
};

export default Bar;
