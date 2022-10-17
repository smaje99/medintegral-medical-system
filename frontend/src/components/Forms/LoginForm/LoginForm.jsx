import { forwardRef, useEffect, useImperativeHandle } from 'react';
import { useForm } from 'react-hook-form';

import Button from '@Components/Button';

import styles from './LoginForm.module.scss';

const LoginForm = forwardRef((props, ref) => {
    const { handleSubmit, register, reset } = useForm();

    const handleLogin = async (formData) => {}

    /* A cleanup function that is called when the form is unmounted. */
    useEffect(() => () => reset(), []);

    useImperativeHandle(ref, () => ({ reset }), []);

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit(handleLogin)}
            autoComplete="on"
        >
            <input
                type="text"
                id="username"
                className={styles.input}
                placeholder="Usuario"
                autoFocus={true}
                required
                {...register('username')}
            />
            <input
                type="password"
                id="password"
                className={styles.input}
                placeholder="Contraseña"
                required
                {...register('password')}
            />

            <Button
                type="submit"
                as="input"
                style="primary"
                className={styles.button}
            >
                Iniciar sesión
            </Button>
        </form>
    )
})

export default LoginForm;