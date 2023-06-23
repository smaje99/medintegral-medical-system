import { PublicLayout } from '@/components/layouts';
import { Form, styles } from '@/modules/Suggestions';
import type { NextPageWithLayout } from '@/types/next';

const Suggestions: NextPageWithLayout = () => {
  return (
    <main className={styles.suggestions}>
      <h1 className={styles.title}>Sugerencias</h1>
      <span className={styles.paragraph}>
        Porque nos importa tu opinión creamos este espacio para ti 😎
      </span>
      <Form />
    </main>
  );
};

Suggestions.getLayout = (page) => <PublicLayout title='Sugerencias'>{page}</PublicLayout>;

export default Suggestions;
