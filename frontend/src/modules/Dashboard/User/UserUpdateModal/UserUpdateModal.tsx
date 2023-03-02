import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { HiIdentification } from 'react-icons/hi2';
import { MdHealthAndSafety, MdPassword } from 'react-icons/md';
import { toast } from 'react-toastify';

import { Modal } from '@Components/Modal';
import { Tabs } from '@Components/Tabs';
import getToastConfig, { getToastUpdateConfig } from '@Helpers/toast.config';
import { updateDoctor } from '@Services/doctor.service';
import { updatePerson } from '@Services/person.service';
import { changeUserPassword } from '@Services/user.service';
import type { PersonUpdate } from '@Types/person';

import ChangePasswordForm from './ChangePasswordForm';
import DoctorDataUpdate from './DoctorDataForm';
import PersonalDataUpdate from './PersonalDataForm';
import type {
    ChangePasswordValues,
    DoctorDataUpdateValues,
    PersonalDataUpdateValues,
    UserUpdateModalProps
} from '../User.types';

import styles from './UserUpdateModal.module.scss';

const UserUpdateModal: React.FC<UserUpdateModalProps> = ({
    isOpen,
    close,
    isUserOwner,
    personalData: { bloodType, rhFactor, ...personalData },
    doctorData
}) => {
    const router = useRouter();
    const { data: session } = useSession();

    const personalDataUpdateFormMethods = useForm<PersonalDataUpdateValues>({
        defaultValues: {
            bloodType: bloodType ? `${bloodType}${rhFactor}` : '',
            ...personalData
        }
    });
    const changePasswordFormMethods = useForm<ChangePasswordValues>();
    const doctorDataUpdateFormMethods = useForm<DoctorDataUpdateValues>({
        defaultValues: doctorData
    });

    const [medicalLicenses, setMedicalLicenses] = useState(() => doctorData.medicalLicenses);

    const handlePersonalDataClose = () => {
        personalDataUpdateFormMethods.reset();
        close();
    }

    const handleChangePasswordClose = () => {
        changePasswordFormMethods.reset();
        close();
    }

    const handleDoctorDataClose = () => {
        doctorDataUpdateFormMethods.reset();
        close();
    }

    const handlePersonalDataUpdate = async (data: PersonalDataUpdateValues) => {
        const idToast = toast.loading('Actualizando datos personales', getToastConfig());

        const { bloodType, ...personalData } = data;

        const GSWithRHFactor = bloodType ? bloodType.split(/\b/) : undefined;
        const personUpdate: PersonUpdate = GSWithRHFactor ? {
            bloodType: GSWithRHFactor[0] as PersonUpdate['bloodType'],
            rhFactor: GSWithRHFactor[1] as PersonUpdate['rhFactor'],
            ...personalData
        } : personalData;

        try {
            await updatePerson(personalData.dni, personUpdate, session.accessToken);

            handleChangePasswordClose();
            toast.update(idToast, {
                render: 'Datos personales actualizados',
                ...getToastUpdateConfig('success', { delay: 200 })
            });
            router.replace(router.asPath);
        } catch (error) {
            toast.update(idToast, {
                render: error.message ?? 'Datos personales no actualizados',
                ...getToastUpdateConfig('error')
            });
        }
    }

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

    const handleDoctorDataUpdate = async (data: DoctorDataUpdateValues) => {
        const idToast = toast.loading('Actualizando datos médicos', getToastConfig());
        try {
            await updateDoctor(
                personalData.dni, { ...data, medicalLicenses }, session.accessToken
            );

            handleDoctorDataClose();
            toast.update(idToast, {
                render: 'Datos médicos actualizados',
                ...getToastUpdateConfig('success', { delay: 200 })
            });
            router.replace(router.asPath);
        } catch (error) {
            toast.update(idToast, {
                render: error.message ?? 'Datos médicos no actualizados',
                ...getToastUpdateConfig('error')
            });
        }
    }

    /**
     * Handle the addition of medical license.
     * @param event - React.KeyboardEvent<HTMLInputElement>
     */
    const handleAddMedicalLicense = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const { value } = event.currentTarget;
        if (event.code === 'Comma'
            && value.match(/RM\s\d{3}-\d{2}/)
            && !medicalLicenses.includes(value)) {
            setMedicalLicenses(currentLicenses => [...currentLicenses, value]);
            event.currentTarget.value = '';
        }
    }

    /**
     * Handle the removal of medical licenses.
     * @param item - string - the item to be removed from the array.
     */
    const handleRemoveMedicalLicense= (item: string) => {
        setMedicalLicenses(currentLicenses => (
            currentLicenses.filter(license => license != item)
        ));
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
                    (<> <HiIdentification /> Información Personal </>),
                    isUserOwner ? (<> <MdPassword /> Cambiar contraseña </>) : null,
                    doctorData ? (<> <MdHealthAndSafety /> Datos médicos </>) : null
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
                {doctorData ? (
                    <FormProvider {...doctorDataUpdateFormMethods}>
                        <DoctorDataUpdate
                            onUpdate={handleDoctorDataUpdate}
                            onClose={handleDoctorDataClose}
                            medicalLicenses={medicalLicenses}
                            handleAddMedicalLicense={handleAddMedicalLicense}
                            handleRemoveMedicalLicense={handleRemoveMedicalLicense}
                        />
                    </FormProvider>
                ) : null}
            </Tabs>
        </Modal>
    )
}

export default UserUpdateModal;