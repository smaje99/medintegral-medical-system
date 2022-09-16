import Head from 'next/head';

import { SuggestionForm } from '@Components/Forms';
import { PublicLayout } from '@Components/layouts';

import styles from '@Styles/pages/Suggestions.module.scss';

const Suggestions = () => {
    return (
        <main className={styles.suggestions}>
            <Head>
                <title>Sugerencias | Medintegral IPS SAS</title>
            </Head>

            <h1 className={styles.title}>Sugerencias</h1>
            <span className={styles.paragraph}>
                Porque nos importa tu opinión creamos este espacio para ti 😎
            </span>
            <SuggestionForm />
        </main>
    )
}

Suggestions.getLayout = (page) => (
    <PublicLayout>
        {page}
    </PublicLayout>
)

export default Suggestions;