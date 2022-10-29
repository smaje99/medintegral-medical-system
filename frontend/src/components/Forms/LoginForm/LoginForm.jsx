import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useState
} from 'react';
import { useForm } from 'react-hook-form';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';

import Button from '@Components/Button';

import styles from './LoginForm.module.scss';

const LoginForm = forwardRef((props, ref) => {
    const { handleSubmit, register, reset } = useForm();
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    }

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
            <div className={styles.field}>
                <input
                    type="text"
                    id="username"
                    className={styles.input}
                    placeholder="Usuario"
                    autoFocus={true}
                    required
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
                    {...register('password')}
                />
                <button
                    className={styles.show_password}
                    onClick={handleShowPassword}
                >
                    {showPassword ? <BsEyeFill /> : <BsEyeSlashFill />}
                </button>
            </div>
            <label htmlFor="remember-me" className={styles.container}>
                <input
                    type="checkbox"
                    id="remember-me"
                    className={styles.checkbox}
                    {...register('rememberMe')}
                />
                <span className={styles.text}>
                    Mantener la sesión iniciada
                </span>
            </label>

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