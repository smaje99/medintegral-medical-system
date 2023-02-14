import { useMemo } from 'react';
import { useForm } from 'react-hook-form';

import Button from '@Components/Button/Button';

import { UserUpdateFormProps, UserUpdateValues } from '../User.types';

import styles from './UserUpdateForm.module.scss';

const UserUpdateForm: React.FC<UserUpdateFormProps> = ({ roles, setEditRole }) => {
    const { handleSubmit, register } = useForm<UserUpdateValues>();

    const rolesMemo = useMemo(() => roles, [roles]);

    const handleUpdate = async (data: UserUpdateValues) => {
        console.log(data)
        setEditRole(false);
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