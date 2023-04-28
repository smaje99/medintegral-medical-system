import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';
import { AiFillEdit } from 'react-icons/ai';

import useModal from '@Hooks/useModal';
import type { Data } from '@Types/data-request';
import type { Specialty } from '@Types/medical/specialty.model';
import { hasPermission } from '@Utils/auth';

import DetailedData from '../DetailedData';
import UpdateFormModal from '../UpdateFormModal';

import styles from './Detailed.module.scss';

interface Props {
    readonly specialty: Data<Specialty>;
}

const Detailed: React.FC<Props> = ({ specialty }) => {
    const specialtyMemo = useMemo(() => specialty, [specialty]);

    const router = useRouter();
    const { data: session } = useSession();
    const [
        isOpenUpdateModal, openUpdateModal, closeUpdateModal
    ] = useModal(!!router.query?.update);

    return (
        <>
            <section className={styles.container}>
                <section className={styles['commands-container']}>
                    <h2 className={styles.name}>
                        {specialtyMemo?.data?.name}
                    </h2>
                    <section className={styles.commands}>
                        {hasPermission(session, 'usuarios', 'modificación') ? (
                            <button
                                className={styles.button}
                                onClick={openUpdateModal}
                                aria-label='Modificar los datos de la especialidad'
                            >
                                <AiFillEdit />
                                Modificar datos
                            </button>
                        ): null}
                    </section>
                </section>

                <DetailedData specialty={specialtyMemo.data} />
            </section>

            <UpdateFormModal
                isOpen={isOpenUpdateModal}
                onClose={closeUpdateModal}
                specialty={specialty.data}
            />
        </>
    )
}

export default Detailed;