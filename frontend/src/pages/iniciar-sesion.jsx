import Image from 'next/future/image';
import { useRef } from 'react';

import { LoginForm, RecoverPasswordForm } from '@Components/Forms'
import { LoginLayout } from '@Components/layouts';
import LoginRoute from '@Routers/LoginRoute';

import styles from '@Styles/pages/Login.module.scss';

import stethoscopePic from '@Pictures/stethoscope.webp';

const Login = () => {
    const toggleRef = useRef();
    const loginFormRef = useRef();
    const recoverPasswordFormRef = useRef();

    const handleToggleForm = () => {
        toggleRef.current.classList.toggle(styles.active)
            ? recoverPasswordFormRef.current.reset()
            : loginFormRef.current.reset();
    }

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
    <LoginRoute>
        <LoginLayout>
            {page}
        </LoginLayout>
    </LoginRoute>
)

export default Login;