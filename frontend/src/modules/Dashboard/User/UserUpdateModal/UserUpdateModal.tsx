import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { FormProvider, useForm } from 'react-hook-form';
import { HiIdentification } from 'react-icons/hi2';
import { MdHealthAndSafety, MdPassword } from 'react-icons/md';
import { toast } from 'react-toastify';

import { Modal } from '@/components/Modal';
import { Tabs } from '@/components/Tabs';
import getToastConfig, { getToastUpdateConfig } from '@/helpers/toast.config';
import { updateDoctor } from '@/services/doctor.service';
import { updatePerson } from '@/services/person.service';
import { changeUserPassword } from '@/services/user.service';
import type { DoctorUpdate } from '@/types/medical/doctor.model';
import type { Person, PersonUpdate } from '@/types/person';
import type { User, UserPasswordUpdate } from '@/types/user/user';

import ChangePasswordForm from './ChangePasswordForm';
import DoctorDataUpdate from './DoctorDataForm';
import PersonalDataUpdate, { PersonalDataUpdateValues } from './PersonalDataForm';
import styles from './UserUpdateModal.module.scss';

type Props = {
  isOpen: boolean;
  close: () => void;
  isUserOwner: boolean;
  personalData: Person;
  doctorData: User['doctor'];
};

const UserUpdateModal: React.FC<Props> = ({
  isOpen,
  close,
  isUserOwner,
  personalData: { bloodType, rhFactor, ...personalData },
  doctorData,
}) => {
  const router = useRouter();
  const { data: session } = useSession();

  const personalDataUpdateFormMethods = useForm<PersonalDataUpdateValues>({
    defaultValues: {
      bloodType: bloodType ? `${bloodType}${rhFactor}` : '',
      ...personalData,
    },
  });
  const changePasswordFormMethods = useForm<UserPasswordUpdate>();
  const doctorDataUpdateFormMethods = useForm<DoctorUpdate>({
    defaultValues: doctorData,
  });

  const handlePersonalDataClose = () => {
    personalDataUpdateFormMethods.reset();
    close();
  };

  const handleChangePasswordClose = () => {
    changePasswordFormMethods.reset();
    close();
  };

  const handleDoctorDataClose = () => {
    doctorDataUpdateFormMethods.reset();
    close();
  };

  const handlePersonalDataUpdate = async (data: PersonalDataUpdateValues) => {
    const idToast = toast.loading('Actualizando datos personales', getToastConfig());

    const { bloodType: bloodTypeFormData, ...personalFormData } = data;

    const GSWithRHFactor = bloodTypeFormData ? bloodTypeFormData.split(/\b/) : undefined;
    const personUpdateWithGSWithRHFactor: PersonUpdate = {
      bloodType: GSWithRHFactor[0] as PersonUpdate['bloodType'],
      rhFactor: GSWithRHFactor[1] as PersonUpdate['rhFactor'],
      ...personalFormData,
    };

    const personUpdate: PersonUpdate = GSWithRHFactor
      ? personUpdateWithGSWithRHFactor
      : personalFormData;

    try {
      await updatePerson(personalFormData.dni, personUpdate, session.accessToken);

      handleChangePasswordClose();
      toast.update(idToast, {
        render: 'Datos personales actualizados',
        ...getToastUpdateConfig('success', { delay: 200 }),
      });
      router.replace(router.asPath);
    } catch (error) {
      toast.update(idToast, {
        render: error.message ?? 'Datos personales no actualizados',
        ...getToastUpdateConfig('error'),
      });
    }
  };

  const handleChangePassword = async (data: UserPasswordUpdate) => {
    const idToast = toast.loading('Actualizando contraseña', getToastConfig());
    try {
      await changeUserPassword(data, session.accessToken);

      handleChangePasswordClose();
      toast.update(idToast, {
        render: 'Contraseña actualizada',
        ...getToastUpdateConfig('success', { delay: 200 }),
      });
      router.replace(router.asPath);
    } catch (error) {
      toast.update(idToast, {
        render: error.message ?? 'Contraseña no actualizada',
        ...getToastUpdateConfig('error'),
      });
    }
  };

  const handleDoctorDataUpdate = async (data: DoctorUpdate) => {
    const idToast = toast.loading('Actualizando datos médicos', getToastConfig());
    try {
      await updateDoctor(personalData.dni, { ...data }, session.accessToken);

      handleDoctorDataClose();
      toast.update(idToast, {
        render: 'Datos médicos actualizados',
        ...getToastUpdateConfig('success', { delay: 200 }),
      });
      router.replace(router.asPath);
    } catch (error) {
      toast.update(idToast, {
        render: error.message ?? 'Datos médicos no actualizados',
        ...getToastUpdateConfig('error'),
      });
    }
  };

  return (
    <Modal isOpen={isOpen} close={close} contentLabel='Modal para actualizar un usuario'>
      <h2 className={styles.title}>Actualizar usuario</h2>
      <Tabs
        tabs={[
          <>
            {' '}
            <HiIdentification /> Información Personal{' '}
          </>,
          isUserOwner ? (
            <>
              {' '}
              <MdPassword /> Cambiar contraseña{' '}
            </>
          ) : null,
          doctorData ? (
            <>
              {' '}
              <MdHealthAndSafety /> Datos médicos{' '}
            </>
          ) : null,
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
            />
          </FormProvider>
        ) : null}
      </Tabs>
    </Modal>
  );
};

export default UserUpdateModal;
