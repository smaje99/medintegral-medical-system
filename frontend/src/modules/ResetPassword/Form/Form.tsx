import { useRouter } from 'next/router';
import { useEffect, useReducer } from 'react';
import { useForm } from 'react-hook-form';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import { toast } from 'react-toastify'

import Button from '@Components/Button';
import routes from '@Helpers/routes';
import getToastConfig from '@Helpers/toast.config';
import { resetPassword } from '@Services/login.service';
import type { Message } from '@Types/message';

import type { FormProps, ResetPasswordFormValues } from '../ResetPassword.types';

import styles from './Form.module.scss';

const Form = ({ token }: FormProps) => {
    const router = useRouter();
    const [showPassword, handleShowPassword] = useReducer((state: boolean) => !state, false);
    const { handleSubmit, register, reset } = useForm<ResetPasswordFormValues>();

    const handleResetPassword = async (formData: ResetPasswordFormValues) => {
        if (!token) {
            router.push(routes.home);
            return toast.warning('No hay un usuario asociado', getToastConfig());
        }

        await toast.promise(
            resetPassword(token, formData.newPassword),
            {
                pending: 'Restableciendo si contraseña',
                success: {
                    render({ data }) {
                        reset();
                        router.push(routes.login);
                        return (data as Message).message;
                    }
                },
                error: {
                    render({ data }) {
                        router.push(routes.home);
                        // ! probar
                        return data.message
                    }
                }
            },
            getToastConfig()
        );
    }

    useEffect(() => () => reset(), []);

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit(handleResetPassword)}
            autoComplete="off"
        >
            <div className={styles.field}>
                <input
                    type={showPassword ? 'text': 'password'}
                    id="password"
                    className={styles.input}
                    placeholder="Nueva contraseña"
                    required
                    autoComplete="off"
                    {...register('newPassword')}
                />
                <div
                    className={styles.show_password}
                    onClick={handleShowPassword}
                >
                    {showPassword ? <BsEyeFill /> : <BsEyeSlashFill />}
                </div>
            </div>

            <Button
                as="input"
                type="submit"
                stylesFor="secondary"
                className={styles.button}
            >
                Restablecer contraseña
            </Button>
        </form>
    )
}

export default Form;