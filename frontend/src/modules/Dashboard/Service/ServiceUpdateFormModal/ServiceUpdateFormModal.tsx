import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { type CommandAttributes, type FieldAttributes, Form } from '@/components/Form';
import { Modal } from '@/components/Modal';
import getToastConfig from '@/helpers/toast.config';
import { updateService } from '@/services/service.service';
import type { Service, ServiceUpdate } from '@/types/medical/service.model';

import styles from './ServiceUpdateFormModal.module.scss';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  service: Service;
};

const ServiceUpdateFormModal: React.FC<Props> = ({ isOpen, onClose, service }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const formMethods = useForm<ServiceUpdate>({ defaultValues: service });

  const data = useMemo<FieldAttributes<ServiceUpdate>[]>(
    () => [
      {
        type: 'text',
        name: 'name',
        label: 'Nombre',
      },
      {
        type: 'textarea',
        name: 'description',
        label: 'Descripción',
      },
      {
        type: 'number',
        name: 'cost',
        label: 'Precio',
      },
      {
        type: 'number',
        name: 'duration',
        label: 'Duración (minutos)',
      },
    ],
    []
  );

  const commands = useMemo<CommandAttributes>(
    () => ({
      submit: { label: 'Actualizar' },
      reset: { label: 'Cancelar' },
    }),
    []
  );

  const handleClose = () => {
    formMethods.reset();
    onClose();
  };

  const handleUpdate: SubmitHandler<ServiceUpdate> = async (formData) => {
    const { id: serviceId } = service;
    const token = session.accessToken;

    await toast.promise<Service, Error, string>(
      updateService(serviceId, formData, token),
      {
        pending: 'Actualizando servicio...',
        success: {
          render() {
            handleClose();
            router.replace(router.asPath);

            return 'Servicio actualizado correctamente';
          },
        },
        error: {
          render({ data: error }) {
            return error.message ?? 'El servicio no logro ser actualizado';
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
      contentLabel='Modal para actualizar un servicio médico'
    >
      <h2 className={styles.title}>Actualizar Servicio</h2>
      <FormProvider<ServiceUpdate> {...formMethods}>
        <Form<ServiceUpdate>
          data={data}
          commands={commands}
          onSubmit={handleUpdate}
          onReset={onClose}
        />
      </FormProvider>
    </Modal>
  );
};

export default ServiceUpdateFormModal;
