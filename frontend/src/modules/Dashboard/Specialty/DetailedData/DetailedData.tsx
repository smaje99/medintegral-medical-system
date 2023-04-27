import Image from 'next/future/image';

import type { Specialty } from '@Types/medical/specialty.model';

import styles from './DetailedData.module.scss';

interface Props {
    readonly specialty: Specialty;
}

const DetailedData: React.FC<Props> = ({ specialty }) => {

    return (
        <section className={styles.container}>
            <Image
                src={specialty.image}
                alt='Imagen de la Especialidad'
                width={220}
                height={160}
                className={styles.image}
                priority
            />
            <h3 className={styles.title}>
                {specialty.name}
            </h3>
            <p className={styles.description}>
                {specialty.description}
            </p>
        </section>
    )
}

export default DetailedData