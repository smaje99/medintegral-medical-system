import { Permissions } from '@/helpers/permissions';

import { PermissionProvider, useTable } from '../hooks';
import styles from './Bar.module.scss';

type Props = {
  title: string;
  permission: Permissions;
  children: React.ReactNode | React.ReactNode[];
};

/**
 * This component displays the table navigation bar.
 * The children will be displayed in reverse.
 */
function Bar<T extends object>({
  title,
  permission,
  children,
}: Props): React.JSX.Element {
  const { rowSelectionSize } = useTable<T>();

  return (
    <section className={styles.bar}>
      <section className={styles.section}>
        <h1 className={styles.title}>{title}</h1>
        {rowSelectionSize > 0 ? (
          <span className={styles['row-size']}>
            {rowSelectionSize}
            &nbsp;
            {rowSelectionSize === 1 ? 'seleccionado' : 'seleccionados'}
          </span>
        ) : null}
      </section>
      <ul className={styles.nav}>
        <PermissionProvider permission={permission}>{children}</PermissionProvider>
      </ul>
    </section>
  );
}

export default Bar;
