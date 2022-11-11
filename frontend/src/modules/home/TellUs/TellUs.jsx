import { useEffect, useCallback, useState } from 'react';

import { TellCard } from '@Components/Card';
import { getAllPinnedSuggestions } from '@Services/suggestion.service';

import homeStyles from '../Home.module.scss';
import styles from './TellUs.module.scss';

const TellUs = () => {
    const [suggestions, setSuggestions] = useState([]);

    const getSuggestions = useCallback(async () => {
        const data = await getAllPinnedSuggestions();
        setSuggestions(data.data);
    }, [suggestions]);

    useEffect(() => { getSuggestions() }, []);

    return (
        <>
            {suggestions.length && <section className={homeStyles.section}>
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