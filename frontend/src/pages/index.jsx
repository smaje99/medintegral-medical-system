import Card from '@Components/Card';
import { items, Layout, styles } from '@Modules/home';

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
    <Layout>
        {page}
    </Layout>
)

export default Home;