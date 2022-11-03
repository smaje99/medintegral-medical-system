import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { useForm } from 'react-hook-form';

import Button from '@Components/Button';

import styles from './RecoverPasswordForm.module.scss';

const RecoverPasswordForm = forwardRef((props, ref) => {
    const { handleSubmit, register, reset } = useForm();

    const handleRecoverPassword = async (formData) => {}

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