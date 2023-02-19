import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Button from '@Components/Button/Button';
import getToastConfig from '@Helpers/toast.config';
import { updateUser } from '@Services/user.service';
import type { APIError } from '@Types/error';
import type { User } from '@Types/user/user';

import { UserUpdateFormProps, UserUpdateValues } from '../User.types';

import styles from './UserUpdateForm.module.scss';

const UserUpdateForm: React.FC<UserUpdateFormProps> = ({ userDni, roles, setEditRole }) => {
    const router = useRouter();
    const { data: session } = useSession();
    const { handleSubmit, register } = useForm<UserUpdateValues>();

    const rolesMemo = useMemo(() => roles, [roles]);

    const handleUpdate = async (data: UserUpdateValues) => {
        await toast.promise<User, APIError>(
            updateUser(userDni, data, session.accessToken),
            {
                pending: 'Actualizando usuario',
                success: {
                    render() {
                        setEditRole(false);
                        router.replace(router.asPath);
                        return 'Usuario actualizado';
                    }
                },
                error: {
                    render({ data }) {
                        return data.detail;
                    }
                }
            },
            getToastConfig()
        )
    }

    return (
        <form onSubmit={handleSubmit(handleUpdate)} className={styles['form']}>
            <select id="roleId" className={styles['select']} required {...register('roleId')}>
                <option value="" key="none">- Seleccione rol -</option>
                {rolesMemo?.data?.map(role => (
                    <option value={role.id} key={role.id}>
                        {role.name}
                    </option>
                ))}
            </select>
            <div role='toolbar'>
                <Button
                    as="input"
                    type="reset"
                    stylesFor="secondary-fit"
                    className={styles.button}
                    onClick={() => setEditRole(false)}
                >
                    Cancelar
                </Button>
                <Button
                    as="input"
                    type="submit"
                    stylesFor="primary-fit"
                    className={styles.button}
                >
                    Actualizar
                </Button>
            </div>
        </form>
    )
}

export default UserUpdateForm;