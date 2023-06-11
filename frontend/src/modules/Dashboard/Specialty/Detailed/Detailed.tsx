import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { MdMedicalServices } from 'react-icons/md';

import { Tabs } from '@Components/Tabs';
import useModal from '@Hooks/useModal';
import type { Data } from '@Types/data-request';
import type { Service } from '@Types/medical/service.model';
import type { Specialty } from '@Types/medical/specialty.model';
import { hasPermission } from '@Utils/auth';

import DetailedData from '../DetailedData';
import UpdateFormModal from '../UpdateFormModal';
import { ServiceData } from '../Service';

import styles from './Detailed.module.scss';

interface Props {
    readonly specialty: Data<Specialty>;
}

const Detailed: React.FC<Props> = ({ specialty }) => {
    const specialtyMemo = useMemo(() => specialty, [specialty]);
    const servicesMemo = useMemo<Data<Service[]>>(() => ({
        data: specialtyMemo.data.services
    }), [specialtyMemo]);

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

                <Tabs tabs={[(<> <MdMedicalServices /> Servicios</>)]}>
                    <ServiceData data={servicesMemo} />
                </Tabs>
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