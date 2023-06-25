import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Button from '@/components/Button/Button';
import getToastConfig from '@/helpers/toast.config';
import { updateUser } from '@/services/user.service';
import type { Data } from '@/types/data-request';
import type { APIError } from '@/types/error';
import type { Role } from '@/types/user/role';
import type { User, UserUpdate } from '@/types/user/user';

import styles from './UserUpdateForm.module.scss';

type Props = {
  readonly userDni: User['dni'];
  readonly roles: Data<Role[]>;
  readonly setEditRole: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserUpdateForm: React.FC<Props> = ({ userDni, roles, setEditRole }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const { handleSubmit, register } = useForm<UserUpdate>();

  const rolesMemo = useMemo(() => roles, [roles]);

  const handleUpdate = async (formData: UserUpdate) => {
    await toast.promise<User, APIError>(
      updateUser(userDni, formData, session.accessToken),
      {
        pending: 'Actualizando usuario',
        success: {
          render() {
            setEditRole(false);
            router.replace(router.asPath);
            return 'Usuario actualizado';
          },
        },
        error: {
          render({ data }) {
            return data.detail;
          },
        },
      },
      getToastConfig()
    );
  };

  return (
    <form onSubmit={handleSubmit(handleUpdate)} className={styles.form}>
      <select id='roleId' className={styles.select} required {...register('roleId')}>
        <option value='' key='none'>
          - Seleccione rol -
        </option>
        {rolesMemo?.data?.map((role) => (
          <option value={role.id} key={role.id}>
            {role.name}
          </option>
        ))}
      </select>
      <div role='toolbar'>
        <Button
          as='input'
          type='reset'
          stylesFor='secondary-fit'
          className={styles.button}
          onClick={() => setEditRole(false)}
        >
          Cancelar
        </Button>
        <Button
          as='input'
          type='submit'
          stylesFor='primary-fit'
          className={styles.button}
        >
          Actualizar
        </Button>
      </div>
    </form>
  );
};

export default UserUpdateForm;
