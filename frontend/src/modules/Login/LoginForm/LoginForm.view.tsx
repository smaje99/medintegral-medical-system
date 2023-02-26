import { useReducer } from 'react';
import { useFormContext } from 'react-hook-form';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';

import Button from '@Components/Button';
import { Spinner } from '@Components/loaders';

import type { LoginFormValues, LoginFormViewProps } from '../Login.types';

import styles from './LoginForm.module.scss';

const LoginFormView = ({ handleLogin }: LoginFormViewProps) => {
    const [showPassword, handleShowPassword] = useReducer((state: boolean) => !state, false);
    const {
        handleSubmit, register, formState: { isSubmitting }
    } = useFormContext<LoginFormValues>();

    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit(handleLogin)}
            autoComplete="on"
        >
            <div className={styles.field}>
                <input
                    type="text"
                    id="username"
                    className={styles.input}
                    placeholder="Usuario"
                    autoFocus={true}
                    required
                    autoComplete="username"
                    {...register('username')}
                />
            </div>
            <div className={styles.field}>
                <input
                    type={showPassword ? 'text': 'password'}
                    id="password"
                    className={styles.input}
                    placeholder="Contraseña"
                    required
                    autoComplete="current-password"
                    {...register('password')}
                />
                <div
                    className={styles.show_password}
                    onClick={handleShowPassword}
                >
                    {showPassword ? <BsEyeFill /> : <BsEyeSlashFill />}
                </div>
            </div>
            <label htmlFor="remember-me" className={styles.container}>
                <input
                    type="checkbox"
                    id="remember-me"
                    className={styles.checkbox}
                    {...register('rememberMe', { setValueAs: v => !!v })}
                />
                <span className={styles.text}>
                    Mantener la sesión iniciada
                </span>
            </label>

            {isSubmitting ? <Spinner /> : <Button
                as="input"
                type="submit"
                stylesFor="primary"
                className={styles.button}
            >
                Iniciar sesión
            </Button>}
        </form>
    )
}

export default LoginFormView;