import { ContentCard } from '@Components/Card';
import {
    items,
    Layout,
    Maps,
    styles
} from '@Modules/home';

const Home = () => (
    <>
        <section id="sobre-nosotros" className={styles.section}>
            <h2 className={styles.title}>Sobre nosotros</h2>
            <section className={styles.group}>
                {items.map((item) => (
                    <ContentCard key={item.title} {...item} />
                ))}
            </section>
        </section>
        <section id="ubicanos" className={styles.section}>
            <h2 className={styles.title}>Ubícanos</h2>
            <Maps />
        </section>
    </>
)

Home.getLayout = (page) => (
    <Layout>
        {page}
    </Layout>
)

export default Home;