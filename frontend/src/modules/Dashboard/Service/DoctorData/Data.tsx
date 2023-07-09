import { TableProvider } from '@/components/Table/Table';
import useModal from '@/hooks/useModal';
import { Data as DataRequest } from '@/types/data-request';
import type { Doctor } from '@/types/medical/doctor.model';
import { Service } from '@/types/medical/service.model';

import Bar from './Bar';
import DoctorCreateFormModal from './DoctorCreateFormModal';
import Table, { type DoctorInServiceForTable } from './Table';

type Props = {
  readonly serviceId: Service['id'];
  readonly data: DataRequest<DoctorInServiceForTable[]>;
  readonly doctors: Doctor[];
};

const Data: React.FC<Props> = ({ serviceId, data, doctors }) => {
  const [isOpenCreateModal, openCreateModal, closeCreateModal] = useModal();

  return (
    <>
      <TableProvider<DoctorInServiceForTable> data={data}>
        <Bar {...{ openCreateModal }} />
        <Table />
      </TableProvider>

      <DoctorCreateFormModal
        serviceId={serviceId}
        doctors={doctors}
        isOpen={isOpenCreateModal}
        onClose={closeCreateModal}
      />
    </>
  );
};

export default Data;
