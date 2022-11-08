import { useRouter } from 'next/router';

import { PublicLayout } from '@Components/layouts'
import { Form, styles } from '@Modules/ResetPassword';

const ResetPassword = () => {
    const router = useRouter();

    return (
        <main className={styles.reset_password}>
            <section className={styles.form_box}>
                <h2 className={styles.title}>Restablecer tu contraseña</h2>
                <Form token={router?.query?.token} />
            </section>
        </main>
    )
}

ResetPassword.getLayout = (page) => (
    <PublicLayout title="Restablecer contraseña">
        {page}
    </PublicLayout>
)

export default ResetPassword;