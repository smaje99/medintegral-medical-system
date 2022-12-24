import { useRouter } from 'next/router';

import { AuthLayout } from '@Components/layouts'
import { Form, styles } from '@Modules/ResetPassword';

const ResetPassword = () => {
    const router = useRouter();

    return (
        <section className={styles.form_box}>
            <h2 className={styles.title}>Restablecer tu contraseña</h2>
            <Form token={router?.query?.token} />
        </section>
    )
}

ResetPassword.getLayout = (page: JSX.Element) => (
    <AuthLayout title="Restablecer contraseña">
        {page}
    </AuthLayout>
)

export default ResetPassword;