import Card from '@Components/Card';
import { HomeLayout } from '@Components/layouts';

import routes from '@Helpers/routes';

import styles from '@Styles/pages/Home.module.scss';



const Home = () => {
    return (
        <>
            <section className={styles.about_us}>
                <span id="sobre-nosotros" style={{visibility: 'none', height: '4rem'}}></span>
                <h2 className={styles.title}>Sobre nosotros</h2>
                <section className={styles.group}>
                    {items.map((item) => (
                        <Card {...item} />
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