import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { type CommandAttributes, type FieldAttributes, Form } from '@/components/Form';
import { Modal } from '@/components/Modal';
import getToastConfig from '@/helpers/toast.config';
import { createService } from '@/services/service.service';
import type { Service, ServiceCreate } from '@/types/medical/service.model';
import type { Specialty } from '@/types/medical/specialty.model';

import styles from './ServiceCreateFormModal.module.scss';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  specialtyId: Specialty['id'];
};

const ServiceCreateFormModal: React.FC<Props> = ({ isOpen, onClose, specialtyId }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const formMethods = useForm<ServiceCreate>();

  const data = useMemo<FieldAttributes<ServiceCreate>[]>(
    () => [
      {
        type: 'text',
        name: 'name',
        label: 'Nombre',
        obligatory: true,
      },
      {
        type: 'textarea',
        name: 'description',
        label: 'Descripción',
        obligatory: true,
      },
      {
        type: 'number',
        name: 'cost',
        label: 'Precio',
        obligatory: true,
      },
      {
        type: 'number',
        name: 'duration',
        label: 'Duración (minutos)',
        obligatory: true,
      },
    ],
    []
  );

  const commands = useMemo<CommandAttributes>(
    () => ({
      submit: { label: 'Crear' },
      reset: { label: 'Cancelar' },
    }),
    []
  );

  const handleClose = () => {
    formMethods.reset();
    onClose();
  };

  const handleCreate: SubmitHandler<ServiceCreate> = async (formData) => {
    const service: ServiceCreate = { ...formData, specialtyId };
    await toast.promise<Service, Error, string>(
      createService(service, session.accessToken),
      {
        pending: 'Creando el servicio',
        success: {
          render() {
            handleClose();
            router.replace(router.asPath);

            return 'El servicio ha sido creado';
          },
        },
        error: {
          render({ data: error }) {
            return error?.message ?? 'El servicio no logro ser creado';
          },
        },
      },
      getToastConfig()
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      close={handleClose}
      contentLabel='Modal para crear un servicio'
    >
      <h1 className={styles.title}>Crear Servicio</h1>
      <FormProvider<ServiceCreate> {...formMethods}>
        <Form<ServiceCreate>
          data={data}
          commands={commands}
          onSubmit={handleCreate}
          onReset={onClose}
        />
      </FormProvider>
    </Modal>
  );
};

export default ServiceCreateFormModal;
