import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { MdMedicalServices } from 'react-icons/md';

import { Tabs } from '@/components/Tabs';
import { Actions, Permissions } from '@/helpers/permissions';
import useModal from '@/hooks/useModal';
import type { Data } from '@/types/data-request';
import type { Service } from '@/types/medical/service.model';
import type { Specialty } from '@/types/medical/specialty.model';
import { hasPermission } from '@/utils/auth';

import DetailedData from '../DetailedData';
import { ServiceData } from '../Service';
import UpdateFormModal from '../UpdateFormModal';
import styles from './Detailed.module.scss';

type Props = {
  readonly specialty: Data<Specialty>;
};

const PERMISSION = Permissions.SPECIALTIES;

const Detailed: React.FC<Props> = ({ specialty }) => {
  const specialtyMemo = useMemo(() => specialty, [specialty]);
  const servicesMemo = useMemo<Data<Service[]>>(
    () => ({
      data: specialtyMemo.data.services,
    }),
    [specialtyMemo]
  );

  const router = useRouter();
  const { data: session } = useSession();
  const [isOpenUpdateModal, openUpdateModal, closeUpdateModal] = useModal(
    !!router.query?.update
  );

  return (
    <>
      <section className={styles.container}>
        <section className={styles['commands-container']}>
          <h2 className={styles.name}>{specialtyMemo?.data?.name}</h2>
          <section className={styles.commands}>
            {hasPermission(session, PERMISSION, Actions.UPDATE) ? (
              <button
                className={styles.button}
                onClick={openUpdateModal}
                aria-label='Modificar los datos de la especialidad'
              >
                <AiFillEdit />
                Modificar datos
              </button>
            ) : null}
          </section>
        </section>

        <DetailedData specialty={specialtyMemo.data} />

        <Tabs
          tabs={[
            <>
              {' '}
              <MdMedicalServices /> Servicios
            </>,
          ]}
        >
          <ServiceData data={servicesMemo} />
        </Tabs>
      </section>

      <UpdateFormModal
        isOpen={isOpenUpdateModal}
        onClose={closeUpdateModal}
        specialty={specialty.data}
      />
    </>
  );
};

export default Detailed;
