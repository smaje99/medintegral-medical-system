import { TellCard } from '@Components/Card';
import { TellUsProps } from '@Modules/Home/Home.types';

import homeStyles from '../Home.module.scss';
import styles from './TellUs.module.scss';

const TellUs = ({ suggestions }: TellUsProps) => {
    return (
        <>
            {suggestions.length > 0 && <section className={homeStyles.section}>
                <h2 className={homeStyles.title}>
                    Nuestros pacientes dicen
                </h2>
                <section className={styles.group}>
                    {suggestions.map((suggestion) => (
                        <TellCard key={suggestion.id} {...suggestion} />
                    ))}
                </section>
            </section>}
        </>
    )
}

export default TellUs;