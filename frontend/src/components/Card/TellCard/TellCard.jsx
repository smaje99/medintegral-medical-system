import styles from './TellCard.module.scss';

const TellCard = ({ opinion, created_at }) => {
    return (
        <section className={styles.card}>
            <p className={styles.content}>{opinion}</p>
            <span className={styles.detail}>
                {new Date(created_at).toLocaleDateString()}
            </span>
        </section>
    )
}

export default TellCard;