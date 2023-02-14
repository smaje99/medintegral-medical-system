import { useSession } from 'next-auth/react';
import { useMemo } from 'react';
import { FaUserEdit, FaUserSlash } from 'react-icons/fa';
import Balancer from 'react-wrap-balancer';

import { Badge } from "@Components/Badge";

import ProfileData from '../ProfileData';
import { ProfileProps } from "../User.types";

import styles from './Profile.module.scss';

const Profile = ({ user, roles }: ProfileProps) => {
    const { data: session } = useSession();
    const userMemo = useMemo(() => user, [user]);

    return (
        <>
            <section className={styles["container"]}>
                <section className={styles["profile"]}>
                    <h2 className={styles["name"]}>
                        <Balancer>
                            {user.data?.person.name} {user.data?.person.surname}
                        </Balancer>
                    </h2>
                    <section className={styles["commands"]}>
                        <Badge color="green-blue" className={styles["badge-role"]}>
                            {user.data?.role.name}
                        </Badge>
                        {session?.user?.permissions?.['usuarios']?.includes('modificación') ? (
                            <button className={styles["button"]}>
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
        </>
    )
}

export default Profile;