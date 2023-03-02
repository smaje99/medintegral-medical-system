import { FieldProps } from './Field.types';

import styles from './Field.module.scss';

const Field = ({ htmlFor, title, obligatory, children, legend }: FieldProps) => {
    return (
        <label htmlFor={htmlFor} className={styles.content}>
            <span className={styles.text} data-obligatory={obligatory ? 'yes': 'no'}>
                {title}
            </span>
            {legend ? (
                <span className={styles.legend}>{legend}</span>
            ) : null}
            <div className={styles.field}>
                {children}
            </div>
        </label>
    )
}

export default Field;