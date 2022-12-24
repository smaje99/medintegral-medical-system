import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Button from '@Components/Button';
import getToastConfig from '@Helpers/toast.config';
import { passwordRecovery } from '@Services/login.service';
import { Message } from '@Types/message';

import styles from './RecoverPasswordForm.module.scss';
import type { RecoverPasswordFormValues } from '../Login.types';

const RecoverPasswordForm = forwardRef((props, ref) => {
    const { handleSubmit, register, reset } = useForm<RecoverPasswordFormValues>();

    const handleRecoverPassword = async (formData: RecoverPasswordFormValues) => {
        await toast.promise(
            passwordRecovery(formData.email),
            {
                pending: 'Enviando correo electrónico',
                success: {
                    render({ data }) {
                        reset();
                        return (data as Message).message;
                    }
                },
                error: {
                    render({ data }) {
                        // ! Probar
                        return data.message;
                    }
                }
            },
            getToastConfig()
        );
    }

    /* A cleanup function that is called when the form is unmounted. */
    useEffect(() => () => reset(), []);

    useImperativeHandle(ref, () => ({ reset }), []);

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit(handleRecoverPassword)}
            autoComplete="on"
        >
            <input
                type="email"
                id="email"
                className={styles.input}
                placeholder="Correo electrónico"
                required
                {...register('email')}
            />

            <Button
                type="submit"
                as="input"
                stylesFor="secondary"
                className={styles.button}
            >
                Enviar
            </Button>
        </form>
    )
})

export default RecoverPasswordForm;