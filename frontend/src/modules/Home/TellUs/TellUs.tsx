import { TellCard } from '@/components/Card';
import type { Suggestion } from '@/types/suggestion';

import homeStyles from '../Home.module.scss';
import styles from './TellUs.module.scss';

type Props = {
  suggestions: Suggestion[];
};

const TellUs: React.FC<Props> = ({ suggestions }) => {
  return (
    <>
      {suggestions.length > 0 && (
        <section className={homeStyles.section}>
          <h2 className={homeStyles.title}>Nuestros pacientes dicen</h2>
          <section className={styles.group}>
            {suggestions.map((suggestion) => (
              <TellCard key={suggestion.id} {...suggestion} />
            ))}
          </section>
        </section>
      )}
    </>
  );
};

export default TellUs;
