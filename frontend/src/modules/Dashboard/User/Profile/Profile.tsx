
import { FaUserEdit, FaUserSlash } from 'react-icons/fa';
import Balancer from 'react-wrap-balancer';

import { Badge } from "@Components/Badge";

import ProfileData from '../ProfileData';
import { ProfileProps } from "../User.types";

import styles from './Profile.module.scss';
import { useMemo } from 'react';

const Profile = ({ user }: ProfileProps) => {
    const userMemo = useMemo(() => user, [user]);

    return (
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
                    <button className={styles["button"]}>
                        <FaUserEdit />
                        Modificar datos
                    </button>
                    <button className={styles["button"]}>
                        <FaUserSlash />
                        Deshabilitar
                    </button>
                </section>
            </section>
            <ProfileData user={userMemo} />
        </section>
    )
}

export default Profile;