import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useEffect, useMemo } from 'react';
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { type CommandAttributes, type FieldAttributes, Form } from '@/components/Form';
import { Modal } from '@/components/Modal';
import { useTable } from '@/components/Table/Table';
import getToastConfig from '@/helpers/toast.config';
import { updateService } from '@/services/service.service';
import type { Service, ServiceUpdate } from '@/types/medical/service.model';

import styles from './ServiceUpdateFormModal.module.scss';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const ServiceUpdateFormModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const formMethods = useForm<ServiceUpdate>();
  const { getObjectsFromSelectedRows, rowSelectionSize, getSelectedFlatRows } =
    useTable<Service>();

  const serviceSelected = getObjectsFromSelectedRows()[0];

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
    getSelectedFlatRows().forEach((row) => row.toggleSelected());
    formMethods.reset();
    onClose();
  };

  const handleUpdate: SubmitHandler<ServiceUpdate> = async (formData) => {
    const { id: serviceId } = serviceSelected;
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

  useEffect(
    () => formMethods.reset(serviceSelected),
    [formMethods, rowSelectionSize, serviceSelected]
  );

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
