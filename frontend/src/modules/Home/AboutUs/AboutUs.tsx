import { ContentCard } from '@Components/Card';

import items from '../items';

import homeStyles from '../Home.module.scss';
import styles from './AboutUs.module.scss';

const AboutUs = () => {
    return (
        <section id="sobre-nosotros" className={homeStyles.section}>
            <h2 className={homeStyles.title}>Sobre nosotros</h2>
            <section className={styles.group}>
                {items.map((item) => (
                    <ContentCard key={item.title} {...item} />
                ))}
            </section>
        </section>
    )
}

export default AboutUs;