import { useReducer } from 'react';
import { useFormContext } from 'react-hook-form';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';

import Button from '@Components/Button';
import { Field } from '@Components/Form';

import { ChangePasswordProps, ChangePasswordValues } from '../User.types';

import styles from './UserUpdateModal.module.scss';

const ChangePasswordForm: React.FC<ChangePasswordProps> = ({ onUpdate, onClose }) => {
    const [
        showOldPassword, handleOldShowPassword
    ] = useReducer((state: boolean) => !state, false);
    const [
        showNewPassword, handleNewShowPassword
    ] = useReducer((state: boolean) => !state, false);
    const { handleSubmit, register } = useFormContext<ChangePasswordValues>();

    return (
        <form
            onSubmit={handleSubmit(onUpdate)}
            className={styles['form']}
            autoComplete='off'
        >
            <Field htmlFor='oldPassword' title='Contraseña actual' obligatory>
                <input
                    type={showOldPassword ? 'text': 'password'}
                    id="oldPassword"
                    className={styles['input']}
                    required
                    {...register('oldPassword')}
                />
                <div
                    className={styles['show-password']}
                    onClick={handleOldShowPassword}
                >
                    {showOldPassword ? <BsEyeFill /> : <BsEyeSlashFill />}
                </div>
            </Field>
            <Field htmlFor='newPassword' title='Contraseña actual' obligatory>
                <input
                    type={showNewPassword ? 'text': 'password'}
                    id="newPassword"
                    className={styles['input']}
                    required
                    {...register('newPassword')}
                />
                <div
                    className={styles['show-password']}
                    onClick={handleNewShowPassword}
                >
                    {showNewPassword ? <BsEyeFill /> : <BsEyeSlashFill />}
                </div>
            </Field>
            <div className={styles['commands']}>
                <Button
                    as="input"
                    type="reset"
                    stylesFor="secondary"
                    onClick={onClose}
                >
                    Cancelar
                </Button>
                <Button
                    as="input"
                    type="submit"
                    stylesFor="primary"
                >
                    Actualizar
                </Button>
            </div>
        </form>
    )
}

export default ChangePasswordForm;