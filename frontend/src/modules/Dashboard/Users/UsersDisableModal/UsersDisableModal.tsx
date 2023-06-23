import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';

import Button from '@/components/Button';
import { Modal } from '@/components/Modal';
import { useTable } from '@/components/Table/Table';
import getToastConfig, { getToastUpdateConfig } from '@/helpers/toast.config';
import { disableUser } from '@/services/user.service';

import type { UserDataForTable } from '../Table';
import styles from './UsersDisableModal.module.scss';

type Props = {
  readonly isOpen: boolean;
  readonly onClose: () => void;
};

const UsersDisableModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const { rowSelectionSize, getSelectedFlatRows } = useTable<UserDataForTable>();

  const handleDisabled = async () => {
    onClose();

    getSelectedFlatRows().forEach(async (row) => {
      const idToast = toast.loading(
        `Deshabilitando al usuario ${row.original.username}`,
        getToastConfig()
      );

      try {
        await disableUser(parseInt(row.original.dni), true, session.accessToken);

        toast.update(idToast, {
          render: `Usuario ${row.original.username} deshabilitado`,
          ...getToastUpdateConfig('success', { delay: 200 }),
        });
      } catch (error) {
        toast.update(idToast, {
          render: error.message ?? 'El usuario no se deshabilitó',
          ...getToastUpdateConfig('error'),
        });
      }
    });

    router.replace(router.asPath);
  };

  return (
    <Modal
      isOpen={isOpen}
      close={onClose}
      contentLabel={'Modal para confirmar la deshabilitación de usuarios'}
    >
      <h2 className={styles.title}>Actualizar usuario</h2>
      <p className={styles.text}>
        ¿Está seguro de deshabilitar a {rowSelectionSize} usuarios?
      </p>
      <div className={styles.commands}>
        <Button as='button' stylesFor='secondary' onClick={onClose}>
          Cancelar
        </Button>
        <Button as='button' stylesFor='primary' onClick={handleDisabled}>
          Deshabilitar
        </Button>
      </div>
    </Modal>
  );
};

export default UsersDisableModal;
