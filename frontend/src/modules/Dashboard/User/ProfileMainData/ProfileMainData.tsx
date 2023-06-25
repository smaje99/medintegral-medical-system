import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { useSession } from 'next-auth/react';
import { useMemo, useState } from 'react';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { FaTag, FaUserAlt } from 'react-icons/fa';
import { HiIdentification } from 'react-icons/hi2';
import { MdAttachEmail } from 'react-icons/md';

import { Badge } from '@/components/Badge';
import {
  CopyButton,
  EditButton,
  EmailButton,
  TelButton,
  WhatsAppButton,
} from '@/components/Button';
import { InformationTable } from '@/components/Table';
import { Actions, Permissions } from '@/helpers/permissions';
import { Data } from '@/types/data-request';
import { Role } from '@/types/user/role';
import type { User } from '@/types/user/user';
import { hasPermission } from '@/utils/auth';
import { formatPhone } from '@/utils/formatter';

import UpdateFormModal from '../UserUpdateForm';
import styles from './ProfileMainData.module.scss';

type Props = {
  readonly user: Data<User>;
  readonly roles: Data<Role[]>;
};

const columnHelper = createColumnHelper<User>();

const PERMISSION = Permissions.USERS;

const ProfileMainData: React.FC<Props> = ({ user, roles }) => {
  const [isEditRole, setEditRole] = useState(false);

  const { data: session } = useSession();

  const canUpdate =
    hasPermission(session, PERMISSION, Actions.UPDATE) &&
    session?.user?.dni !== user?.data?.dni;

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
      columnHelper.accessor('username', {
        header: () => (
          <>
            <FaUserAlt /> Usuario
          </>
        ),
        cell: (info) => (
          <>
            <Badge color='green' className={styles.badge}>
              {info.getValue()}
            </Badge>
            <div role='toolbar'>
              <CopyButton textToCopy={info.getValue()} />
            </div>
          </>
        ),
      }),
      columnHelper.accessor('role.name', {
        header: () => (
          <>
            <FaTag /> Role
          </>
        ),
        cell: (info) =>
          !isEditRole ? (
            <>
              <Badge color='green-blue' className={styles.badge}>
                {info.getValue()}
              </Badge>
              <div role='toolbar'>
                {canUpdate ? (
                  <EditButton
                    onEdit={() => {
                      setEditRole(true);
                    }}
                  />
                ) : null}
              </div>
            </>
          ) : (
            <UpdateFormModal
              userDni={user?.data?.dni}
              roles={roles}
              setEditRole={setEditRole}
            />
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
    ],
    [canUpdate, isEditRole, roles, user?.data?.dni]
  );

  return <InformationTable<User> {...{ data: [user.data], columns }} />;
};

export default ProfileMainData;
