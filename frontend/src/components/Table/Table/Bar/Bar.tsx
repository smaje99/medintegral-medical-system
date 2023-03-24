import { useId } from 'react';

import { useTable } from '@Components/Table/Table';

import styles from './Bar.module.scss';

type Props = {
    title: string;
    children: React.ReactNode | React.ReactNode[];
}

/**
 * This component displays the table navigation bar.
 * The children will be displayed in reverse.
 */
function Bar<T>({ title, children }: Props): JSX.Element {
    const { rowSelectionSize } = useTable<T>();

    const itemsId = useId();

    return (
        <section className={styles.bar}>
            <section className={styles.section}>
                <h1 className={styles.title}>
                    {title}
                </h1>
                {rowSelectionSize > 0 ? (
                    <span className={styles['row-size']}>
                        {rowSelectionSize}
                        &nbsp;
                        {rowSelectionSize === 1 ? 'seleccionado' : 'seleccionados'}
                    </span>
                ): null}
            </section>
            <ul className={styles.nav}>
                {Array.isArray(children) ? children.filter(Boolean).map((child, idx) => (
                    <li key={`${itemsId}-${idx}`} className={styles.item}>
                        {child}
                    </li>
                )) : (
                    <li className={styles.item}>
                        {children}
                    </li>
                )}
            </ul>
        </section>
    )
}

export default Bar;