import Button from '@Components/Button';

import styles from './Card.module.scss';

const Card = ({ title, content, route }) => {
    return (
        <section className={styles.card}>
            <h3 className={styles.title}>{title}</h3>
            <span className={styles.content}>{content}</span>
            <Button href={route} className={styles.button} style="primary">
                Ver más
            </Button>
        </section>
    )
}

export default Card;