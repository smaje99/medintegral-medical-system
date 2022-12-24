import { useMemo } from 'react';

import styles from './TellCard.module.scss';
import { TellCardProps } from '../Card.types';

const TellCard = ({ opinion, created_at }: TellCardProps) => {
    const date = useMemo(() => new Date(created_at).toLocaleDateString(), [created_at]);

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