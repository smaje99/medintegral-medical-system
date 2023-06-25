import { NextRouter, withRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';
import { FaUserEdit, FaUserMinus } from 'react-icons/fa';
import Balancer from 'react-wrap-balancer';

import { Badge } from '@/components/Badge';
import { Actions, Permissions } from '@/helpers/permissions';
import useModal from '@/hooks/useModal';
import type { Data } from '@/types/data-request';
import type { Role } from '@/types/user/role';
import type { User } from '@/types/user/user';
import { hasPermission } from '@/utils/auth';

import ProfileData from '../ProfileData';
import UserDisableModal from '../UserDisableModal';
import UserUpdateModal from '../UserUpdateModal';
import styles from './Profile.module.scss';

type Props = {
  readonly user: Data<User>;
  readonly roles: Data<Role[]>;
  readonly router: NextRouter;
};

const PERMISSION = Permissions.USERS;

const Profile: React.FC<Props> = ({ user, roles, router }) => {
  const userMemo = useMemo(() => user.data, [user]);

  const { data: session } = useSession();
  const [isOpenUpdateModal, openUpdateModal, closeUpdateModal] = useModal(
    Boolean(router.query?.update)
  );
  const [isOpenDisableModal, openDisableModal, closeDisableModal] = useModal();

  const canDisable =
    !userMemo?.isSuperuser &&
    session?.user?.dni !== userMemo?.dni &&
    hasPermission(session, PERMISSION, Actions.DISABLE);

  return (
    <>
      <section className={styles.container}>
        <section className={styles.profile}>
          <h2 className={styles.name}>
            <Balancer>
              {userMemo?.person.name} {userMemo?.person.surname}
            </Balancer>
          </h2>
          <section className={styles.commands}>
            {!userMemo?.isActive ? (
              <span className={styles.disabled}>Inactivo</span>
            ) : null}
            <Badge color='green-blue' className={styles['badge-role']}>
              {userMemo?.role.name}
            </Badge>
            {hasPermission(session, PERMISSION, Actions.UPDATE) ? (
              <button className={styles.button} onClick={openUpdateModal}>
                <FaUserEdit />
                Modificar datos
              </button>
            ) : null}
            {canDisable ? (
              <button
                className={`${styles.button} ${
                  userMemo?.isActive && styles['button--disable']
                }`}
                onClick={openDisableModal}
              >
                <FaUserMinus />
                {userMemo?.isActive ? 'Deshabilitar' : 'Habilitar'}
              </button>
            ) : null}
          </section>
        </section>

        <ProfileData user={user} roles={roles} />
      </section>

      <UserUpdateModal
        isOpen={isOpenUpdateModal}
        close={closeUpdateModal}
        isUserOwner={session?.user?.dni === userMemo?.dni}
        personalData={userMemo?.person}
        doctorData={userMemo?.doctor}
      />

      <UserDisableModal
        isOpen={isOpenDisableModal}
        onClose={closeDisableModal}
        user={userMemo}
      />
    </>
  );
};

export default withRouter(Profile);
