import Button from '@/components/Button';

import styles from './ContentCard.module.scss';

type Props = {
  readonly title: string;
  readonly content: string;
  readonly route: string;
};

const ContentCard: React.FC<Props> = ({ title, content, route }) => {
  return (
    <section className={styles.card}>
      <h3 className={styles.title}>{title}</h3>
      <span className={styles.content}>{content}</span>
      <Button as='a' href={route} className={styles.button} stylesFor='primary'>
        Ver más
      </Button>
    </section>
  );
};

export default ContentCard;
