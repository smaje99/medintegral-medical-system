import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';

import Button from '@/components/Button';
import { Modal } from '@/components/Modal';
import getToastConfig from '@/helpers/toast.config';
import { disableService } from '@/services/service.service';
import type { Service } from '@/types/medical/service.model';

import styles from './ServiceDisableModal.module.scss';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  service: Service;
};

const ServiceDisableModal: React.FC<Props> = ({ isOpen, onClose, service }) => {
  const router = useRouter();
  const { data: session } = useSession();

  const handleDisabled = async () => {
    const { id: serviceId } = service;
    const { accessToken: token } = session;

    await toast.promise<Service, Error, string>(
      disableService(serviceId, true, token),
      {
        pending: 'Eliminando servicio...',
        success: {
          render({ data }) {
            onClose();
            router.replace(router.asPath);
            return `Servicio ${data.name} eliminado correctamente`;
          },
        },
        error: {
          render({ data: error }) {
            return error?.message ?? 'El servicio no pudo ser eliminado';
          },
        },
      },
      getToastConfig()
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      close={onClose}
      contentLabel={'Modal para remover un servicio'}
    >
      <h2 className={styles.title}>Actualizar usuario</h2>
      <p className={styles.text}>
        ¿Está seguro de remover el servicio <strong>{service.name}</strong>?
      </p>
      <div className={styles.commands}>
        <Button as='button' stylesFor='secondary' onClick={onClose}>
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
