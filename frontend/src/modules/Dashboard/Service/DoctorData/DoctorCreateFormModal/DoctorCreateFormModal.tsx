import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { type CommandAttributes, type FieldAttributes, Form } from '@/components/Form';
import { Modal } from '@/components/Modal';
import getToastConfig from '@/helpers/toast.config';
import { createDoctorInService } from '@/services/serviceDoctor.service';
import {
  type Doctor,
  type DoctorInServiceCreate,
  type ServiceDoctor,
  ServiceType,
  Session,
} from '@/types/medical/doctor.model';

import styles from './DoctorCreateFormModal.module.scss';

type Props = {
  readonly serviceId: DoctorInServiceCreate['serviceId'];
  readonly doctors: Doctor[];
  readonly isOpen: boolean;
  readonly onClose: () => void;
};

const DoctorCreateFormModal: React.FC<Props> = ({
  serviceId,
  doctors,
  isOpen,
  onClose,
}) => {
  const router = useRouter();
  const { data: session } = useSession();
  const formMethods = useForm<DoctorInServiceCreate>();

  const data = useMemo<FieldAttributes<DoctorInServiceCreate>[]>(
    () => [
      {
        type: 'select',
        name: 'doctorId',
        label: 'Médico',
        options: [
          { label: '- Seleccione un médico -', value: '' },
          ...doctors.map((doctor) => ({
            label: `${doctor.name} ${doctor.surname}`,
            value: doctor.dni.toString(),
          })),
        ],
        required: true,
      },
      {
        type: 'select',
        name: 'serviceType',
        label: 'Tipo de servicio',
        options: [
          { label: '- Seleccione un tipo de servicio -', value: '' },
          { label: 'Consulta presencial', value: ServiceType.IN_OF_IPS },
          { label: 'Consulta extramural', value: ServiceType.OUT_OF_IPS },
        ],
        required: true,
      },
      {
        type: 'select',
        name: 'session',
        label: 'Jornada',
        options: [
          { label: '- Seleccione una jornada -', value: '' },
          { label: Session.MORNING, value: Session.MORNING },
          { label: Session.AFTERNOON, value: Session.AFTERNOON },
          { label: Session.FULL_DAY, value: Session.FULL_DAY },
        ],
        required: true,
      },
    ],
    [doctors],
  );

  const commands = useMemo<CommandAttributes>(
    () => ({
      submit: { label: 'Asociar' },
      reset: { label: 'Cancelar' },
    }),
    [],
  );

  const handleClose = () => {
    formMethods.reset();
    onClose();
  };

  const handleCreate: SubmitHandler<DoctorInServiceCreate> = async (formData) => {
    const { accessToken: token } = session;
    const doctorInService: DoctorInServiceCreate = { ...formData, serviceId };

    await toast.promise<ServiceDoctor, Error, string>(
      createDoctorInService(doctorInService, token),
      {
        pending: 'Asociando médico...',
        success: {
          render() {
            handleClose();
            router.replace(router.asPath);

            return 'El médico ha sido asociado con éxito';
          },
        },
        error: {
          render({ data: error }) {
            return error?.message ?? 'Ha ocurrido un error al asociar el médico';
          },
        },
      },
      getToastConfig(),
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      close={handleClose}
      contentLabel='Modal para asociar un médico a un servicio médico'
    >
      <h2 className={styles.title}>Asociar médico</h2>
      <FormProvider<DoctorInServiceCreate> {...formMethods}>
        <Form<DoctorInServiceCreate>
          data={data}
          commands={commands}
          onSubmit={handleCreate}
          onReset={handleClose}
        />
      </FormProvider>
    </Modal>
  );
};

export default DoctorCreateFormModal;
