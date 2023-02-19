import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { Modal } from '@Components/Modal';
import getToastConfig, { getToastUpdateConfig } from '@Helpers/toast.config';
import { getPerson, createPerson } from '@Services/person.service';
import { createUser } from '@Services/user.service';
import { PersonCreate } from '@Types/person';

import CreateFormView from './CreateForm.view';
import { CreateFormModalProps, UserCreateFormValues } from '../Users.types';

const CreateFormModal = ({ isOpen, close, roles }: CreateFormModalProps) => {
    const router = useRouter();
    const { data: session } = useSession();

    const [isPersonLoading, setPersonLoading] = useState(false);
    const [isPersonCreated, setPersonCreated] = useState(false);

    const formMethods = useForm<UserCreateFormValues>();
    const { getValues, setValue, reset } = formMethods;

    const searchPerson = async () => {
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

    const handleClose = () => {
        reset();
        setPersonLoading(false)
        setPersonCreated(false);
        close();
    }

    const handleCreate = async (formData: UserCreateFormValues) => {
        const { roleId, bloodType, ...person } = formData;
        const idToast = toast.loading('Creando al usuario', getToastConfig());

        const GSWithRHFactor = bloodType ? bloodType.split(/\b/) : undefined;
        const newPerson: PersonCreate = GSWithRHFactor ? {
            bloodType: GSWithRHFactor[0] as PersonCreate['bloodType'],
            rhFactor: GSWithRHFactor[1] as PersonCreate['rhFactor'],
            ...person
        } : person;

        try {
            const { 1: user } = await Promise.all([
                !isPersonCreated && createPerson(newPerson),
                createUser(person.dni, roleId, session.accessToken)
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
                <CreateFormView
                    isPersonLoading={isPersonLoading}
                    isPersonCreated={isPersonCreated}
                    handleCreate={handleCreate}
                    handleClose={handleClose}
                    searchPerson={searchPerson}
                    roles={roles}
                />
            </FormProvider>
        </Modal>
    )
}

export default CreateFormModal;