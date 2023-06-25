import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { Modal } from '@/components/Modal';
import getToastConfig, { getToastUpdateConfig } from '@/helpers/toast.config';
import { createDoctor } from '@/services/doctor.service';
import { createPerson, getPerson } from '@/services/person.service';
import { createUser } from '@/services/user.service';
import type { Data } from '@/types/data-request';
import type { PersonCreate } from '@/types/person';
import type { Role } from '@/types/user/role';

import CreateFormView from './CreateForm.view';

export interface UserCreateFormValues
  extends Omit<PersonCreate, 'bloodType' | 'rhFactor' | 'occupation'> {
  readonly bloodType?: string;
  readonly roleId: Role['id'];
}

type Props = {
  isOpen: boolean;
  close: () => void;
  roles: Data<Role[]>;
};

const CreateFormModal: React.FC<Props> = ({ isOpen, close, roles }) => {
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
      reset(
        {
          bloodType: bloodType ? `${bloodType}${rhFactor}` : '',
          ...person,
        },
        { keepDefaultValues: true }
      );
    } catch (error) {
      reset();
      setValue('dni', dni);
      setPersonCreated(false);
    } finally {
      setPersonLoading(false);
    }
  };

  const handleClose = () => {
    reset();
    setPersonLoading(false);
    setPersonCreated(false);
    close();
  };

  /**
   * Handle to create a new user in the system.
   * If the personal data is already created, then only the user will be created.
   * If the user to be created has the role of doctor, then the doctor will
   * be created in the system as well.
   * @param formData - UserCreateFormValues
   */
  const handleCreate = async (formData: UserCreateFormValues) => {
    const { roleId, bloodType, ...person } = formData;
    const idToast = toast.loading('Creando al usuario', getToastConfig());

    const GSWithRHFactor = bloodType ? bloodType.split(/\b/) : undefined;
    const newPerson: PersonCreate = {
      bloodType: GSWithRHFactor?.[0] as PersonCreate['bloodType'],
      rhFactor: GSWithRHFactor?.[1] as PersonCreate['rhFactor'],
      ...person,
    };

    const isDoctor =
      roles?.data?.filter((role) => role.id === roleId)[0].name === 'médico';

    try {
      const { 1: user } = await Promise.all([
        !isPersonCreated && createPerson(newPerson),
        createUser(person.dni, roleId, session.accessToken),
        isDoctor && createDoctor({ dni: person.dni }, session.accessToken),
      ]);

      handleClose();
      toast.update(idToast, {
        render: `El usuario ${user.username} ha sido creado`,
        ...getToastUpdateConfig('success', { delay: 200 }),
      });
      router.replace(router.asPath);
    } catch (error) {
      toast.update(idToast, {
        render: error.message ?? 'EL usuario no pudo crearse',
        ...getToastUpdateConfig('error'),
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      close={handleClose}
      contentLabel='Modal para crear usuarios'
      shouldCloseOnEsc={false}
    >
      <FormProvider {...formMethods}>
        <CreateFormView
          {...{
            isPersonLoading,
            isPersonCreated,
            handleCreate,
            handleClose,
            searchPerson,
            roles,
          }}
        />
      </FormProvider>
    </Modal>
  );
};

export default CreateFormModal;
