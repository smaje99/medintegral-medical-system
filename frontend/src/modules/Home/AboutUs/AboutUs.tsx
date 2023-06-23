import { ContentCard } from '@/components/Card';

import homeStyles from '../Home.module.scss';
import items from '../items';
import styles from './AboutUs.module.scss';

const AboutUs = () => {
  return (
    <section id='sobre-nosotros' className={homeStyles.section}>
      <h2 className={homeStyles.title}>Sobre nosotros</h2>
      <section className={styles.group}>
        {items.map((item) => (
          <ContentCard key={item.title} {...item} />
        ))}
      </section>
    </section>
  );
};

export default AboutUs;
