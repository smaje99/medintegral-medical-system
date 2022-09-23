import Card from '@Components/Card';
import { HomeLayout } from '@Components/layouts';

import routes from '@Helpers/routes';

import styles from '@Styles/pages/Home.module.scss';

const items = [
    {
        title: 'Quiénes Somos',
        content: 'Conoce sobre nosotros y nuestra labor',
        route: routes.about
    },
    {
        title: 'Servicios',
        content: 'Conoce nuestro portafolio de servicios médicos',
        route: routes.services
    },
    {
        title: 'Boletín',
        content: 'Infórmate con nuestras publicaciones',
        route: routes.bulletin
    },
    {
        title: 'Participación social',
        content: 'Conoce nuestro participación social',
        route: routes.socialParticipation
    },
    {
        title: 'Citas',
        content: 'Agenda y consulta tus cita médicas',
        route: routes.appointment
    },
    {
        title: 'Sugerencias',
        content: 'Para nosotros es importante saber que piensas de nosotros',
        route: routes.suggestions
    }
]

const Home = () => {
    return (
        <>
            <section className={styles.about_us}>
                <span id="sobre-nosotros" style={{visibility: 'none', height: '4rem'}}></span>
                <h2 className={styles.title}>Sobre nosotros</h2>
                <section className={styles.group}>
                    {items.map((item) => (
                        <Card key={item.title} {...item} />
                    ))}
                </section>
            </section>
        </>
    )
}

Home.getLayout = (page) => (
    <HomeLayout>
        {page}
    </HomeLayout>
)

export default Home;