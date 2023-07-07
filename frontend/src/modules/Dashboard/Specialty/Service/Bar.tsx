import { useRouter } from 'next/router';
import { AiFillEdit } from 'react-icons/ai';
import { FaMinus, FaPlus } from 'react-icons/fa';

import { Bar as BarTemplate, Item, useTable } from '@/components/Table/Table';
import { Actions, Permissions } from '@/helpers/permissions';
import routes from '@/helpers/routes';
import type { Service } from '@/types/medical/service.model';

type Props = {
  readonly openCreateModal: () => void;
  readonly openDisableModal: () => void;
};

const Bar: React.FC<Props> = ({ openCreateModal, openDisableModal }) => {
  const router = useRouter();
  const { globalFilter, setGlobalFilter, getObjectsFromSelectedRows } =
    useTable<Service>();

  const handleToGoServiceUpdate = () => {
    const { id } = getObjectsFromSelectedRows()[0];
    const route = routes.dashboard.service(id);
    router.push({ pathname: route, query: { update: true } }, route);
  };

  return (
    <BarTemplate<Service> title='' permission={Permissions.SERVICES}>
      <Item
        itemType='search'
        name='service-search'
        value={globalFilter ?? ''}
        onChange={(value) => setGlobalFilter(String(value))}
        title='Buscar por todas los servicios'
        aria-label='Buscar por todas los servicios'
      />
      <Item
        itemType='button'
        action={Actions.CREATE}
        canView={(rowSelectionSize) => rowSelectionSize === 0}
        onClick={openCreateModal}
        title='Crear servicio'
        aria-label='Crear servicio'
      >
        <FaPlus aria-hidden />
        Crear
      </Item>
      <Item
        itemType='button'
        action={Actions.UPDATE}
        canView={(rowSelectionSize) => rowSelectionSize === 1}
        onClick={handleToGoServiceUpdate}
        title='Modificar servicio'
        aria-label='Modificar servicio'
      >
        <AiFillEdit aria-hidden />
        Modificar
      </Item>
      <Item
        itemType='button'
        action={Actions.DISABLE}
        canView={(rowSelectionSize) => rowSelectionSize > 0}
        onClick={openDisableModal}
        title='Remover servicio'
        aria-label='Remover servicio'
        disableButtonStyle
      >
        <FaMinus aria-hidden />
        Remover
      </Item>
    </BarTemplate>
  );
};

export default Bar;
