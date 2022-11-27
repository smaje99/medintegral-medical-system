import Image from 'next/future/image';
import { useRouter } from 'next/router';
import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

import { AuthLayout } from '@Components/layouts';
import {
    LoginForm,
    RecoverPasswordForm,
    styles
} from '@Modules/login';

import getToastConfig from '@Helpers/toast.config';

import stethoscopePic from '@Pictures/stethoscope.webp';

const Login = () => {
    const toggleRef = useRef();
    const loginFormRef = useRef();
    const recoverPasswordFormRef = useRef();

    const router = useRouter();

    const handleToggleForm = () => {
        toggleRef.current.classList.toggle(styles.active)
            ? recoverPasswordFormRef.current.reset()
            : loginFormRef.current.reset();
    }

    const handleError = () => {
        const error = router.query?.error;

        if (error && error === 'SessionRequired') {
            toast.warning(
                'Debe de iniciar sesión primero para poder acceder',
                getToastConfig()
            )
        }
    }

    useEffect(handleError, [router]);

    return (
        <section className={styles.container} ref={toggleRef}>
            <Image
                src={stethoscopePic}
                className={styles.image}
                alt="Estetoscopio | Foto de Jeremy Bishop en Unsplash"
                layout="responsive"
                priority
            />
            <section className={`${styles.form_box} ${styles.login_box}`}>
                <h2 className={styles.title}>Iniciar sesión</h2>
                <LoginForm ref={loginFormRef} />
                <section className={styles.forgot}>
                    <span>¿Olvidaste tu contraseña?</span>
                    <a href="#" onClick={handleToggleForm}>
                        Recuperar contraseña
                    </a>
                </section>
            </section>
            <section className={`${styles.form_box} ${styles.recover_box}`}>
                <h2 className={styles.title}>Recuperar contraseña</h2>
                <RecoverPasswordForm ref={recoverPasswordFormRef} />
                <section className={styles.forgot}>
                    <a href="#" onClick={handleToggleForm}>
                        Inicia sesión con tu usuario
                    </a>
                </section>
            </section>
        </section>
    )
}

Login.getLayout = (page) => (
    <AuthLayout title="Iniciar sesión">
        {page}
    </AuthLayout>
)

export default Login;