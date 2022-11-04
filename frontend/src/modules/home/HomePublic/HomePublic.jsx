import Card from '@Components/Card';
import {
    items,
    Layout,
    Maps
} from '@Modules/home';

import styles from './HomePublic.module.scss';

const HomePublic = () => {
    return (
        <Layout>
            <section id="sobre-nosotros" className={styles.section}>
                <h2 className={styles.title}>Sobre nosotros</h2>
                <section className={styles.group}>
                    {items.map((item) => (
                        <Card key={item.title} {...item} />
                    ))}
                </section>
            </section>
            <section id="ubicanos" className={styles.section}>
                <h2 className={styles.title}>Ubícanos</h2>
                <Maps />
            </section>
        </Layout>
    )
}

export default HomePublic;