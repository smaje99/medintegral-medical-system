import { useMemo } from 'react';

import styles from './TellCard.module.scss';
import type { TellCardProps } from '../Card.types';

const TellCard: React.FC<TellCardProps> = ({ opinion, createdAt }) => {
    const date = useMemo(() => new Date(createdAt).toLocaleDateString(), [createdAt]);

    return (
        <section className={styles.card}>
            <p className={styles.content}>{opinion}</p>
            <span className={styles.detail}>
                {date}
            </span>
        </section>
    )
}

export default TellCard;