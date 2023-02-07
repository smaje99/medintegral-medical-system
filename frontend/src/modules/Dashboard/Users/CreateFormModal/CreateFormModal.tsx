import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import ReactModal from 'react-modal';
import { toast } from 'react-toastify';

import { CloseButton } from '@Components/Button';
import { Modal } from '@Components/Modal';
import getToastConfig, { getToastUpdateConfig } from '@Helpers/toast.config';
import { getPerson, createPerson } from '@Services/person.service';
import { createUser } from '@Services/user.service';
import { PersonCreate } from '@Types/person';

import CreateFormView from './CreateForm.view';
import {
    BloodTypeWithRHFactor,
    CreateFormModalProps,
    UserCreateFormValues
} from '../Users.types';

import styles from './CreateFormModal.module.scss';

const CreateFormModal = ({ isOpen, close, data }: CreateFormModalProps) => {
    const { data: session } = useSession();

    const [isPersonLoading, setPersonLoading] = useState(false);
    const [isPersonCreated, setPersonCreated] = useState(false);

    const formMethods = useForm<UserCreateFormValues>();
    const { getValues, setValue, reset } = formMethods;

    const searchPerson = async () => {
        const dni = getValues('dni');
        setPersonLoading(true);
        try {
            const { bloodType: blood_type, rhFactor: rh_factor, ...person } = await getPerson(dni);
            setPersonCreated(true);
            reset({
                blood_type: BloodTypeWithRHFactor[`${blood_type}${rh_factor}`],
                ...person
            }, { keepDefaultValues: true });
        } catch (error) {
            reset();
            setValue('dni', dni);
            setPersonCreated(false);
        } finally {
            setPersonLoading(false);
        }
    }

    const handleClose = () => {
        reset();
        setPersonLoading(false)
        setPersonCreated(false);
        close();
    }

    const handleCreate = async (formData: UserCreateFormValues) => {
        const { role_id, blood_type, ...person } = formData;
        const idToast = toast.loading('Creando al usuario', getToastConfig());

        const GSWithRHFactor = blood_type ? (blood_type as string).split(/\b/) : undefined;
        const newPerson: PersonCreate = GSWithRHFactor ? {
            bloodType: GSWithRHFactor[0] as PersonCreate['bloodType'],
            rhFactor: GSWithRHFactor[1] as PersonCreate['rhFactor'],
            ...person
        } : person;

        try {
            const { 1: user } = await Promise.all([
                !isPersonCreated && createPerson(newPerson),
                createUser(person.dni, role_id, session.accessToken)
            ]);

            handleClose();
            toast.update(idToast, {
                render: `EL usuario ${user.username} ha sido creado`,
                ...getToastUpdateConfig('success', { delay: 200 })
            });
        } catch (error) {
            toast.update(idToast, {
                render: error.message ?? 'EL usuario no pudo crearse',
                ...getToastUpdateConfig('error')
            });
        }
    }

    return (
        <Modal
            isOpen={isOpen}
            close={handleClose}
            contentLabel="Modal para crear usuarios"
            shouldCloseOnEsc={false}
        >
            <FormProvider {...formMethods}>
                <CreateFormView
                    isPersonLoading={isPersonLoading}
                    isPersonCreated={isPersonCreated}
                    handleCreate={handleCreate}
                    handleClose={handleClose}
                    searchPerson={searchPerson}
                    roles={data.roles}
                />
            </FormProvider>
        </Modal>
    )
}

export default CreateFormModal;