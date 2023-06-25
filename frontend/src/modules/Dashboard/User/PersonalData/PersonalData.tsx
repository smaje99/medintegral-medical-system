import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { useMemo } from 'react';
import {
  BsFillCalendar2EventFill,
  BsFillCalendar2MinusFill,
  BsFillCalendar2PlusFill,
  BsFillFilePersonFill,
  BsFillTelephoneFill,
  BsPersonBoundingBox,
} from 'react-icons/bs';
import { FaGenderless, FaMapMarkerAlt } from 'react-icons/fa';
import { GiLinkedRings } from 'react-icons/gi';
import { HiIdentification } from 'react-icons/hi2';
import { MdAttachEmail, MdBloodtype, MdWork } from 'react-icons/md';

import { CopyButton, EmailButton, TelButton, WhatsAppButton } from '@/components/Button';
import { InformationTable } from '@/components/Table';
import { Data } from '@/types/data-request';
import type { User } from '@/types/user/user';
import { addDays, dateWithFormat, relativeDateToNow } from '@/utils/date';
import { formatPhone } from '@/utils/formatter';

import styles from './PersonalData.module.scss';

type Props = {
  readonly user: Data<User>;
};

const columnHelper = createColumnHelper<User>();

const PersonalData: React.FC<Props> = ({ user }) => {
  const columns = useMemo<ColumnDef<User>[]>(
    () => [
      columnHelper.accessor('person', {
        header: () => (
          <>
            <HiIdentification /> Identificación
          </>
        ),
        cell: (info) => {
          const documentType = info.getValue().documentType;
          const dni = Intl.NumberFormat('es-CO').format(info.getValue().dni);

          return (
            <>
              <span className={styles.identification}>{`${documentType} ${dni}`}</span>
              <div role='toolbar'>
                <CopyButton textToCopy={info.getValue().dni.toString()} />
              </div>
            </>
          );
        },
      }),
      columnHelper.accessor('person.name', {
        header: () => (
          <>
            <BsFillFilePersonFill /> Nombre
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
      columnHelper.accessor('person.surname', {
        header: () => (
          <>
            <BsFillFilePersonFill /> Apellido
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
      columnHelper.accessor('person.address', {
        header: () => (
          <>
            <FaMapMarkerAlt /> Dirección
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
      columnHelper.accessor('person.email', {
        header: () => (
          <>
            <MdAttachEmail /> Correo electrónico
          </>
        ),
        cell: (info) => (
          <>
            <span>{info.getValue()}</span>
            <div role='toolbar'>
              <CopyButton textToCopy={info.getValue()} />
              <EmailButton email={info.getValue()} />
            </div>
          </>
        ),
      }),
      columnHelper.accessor('person.phone', {
        header: () => (
          <>
            <BsFillTelephoneFill /> Celular
          </>
        ),
        cell: (info) => (
          <>
            <span>{formatPhone(info.getValue())}</span>
            <div role='toolbar'>
              <CopyButton textToCopy={info.getValue()} />
              <TelButton number={info.getValue()} />
              <WhatsAppButton phoneNumber={info.getValue()} />
            </div>
          </>
        ),
      }),
      columnHelper.accessor('person.gender', {
        header: () => (
          <>
            <FaGenderless /> Genero
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
      columnHelper.accessor('person.age', {
        header: () => (
          <>
            <BsFillCalendar2EventFill /> Edad
          </>
        ),
        cell: (info) => (
          <>
            <span>{info.getValue() ?? 'Información no disponible'}</span>
            <div role='toolbar'>
              <CopyButton textToCopy={info.getValue()} />
            </div>
          </>
        ),
      }),
      columnHelper.accessor('person.birthdate', {
        header: () => (
          <>
            <BsFillCalendar2EventFill /> Fecha de nacimiento
          </>
        ),
        cell: (info) => {
          const birthdate = dateWithFormat(addDays(info.getValue(), 1));

          return (
            <>
              <span>{birthdate}</span>
              <div role='toolbar'>
                <CopyButton textToCopy={birthdate} />
              </div>
            </>
          );
        },
      }),
      columnHelper.accessor('person.bloodType', {
        header: () => (
          <>
            <MdBloodtype /> Grupo Sanguíneo
          </>
        ),
        cell: (info) => {
          const { rhFactor } = info.row.getValue<User['person']>('person');
          const blood = `${info.getValue()}${rhFactor}`;

          return (
            <>
              <span>{blood}</span>
              <div role='toolbar'>
                <CopyButton textToCopy={blood} />
              </div>
            </>
          );
        },
      }),
      columnHelper.accessor('person.ethnicity', {
        header: () => (
          <>
            <BsPersonBoundingBox /> Etnia
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
      columnHelper.accessor('person.occupation', {
        header: () => (
          <>
            <MdWork /> Ocupación
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
      columnHelper.accessor('person.civilStatus', {
        header: () => (
          <>
            <GiLinkedRings /> Estado civil
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
      columnHelper.accessor('person.createdAt', {
        header: () => (
          <>
            <BsFillCalendar2PlusFill /> Creado
          </>
        ),
        cell: (info) => relativeDateToNow(info.getValue()),
      }),
      columnHelper.accessor('person.modifiedAt', {
        header: () => (
          <>
            <BsFillCalendar2MinusFill /> Modificado
          </>
        ),
        cell: (info) => relativeDateToNow(info.getValue()),
      }),
      columnHelper.accessor('createdAt', {
        header: () => (
          <>
            <BsFillCalendar2PlusFill /> Usuario creado
          </>
        ),
        cell: (info) => relativeDateToNow(info.getValue()),
      }),
      columnHelper.accessor('modifiedAt', {
        header: () => (
          <>
            <BsFillCalendar2MinusFill /> Usuario modificado
          </>
        ),
        cell: (info) => relativeDateToNow(info.getValue()),
      }),
    ],
    []
  );

  return <InformationTable<User> {...{ data: [user.data], columns }} />;
};

export default PersonalData;
