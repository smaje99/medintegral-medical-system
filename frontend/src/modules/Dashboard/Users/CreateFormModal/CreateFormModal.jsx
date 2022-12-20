import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import ReactModal from 'react-modal';
import { toast } from 'react-toastify';

import { CloseButton } from '@Components/Button';
import getToastConfig, { getToastUpdateConfig } from '@Helpers/toast.config';
import { getPerson, createPerson } from '@Services/person.service';
import { createUser } from '@Services/user.service';

import CreateFormView from './CreateForm.view';

import styles from './CreateFormModal.module.scss';

const CreateFormModal = ({ isOpen, close, data }) => {
    const { data: session } = useSession();

    const [isPersonLoading, setPersonLoading] = useState(false);
    const [isPersonCreated, setPersonCreated] = useState(false);

    const {
        control,
        getValues,
        handleSubmit,
        register,
        reset,
        setValue
    } = useForm();

    const searchPerson = async () => {
        const dni = getValues('dni');
        setPersonLoading(true);
        try {
            const person = await getPerson(dni);
            setPersonCreated(true);

            setValue('document_type', person.document_type);
            setValue('name', person.name);
            setValue('surname', person.surname);
            setValue('address', person.address);
            setValue('email', person.email);
            setValue('phone', person.phone);
            setValue('gender', person.gender);
            setValue('birthdate', person.birthdate);
            setValue('blood_type', `${person.blood_type}${person.rh_factor}`);
            setValue('ethnicity', person.ethnicity);
            setValue('civil_status', person.civil_status);
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

    const handleCreate = async (formData) => {
        const { role_id, ...person } = formData;
        const idToast = toast.loading('Creando al usuario', getToastConfig());

        if (person.hasOwnProperty('blood_type')) {
            const [blood_type, rh_factor] = person.blood_type.split(/\b/);

            person.blood_type = blood_type
            person.rh_factor = rh_factor
        }

        try {
            const { 1: user } = await Promise.all([
                !isPersonCreated && createPerson(person),
                createUser({
                    dni: person.dni,
                    role_id,
                    token: session.accessToken
                })
            ]);

            handleClose();
            toast.update(idToast, {
                render: `EL usuario ${user.username} ha sido creado`,
                type: 'success',
                delay: 200,
                ...getToastUpdateConfig
            });
        } catch (error) {
            toast.update(idToast, {
                render: error.message ?? 'EL usuario no pudo crearse',
                type: 'error',
                ...getToastUpdateConfig
            })
        }
    }

    return (
        <ReactModal
            isOpen={isOpen}
            contentLabel="Modal para crear usuarios"
            className={styles.modal}
            overlayClassName={styles.overlay}
            ariaHideApp={false}
            onRequestClose={handleClose}
            shouldCloseOnEsc={false}
        >
            <CloseButton onEvent={handleClose} />
            <FormProvider {...{
                control,
                handleSubmit,
                register,
                handleCreate,
                handleClose,
                searchPerson,
                roles: data.roles
            }}>
                <CreateFormView
                    isPersonLoading={isPersonLoading}
                    isPersonCreated={isPersonCreated}
                />
            </FormProvider>
        </ReactModal>
    )
}

export default CreateFormModal;