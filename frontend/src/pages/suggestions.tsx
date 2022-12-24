import { PublicLayout } from '@Components/layouts';
import { Form, styles } from '@Modules/suggestions';

const Suggestions = () => {
    return (
        <main className={styles.suggestions}>
            <h1 className={styles.title}>Sugerencias</h1>
            <span className={styles.paragraph}>
                Porque nos importa tu opinión creamos este espacio para ti 😎
            </span>
            <Form />
        </main>
    )
}

Suggestions.getLayout = (page: JSX.Element) => (
    <PublicLayout title="Sugerencias">
        {page}
    </PublicLayout>
)

export default Suggestions;