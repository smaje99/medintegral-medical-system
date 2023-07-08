import { TableProvider } from '@/components/Table/Table';
import useModal from '@/hooks/useModal';
import type { Data as DataRequest } from '@/types/data-request';
import type { Service } from '@/types/medical/service.model';
import type { Specialty } from '@/types/medical/specialty.model';

import Bar from './Bar';
import { ServiceCreateFormModal } from './ServiceCreateFormModal';
import ServiceDisableModal from './ServiceDisableModal/ServiceDisableModal';
import Table from './Table';

type Props = {
  readonly data: DataRequest<Service[]>;
  specialtyId: Specialty['id'];
};

const Data: React.FC<Props> = ({ data, specialtyId }) => {
  const [isOpenCreateModal, openCreateModal, closeCreateModal] = useModal();
  const [isOpenDisableModal, openDisableModal, closeDisableModal] = useModal();

  return (
    <>
      <TableProvider<Service> data={data}>
        <Bar {...{ openCreateModal, openDisableModal }} />
        <Table />

        <ServiceDisableModal isOpen={isOpenDisableModal} onClose={closeDisableModal} />
      </TableProvider>

      <ServiceCreateFormModal
        isOpen={isOpenCreateModal}
        onClose={closeCreateModal}
        specialtyId={specialtyId}
      />
    </>
  );
};

export default Data;
