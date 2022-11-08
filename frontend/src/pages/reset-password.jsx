import { useRouter } from 'next/router';

import { NavigationLayout } from '@Components/layouts'
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

ResetPassword.getLayout = (page) => (
    <NavigationLayout title="Restablecer contraseña">
        {page}
    </NavigationLayout>
)

export default ResetPassword;