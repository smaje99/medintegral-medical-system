import { type NextRouter, withRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { FaMinus } from 'react-icons/fa';
import { FaUserDoctor } from 'react-icons/fa6';
import { Balancer } from 'react-wrap-balancer';

import { Tabs } from '@/components/Tabs';
import { Actions, Permissions } from '@/helpers/permissions';
import useModal from '@/hooks/useModal';
import type { Data } from '@/types/data-request';
import type { Doctor } from '@/types/medical/doctor.model';
import type { ServiceWithSpecialty } from '@/types/medical/service.model';
import { hasPermission } from '@/utils/auth';

import DetailedData from '../DetailedData';
import { DoctorData, type DoctorInServiceForTable } from '../DoctorData';
import ServiceDisableModal from '../ServiceDisableModal';
import ServiceUpdateFormModal from '../ServiceUpdateFormModal/ServiceUpdateFormModal';
import styles from './Detailed.module.scss';

type Props = {
  readonly service: Data<ServiceWithSpecialty>;
  readonly doctors: Data<Doctor[]>;
  readonly router: NextRouter;
};

const PERMISSION = Permissions.SERVICES;

const Detailed: React.FC<Props> = ({ service, doctors, router }) => {
  const doctorsInService = useMemo<Data<DoctorInServiceForTable[]>>(
    () => ({
      data:
        service?.data?.doctors.map((doctor) => ({
          ...doctor,
          person: { ...doctor.person, dni: doctor.person.dni.toString() },
        })) ?? [],
    }),
    [service?.data?.doctors]
  );

  const { data: session } = useSession();

  const [isOpenUpdateModal, openUpdateModal, closeUpdateModal] = useModal(
    !!router.query?.update
  );
  const [isOpenDisableModal, openDisableModal, closeDisableModal] = useModal();

  return (
    <>
      <section className={styles.container}>
        <section className={styles['commands-container']}>
          <h2 className={styles.name}>
            <Balancer>{service?.data?.name}</Balancer>
          </h2>
          <section className={styles.commands}>
            {hasPermission(session, PERMISSION, Actions.UPDATE) ? (
              <button
                className={styles.button}
                onClick={openUpdateModal}
                aria-label='Modificar los datos del servicio'
              >
                <AiFillEdit aria-hidden />
                Modificar datos
              </button>
            ) : null}
            {hasPermission(session, PERMISSION, Actions.DISABLE) ? (
              <button
                className={styles['button--disable']}
                onClick={openDisableModal}
                aria-label='Deshabilitar servicio'
              >
                <FaMinus aria-hidden />
                Remover
              </button>
            ) : null}
          </section>
        </section>

        <DetailedData service={service.data} />

        <Tabs
          tabs={[
            <>
              <FaUserDoctor aria-hidden /> Médicos
            </>,
          ]}
        >
          <DoctorData
            serviceId={service.data.id}
            data={doctorsInService}
            doctors={doctors.data}
          />
        </Tabs>
      </section>

      <ServiceUpdateFormModal
        isOpen={isOpenUpdateModal}
        onClose={closeUpdateModal}
        service={service.data}
      />

      <ServiceDisableModal
        isOpen={isOpenDisableModal}
        onClose={closeDisableModal}
        service={service.data}
      />
    </>
  );
};

export default withRouter(Detailed);
