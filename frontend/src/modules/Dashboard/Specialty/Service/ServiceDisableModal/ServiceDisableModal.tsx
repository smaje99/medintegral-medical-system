import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';

import Button from '@/components/Button';
import { Modal } from '@/components/Modal';
import { useTable } from '@/components/Table/Table';
import getToastConfig from '@/helpers/toast.config';
import { disableService } from '@/services/service.service';
import type { Service } from '@/types/medical/service.model';

import styles from './ServiceUpdateModal.module.scss';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const ServiceDisableModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const { rowSelectionSize, getSelectedFlatRows, getObjectsFromSelectedRows } =
    useTable<Service>();

  const handleClose = () => {
    getSelectedFlatRows().forEach((row) => row.toggleSelected());
    onClose();
  };

  const handleDisabled = async () => {
    handleClose();

    const token = session.accessToken;
    const disable = true;

    getObjectsFromSelectedRows().forEach(async (service) => {
      const { id: serviceId } = service;

      await toast.promise<Service, Error, string>(
        disableService(serviceId, disable, token),
        {
          pending: 'Removiendo servicio',
          success: 'Servicio removido',
          error: {
            render({ data: error }) {
              return error.message ?? 'El servicio no logro ser removido';
            },
          },
        },
        getToastConfig()
      );
    });

    router.replace(router.asPath);
  };

  return (
    <Modal
      isOpen={isOpen}
      close={handleClose}
      contentLabel='Modal para confirmar la remoción de servicios'
    >
      <h2 className={styles.title}>Remover servicio</h2>
      <p className={styles.text}>
        ¿Está seguro que desea remover
        {rowSelectionSize > 1
          ? ' los servicios seleccionados'
          : ' el servicio seleccionado'}
        ?
      </p>
      <div className={styles.commands}>
        <Button as='button' stylesFor='secondary' onClick={handleClose}>
          Cancelar
        </Button>
        <Button as='button' stylesFor='primary' onClick={handleDisabled}>
          Remover
        </Button>
      </div>
    </Modal>
  );
};

export default ServiceDisableModal;
