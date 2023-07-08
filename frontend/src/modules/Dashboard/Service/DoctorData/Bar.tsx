import { AiFillEdit } from 'react-icons/ai';
import { FaMinus, FaPlus } from 'react-icons/fa';

import { Bar as BarTemplate, Item, useTable } from '@/components/Table/Table';
import { Actions, Permissions } from '@/helpers/permissions';

import { DoctorInServiceForTable } from './Table';

type Props = object;

const Bar: React.FC<Props> = () => {
  const { globalFilter, setGlobalFilter } = useTable();

  return (
    <BarTemplate<DoctorInServiceForTable>
      title='Médicos'
      permission={Permissions.SERVICES_DOCTORS}
    >
      <Item
        itemType='search'
        name='specialty-search'
        value={globalFilter ?? ''}
        onChange={(value) => setGlobalFilter(String(value))}
        title='Buscar por todos los médicos asociados al servicio médico'
        aria-label='Buscar por todos los médicos asociados al servicio médico'
      />
      <Item
        itemType='button'
        action={Actions.CREATE}
        canView={(rowSelectionSize) => rowSelectionSize === 0}
        title='Asociar un médico al servicio médico'
        aria-label='Asociar un médico al servicio médico'
      >
        <FaPlus aria-hidden />
        Asociar médico
      </Item>
      <Item
        itemType='button'
        action={Actions.UPDATE}
        canView={(rowSelectionSize) => rowSelectionSize === 1}
        title='Modificar médico asociado al servicio médico'
        aria-label='Modificar médico asociado al servicio médico'
      >
        <AiFillEdit aria-hidden />
        Modificar
      </Item>
      <Item
        itemType='button'
        action={Actions.DISABLE}
        canView={(rowSelectionSize) => rowSelectionSize > 0}
        title='Disociar médico del servicio médico'
        aria-label='Disociar médico del servicio médico'
        disableButtonStyle
      >
        <FaMinus aria-hidden />
        Disociar
      </Item>
    </BarTemplate>
  );
};

export default Bar;
