import { TableProvider } from '@Components/Table/Table';
import useModal from '@Hooks/useModal';
import type { Data } from '@Types/data-request';
import type { Service } from '@Types/medical/service.model';

import Bar from './Bar';
import Table from './Table';

type Props = {
    readonly data: Data<Service[]>
}

const Data: React.FC<Props> = ({ data }) => {
    const [isOpenCreateModal, openCreateModal, closeCreateModal] = useModal();
    const [isOpenUpdateModal, openUpdateModal, closeUpdateModal] = useModal();
    const [isOpenDisableModal, openDisableModal, closeDisableModal] = useModal();

    return (
        <TableProvider<Service> data={data}>
            <Bar {...{ openCreateModal, openUpdateModal, openDisableModal }} />
            <Table />
        </TableProvider>
    )
}

export default Data;