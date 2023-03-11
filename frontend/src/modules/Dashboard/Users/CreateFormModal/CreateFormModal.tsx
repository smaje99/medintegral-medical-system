import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { Modal } from '@Components/Modal';
import getToastConfig, { getToastUpdateConfig } from '@Helpers/toast.config';
import { createDoctor } from '@Services/doctor.service';
import { getPerson, createPerson } from '@Services/person.service';
import { createUser } from '@Services/user.service';
import type { PersonCreate } from '@Types/person';

import CreateFormView from './CreateForm.view';
import {
    CreateFormModalProps, CreateFormViewProps, UserCreateFormValues
} from '../Users.types';

const CreateFormModal: React.FC<CreateFormModalProps> = ({ isOpen, close, roles }) => {
    const router = useRouter();
    const { data: session } = useSession();

    const [isPersonLoading, setPersonLoading] = useState(false);
    const [isPersonCreated, setPersonCreated] = useState(false);

    const formMethods = useForm<UserCreateFormValues>();
    const { getValues, setValue, reset } = formMethods;

    const searchPerson: CreateFormViewProps['searchPerson'] = async () => {
        const dni = getValues('dni');
        setPersonLoading(true);
        try {
            const { bloodType, rhFactor, ...person } = await getPerson(dni);
            setPersonCreated(true);
            reset({
                bloodType: bloodType ? `${bloodType}${rhFactor}` : '',
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

    const handleClose: CreateFormViewProps['handleClose'] = () => {
        reset();
        setPersonLoading(false)
        setPersonCreated(false);
        close();
    }

    /**
     * Handle to create a new user in the system.
     * If the personal data is already created, then only the user will be created.
     * If the user to be created has the role of doctor, then the doctor will
     * be created in the system as well.
     * @param formData - UserCreateFormValues
     */
    const handleCreate: CreateFormViewProps['handleCreate'] = async (formData) => {
        const { roleId, bloodType, ...person } = formData;
        const idToast = toast.loading('Creando al usuario', getToastConfig());

        const GSWithRHFactor = bloodType ? bloodType.split(/\b/) : undefined;
        const newPerson: PersonCreate = GSWithRHFactor ? {
            bloodType: GSWithRHFactor[0] as PersonCreate['bloodType'],
            rhFactor: GSWithRHFactor[1] as PersonCreate['rhFactor'],
            ...person
        } : person;

        const isDoctor = roles?.data?.filter(
            role => role.id === roleId
        )[0].name === 'médico';

        try {
            const { 1: user } = await Promise.all([
                !isPersonCreated && createPerson(newPerson),
                createUser(person.dni, roleId, session.accessToken),
                isDoctor && createDoctor({ dni: person.dni }, session.accessToken)
            ]);

            handleClose();
            toast.update(idToast, {
                render: `EL usuario ${user.username} ha sido creado`,
                ...getToastUpdateConfig('success', { delay: 200 })
            });
            router.replace(router.asPath);
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
                <CreateFormView {...{
                    isPersonLoading,
                    isPersonCreated,
                    handleCreate,
                    handleClose,
                    searchPerson,
                    roles
                }} />
            </FormProvider>
        </Modal>
    )
}

export default CreateFormModal;