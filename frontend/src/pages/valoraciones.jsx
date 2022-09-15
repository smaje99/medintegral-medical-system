import Head from 'next/head';

import { RatingForm } from '@Components/Forms';
import { PublicLayout } from '@Components/layouts';

import styles from '@Styles/pages/Ratings.module.scss';

const Ratings = () => {
    return (
        <main className={styles.ratings}>
            <Head>
                <title>Valoraciones | Medintegral IPS SAS</title>
            </Head>

            <h1 className={styles.title}>Valoraciones</h1>
            <span className={styles.paragraph}>
                Porque nos importa tu opinión creamos este espacio para ti 😎
            </span>
            <RatingForm />
        </main>
    )
}

Ratings.getLayout = (page) => (
    <PublicLayout>
        {page}
    </PublicLayout>
)

export default Ratings;