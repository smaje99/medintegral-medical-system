import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { FormProvider, useForm } from 'react-hook-form';
import { HiIdentification } from 'react-icons/hi2';
import { MdPassword } from 'react-icons/md';
import { toast } from 'react-toastify';

import { Modal } from '@Components/Modal';
import { Tabs } from '@Components/Tabs';
import getToastConfig, { getToastUpdateConfig } from '@Helpers/toast.config';
import { changeUserPassword } from '@Services/user.service';

import ChangePasswordForm from './ChangePasswordForm';
import PersonalDataUpdate from './PersonalDataForm';
import {
    ChangePasswordValues, PersonalDataUpdateValues, UserUpdateModalProps
} from '../User.types';

import styles from './UserUpdateModal.module.scss';

const UserUpdateModal: React.FC<UserUpdateModalProps> = ({
    isOpen, close, isUserOwner
}) => {
    const router = useRouter();
    const { data: session } = useSession();

    const personalDataUpdateFormMethods = useForm<PersonalDataUpdateValues>();
    const changePasswordFormMethods = useForm<ChangePasswordValues>();

    const handlePersonalDataClose = () => {
        personalDataUpdateFormMethods.reset();
        close();
    }

    const handleChangePasswordClose = () => {
        changePasswordFormMethods.reset();
        close();
    }

    const handlePersonalDataUpdate = async (data: PersonalDataUpdateValues) => {}

    const handleChangePassword = async (data: ChangePasswordValues) => {
        const idToast = toast.loading('Actualizando contraseña', getToastConfig());
        try {
            await changeUserPassword(data, session.accessToken);

            handleChangePasswordClose();
            toast.update(idToast, {
                render: 'Contraseña actualizada',
                ...getToastUpdateConfig('success', { delay: 200 })
            });
            router.replace(router.asPath);
        } catch (error) {
            toast.update(idToast, {
                render: error.message ?? 'Contraseña no actualizada',
                ...getToastUpdateConfig('error')
            });
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            close={close}
            contentLabel='Modal para actualizar un usuario'
        >
            <h2 className={styles["title"]}>Actualizar usuario</h2>
            <Tabs
                tabs={[
                    (<><HiIdentification /> Información Personal</>),
                    isUserOwner ? (<><MdPassword /> Cambiar contraseña</>) : null
                ]}
                theme='dark'
            >
                <FormProvider {...personalDataUpdateFormMethods}>
                    <PersonalDataUpdate
                        onUpdate={handlePersonalDataUpdate}
                        onClose={handlePersonalDataClose}
                    />
                </FormProvider>
                {isUserOwner ? (
                    <FormProvider {...changePasswordFormMethods}>
                        <ChangePasswordForm
                            onUpdate={handleChangePassword}
                            onClose={handleChangePasswordClose}
                        />
                    </FormProvider>
                ) : null}
            </Tabs>
        </Modal>
    )
}

export default UserUpdateModal;