import Button from '@Components/Button';

import { ContentCardProps } from '../Card.types';

import styles from './ContentCard.module.scss';

const ContentCard = ({ title, content, route }: ContentCardProps) => {
    return (
        <section className={styles.card}>
            <h3 className={styles.title}>{title}</h3>
            <span className={styles.content}>{content}</span>
            <Button
                as="a"
                href={route}
                className={styles.button}
                stylesFor="primary"
            >
                Ver más
            </Button>
        </section>
    )
}

export default ContentCard;