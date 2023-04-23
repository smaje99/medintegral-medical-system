import { useMemo } from 'react';

import type { Data } from '@Types/data-request';
import type { Specialty } from '@Types/medical/specialty.model';

import DetailedData from '../DetailedData/DetailedData';

import styles from './Detailed.module.scss';

interface Props {
    readonly specialty: Data<Specialty>;
}

const Detailed: React.FC<Props> = ({ specialty }) => {
    const specialtyMemo = useMemo(() => specialty, [specialty]);

    return (
        <>
            <section className={styles.container}>
                <section className={styles['commands-container']}>
                    <h2 className={styles.name}>
                        {specialtyMemo?.data?.name}
                    </h2>
                    <section className={styles.commands}>

                    </section>
                </section>

                <DetailedData specialty={specialtyMemo.data} />
            </section>
        </>
    )
}

export default Detailed;