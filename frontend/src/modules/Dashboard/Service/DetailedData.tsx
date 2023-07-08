import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { useMemo } from 'react';
import {
  MdDescription,
  MdMedicalServices,
  MdPriceChange,
  MdTimelapse,
} from 'react-icons/md';

import { CopyButton } from '@/components/Button';
import { InformationTable } from '@/components/Table';
import { RightCell, TitleCell } from '@/components/Table/cells';
import routes from '@/helpers/routes';
import type { ServiceWithSpecialty } from '@/types/medical/service.model';
import { formatCurrency } from '@/utils/formatter';

type Props = {
  readonly service: ServiceWithSpecialty;
};

const columnHelper = createColumnHelper<ServiceWithSpecialty>();

const DetailedData: React.FC<Props> = ({ service }) => {
  const columns = useMemo<ColumnDef<ServiceWithSpecialty>[]>(
    () => [
      columnHelper.accessor('name', {
        header: () => (
          <>
            <MdMedicalServices aria-hidden /> Servicio
          </>
        ),
        cell: (info) => (
          <>
            <span>{info.getValue()}</span>
            <div role='toolbar'>
              <CopyButton textToCopy={info.getValue()} />
            </div>
          </>
        ),
      }),
      columnHelper.accessor('description', {
        header: () => (
          <>
            <MdDescription aria-hidden /> Descripción
          </>
        ),
        cell: (info) => (
          <>
            <span>{info.getValue()}</span>
            <div role='toolbar'>
              <CopyButton textToCopy={info.getValue()} />
            </div>
          </>
        ),
      }),
      columnHelper.accessor('duration', {
        header: () => (
          <>
            <MdTimelapse aria-hidden /> Duración
          </>
        ),
        cell: (info) => (
          <>
            <RightCell>{info.getValue()} minutos</RightCell>
            <div role='toolbar'>
              <CopyButton textToCopy={info.getValue().toString()} />
            </div>
          </>
        ),
      }),
      columnHelper.accessor('cost', {
        header: () => (
          <>
            <MdPriceChange aria-hidden /> Precio
          </>
        ),
        cell: (info) => (
          <>
            <RightCell>{formatCurrency(info.getValue())}</RightCell>
            <div role='toolbar'>
              <CopyButton textToCopy={info.getValue().toString()} />
            </div>
          </>
        ),
      }),
      columnHelper.accessor('specialty.name', {
        header: () => (
          <>
            <MdMedicalServices aria-hidden /> Servicio
          </>
        ),
        cell: (info) => {
          const {
            specialty: { id },
          } = info.row.original;

          return (
            <TitleCell
              href={routes.dashboard.specialty(id)}
              title='ver información general de la especialidad'
            >
              {info.getValue()}
            </TitleCell>
          );
        },
      }),
    ],
    []
  );

  return <InformationTable<ServiceWithSpecialty> columns={columns} data={[service]} />;
};

export default DetailedData;
