import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import Button from '@Components/Button';
import getToastConfig from '@Helpers/toast.config';
import { passwordRecovery } from '@Services/login.service';

import styles from './RecoverPasswordForm.module.scss';

const RecoverPasswordForm = forwardRef((props, ref) => {
    const { handleSubmit, register, reset } = useForm();

    const handleRecoverPassword = async (formData) => {
        await toast.promise(
            passwordRecovery(formData),
            {
                pending: 'Enviando correo electrónico',
                success: {
                    render({ data }) {
                        reset();
                        return data.data.message;
                    }
                },
                error: {
                    render({ data }) {
                        return data.response.data.detail;
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
                autoFocus={true}
                required
                {...register('email')}
            />

            <Button
                type="submit"
                as="input"
                style="secondary"
                className={styles.button}
            >
                Enviar
            </Button>
        </form>
    )
})

export default RecoverPasswordForm;