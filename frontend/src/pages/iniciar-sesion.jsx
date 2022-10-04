import Image from 'next/future/image';
import { useRef } from 'react';

import { LoginForm, RecoverPasswordForm } from '@Components/Forms'
import { LoginLayout } from '@Components/layouts';

import styles from '@Styles/pages/Login.module.scss';

import stethoscopePic from '@Pictures/stethoscope.webp';

const Login = () => {
    const toggleRef = useRef();

    const handleToggleForm = () => {
        toggleRef.current.classList.toggle(styles.active)
    }

    return (
        <div className={styles.container} ref={toggleRef}>
            <div className={`${styles.user} ${styles.login_box}`}>
                <div className={styles.image_box}>
                    <Image
                        src={stethoscopePic}
                        className={styles.image}
                        alt="Estetoscopio | Foto de Jeremy Bishop en Unsplash"
                        layout="responsive"
                        priority
                    />
                </div>
                <div className={styles.form_box}>
                    <h2 className={styles.title}>Iniciar sesión</h2>
                    <LoginForm />
                    <section className={styles.forgot}>
                        <span>¿Olvidaste tu contraseña?</span>
                        <a href="#" onClick={handleToggleForm}>Recuperar contraseña</a>
                    </section>
                </div>
            </div>

            <div className={`${styles.user} ${styles.recover_box}`}>
                <div className={styles.image_box}></div>
                <div className={styles.form_box}>
                    <h2 className={styles.title}>Recuperar contraseña</h2>
                    <RecoverPasswordForm />
                    <section className={styles.forgot}>
                        <a href="#" onClick={handleToggleForm}>Inicia sesión con tu usuario</a>
                    </section>
                </div>
            </div>
        </div>
    )
}

Login.getLayout = (page) => (
    <LoginLayout>
        {page}
    </LoginLayout>
)

export default Login