import { useSession } from 'next-auth/react';
import { toast } from 'react-toastify';

import Button from '@Components/Button';
import { Modal } from '@Components/Modal';
import getToastConfig, { getToastUpdateConfig } from '@Helpers/toast.config';
import { disableUser } from '@Services/user.service';

import { UserDisableModalProps } from '../User.types';

import styles from './UserDisableModal.module.scss'
import { useRouter } from 'next/router';

const UserDisableModal: React.FC<UserDisableModalProps> = ({ user, isOpen, onClose }) => {
    const router = useRouter();
    const { data: session } = useSession();

    const handleDisabled = async () => {
        const idToast = toast.loading(
            `${user?.isActive ? 'Deshabilitando' : 'Habilitando'} al usuario ${user?.username}`,
            getToastConfig()
        );

        try {
            await disableUser(user?.dni, user?.isActive, session.accessToken);

            onClose();
            toast.update(idToast, {
                render: `Usuario ${user?.username} ${user?.isActive ? 'deshabilitado' : 'habilitado'}`,
                ...getToastUpdateConfig('success', { delay: 200 })
            });
            router.replace(router.asPath);
        } catch (error) {
            toast.update(idToast, {
                render: error.message
                    ?? `El usuario no se ${user?.isActive ? 'deshabilitó' : 'habilitó'}`,
                ...getToastUpdateConfig('error')
            });
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            close={onClose}
            contentLabel={`Modal para ${user?.isActive ? 'deshabilitar' : 'habilitar'} un usuario`}
        >
            <h2 className={styles['title']}>Actualizar usuario</h2>
            <p className={styles['text']}>
                ¿Está seguro de {user?.isActive ? 'deshabilitar' : 'habilitar'} al usuario &nbsp;
                <span className={styles['user']}>{user.username}</span>
                ?
            </p>
            <div className={styles['commands']}>
                <Button
                    as="button"
                    stylesFor="secondary"
                    onClick={onClose}
                >
                    Cancelar
                </Button>
                <Button
                    as="button"
                    stylesFor="primary"
                    onClick={handleDisabled}
                >
                    {user?.isActive ? 'Deshabilitar' : 'Habilitar'}
                </Button>
            </div>
        </Modal>
    )
}

export default UserDisableModal;