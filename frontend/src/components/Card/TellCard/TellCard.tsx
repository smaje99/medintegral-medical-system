import { relativeDateToNow } from '@/utils/date';

import styles from './TellCard.module.scss';

type Props = {
  readonly opinion: string;
  readonly createdAt: Date;
};

const TellCard: React.FC<Props> = ({ opinion, createdAt }) => {
  const date = relativeDateToNow(createdAt);

  return (
    <section className={styles.card}>
      <p className={styles.content}>{opinion}</p>
      <span className={styles.detail}>{date}</span>
    </section>
  );
};

export default TellCard;
