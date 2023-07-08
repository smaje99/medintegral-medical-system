import { TableProvider } from '@/components/Table/Table';
import { Data as DataRequest } from '@/types/data-request';

import Bar from './Bar';
import Table, { type DoctorInServiceForTable } from './Table';

type Props = {
  readonly data: DataRequest<DoctorInServiceForTable[]>;
};

const Data: React.FC<Props> = ({ data }) => {
  return (
    <TableProvider<DoctorInServiceForTable> data={data}>
      <Bar />
      <Table />
    </TableProvider>
  );
};

export default Data;
