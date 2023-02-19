import { withRouter } from 'next/router'
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';
import { FaUserEdit, FaUserSlash } from 'react-icons/fa';
import Balancer from 'react-wrap-balancer';

import { Badge } from "@Components/Badge";
import useModal from '@Hooks/useModal';

import ProfileData from '../ProfileData';
import type { ProfileProps } from "../User.types";
import UserUpdateModal from '../UserUpdateModal';

import styles from './Profile.module.scss';

const Profile = ({ user, roles, router }: ProfileProps) => {
    const { data: session } = useSession();
    const userMemo = useMemo(() => user, [user]);
    const [
        isOpenUpdateModal, openUpdateModal, closeUpdateModal
    ] = useModal(Boolean(router.query?.update));

    return (
        <>
            <section className={styles["container"]}>
                <section className={styles["profile"]}>
                    <h2 className={styles["name"]}>
                        <Balancer>
                            {userMemo.data?.person.name} {userMemo.data?.person.surname}
                        </Balancer>
                    </h2>
                    <section className={styles["commands"]}>
                        <Badge color="green-blue" className={styles["badge-role"]}>
                            {userMemo.data?.role.name}
                        </Badge>
                        {session?.user?.permissions?.['usuarios']?.includes('modificación') ? (
                            <button className={styles["button"]} onClick={openUpdateModal}>
                                <FaUserEdit />
                                Modificar datos
                            </button>
                        ) : null}
                        <button className={styles["button"]}>
                            <FaUserSlash />
                            Deshabilitar
                        </button>
                    </section>
                </section>

                <ProfileData user={userMemo} roles={roles} />
            </section>

            <UserUpdateModal
                isOpen={isOpenUpdateModal}
                close={closeUpdateModal}
                isUserOwner={session?.user?.dni === userMemo?.data?.dni}
                personalData={userMemo?.data?.person}
            />
        </>
    )
}

export default withRouter(Profile);